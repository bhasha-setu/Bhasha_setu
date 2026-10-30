// src/screens/SplashLoadingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { SoundwaveBars } from '@/components/menu/BrandLogoBadge';

export interface SplashLoadingScreenProps {
  onNavigate?: (screen: string) => void;
}

export const SplashLoadingScreen: React.FC<SplashLoadingScreenProps> = ({ onNavigate }) => {
  const router = useRouter();
  const [progress, setProgress] = useState(15);
  const progressAnim = React.useRef(new Animated.Value(15)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = Math.min(100, prev + Math.floor(Math.random() * 18 + 12));
        Animated.timing(progressAnim, {
          toValue: next,
          duration: 250,
          useNativeDriver: false,
        }).start();
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        if (onNavigate) {
          onNavigate('quest-map');
        } else {
          router.replace('/quest-map');
        }
      }, 450);
      return () => clearTimeout(timeout);
    }
  }, [progress, router, onNavigate]);

  const handleStartNow = () => {
    if (onNavigate) {
      onNavigate('quest-map');
    } else {
      router.replace('/quest-map');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Centered Hero Content */}
        <View style={styles.centerWrapper}>
          {/* Central Elevated Circle (190px x 190px) */}
          <View style={styles.heroCircle}>
            <View style={styles.logoMarkRow}>
              <Text style={styles.devanagariA}>अ</Text>
              <View style={styles.archBridge}>
                <View style={styles.archBridgeCurve} />
              </View>
              <Text style={styles.latinA}>A</Text>
            </View>

            <View style={styles.soundwaveInCircle}>
              <SoundwaveBars size="lg" isAnimating={true} colorMode="dual" />
            </View>

            <Text style={styles.bridgeSubtext}>सेतु • BHASHA SETU</Text>
          </View>

          {/* Dual-Tone Headings */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>
              <Text style={styles.hindiTitle}>भाषा सेतु</Text>
              <Text style={styles.dotDivider}> • </Text>
              <Text style={styles.englishTitle}>Bhasha Setu</Text>
            </Text>
            <Text style={styles.subtitle}>The Language Bridge</Text>
            <Text style={styles.tagline}>Connecting Script to Spontaneous Speech</Text>
          </View>
        </View>

        {/* Bottom Loading Card */}
        <View style={styles.bottomCard}>
          <View style={styles.loadingStatusRow}>
            <View style={styles.statusLeft}>
              <ActivityIndicator size="small" color={zenColors.ochreAccent} />
              <Text style={styles.statusLabel}>Ready to speak!</Text>
            </View>
            <Text style={styles.percentageText}>{progress}%</Text>
          </View>

          {/* Gradient-like Progress Bar */}
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>

          {/* Quick Start / Skip Action */}
          <TouchableOpacity
            style={styles.startNowButton}
            onPress={handleStartNow}
            activeOpacity={0.8}
          >
            <Text style={styles.startNowText}>
              {progress >= 100 ? 'Enter Quest Map →' : 'Skip loading →'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: zenColors.bgCream,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: zenSpacing.lg,
    paddingTop: 16,
    paddingBottom: zenSpacing.lg,
  },
  centerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: zenSpacing.md,
  },
  heroCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: zenColors.cardWhite,
    borderWidth: 5,
    borderColor: '#F1E6D8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
    padding: zenSpacing.md,
  },
  logoMarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  devanagariA: {
    fontSize: 52,
    fontWeight: '800',
    color: zenColors.ochreAccent,
  },
  archBridge: {
    width: 26,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginBottom: 6,
  },
  archBridgeCurve: {
    width: 22,
    height: 10,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderTopWidth: 3.5,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: zenColors.ochreAccent,
  },
  latinA: {
    fontSize: 52,
    fontWeight: '800',
    color: zenColors.sageTeal,
  },
  soundwaveInCircle: {
    marginVertical: 4,
  },
  bridgeSubtext: {
    fontSize: 10,
    fontWeight: '700',
    color: zenColors.espressoText,
    letterSpacing: 1.5,
    marginTop: 4,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: zenSpacing.md,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  hindiTitle: {
    color: zenColors.espressoText,
  },
  dotDivider: {
    color: zenColors.borderWarm,
  },
  englishTitle: {
    color: zenColors.ochreAccent,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: zenColors.sageTeal,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: zenColors.mutedBrown,
    textAlign: 'center',
    fontWeight: '500',
  },
  largeSoundwaveContainer: {
    marginVertical: zenSpacing.sm,
    paddingVertical: zenSpacing.sm,
  },
  bottomCard: {
    width: '100%',
    backgroundColor: '#F3ECE2',
    borderRadius: zenRadius.lg,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  loadingStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: zenSpacing.sm,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '800',
    color: zenColors.ochreAccent,
  },
  progressTrack: {
    height: 8,
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.pill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    marginBottom: zenSpacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: zenColors.sageTeal,
    borderRadius: zenRadius.pill,
  },
  startNowButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  startNowText: {
    fontSize: 12,
    fontWeight: '600',
    color: zenColors.mutedBrown,
  },
});

export default SplashLoadingScreen;
