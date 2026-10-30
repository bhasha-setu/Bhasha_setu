// src/app/_layout.tsx
// Root Layout for Bhasha Setu (भाषा सेतु)
// Provides a hyper-realistic flagship smartphone frame mockup, swipe gestures,
// and instant stateful screen switching like Duolingo.

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';
import { zenColors } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';

// Import Screen Views
import { SplashLoadingScreen } from '@/screens/SplashLoadingScreen';
import { QuestMapScreen } from '@/screens/QuestMapScreen';
import { BollywoodStudioScreen } from '@/screens/BollywoodStudioScreen';
import { CricketCommentaryScreen } from '@/screens/CricketCommentaryScreen';
import { StreetFoodMasterchefScreen } from '@/screens/StreetFoodMasterchefScreen';
import { DiwaliNaniBossScreen } from '@/screens/DiwaliNaniBossScreen';

type ScreenId =
  | 'splash'
  | 'quest-map'
  | 'bollywood-studio'
  | 'cricket-commentary'
  | 'street-food'
  | 'diwali-nani-boss';

interface ScreenNavOption {
  id: ScreenId;
  label: string;
  icon: string;
}

const SCREEN_NAV_OPTIONS: ScreenNavOption[] = [
  { id: 'splash', label: 'Splash', icon: '🚀' },
  { id: 'quest-map', label: 'Quest Map', icon: '🗺️' },
  { id: 'bollywood-studio', label: 'Bollywood', icon: '🎬' },
  { id: 'cricket-commentary', label: 'Cricket', icon: '🏏' },
  { id: 'street-food', label: 'Street Food', icon: '🍲' },
  { id: 'diwali-nani-boss', label: 'Nani Boss', icon: '🪔' },
];

const SCREEN_ORDER: ScreenId[] = [
  'splash',
  'quest-map',
  'bollywood-studio',
  'cricket-commentary',
  'street-food',
  'diwali-nani-boss',
];

export default function RootLayout() {
  const { width, height } = useWindowDimensions();
  const { xp, streak } = useFrontendStore();
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [currentTime, setCurrentTime] = useState('9:41');

  // Swipe touch tracking
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

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

  // Real smartphone dimensions (iPhone 16 Pro / Pixel 9 Pro 19.5:9 ratio)
  const PHONE_WIDTH = 393;
  const PHONE_HEIGHT = 844;
  const availableHeight = height - 90;
  const availableWidth = width - 40;
  const phoneScale = Math.min(
    1,
    Math.max(0.62, Math.min(availableHeight / PHONE_HEIGHT, availableWidth / PHONE_WIDTH))
  );

  // Navigation handlers
  const handleNavigate = (screen: string) => {
    const normalized = screen.replace(/^\//, '') as ScreenId;
    if (SCREEN_ORDER.includes(normalized)) {
      setCurrentScreen(normalized);
    } else {
      setCurrentScreen('quest-map');
    }
  };

  const handleNextScreen = () => {
    const currentIndex = SCREEN_ORDER.indexOf(currentScreen);
    if (currentIndex < SCREEN_ORDER.length - 1) {
      setCurrentScreen(SCREEN_ORDER[currentIndex + 1]);
    }
  };

  const handlePrevScreen = () => {
    const currentIndex = SCREEN_ORDER.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(SCREEN_ORDER[currentIndex - 1]);
    }
  };

  // Swipe gesture detection
  const handleTouchStart = (e: any) => {
    touchStartXRef.current = e.nativeEvent.pageX || e.nativeEvent.touches?.[0]?.pageX || 0;
    touchStartYRef.current = e.nativeEvent.pageY || e.nativeEvent.touches?.[0]?.pageY || 0;
  };

  const handleTouchEnd = (e: any) => {
    const touchEndX = e.nativeEvent.pageX || e.nativeEvent.changedTouches?.[0]?.pageX || 0;
    const touchEndY = e.nativeEvent.pageY || e.nativeEvent.changedTouches?.[0]?.pageY || 0;
    const diffX = touchEndX - touchStartXRef.current;
    const diffY = touchEndY - touchStartYRef.current;

    // Detect horizontal swipe if delta X is dominant
    if (Math.abs(diffX) > 65 && Math.abs(diffY) < 90) {
      if (diffX < 0) {
        // Swipe Left -> Next screen
        handleNextScreen();
      } else {
        // Swipe Right -> Prev screen
        handlePrevScreen();
      }
    }
  };

  // Render active screen component
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashLoadingScreen onNavigate={handleNavigate} />;
      case 'quest-map':
        return <QuestMapScreen onNavigate={handleNavigate} />;
      case 'bollywood-studio':
        return <BollywoodStudioScreen onNavigate={handleNavigate} />;
      case 'cricket-commentary':
        return <CricketCommentaryScreen onNavigate={handleNavigate} />;
      case 'street-food':
        return <StreetFoodMasterchefScreen onNavigate={handleNavigate} />;
      case 'diwali-nani-boss':
        return <DiwaliNaniBossScreen onNavigate={handleNavigate} />;
      default:
        return <QuestMapScreen onNavigate={handleNavigate} />;
    }
  };

  // Native mobile view: edge-to-edge
  if (!isWideWeb) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <View
          style={styles.mobileContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {renderCurrentScreen()}
        </View>
      </SafeAreaProvider>
    );
  }

  // Desktop Web: Centered inside flagship smartphone chassis mockup
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.desktopWorkspace}>
        {/* Top Control Bar */}
        <View style={styles.desktopHeader}>
          <View style={styles.headerBrandRow}>
            <View style={styles.headerLogoBadge}>
              <Text style={styles.headerLogoDevanagari}>अ</Text>
              <Text style={styles.headerLogoLatin}>A</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>भाषा सेतु • Bhasha Setu</Text>
              <Text style={styles.headerSubtitle}>
                Interactive Smartphone Mode • Click buttons or swipe like Duolingo
              </Text>
            </View>
          </View>

          {/* Screen Switcher Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.navPillsContainer}
          >
            {SCREEN_NAV_OPTIONS.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.navPill, isActive && styles.navPillActive]}
                  onPress={() => setCurrentScreen(item.id)}
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

          {/* User Stats Badge */}
          <View style={styles.headerStatsBadge}>
            <Text style={styles.headerStatsText}>
              🔥 {streak}d  •  ⭐ {xp} XP
            </Text>
          </View>
        </View>

        {/* Scaled Real Phone Chassis Stage */}
        <View style={styles.phoneStage}>
          <View
            style={[
              styles.phoneChassisContainer,
              {
                width: PHONE_WIDTH,
                height: PHONE_HEIGHT,
                transform: [{ scale: phoneScale }],
              },
            ]}
          >
            {/* External Hardware Physical Buttons */}
            {/* Left Edge: Action Button */}
            <View style={styles.hwActionButton} />
            {/* Left Edge: Volume Up */}
            <View style={styles.hwVolumeUpButton} />
            {/* Left Edge: Volume Down */}
            <View style={styles.hwVolumeDownButton} />
            {/* Right Edge: Power / Lock Button */}
            <View style={styles.hwPowerButton} />

            {/* Subtle Antenna Bands */}
            <View style={[styles.antennaBand, styles.antennaTopLeft]} />
            <View style={[styles.antennaBand, styles.antennaBottomLeft]} />
            <View style={[styles.antennaBand, styles.antennaTopRight]} />
            <View style={[styles.antennaBand, styles.antennaBottomRight]} />

            {/* Inner Phone Screen Display */}
            <View
              style={styles.phoneScreenBezel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Dynamic Island Capsule */}
              <View style={styles.dynamicIsland}>
                <View style={styles.cameraLens}>
                  <View style={styles.cameraLensIris} />
                </View>
                <View style={styles.sensorDot} />
              </View>

              {/* Native Status Bar Overlay */}
              <View style={styles.phoneStatusBar}>
                {/* Left: Time */}
                <Text style={styles.phoneStatusTime}>{currentTime}</Text>

                {/* Right: Signal, 5G, Wi-Fi, Battery */}
                <View style={styles.phoneStatusRight}>
                  {/* 4-Bar Cellular Signal */}
                  <View style={styles.cellularRow}>
                    <View style={[styles.signalBar, { height: 4 }]} />
                    <View style={[styles.signalBar, { height: 6 }]} />
                    <View style={[styles.signalBar, { height: 8 }]} />
                    <View style={[styles.signalBar, { height: 11 }]} />
                  </View>

                  <Text style={styles.status5G}>5G</Text>

                  {/* Sharp Vector Wi-Fi Arc Icon */}
                  <View style={styles.wifiIconWrapper}>
                    <Svg width={15} height={11} viewBox="0 0 16 12" fill="none">
                      <Path
                        d="M1 3.5C4.87 0.17 11.13 0.17 15 3.5M3.2 6C5.87 3.67 10.13 3.67 12.8 6M5.5 8.5C6.9 7.3 9.1 7.3 10.5 8.5"
                        stroke={zenColors.espressoText}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                      <Rect
                        x={7}
                        y={10.5}
                        width={2}
                        height={1.5}
                        rx={0.75}
                        fill={zenColors.espressoText}
                      />
                    </Svg>
                  </View>

                  {/* Realistic Battery Capsule */}
                  <View style={styles.batteryWrapper}>
                    <View style={styles.batteryBody}>
                      <View style={styles.batteryLevelFill} />
                    </View>
                    <View style={styles.batteryCap} />
                  </View>
                </View>
              </View>

              {/* Actual Active Screen with Safe Clearance */}
              <View style={styles.appViewportContainer}>
                {renderCurrentScreen()}
              </View>

              {/* In-App Floating Quick Nav Dock */}
              <View style={styles.inAppNavDock}>
                <TouchableOpacity
                  style={styles.navDockButton}
                  onPress={handlePrevScreen}
                  activeOpacity={0.7}
                >
                  <Text style={styles.navDockText}>◀ Prev</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.navDockButton, styles.navDockCenterButton]}
                  onPress={() => setCurrentScreen('quest-map')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.navDockCenterText}>🗺️ Quest Map</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.navDockButton}
                  onPress={handleNextScreen}
                  activeOpacity={0.7}
                >
                  <Text style={styles.navDockText}>Next ▶</Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Home Gesture Navigation Bar */}
              <View style={styles.homeBarContainer}>
                <View style={styles.homeBarPill} />
              </View>
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
    backgroundColor: '#090A0D',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  desktopHeader: {
    width: '100%',
    maxWidth: 960,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16171E',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#292A36',
    gap: 12,
    zIndex: 10,
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: zenColors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  headerLogoDevanagari: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  headerLogoLatin: {
    color: zenColors.ochreAccent,
    fontSize: 13,
    fontWeight: '800',
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F4F4F5',
  },
  headerSubtitle: {
    fontSize: 10,
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
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#22232E',
    gap: 5,
  },
  navPillActive: {
    backgroundColor: zenColors.sageTeal,
  },
  navPillIcon: {
    fontSize: 12,
  },
  navPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D4D4D8',
  },
  navPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  headerStatsBadge: {
    backgroundColor: '#22232E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#383A4A',
  },
  headerStatsText: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '700',
  },
  phoneStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  phoneChassisContainer: {
    position: 'relative',
    backgroundColor: '#1E2028',
    borderRadius: 54,
    borderWidth: 9,
    borderColor: '#292B36',
    boxShadow:
      '0 32px 100px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
    display: 'flex',
  },
  // Hardware side buttons
  hwActionButton: {
    position: 'absolute',
    left: -13,
    top: 115,
    width: 4.5,
    height: 28,
    borderRadius: 2.5,
    backgroundColor: '#353745',
    borderWidth: 1,
    borderColor: '#4D5063',
  },
  hwVolumeUpButton: {
    position: 'absolute',
    left: -13,
    top: 160,
    width: 4.5,
    height: 52,
    borderRadius: 2.5,
    backgroundColor: '#353745',
    borderWidth: 1,
    borderColor: '#4D5063',
  },
  hwVolumeDownButton: {
    position: 'absolute',
    left: -13,
    top: 226,
    width: 4.5,
    height: 52,
    borderRadius: 2.5,
    backgroundColor: '#353745',
    borderWidth: 1,
    borderColor: '#4D5063',
  },
  hwPowerButton: {
    position: 'absolute',
    right: -13,
    top: 175,
    width: 4.5,
    height: 74,
    borderRadius: 2.5,
    backgroundColor: '#353745',
    borderWidth: 1,
    borderColor: '#4D5063',
  },
  antennaBand: {
    position: 'absolute',
    width: 9,
    height: 2.5,
    backgroundColor: '#17181F',
  },
  antennaTopLeft: {
    left: -9,
    top: 75,
  },
  antennaBottomLeft: {
    left: -9,
    bottom: 75,
  },
  antennaTopRight: {
    right: -9,
    top: 75,
  },
  antennaBottomRight: {
    right: -9,
    bottom: 75,
  },
  phoneScreenBezel: {
    flex: 1,
    borderRadius: 44,
    backgroundColor: zenColors.bgCream,
    overflow: 'hidden',
    position: 'relative',
  },
  // Dynamic Island
  dynamicIsland: {
    position: 'absolute',
    top: 10,
    left: '50%',
    marginLeft: -62,
    width: 124,
    height: 33,
    borderRadius: 20,
    backgroundColor: '#000000',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  cameraLens: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#090B10',
    borderWidth: 1,
    borderColor: '#181E2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraLensIris: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1E2C48',
  },
  sensorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#081713',
  },
  // Status Bar
  phoneStatusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 46,
    zIndex: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  phoneStatusTime: {
    fontSize: 14,
    fontWeight: '700',
    color: zenColors.espressoText,
    letterSpacing: -0.2,
  },
  phoneStatusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cellularRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 11,
  },
  signalBar: {
    width: 2.5,
    backgroundColor: zenColors.espressoText,
    borderRadius: 0.8,
  },
  status5G: {
    fontSize: 10,
    fontWeight: '800',
    color: zenColors.espressoText,
    letterSpacing: 0.2,
  },
  wifiIconWrapper: {
    width: 15,
    height: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  batteryBody: {
    width: 24,
    height: 12,
    borderRadius: 3.5,
    borderWidth: 1.5,
    borderColor: zenColors.espressoText,
    padding: 1.5,
    justifyContent: 'center',
  },
  batteryLevelFill: {
    width: '80%',
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 1.2,
  },
  batteryCap: {
    width: 2,
    height: 5,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: zenColors.espressoText,
    marginLeft: 1,
  },
  appViewportContainer: {
    flex: 1,
    paddingTop: 42, // Safe clearance below Dynamic Island
    paddingBottom: 40,
  },
  inAppNavDock: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    zIndex: 95,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  navDockButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  navDockCenterButton: {
    backgroundColor: zenColors.surfaceSand,
  },
  navDockText: {
    fontSize: 11,
    fontWeight: '600',
    color: zenColors.mutedBrown,
  },
  navDockCenterText: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.terracotta,
  },
  homeBarContainer: {
    position: 'absolute',
    bottom: 4,
    left: '50%',
    marginLeft: -67,
    width: 134,
    height: 5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  homeBarPill: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#2C1A0E',
    opacity: 0.35,
  },
});
