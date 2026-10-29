// src/components/dashboard/MilestoneChestBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface MilestoneChestBarProps {
  currentXp?: number;
  targetXp?: number;
}

export const MilestoneChestBar: React.FC<MilestoneChestBarProps> = ({
  currentXp = 480,
  targetXp = 500,
}) => {
  const xpNeeded = Math.max(0, targetXp - currentXp);
  const progressPercent = Math.min(100, Math.round((currentXp / targetXp) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.chestIconCircle}>
        <Text style={styles.chestIcon}>🎁</Text>
      </View>

      <View style={styles.textColumn}>
        <Text style={styles.title}>Milestone Chest</Text>
        <Text style={styles.subtext}>
          Unlocks at {targetXp} XP ({xpNeeded} XP away)
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressPercent}%` },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FAF5EE',
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: zenSpacing.xs,
    marginBottom: zenSpacing.md,
  },
  chestIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: zenColors.cardWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.sm,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  chestIcon: {
    fontSize: 18,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: zenColors.espressoText,
  },
  subtext: {
    fontSize: 11,
    color: zenColors.mutedBrown,
    marginTop: 2,
  },
  progressContainer: {
    width: 68,
    marginLeft: zenSpacing.sm,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#EBE2D7',
    borderRadius: zenRadius.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: zenColors.terracotta,
    borderRadius: zenRadius.pill,
  },
});

export default MilestoneChestBar;
