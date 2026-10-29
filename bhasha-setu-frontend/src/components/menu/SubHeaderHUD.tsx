import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface SubHeaderHUDProps {
  lessonTitle?: string;
  streakDays?: number;
  xpPoints?: number;
}

export const SubHeaderHUD: React.FC<SubHeaderHUDProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SubHeaderHUD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  text: { fontSize: 14 },
});

export default SubHeaderHUD;

