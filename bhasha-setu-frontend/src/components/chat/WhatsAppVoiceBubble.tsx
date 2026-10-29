import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface WhatsAppVoiceBubbleProps {
  sender: 'nani' | 'user';
  duration: string;
  hindiText: string;
  englishSubtext: string;
  fluencyScore?: number;
  respectWord?: string;
  timestamp: string;
}

export const WhatsAppVoiceBubble: React.FC<WhatsAppVoiceBubbleProps> = ({
  sender,
  hindiText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>WhatsAppVoiceBubble [{sender}]: {hindiText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  text: { fontSize: 14 },
});

export default WhatsAppVoiceBubble;

