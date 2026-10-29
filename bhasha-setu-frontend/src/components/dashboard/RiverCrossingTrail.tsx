import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface RiverCrossingTrailProps {
  currentStage?: number;
  totalStages?: number;
}

export const RiverCrossingTrail: React.FC<RiverCrossingTrailProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RiverCrossingTrail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default RiverCrossingTrail;

