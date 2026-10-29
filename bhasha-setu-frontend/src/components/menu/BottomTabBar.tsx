import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface BottomTabBarProps {
  activeTab?: 'quest' | 'artifacts' | 'profile';
  onTabPress?: (tab: 'quest' | 'artifacts' | 'profile') => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BottomTabBar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  text: { fontSize: 14 },
});

export default BottomTabBar;

