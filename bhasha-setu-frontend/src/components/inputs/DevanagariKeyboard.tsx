import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface DevanagariKeyboardProps {
  ctaLabel: string;
  onKeyPress: (ch: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onSubmit: () => void;
}

export const DevanagariKeyboard: React.FC<DevanagariKeyboardProps> = ({ ctaLabel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DevanagariKeyboard (CTA: {ctaLabel})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default DevanagariKeyboard;

