// src/app/_layout.tsx
// Root Layout for Bhasha Setu (भाषा सेतु)
// Provides responsive native mobile frame on desktop web and edge-to-edge native on mobile

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { zenColors } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';

interface ScreenNavOption {
  path: string;
  label: string;
  icon: string;
}

const SCREEN_NAV_OPTIONS: ScreenNavOption[] = [
  { path: '/', label: 'Splash', icon: '🚀' },
  { path: '/quest-map', label: 'Quest Map', icon: '🗺️' },
  { path: '/bollywood-studio', label: 'Bollywood', icon: '🎬' },
  { path: '/cricket-commentary', label: 'Cricket', icon: '🏏' },
  { path: '/street-food', label: 'Street Food', icon: '🍲' },
  { path: '/diwali-nani-boss', label: 'Nani Boss', icon: '🪔' },
];

export default function RootLayout() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();
  const { xp, streak } = useFrontendStore();

  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const isWideWeb = Platform.OS === 'web' && width > 540;
  const phoneMaxHeight = Math.min(860, Math.max(620, height - 96));

  // Render pure stack on mobile or small screens
  const renderStack = () => (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: zenColors.bgCream },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="quest-map" />
      <Stack.Screen name="bollywood-studio" />
      <Stack.Screen name="cricket-commentary" />
      <Stack.Screen name="street-food" />
      <Stack.Screen name="diwali-nani-boss" />
    </Stack>
  );

  if (!isWideWeb) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <View style={styles.mobileContainer}>{renderStack()}</View>
      </SafeAreaProvider>
    );
  }

  // Desktop Web: Center in an authentic smartphone device mockup frame
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.desktopWorkspace}>
        {/* Desktop Presentation Header */}
        <View style={styles.desktopHeader}>
          <View style={styles.headerBrandRow}>
            <View style={styles.headerLogoBadge}>
              <Text style={styles.headerLogoDevanagari}>अ</Text>
              <Text style={styles.headerLogoLatin}>A</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>भाषा सेतु • Bhasha Setu</Text>
              <Text style={styles.headerSubtitle}>
                Live Native Mobile Preview • 100% Active Recall
              </Text>
            </View>
          </View>

          {/* Quick Screen Switcher Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.navPillsContainer}
          >
            {SCREEN_NAV_OPTIONS.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path === '/' && (pathname === '' || pathname === '/index'));
              return (
                <TouchableOpacity
                  key={item.path}
                  style={[styles.navPill, isActive && styles.navPillActive]}
                  onPress={() => router.replace(item.path as any)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.navPillIcon}>{item.icon}</Text>
                  <Text
                    style={[styles.navPillText, isActive && styles.navPillTextActive]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* User Stats Pill */}
          <View style={styles.headerStatsBadge}>
            <Text style={styles.headerStatsText}>
              🔥 {streak}d  •  ⭐ {xp} XP
            </Text>
          </View>
        </View>

        {/* Central Phone Mockup Area */}
        <View style={styles.phoneChassisWrapper}>
          <View style={[styles.phoneOuterChassis, { maxHeight: phoneMaxHeight }]}>
            {/* Top Phone Speaker / Punch Hole Bezel */}
            <View style={styles.phoneBezelTop}>
              {/* Left: Time */}
              <Text style={styles.phoneStatusTime}>{currentTime}</Text>

              {/* Dynamic Island / Camera Punch Hole */}
              <View style={styles.dynamicIsland}>
                <View style={styles.cameraLens} />
                <View style={styles.sensorDot} />
              </View>

              {/* Right: Phone Status Icons */}
              <View style={styles.phoneStatusIcons}>
                <Text style={styles.phoneStatusIconText}>5G</Text>
                <Text style={styles.phoneStatusIconText}>􀙇</Text>
                <View style={styles.batteryIcon}>
                  <View style={styles.batteryFill} />
                </View>
              </View>
            </View>

            {/* Inner Phone Screen Content */}
            <View style={styles.phoneInnerScreen}>{renderStack()}</View>

            {/* Bottom Home Indicator Bar */}
            <View style={styles.phoneHomeBarContainer}>
              <View style={styles.phoneHomeBar} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    backgroundColor: zenColors.bgCream,
  },
  desktopWorkspace: {
    flex: 1,
    backgroundColor: '#0F0F12',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  desktopHeader: {
    width: '100%',
    maxWidth: 960,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C22',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E2E38',
    gap: 12,
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: zenColors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  headerLogoDevanagari: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  headerLogoLatin: {
    color: zenColors.ochreAccent,
    fontSize: 14,
    fontWeight: '800',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F4F4F5',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#A1A1AA',
  },
  navPillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#272730',
    gap: 5,
  },
  navPillActive: {
    backgroundColor: zenColors.sageTeal,
  },
  navPillIcon: {
    fontSize: 12,
  },
  navPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4D4D8',
  },
  navPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  headerStatsBadge: {
    backgroundColor: '#272730',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3F3F4E',
  },
  headerStatsText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  phoneChassisWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  phoneOuterChassis: {
    width: 412,
    height: '100%',
    maxHeight: 860,
    backgroundColor: '#1E1E24',
    borderRadius: 48,
    borderWidth: 10,
    borderColor: '#2B2B34',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.6,
    shadowRadius: 36,
    elevation: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  phoneBezelTop: {
    height: 38,
    backgroundColor: zenColors.bgCream,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  phoneStatusTime: {
    fontSize: 13,
    fontWeight: '700',
    color: zenColors.espressoText,
    width: 50,
  },
  dynamicIsland: {
    width: 90,
    height: 20,
    backgroundColor: '#000000',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cameraLens: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  sensorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0D9488',
  },
  phoneStatusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 50,
    justifyContent: 'flex-end',
  },
  phoneStatusIconText: {
    fontSize: 10,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  batteryIcon: {
    width: 18,
    height: 10,
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: zenColors.espressoText,
    padding: 1,
    justifyContent: 'center',
  },
  batteryFill: {
    width: '80%',
    height: '100%',
    backgroundColor: zenColors.sageTeal,
    borderRadius: 1,
  },
  phoneInnerScreen: {
    flex: 1,
    backgroundColor: zenColors.bgCream,
    overflow: 'hidden',
  },
  phoneHomeBarContainer: {
    height: 16,
    backgroundColor: zenColors.bgCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneHomeBar: {
    width: 134,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
});
