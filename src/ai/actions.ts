"use server";

import {
  SYSTEM_AUTOBIOGRAPHY,
  SYSTEM_BIO,
  SYSTEM_WRITING,
  personQuery,
  synthesisQuery,
} from "./prompts";
import { generateObject, streamText } from "ai";

import { createStreamableValue } from "ai/rsc";
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

    // Create a streamable value for real-time updates
    const stream = createStreamableValue("");

    // Start the AI generation process
    (async () => {
      try {
        const result = await streamText({
          model: openai("gpt-4o"),
          system: SYSTEM_BIO,
          prompt: personQuery(validatedName),
          tools: {
            web_search: {
              description: "Search the web for information about the person",
              parameters: z.object({
                query: z
                  .string()
                  .describe("The search query to find information"),
              }),
            },
          },
          maxTokens: 1000,
        });

        // Stream the text content as it's generated
        for await (const textPart of result.textStream) {
          stream.update(textPart);
        }

        // Mark the stream as done
        stream.done();
      } catch (error) {
        console.error("Error in getLifeEventsTimeline:", error);
        stream.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    })();

    return {
      output: stream.value,
    };
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

    // Create a streamable value for real-time updates
    const stream = createStreamableValue("");

    // Start the AI generation process
    (async () => {
      try {
        const result = await streamText({
          model: openai("gpt-4o"),
          system: SYSTEM_WRITING,
          prompt: personQuery(validatedName),
          tools: {
            web_search: {
              description: "Search the web for written content by the person",
              parameters: z.object({
                query: z
                  .string()
                  .describe("The search query to find writing samples"),
              }),
            },
          },
          maxTokens: 1200,
        });

        // Stream the text content as it's generated
        for await (const textPart of result.textStream) {
          stream.update(textPart);
        }

        // Mark the stream as done
        stream.done();
      } catch (error) {
        console.error("Error in getWritingStyleAnalysis:", error);
        stream.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    })();

    return {
      output: stream.value,
    };
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

    // Generate structured autobiography sections
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: SYSTEM_AUTOBIOGRAPHY,
      prompt: synthesisQuery(
        validatedName,
        biographicalData,
        writingStyleAnalysis
      ),
      schema: autobiographySchema,
      maxTokens: 2000,
    });

    return result.object;
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${error.issues[0].message}`);
    }
    console.error("Error in generateAutobiographySections:", error);
    throw error;
  }
}
