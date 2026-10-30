// src/lib/api/__tests__/server.test.ts
import { ApiServerAdapter, RawServerEvaluation } from '../server';

describe('ApiServerAdapter', () => {
  it('formats voice turn feedback with high fluency score (>= 85)', () => {
    const raw: RawServerEvaluation = {
      fluency_score: 96,
      respect_marker_used: 'आप',
      unlocked_artifact_id: 'golden-diya',
    };

    const formatted = ApiServerAdapter.formatVoiceTurnFeedback(raw);

    expect(formatted.fluencyLabel).toBe('✓✓ 96% Natural Fluency');
    expect(formatted.respectLabel).toBe("Respectful Tone ('आप')");
    expect(formatted.isGoldenDiyaUnlocked).toBe(true);
    expect(formatted.xpEarned).toBe(100);
  });

  it('formats voice turn feedback with lower fluency score (< 85)', () => {
    const raw: RawServerEvaluation = {
      fluency_score: 72,
      respect_marker_used: null,
      unlocked_artifact_id: null,
    };

    const formatted = ApiServerAdapter.formatVoiceTurnFeedback(raw);

    expect(formatted.fluencyLabel).toBe('✓✓ 72% Natural Fluency');
    expect(formatted.respectLabel).toBeNull();
    expect(formatted.isGoldenDiyaUnlocked).toBe(false);
    expect(formatted.xpEarned).toBe(50);
  });

  it('handles empty respect marker cleanly', () => {
    const raw: RawServerEvaluation = {
      fluency_score: 88,
      respect_marker_used: '',
      unlocked_artifact_id: 'chai-kulhad',
    };

    const formatted = ApiServerAdapter.formatVoiceTurnFeedback(raw);

    expect(formatted.respectLabel).toBeNull();
    expect(formatted.isGoldenDiyaUnlocked).toBe(true);
    expect(formatted.xpEarned).toBe(100);
  });
});
