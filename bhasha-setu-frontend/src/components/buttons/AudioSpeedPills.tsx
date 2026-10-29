// src/components/buttons/AudioSpeedPills.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface AudioSpeedPillsProps {
  label?: string;
  duration?: string;
  tagLabel?: string;
  playbackSpeed?: 1.0 | 0.8 | 0.75;
  isPlaying?: boolean;
  onPlay?: () => void;
  onToggleSpeed?: (speed: 1.0 | 0.8 | 0.75) => void;
}

export const AudioSpeedPills: React.FC<AudioSpeedPillsProps> = ({
  label = 'Play melody',
  duration = '0:05',
  tagLabel,
  playbackSpeed = 0.75,
  isPlaying = false,
  onPlay,
  onToggleSpeed,
}) => {
  const speeds: Array<1.0 | 0.8 | 0.75> = [0.75, 0.8, 1.0];

  const handleNextSpeed = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    onToggleSpeed?.(speeds[nextIndex]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPills}>
        <TouchableOpacity
          style={[styles.playPill, isPlaying && styles.playPillActive]}
          onPress={onPlay}
          activeOpacity={0.8}
        >
          <Text style={styles.speakerIcon}>{isPlaying ? '⏸' : '🔊'}</Text>
          <Text style={styles.playText}>
            {label} ({duration})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.speedPill}
          onPress={handleNextSpeed}
          activeOpacity={0.8}
        >
          <Text style={styles.speedIcon}>🔄</Text>
          <Text style={styles.speedText}>{playbackSpeed}x</Text>
        </TouchableOpacity>
      </View>

      {tagLabel ? (
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{tagLabel}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: zenSpacing.sm,
  },
  leftPills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EBE1',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: zenRadius.pill,
    gap: 6,
  },
  playPillActive: {
    backgroundColor: '#EBE2D7',
  },
  speakerIcon: {
    fontSize: 14,
  },
  playText: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  speedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EBE1',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: zenRadius.pill,
    gap: 4,
  },
  speedIcon: {
    fontSize: 11,
  },
  speedText: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  tagBadge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: zenColors.sageTeal,
    letterSpacing: 0.6,
  },
});

export default AudioSpeedPills;
