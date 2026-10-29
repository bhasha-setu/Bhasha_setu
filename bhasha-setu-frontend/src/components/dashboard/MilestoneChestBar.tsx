import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface MilestoneChestBarProps {
  currentXp?: number;
  targetXp?: number;
}

export const MilestoneChestBar: React.FC<MilestoneChestBarProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MilestoneChestBar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default MilestoneChestBar;

