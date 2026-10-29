import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface BrandLogoBadgeProps {
  size?: number;
}

export interface SoundwaveBarsProps {
  size?: 'sm' | 'lg';
  isAnimating?: boolean;
}

export const SoundwaveBars: React.FC<SoundwaveBarsProps> = ({ size = 'sm' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SoundwaveBars ({size})</Text>
    </View>
  );
};

export const BrandLogoBadge: React.FC<BrandLogoBadgeProps> = ({ size = 40 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BrandLogoBadge ({size}px)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  text: { fontSize: 14 },
});

export default BrandLogoBadge;

