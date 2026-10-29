// src/components/menu/SubHeaderHUD.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { BrandLogoBadge } from './BrandLogoBadge';

export interface SubHeaderHUDProps {
  lessonTitle?: string;
  categoryOverline?: string;
  streakDays?: number;
  xpPoints?: number;
  comboLabel?: string;
  progressPercent?: number;
  progressBarColor?: string;
  showLogo?: boolean;
}

export const SubHeaderHUD: React.FC<SubHeaderHUDProps> = ({
  lessonTitle = 'Quest Map',
  categoryOverline = 'BHASHA SETU',
  streakDays,
  xpPoints,
  comboLabel,
  progressPercent,
  progressBarColor = zenColors.terracotta,
  showLogo = true,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.hudRow}>
        <View style={styles.leftGroup}>
          {showLogo && <BrandLogoBadge size={36} />}
          <View style={[styles.titleGroup, !showLogo && { marginLeft: 0 }]}>
            {categoryOverline ? (
              <Text style={styles.overline}>{categoryOverline}</Text>
            ) : null}
            <Text style={styles.lessonTitle} numberOfLines={1}>
              {lessonTitle}
            </Text>
          </View>
        </View>

        <View style={styles.rightPills}>
          {comboLabel ? (
            <View style={[styles.pill, styles.comboPill]}>
              <Text style={styles.comboText}>🔥 {comboLabel}</Text>
            </View>
          ) : null}

          {streakDays !== undefined && (
            <View style={[styles.pill, styles.streakPill]}>
              <Text style={styles.streakText}>🔥 {streakDays}d Streak</Text>
            </View>
          )}

          {xpPoints !== undefined && (
            <View style={[styles.pill, styles.xpPill]}>
              <Text style={styles.xpText}>⚡ {xpPoints} XP</Text>
            </View>
          )}
        </View>
      </View>

      {progressPercent !== undefined && (
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(100, Math.max(0, progressPercent))}%`,
                backgroundColor: progressBarColor,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 6,
    backgroundColor: zenColors.bgCream,
  },
  hudRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: zenSpacing.xs,
  },
  titleGroup: {
    marginLeft: zenSpacing.sm,
    flex: 1,
  },
  overline: {
    fontSize: 10,
    fontWeight: '700',
    color: zenColors.ochreAccent,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  rightPills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: zenRadius.pill,
    borderWidth: 1,
  },
  streakPill: {
    backgroundColor: zenColors.surfaceSand,
    borderColor: zenColors.borderWarm,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.terracotta,
  },
  comboPill: {
    backgroundColor: '#FFF2E6',
    borderColor: '#F3DEC2',
  },
  comboText: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.terracotta,
  },
  xpPill: {
    backgroundColor: zenColors.surfaceMint,
    borderColor: '#CBE5DF',
  },
  xpText: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.sageTeal,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#EBE2D7',
    borderRadius: zenRadius.pill,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: zenRadius.pill,
  },
});

export default SubHeaderHUD;
