interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
}

interface TTSRequest {
  text: string;
  voice_id?: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

class ElevenLabsService {
  private apiKey: string;
  private baseUrl = "https://api.elevenlabs.io/v1";

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("ELEVENLABS_API_KEY environment variable is required");
    }
  }

  /**
   * Get available voices from ElevenLabs
   */
  async getVoices(): Promise<ElevenLabsVoice[]> {
    const response = await fetch(`${this.baseUrl}/voices`, {
      headers: {
        "xi-api-key": this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.statusText}`);
    }

    const data = await response.json();
    return data.voices;
  }

  /**
   * Generate speech from text using ElevenLabs TTS
   */
  async generateSpeech({
    text,
    voice_id = "EXAVITQu4vr4xnSDxMaL", // Default to Bella voice
    model_id = "eleven_turbo_v2_5",
    voice_settings = {
      stability: 0.5,
      similarity_boost: 0.8,
      style: 0.0,
      use_speaker_boost: true,
    },
  }: TTSRequest): Promise<ArrayBuffer> {
    const response = await fetch(`${this.baseUrl}/text-to-speech/${voice_id}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": this.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id,
        voice_settings,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `TTS generation failed: ${response.statusText} - ${errorText}`
      );
    }

    return response.arrayBuffer();
  }

  /**
   * Generate speech and return as base64 data URL for audio playback
   */
  async generateSpeechDataUrl(request: TTSRequest): Promise<string> {
    const audioBuffer = await this.generateSpeech(request);
    const base64Audio = Buffer.from(audioBuffer).toString("base64");
    return `data:audio/mpeg;base64,${base64Audio}`;
  }

  /**
   * Helper method to get a good voice for autobiography narration
   */
  async getRecommendedVoice(
    gender: "male" | "female" = "female"
  ): Promise<string> {
    try {
      const voices = await this.getVoices();

      // Some good voices for audiobook narration
      const maleVoices = ["pNInz6obpgDQGcFmaJgB", "Yko7PKHZNXotIFUBG7I9"]; // Adam, Sam
      const femaleVoices = ["EXAVITQu4vr4xnSDxMaL", "ThT5KcBeYPX3keUQqHPh"]; // Bella, Dorothy

      const targetVoices = gender === "male" ? maleVoices : femaleVoices;

      for (const voiceId of targetVoices) {
        const voice = voices.find((v) => v.voice_id === voiceId);
        if (voice) {
          return voiceId;
        }
      }

      // Fallback to first available voice of the desired gender
      const fallbackVoice = voices.find((v) =>
        gender === "male"
          ? ["male", "masculine"].some((term) =>
              v.name.toLowerCase().includes(term)
            )
          : ["female", "feminine"].some((term) =>
              v.name.toLowerCase().includes(term)
            )
      );

      return fallbackVoice?.voice_id || "EXAVITQu4vr4xnSDxMaL"; // Default to Bella
    } catch (error) {
      console.error("Error getting recommended voice:", error);
      return "EXAVITQu4vr4xnSDxMaL"; // Default to Bella
    }
  }
}

export const elevenLabsService = new ElevenLabsService();
export type { TTSRequest, ElevenLabsVoice };
