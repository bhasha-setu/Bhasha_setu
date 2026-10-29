// src/components/dashboard/RiverCrossingTrail.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { zenColors, zenSpacing } from '@/theme/zenTheme';

export interface RiverCrossingTrailProps {
  currentStage?: number;
  totalStages?: number;
}

export const RiverCrossingTrail: React.FC<RiverCrossingTrailProps> = ({
  currentStage = 3,
  totalStages = 4,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.leftGroup}>
          <Text style={styles.pathIcon}>〰</Text>
          <Text style={styles.trailTitle}>The River Crossing Path</Text>
        </View>

        <Text style={styles.stageIndicator}>
          Stage {currentStage} of {totalStages}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: zenSpacing.xs,
    marginBottom: zenSpacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 4,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pathIcon: {
    fontSize: 18,
    color: zenColors.ochreAccent,
    fontWeight: '800',
  },
  trailTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: zenColors.espressoText,
  },
  stageIndicator: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.ochreAccent,
  },
});

export default RiverCrossingTrail;
