import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ActiveRecallHeroCardProps {
  unlockedArtifactCount?: number;
  totalArtifacts?: number;
}

export const ActiveRecallHeroCard: React.FC<ActiveRecallHeroCardProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ActiveRecallHeroCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default ActiveRecallHeroCard;

