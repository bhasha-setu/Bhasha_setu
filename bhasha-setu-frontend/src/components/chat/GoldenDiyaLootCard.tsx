// src/components/chat/GoldenDiyaLootCard.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { captureAndShareMilestone } from '@/lib/services/shareStatusService';
import { triggerSuccessHaptic } from '@/lib/services/hapticsService';

export interface GoldenDiyaLootCardProps {
  culturalXp?: number;
  onShareMilestone?: () => void;
  onNextQuest?: () => void;
  containerRef?: React.RefObject<any>;
}

export const GoldenDiyaLootCard: React.FC<GoldenDiyaLootCardProps> = ({
  culturalXp = 100,
  onShareMilestone,
  onNextQuest,
  containerRef,
}) => {
  const localRef = useRef<any>(null);
  const targetRef = containerRef || localRef;

  const handleShare = async () => {
    triggerSuccessHaptic();
    if (onShareMilestone) {
      onShareMilestone();
    } else {
      await captureAndShareMilestone(targetRef);
    }
  };

  return (
    <View style={styles.cardOuter} ref={targetRef} collapsable={false}>
      <View style={styles.diyaGlowCircle}>
        <Text style={styles.diyaIcon}>🪔</Text>
      </View>

      <Text style={styles.title}>Golden Diya Unlocked!</Text>
      <Text style={styles.subtitle}>
        +{culturalXp} Cultural XP • Conversational Mastery
      </Text>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.shareBtn}
        onPress={handleShare}
        activeOpacity={0.85}
      >
        <Text style={styles.shareBtnText}>
          🔗 Share Milestone to WhatsApp Status
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nextQuestRow}
        onPress={onNextQuest}
        activeOpacity={0.7}
      >
        <Text style={styles.nextQuestText}>
          Next Quest: Bargaining at Jaipur Bazaar →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.lg,
    borderWidth: 2,
    borderColor: '#E7C8A4',
    padding: zenSpacing.lg,
    alignItems: 'center',
    marginVertical: zenSpacing.md,
    shadowColor: zenColors.ochreAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  diyaGlowCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF4E5',
    borderWidth: 2,
    borderColor: '#F5CE9F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: zenSpacing.sm,
    shadowColor: zenColors.goldStar,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  diyaIcon: {
    fontSize: 34,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: zenColors.espressoText,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: zenColors.ochreAccent,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: zenColors.borderWarm,
    marginVertical: zenSpacing.md,
  },
  shareBtn: {
    width: '100%',
    backgroundColor: zenColors.terracotta,
    paddingVertical: 12,
    paddingHorizontal: zenSpacing.md,
    borderRadius: zenRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: zenColors.terracotta,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: zenSpacing.sm,
  },
  shareBtnText: {
    color: zenColors.cardWhite,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  nextQuestRow: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  nextQuestText: {
    fontSize: 12,
    fontWeight: '600',
    color: zenColors.sageTeal,
  },
});

export default GoldenDiyaLootCard;
