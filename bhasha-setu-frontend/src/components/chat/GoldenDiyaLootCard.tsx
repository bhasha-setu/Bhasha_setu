import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface GoldenDiyaLootCardProps {
  culturalXp?: number;
  onShareMilestone?: () => void;
  onNextQuest?: () => void;
}

export const GoldenDiyaLootCard: React.FC<GoldenDiyaLootCardProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GoldenDiyaLootCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default GoldenDiyaLootCard;

