// src/components/chat/WhatsAppVoiceBubble.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { SoundwaveBars } from '@/components/menu/BrandLogoBadge';

export interface WhatsAppVoiceBubbleProps {
  sender: 'nani' | 'user';
  duration: string;
  hindiText: string;
  englishSubtext: string;
  fluencyScore?: number;
  respectWord?: string;
  timestamp: string;
  onPlayAudio?: () => void;
}

export const WhatsAppVoiceBubble: React.FC<WhatsAppVoiceBubbleProps> = ({
  sender,
  duration,
  hindiText,
  englishSubtext,
  fluencyScore,
  respectWord,
  timestamp,
  onPlayAudio,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isUser = sender === 'user';

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    onPlayAudio?.();
  };

  return (
    <View
      style={[
        styles.outerContainer,
        isUser ? styles.outerUser : styles.outerNani,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleNani,
        ]}
      >
        {/* Voice Note Audio Header Row */}
        <View style={styles.audioRow}>
          <TouchableOpacity
            style={[
              styles.playCircle,
              isUser ? styles.playCircleUser : styles.playCircleNani,
            ]}
            onPress={handlePlay}
            activeOpacity={0.8}
          >
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>

          <View style={styles.waveColumn}>
            <SoundwaveBars
              size="sm"
              isAnimating={isPlaying}
              colorMode={isUser ? 'teal' : 'terracotta'}
            />
          </View>

          <Text style={styles.durationText}>{duration}</Text>
        </View>

        {/* Devanagari Transcript */}
        <Text style={styles.hindiText}>{hindiText}</Text>

        {/* English Translation Subtext */}
        <Text style={styles.englishSubtext}>{englishSubtext}</Text>

        {/* Outgoing Evaluation Badge Pill */}
        {isUser && (fluencyScore !== undefined || respectWord) && (
          <View style={styles.evalPill}>
            {fluencyScore !== undefined && (
              <Text style={styles.evalFluency}>
                ✓✓ {fluencyScore}% Natural Fluency
              </Text>
            )}
            {fluencyScore !== undefined && respectWord && (
              <Text style={styles.evalDivider}>|</Text>
            )}
            {respectWord && (
              <Text style={styles.evalRespect}>
                Respectful Tone ('{respectWord}')
              </Text>
            )}
          </View>
        )}

        {/* Timestamp & Status */}
        <View style={styles.footerRow}>
          <Text style={styles.timestampText}>{timestamp}</Text>
          {isUser && <Text style={styles.checkMarks}>✓✓</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    marginVertical: 6,
    flexDirection: 'row',
  },
  outerNani: {
    justifyContent: 'flex-start',
    paddingRight: 36,
  },
  outerUser: {
    justifyContent: 'flex-end',
    paddingLeft: 36,
  },
  bubble: {
    maxWidth: '92%',
    borderRadius: zenRadius.md,
    borderWidth: 1,
    padding: zenSpacing.md,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  bubbleNani: {
    backgroundColor: zenColors.cardWhite,
    borderColor: zenColors.borderWarm,
    borderTopLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: zenColors.surfaceSand,
    borderColor: '#E8DBCF',
    borderTopRightRadius: 4,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: zenSpacing.sm,
  },
  playCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircleNani: {
    backgroundColor: zenColors.terracotta,
  },
  playCircleUser: {
    backgroundColor: zenColors.sageTeal,
  },
  playIcon: {
    color: zenColors.cardWhite,
    fontSize: 12,
    marginLeft: 1,
  },
  waveColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: zenColors.mutedBrown,
  },
  hindiText: {
    fontSize: 15,
    fontWeight: '700',
    color: zenColors.espressoText,
    lineHeight: 22,
    marginBottom: 4,
  },
  englishSubtext: {
    fontSize: 12,
    fontStyle: 'italic',
    color: zenColors.mutedBrown,
    lineHeight: 16,
    marginBottom: 6,
  },
  evalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#CBE5DF',
    marginTop: 4,
    marginBottom: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  evalFluency: {
    fontSize: 10,
    fontWeight: '700',
    color: zenColors.sageTeal,
  },
  evalDivider: {
    fontSize: 10,
    color: zenColors.borderWarm,
  },
  evalRespect: {
    fontSize: 10,
    fontWeight: '700',
    color: zenColors.successGreen,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 2,
  },
  timestampText: {
    fontSize: 10,
    color: zenColors.mutedBrown,
  },
  checkMarks: {
    fontSize: 10,
    color: zenColors.sageTeal,
    fontWeight: '700',
  },
});

export default WhatsAppVoiceBubble;
