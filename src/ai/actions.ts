"use server";

import {
  SYSTEM_AUTOBIOGRAPHY,
  SYSTEM_BIO,
  SYSTEM_WRITING,
  personQuery,
  synthesisQuery,
} from "./prompts";
import { generateObject, generateText } from "ai";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Input validation schema
const nameSchema = z.string().min(1, "Name cannot be empty").trim();

/**
 * Server Action: Generate a biographical timeline for a person
 * Uses web_search tool to gather and verify information
 */
export async function getLifeEventsTimeline(name: string) {
  try {
    // Validate input
    const validatedName = nameSchema.parse(name);

    const result = await generateText({
      model: openai.responses("gpt-4o"),
      system: SYSTEM_BIO,
      prompt: personQuery(validatedName),
      tools: {
        web_search_preview: openai.tools.webSearchPreview(),
      },
      maxTokens: 1000,
    });

    return result.text;
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${error.issues[0].message}`);
    }
    throw error;
  }
}

/**
 * Server Action: Analyze writing style and find authored content
 * Uses web_search tool to find authentic writing samples
 */
export async function getWritingStyleAnalysis(name: string) {
  try {
    // Validate input
    const validatedName = nameSchema.parse(name);

    const result = await generateText({
      model: openai.responses("gpt-4o"),
      system: SYSTEM_WRITING,
      prompt: personQuery(validatedName),
      tools: {
        web_search_preview: openai.tools.webSearchPreview(),
      },
      maxTokens: 1200,
    });

    return result.text;
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${error.issues[0].message}`);
    }
    throw error;
  }
}

// Schema for structured autobiography output
const autobiographySchema = z.object({
  sections: z
    .array(
      z.object({
        title: z
          .string()
          .describe("The title of this autobiography section/chapter"),
        content: z
          .string()
          .describe(
            "The autobiography content written in the person's authentic voice (200-300 words)"
          ),
        timeframe: z
          .string()
          .describe(
            "The life period this section covers (e.g., 'Early Childhood', 'University Years', 'Career Beginnings')"
          ),
      })
    )
    .min(3)
    .max(5)
    .describe(
      "3-5 autobiography sections covering different periods of the person's life"
    ),
});

/**
 * Server Action: Generate autobiography sections by synthesizing biographical data and writing style
 * Takes the outputs from the previous two actions and creates structured autobiography content
 */
export async function generateAutobiographySections(
  name: string,
  biographicalData: string,
  writingStyleAnalysis: string
) {
  try {
    // Validate inputs
    const validatedName = nameSchema.parse(name);

    if (!biographicalData.trim()) {
      throw new Error("Biographical data is required");
    }

    if (!writingStyleAnalysis.trim()) {
      throw new Error("Writing style analysis is required");
    }

    // Generate structured autobiography sections using generateText
    const result = await generateText({
      model: openai.responses("gpt-4o"),
      system: SYSTEM_AUTOBIOGRAPHY,
      prompt: synthesisQuery(
        validatedName,
        biographicalData,
        writingStyleAnalysis
      ),
      maxTokens: 2000,
    });

    // Parse the JSON response manually
    try {
      const parsedResult = JSON.parse(result.text);

      // Validate the structure matches our expected schema
      if (!parsedResult.sections || !Array.isArray(parsedResult.sections)) {
        throw new Error("Invalid response structure: missing sections array");
      }

      // Validate each section has required fields
      for (const section of parsedResult.sections) {
        if (!section.title || !section.content || !section.timeframe) {
          throw new Error("Invalid section structure: missing required fields");
        }
      }

      return parsedResult;
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.error("Raw response:", result.text);
      throw new Error("Failed to parse autobiography response as JSON");
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${error.issues[0].message}`);
    }
    console.error("Error in generateAutobiographySections:", error);
    throw error;
  }
}
