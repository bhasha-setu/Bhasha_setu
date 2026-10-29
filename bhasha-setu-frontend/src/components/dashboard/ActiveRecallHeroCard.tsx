// src/components/dashboard/ActiveRecallHeroCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface ArtifactItem {
  id: string;
  name: string;
  icon: string;
  isUnlocked: boolean;
}

export interface ActiveRecallHeroCardProps {
  unlockedArtifactIds?: string[];
}

export const ActiveRecallHeroCard: React.FC<ActiveRecallHeroCardProps> = ({
  unlockedArtifactIds = ['vintage-mic', 'cricket-ball', 'chai-kulhad'],
}) => {
  const artifacts: ArtifactItem[] = [
    {
      id: 'vintage-mic',
      name: 'Vintage Mic',
      icon: '🎙️',
      isUnlocked: unlockedArtifactIds.includes('vintage-mic'),
    },
    {
      id: 'cricket-ball',
      name: 'Cricket Ball',
      icon: '🏏',
      isUnlocked: unlockedArtifactIds.includes('cricket-ball'),
    },
    {
      id: 'chai-kulhad',
      name: 'Chai Kulhad',
      icon: '☕',
      isUnlocked: unlockedArtifactIds.includes('chai-kulhad'),
    },
    {
      id: 'golden-diya',
      name: 'Golden Diya',
      icon: '🪔',
      isUnlocked: unlockedArtifactIds.includes('golden-diya'),
    },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badgeRow}>
          <Text style={styles.badgeDot}>●</Text>
          <Text style={styles.badgeText}>100% ACTIVE RECALL</Text>
        </View>

        <View style={styles.trophyIconBox}>
          <Text style={styles.trophyIcon}>🔔</Text>
        </View>
      </View>

      <Text style={styles.bodyCopy}>
        Bridge from script to spontaneous speech. Craft complete Hindi thoughts natively.
      </Text>

      <View style={styles.shelfContainer}>
        <View style={styles.artifactRow}>
          {artifacts.map((item) => (
            <View key={item.id} style={styles.artifactColumn}>
              <View style={styles.iconCircle}>
                <Text style={styles.artifactIcon}>{item.icon}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    item.isUnlocked ? styles.statusBadgeCheck : styles.statusBadgeLock,
                  ]}
                >
                  <Text style={styles.statusBadgeText}>
                    {item.isUnlocked ? '✓' : '🔒'}
                  </Text>
                </View>
              </View>
              <Text style={styles.artifactName}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: zenSpacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeDot: {
    fontSize: 10,
    color: zenColors.sageTeal,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: zenColors.sageTeal,
    letterSpacing: 0.5,
  },
  trophyIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: zenColors.surfaceSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyIcon: {
    fontSize: 14,
  },
  bodyCopy: {
    fontSize: 13,
    lineHeight: 18,
    color: '#4A3B32',
    marginBottom: zenSpacing.md,
  },
  shelfContainer: {
    backgroundColor: '#F5EBE1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  artifactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artifactColumn: {
    flex: 1,
    alignItems: 'center',
  },
  iconCircle: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: zenColors.cardWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  artifactIcon: {
    fontSize: 22,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: zenColors.cardWhite,
  },
  statusBadgeCheck: {
    backgroundColor: '#27AE60',
  },
  statusBadgeLock: {
    backgroundColor: '#7A6455',
  },
  statusBadgeText: {
    fontSize: 9,
    color: zenColors.cardWhite,
    fontWeight: '800',
  },
  artifactName: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.espressoText,
    textAlign: 'center',
  },
});

export default ActiveRecallHeroCard;
