import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TopScreenBarProps {
  title: string;
  subtitle?: string;
  streak?: number;
  onBack?: () => void;
}

export const TopScreenBar: React.FC<TopScreenBarProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TopScreenBar: {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  text: { fontSize: 14 },
});

export default TopScreenBar;

