// src/components/dashboard/QuestNodeCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { DockedTealButton } from '@/components/buttons/DockedTealButton';

export type QuestStatus = 'mastered' | 'active' | 'locked';

export interface QuestNodeCardProps {
  levelNumber?: number | string;
  status: QuestStatus;
  title: string;
  subtitle: string;
  tagOverline?: string;
  stars?: number;
  xpReward?: number;
  ctaLabel?: string;
  isIndented?: boolean;
  icon?: string;
  onPress?: () => void;
}

export const QuestNodeCard: React.FC<QuestNodeCardProps> = ({
  status,
  title,
  subtitle,
  tagOverline,
  stars = 3,
  xpReward,
  ctaLabel,
  isIndented = false,
  icon,
  onPress,
}) => {
  const isMastered = status === 'mastered';
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  const defaultIcon = isMastered
    ? icon || '🎬'
    : isActive
    ? icon || '🍲'
    : icon || '🔒';

  return (
    <View
      style={[
        styles.cardOuter,
        isIndented && styles.cardIndented,
        isActive && styles.activeCardBorder,
        isLocked && styles.lockedCard,
      ]}
    >
      <TouchableOpacity
        style={styles.cardInner}
        onPress={onPress}
        disabled={isLocked && !onPress}
        activeOpacity={0.85}
      >
        <View style={styles.contentRow}>
          <View style={styles.iconCircleWrapper}>
            <View
              style={[
                styles.iconCircle,
                isActive && styles.iconCircleActive,
                isMastered && styles.iconCircleMastered,
                isLocked && styles.iconCircleLocked,
              ]}
            >
              <Text style={styles.nodeIcon}>{defaultIcon}</Text>
            </View>
            {isActive && <View style={styles.activeDot} />}
          </View>

          <View style={styles.detailsColumn}>
            <View style={styles.topRow}>
              <Text
                style={[
                  styles.overline,
                  isActive && styles.activeOverline,
                  isMastered && styles.masteredOverline,
                  isLocked && styles.lockedOverline,
                ]}
              >
                {tagOverline || (isMastered ? 'LEVEL - MASTERED' : isActive ? 'ACTIVE QUEST - NOW PLAYING' : 'BOSS QUEST - FINAL BRIDGE')}
              </Text>

              {isMastered && (
                <View style={styles.starsRow}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <Text key={i} style={styles.goldStar}>
                      ★
                    </Text>
                  ))}
                </View>
              )}

              {isActive && xpReward !== undefined && (
                <View style={styles.activeXpPill}>
                  <Text style={styles.activeXpText}>+{xpReward} XP</Text>
                </View>
              )}

              {isLocked && (
                <View style={styles.lockedPill}>
                  <Text style={styles.lockedText}>🔒 Locked</Text>
                </View>
              )}
            </View>

            <Text style={[styles.title, isLocked && styles.lockedTitle]}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        {isActive && (
          <View style={styles.ctaWrapper}>
            <DockedTealButton
              label={ctaLabel || `Play Quest • +${xpReward || 50} XP →`}
              onPress={onPress || (() => {})}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.lg,
    borderWidth: 1.5,
    borderColor: zenColors.borderWarm,
    marginBottom: zenSpacing.md,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  cardIndented: {
    marginLeft: 36,
  },
  activeCardBorder: {
    borderColor: zenColors.sageTeal,
    borderWidth: 2,
    shadowColor: zenColors.sageTeal,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  lockedCard: {
    backgroundColor: '#FAF5EE',
    borderColor: '#EFE7DC',
    opacity: 0.88,
  },
  cardInner: {
    padding: zenSpacing.md,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconCircleWrapper: {
    position: 'relative',
    marginRight: zenSpacing.sm,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: zenColors.surfaceSand,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  iconCircleActive: {
    backgroundColor: '#FDEEE0',
    borderColor: '#F3DEC2',
  },
  iconCircleMastered: {
    backgroundColor: '#F3EFE9',
  },
  iconCircleLocked: {
    backgroundColor: '#EBE5DE',
  },
  nodeIcon: {
    fontSize: 22,
  },
  activeDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: zenColors.sageTeal,
    borderWidth: 2,
    borderColor: zenColors.cardWhite,
  },
  detailsColumn: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  overline: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  masteredOverline: {
    color: '#3B9B8E',
  },
  activeOverline: {
    color: zenColors.ochreAccent,
  },
  lockedOverline: {
    color: zenColors.mutedBrown,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  goldStar: {
    fontSize: 12,
    color: zenColors.goldStar,
  },
  activeXpPill: {
    backgroundColor: zenColors.surfaceMint,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: zenRadius.pill,
  },
  activeXpText: {
    fontSize: 11,
    fontWeight: '800',
    color: zenColors.sageTeal,
  },
  lockedPill: {
    backgroundColor: zenColors.surfaceSand,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: zenRadius.pill,
  },
  lockedText: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.mutedBrown,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: zenColors.espressoText,
    marginBottom: 2,
  },
  lockedTitle: {
    color: '#554236',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: zenColors.mutedBrown,
  },
  ctaWrapper: {
    marginTop: zenSpacing.md,
  },
});

export default QuestNodeCard;
