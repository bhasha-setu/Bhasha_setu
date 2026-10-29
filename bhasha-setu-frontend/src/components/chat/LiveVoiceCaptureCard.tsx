// src/components/chat/LiveVoiceCaptureCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { SoundwaveBars } from '@/components/menu/BrandLogoBadge';

export interface LiveVoiceCaptureCardProps {
  clarityPercent?: number;
  capturedText?: string;
  xpBonus?: number;
  isListening?: boolean;
  highlightWord?: string;
  pitchDescription?: string;
}

export const LiveVoiceCaptureCard: React.FC<LiveVoiceCaptureCardProps> = ({
  clarityPercent = 90,
  capturedText = '“...गेंद पर शानदार छक्का!”',
  xpBonus = 35,
  isListening = true,
  highlightWord = 'छक्का!',
  pitchDescription = 'Microphone detected pitch: Crisp & Exuberant',
}) => {
  const renderFormattedText = () => {
    if (!highlightWord || !capturedText.includes(highlightWord)) {
      return <Text style={styles.spokenQuote}>{capturedText}</Text>;
    }

    const parts = capturedText.split(highlightWord);
    return (
      <Text style={styles.spokenQuote}>
        {parts[0]}
        <Text style={styles.highlightText}>{highlightWord}</Text>
        {parts.slice(1).join(highlightWord)}
      </Text>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.statusRow}>
        <View style={styles.cadencePill}>
          <Text style={styles.cadenceDot}>●</Text>
          <Text style={styles.cadenceText}>
            {clarityPercent}% Clear • natural cadence
          </Text>
        </View>

        {xpBonus !== undefined && (
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{xpBonus} XP</Text>
          </View>
        )}
      </View>

      <View style={styles.soundwaveWrapper}>
        <SoundwaveBars size="lg" isAnimating={isListening} colorMode="dual" />
      </View>

      <View style={styles.speechBox}>
        {renderFormattedText()}
        <Text style={styles.pitchText}>{pitchDescription}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    marginVertical: zenSpacing.xs,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cadencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cadenceDot: {
    fontSize: 10,
    color: zenColors.sageTeal,
  },
  cadenceText: {
    fontSize: 12,
    fontWeight: '800',
    color: zenColors.sageTeal,
  },
  xpBadge: {
    backgroundColor: zenColors.surfaceMint,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: zenRadius.pill,
  },
  xpText: {
    fontSize: 11,
    fontWeight: '800',
    color: zenColors.sageTeal,
  },
  soundwaveWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  speechBox: {
    backgroundColor: '#F5EBE1',
    borderRadius: zenRadius.sm,
    paddingVertical: 10,
    paddingHorizontal: zenSpacing.md,
    alignItems: 'center',
  },
  spokenQuote: {
    fontSize: 18,
    fontWeight: '700',
    color: zenColors.espressoText,
    textAlign: 'center',
    marginBottom: 4,
  },
  highlightText: {
    color: zenColors.sageTeal,
    fontWeight: '800',
  },
  pitchText: {
    fontSize: 11,
    color: zenColors.mutedBrown,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LiveVoiceCaptureCard;
