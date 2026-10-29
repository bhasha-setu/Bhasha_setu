// src/lib/api/server.ts
export interface RawServerEvaluation {
  fluency_score: number;
  respect_marker_used: string | null;
  unlocked_artifact_id: string | null;
}

export const ApiServerAdapter = {
  formatVoiceTurnFeedback(raw: RawServerEvaluation) {
    return {
      fluencyLabel: `✓✓ ${raw.fluency_score}% Natural Fluency`,
      respectLabel: raw.respect_marker_used
        ? `Respectful Tone ('${raw.respect_marker_used}')`
        : null,
      isGoldenDiyaUnlocked: raw.fluency_score >= 85,
      xpEarned: raw.fluency_score >= 85 ? 100 : 50,
    };
  },
};

