import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface QuestNodeCardProps {
  level: number;
  title: string;
  subtitle: string;
  status: 'mastered' | 'active' | 'locked';
  xp?: number;
  stars?: number;
  onPress?: () => void;
}

export const QuestNodeCard: React.FC<QuestNodeCardProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>QuestNodeCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default QuestNodeCard;

