"use server";

import {
  SYSTEM_AUTOBIOGRAPHY,
  SYSTEM_BIO,
  SYSTEM_WRITING,
  personQuery,
  synthesisQuery,
} from "./prompts";
import { TTSRequest, elevenLabsService } from "./elevenlabs";
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
 * Helper function to extract JSON from markdown code blocks
 */
function extractJsonFromMarkdown(text: string): string {
  console.log("🔍 Extracting JSON from markdown...");
  console.log("📝 Raw text length:", text.length);
  console.log("📝 First 200 chars:", text.substring(0, 200));

  // Remove markdown code blocks if present
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    console.log("✅ Found JSON in markdown code blocks");
    return jsonMatch[1].trim();
  }

  console.log("ℹ️ No markdown code blocks found, returning original text");
  return text.trim();
}

/**
 * Server Action: Generate autobiography sections by synthesizing biographical data and writing style
 * Takes the outputs from the previous two actions and creates structured autobiography content
 */
export async function generateAutobiographySections(
  name: string,
  biographicalData: string,
  writingStyleAnalysis: string
) {
  console.log("🚀 Starting generateAutobiographySections");
  console.log("👤 Name:", name);
  console.log("📊 Bio data length:", biographicalData.length);
  console.log("✍️ Writing analysis length:", writingStyleAnalysis.length);

  try {
    // Validate inputs
    console.log("🔍 Validating inputs...");
    const validatedName = nameSchema.parse(name);
    console.log("✅ Name validated:", validatedName);

    if (!biographicalData.trim()) {
      console.log("❌ Biographical data is empty");
      throw new Error("Biographical data is required");
    }

    if (!writingStyleAnalysis.trim()) {
      console.log("❌ Writing style analysis is empty");
      throw new Error("Writing style analysis is required");
    }

    console.log("✅ All inputs validated successfully");

    // Generate structured autobiography sections using generateText
    console.log("🤖 Calling OpenAI generateText...");
    const startTime = Date.now();

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

    const endTime = Date.now();
    console.log(`✅ OpenAI call completed in ${endTime - startTime}ms`);
    console.log("📝 Raw response length:", result.text.length);
    console.log("📝 Raw response preview:", result.text.substring(0, 300));

    // Extract JSON from potential markdown wrapper
    console.log("🔧 Processing response...");
    const cleanedJson = extractJsonFromMarkdown(result.text);
    console.log("🧹 Cleaned JSON length:", cleanedJson.length);
    console.log("🧹 Cleaned JSON preview:", cleanedJson.substring(0, 300));

    // Parse and validate with Zod
    console.log("📋 Parsing JSON with Zod...");
    try {
      const jsonData = JSON.parse(cleanedJson);
      console.log("✅ JSON parsed successfully");
      console.log("📊 Parsed object keys:", Object.keys(jsonData));

      if (jsonData.sections) {
        console.log("📚 Number of sections found:", jsonData.sections.length);
      }

      console.log("🔍 Validating with Zod schema...");
      const validatedResult = autobiographySchema.parse(jsonData);
      console.log("✅ Zod validation successful");
      console.log("📚 Final sections count:", validatedResult.sections.length);

      // Log each section for debugging
      validatedResult.sections.forEach((section, index) => {
        console.log(`📖 Section ${index + 1}:`);
        console.log(`  📝 Title: ${section.title}`);
        console.log(`  📅 Timeframe: ${section.timeframe}`);
        console.log(`  📄 Content length: ${section.content.length} chars`);
      });

      return validatedResult;
    } catch (parseError) {
      console.error("❌ JSON parsing failed:", parseError);
      console.error("📝 Cleaned JSON that failed to parse:", cleanedJson);
      throw new Error(
        `Failed to parse JSON: ${
          parseError instanceof Error ? parseError.message : "Unknown error"
        }`
      );
    }
  } catch (error) {
    console.error("💥 Error in generateAutobiographySections:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      console.error("🔍 Zod validation errors:", error.issues);
      throw new Error(`Invalid input: ${error.issues[0].message}`);
    }

    throw error;
  }
}

/**
 * Server Action: Generate audio for a single autobiography section using ElevenLabs
 */
export async function generateSectionAudio(
  sectionText: string,
  voiceId?: string,
  voiceGender: "male" | "female" = "female"
): Promise<string> {
  try {
    console.log("🎤 Starting audio generation for section...");
    console.log("📝 Text length:", sectionText.length);

    if (!sectionText.trim()) {
      throw new Error("Section text is required for audio generation");
    }

    // Get recommended voice if none provided
    const selectedVoiceId =
      voiceId || (await elevenLabsService.getRecommendedVoice(voiceGender));
    console.log("🎵 Using voice ID:", selectedVoiceId);

    // Generate audio with optimized settings for audiobook narration
    const audioDataUrl = await elevenLabsService.generateSpeechDataUrl({
      text: sectionText,
      voice_id: selectedVoiceId,
      model_id: "eleven_turbo_v2_5", // Fast and high quality
      voice_settings: {
        stability: 0.75, // Higher stability for consistent narration
        similarity_boost: 0.85, // Higher similarity for voice consistency
        style: 0.2, // Slight expressiveness for engagement
        use_speaker_boost: true, // Enhanced clarity
      },
    });

    console.log("✅ Audio generation completed successfully");
    return audioDataUrl;
  } catch (error) {
    console.error("❌ Error generating section audio:", error);
    throw new Error(
      `Audio generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Server Action: Generate audio for all autobiography sections
 */
export async function generateAutobiographyAudio(
  sections: Array<{ title: string; content: string; timeframe: string }>,
  voiceGender: "male" | "female" = "female"
): Promise<Array<{ title: string; audioUrl: string; timeframe: string }>> {
  try {
    console.log("🎧 Starting full audiobook generation...");
    console.log("📚 Generating audio for", sections.length, "sections");

    // Get recommended voice for consistency across all sections
    const voiceId = await elevenLabsService.getRecommendedVoice(voiceGender);
    console.log("🎵 Using consistent voice ID:", voiceId);

    // Generate audio for each section
    const audioSections = await Promise.all(
      sections.map(async (section, index) => {
        console.log(
          `🎤 Processing section ${index + 1}/${sections.length}: ${
            section.title
          }`
        );

        try {
          const audioUrl = await generateSectionAudio(
            section.content,
            voiceId,
            voiceGender
          );
          console.log(`✅ Completed section ${index + 1}: ${section.title}`);

          return {
            title: section.title,
            audioUrl,
            timeframe: section.timeframe,
          };
        } catch (error) {
          console.error(
            `❌ Failed to generate audio for section: ${section.title}`,
            error
          );
          throw error;
        }
      })
    );

    console.log("🎉 Full audiobook generation completed!");
    return audioSections;
  } catch (error) {
    console.error("❌ Error generating autobiography audio:", error);
    throw new Error(
      `Audiobook generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Server Action: Get available ElevenLabs voices for user selection
 */
export async function getAvailableVoices() {
  try {
    console.log("🔍 Fetching available voices...");
    const voices = await elevenLabsService.getVoices();

    // Filter to show only good voices for narration and add helpful metadata
    const narratorVoices = voices
      .filter(
        (voice) =>
          // Filter for English voices and good quality ones
          voice.category === "premade" || voice.category === "professional"
      )
      .map((voice) => ({
        voice_id: voice.voice_id,
        name: voice.name,
        category: voice.category,
        // Add gender hints based on common voice names
        suggested_gender: ["Adam", "Sam", "Josh", "Arnold", "Antoni"].includes(
          voice.name
        )
          ? "male"
          : ["Bella", "Rachel", "Domi", "Elli", "Dorothy"].includes(voice.name)
          ? "female"
          : "unknown",
      }));

    console.log(`✅ Found ${narratorVoices.length} suitable narrator voices`);
    return narratorVoices;
  } catch (error) {
    console.error("❌ Error fetching voices:", error);
    throw new Error(
      `Failed to fetch voices: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
