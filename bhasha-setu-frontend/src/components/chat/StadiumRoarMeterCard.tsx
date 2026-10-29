import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface StadiumRoarMeterCardProps {
  decibelPercent: number;
}

export const StadiumRoarMeterCard: React.FC<StadiumRoarMeterCardProps> = ({ decibelPercent }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>StadiumRoarMeterCard ({decibelPercent}%)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default StadiumRoarMeterCard;

