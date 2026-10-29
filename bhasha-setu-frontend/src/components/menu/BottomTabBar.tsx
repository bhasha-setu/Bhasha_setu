// src/components/menu/BottomTabBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export type BottomTabType = 'quest' | 'artifacts' | 'profile';

export interface BottomTabBarProps {
  activeTab?: BottomTabType;
  onTabPress?: (tab: BottomTabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab = 'quest',
  onTabPress,
}) => {
  const tabs: Array<{ id: BottomTabType; label: string; icon: string }> = [
    { id: 'quest', label: 'Quest Map', icon: '🧭' },
    { id: 'artifacts', label: 'Artifacts', icon: '✨' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onTabPress?.(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>
                {tab.icon}
              </Text>
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: zenSpacing.md,
    paddingBottom: zenSpacing.sm,
    backgroundColor: zenColors.bgCream,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FAF5EE',
    borderRadius: zenRadius.pill,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: zenRadius.pill,
  },
  activeTabButton: {
    backgroundColor: 'transparent',
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 2,
    opacity: 0.6,
  },
  activeTabIcon: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: zenColors.mutedBrown,
  },
  activeTabLabel: {
    color: zenColors.terracotta,
    fontWeight: '800',
  },
});

export default BottomTabBar;
