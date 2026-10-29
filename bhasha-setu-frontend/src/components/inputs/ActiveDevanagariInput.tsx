import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ActiveDevanagariInputProps {
  value: string;
  placeholder?: string;
  onBackspace?: () => void;
  editable?: boolean;
}

export const ActiveDevanagariInput: React.FC<ActiveDevanagariInputProps> = ({ value, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ActiveDevanagariInput: {value || placeholder || 'Type...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default ActiveDevanagariInput;

