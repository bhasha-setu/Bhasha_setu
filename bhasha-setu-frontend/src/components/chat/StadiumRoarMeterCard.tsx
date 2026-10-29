// src/components/chat/StadiumRoarMeterCard.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface StadiumRoarMeterCardProps {
  decibelPercent: number;
}

export const StadiumRoarMeterCard: React.FC<StadiumRoarMeterCardProps> = ({
  decibelPercent = 92,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: Math.min(100, Math.max(0, decibelPercent)),
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [decibelPercent]);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.meterIcon}>📊</Text>
          <Text style={styles.title}>Stadium Roar Meter</Text>
        </View>

        <Text style={styles.percentText}>{decibelPercent}% Wankhede Decibels</Text>
      </View>

      <View style={styles.track}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={['#C46215', '#3B9B8E']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientFill}
          />
        </Animated.View>
      </View>

      <View style={styles.labelsRow}>
        <Text style={styles.labelGully}>Gully Whispers</Text>
        <Text style={styles.labelDecibels}>Match-Winning Decibels 🔥</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAF5EE',
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    padding: zenSpacing.md,
    marginVertical: zenSpacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meterIcon: {
    fontSize: 16,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: zenColors.espressoText,
  },
  percentText: {
    fontSize: 13,
    fontWeight: '800',
    color: zenColors.ochreAccent,
  },
  track: {
    height: 10,
    backgroundColor: '#EBE2D7',
    borderRadius: zenRadius.pill,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 4,
  },
  animatedContainer: {
    height: '100%',
    borderRadius: zenRadius.pill,
  },
  gradientFill: {
    width: '100%',
    height: '100%',
    borderRadius: zenRadius.pill,
  },
  labelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  labelGully: {
    fontSize: 11,
    fontWeight: '500',
    color: zenColors.mutedBrown,
  },
  labelDecibels: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.ochreAccent,
  },
});

export default StadiumRoarMeterCard;
