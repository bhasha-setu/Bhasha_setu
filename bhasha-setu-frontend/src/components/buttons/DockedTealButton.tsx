import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface DockedTealButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const DockedTealButton: React.FC<DockedTealButtonProps> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DockedTealButton: {label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default DockedTealButton;

