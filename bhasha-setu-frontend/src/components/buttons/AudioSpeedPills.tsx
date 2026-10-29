import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface AudioSpeedPillsProps {
  duration?: string;
  playbackSpeed?: 1.0 | 0.8 | 0.75;
  onPlay?: () => void;
  onToggleSpeed?: (speed: 1.0 | 0.8 | 0.75) => void;
}

export const AudioSpeedPills: React.FC<AudioSpeedPillsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AudioSpeedPills</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default AudioSpeedPills;

