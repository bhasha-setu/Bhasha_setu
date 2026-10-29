import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TerracottaMicButtonProps {
  size?: number;
  isListening?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onPress?: () => void;
}

export const TerracottaMicButton: React.FC<TerracottaMicButtonProps> = ({ size = 64 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TerracottaMicButton ({size}px)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default TerracottaMicButton;

