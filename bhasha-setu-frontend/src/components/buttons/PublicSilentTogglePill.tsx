// src/components/buttons/PublicSilentTogglePill.tsx
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface PublicSilentTogglePillProps {
  isSilentMode?: boolean;
  onToggle?: () => void;
}

export const PublicSilentTogglePill: React.FC<PublicSilentTogglePillProps> = ({
  isSilentMode = false,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.pillContainer,
        isSilentMode && styles.pillActive,
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Text style={styles.pillIcon}>{isSilentMode ? '🎙️' : '⌨️'}</Text>
      <Text style={[styles.pillText, isSilentMode && styles.pillTextActive]}>
        {isSilentMode
          ? 'Switch back to Spoken Drill'
          : "Can't speak right now? Type instead"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: zenColors.cardWhite,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    borderRadius: zenRadius.pill,
    paddingVertical: 9,
    paddingHorizontal: zenSpacing.md,
    gap: 6,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  pillActive: {
    backgroundColor: zenColors.surfaceMint,
    borderColor: zenColors.sageTeal,
  },
  pillIcon: {
    fontSize: 14,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: zenColors.mutedBrown,
  },
  pillTextActive: {
    color: zenColors.sageTeal,
    fontWeight: '700',
  },
});

export default PublicSilentTogglePill;
