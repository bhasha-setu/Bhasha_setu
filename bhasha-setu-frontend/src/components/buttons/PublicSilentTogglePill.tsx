import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface PublicSilentTogglePillProps {
  isSilentMode?: boolean;
  onToggle?: () => void;
}

export const PublicSilentTogglePill: React.FC<PublicSilentTogglePillProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PublicSilentTogglePill</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  text: { fontSize: 14 },
});

export default PublicSilentTogglePill;

