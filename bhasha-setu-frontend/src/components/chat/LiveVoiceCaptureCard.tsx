import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface LiveVoiceCaptureCardProps {
  clarityPercent?: number;
  capturedText?: string;
  xpBonus?: number;
}

export const LiveVoiceCaptureCard: React.FC<LiveVoiceCaptureCardProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LiveVoiceCaptureCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default LiveVoiceCaptureCard;

