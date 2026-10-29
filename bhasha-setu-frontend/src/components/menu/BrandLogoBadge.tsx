// src/components/menu/BrandLogoBadge.tsx
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { zenColors } from '@/theme/zenTheme';

export interface SoundwaveBarsProps {
  size?: 'sm' | 'lg';
  isAnimating?: boolean;
  barHeights?: number[];
  colorMode?: 'dual' | 'teal' | 'terracotta';
}

export const SoundwaveBars: React.FC<SoundwaveBarsProps> = ({
  size = 'sm',
  isAnimating = false,
  barHeights,
  colorMode = 'dual',
}) => {
  const isLarge = size === 'lg';
  const maxHeight = isLarge ? 38 : 18;
  const barWidth = isLarge ? 5 : 3;
  const barGap = isLarge ? 5 : 3;
  const minHeight = isLarge ? 8 : 4;

  const defaultScales = [0.35, 0.65, 0.95, 1.0, 0.85, 0.55, 0.4];
  const animValues = useRef(defaultScales.map((val) => new Animated.Value(val))).current;

  useEffect(() => {
    if (!isAnimating) {
      animValues.forEach((val, idx) => {
        val.setValue(barHeights && barHeights[idx] !== undefined ? barHeights[idx] : defaultScales[idx]);
      });
      return;
    }

    const loops = animValues.map((anim, i) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.25 + Math.random() * 0.75,
            duration: 260 + i * 80,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0.2 + (i % 3) * 0.25,
            duration: 220 + i * 60,
            useNativeDriver: false,
          }),
        ])
      );
    });

    loops.forEach((loop) => loop.start());

    return () => {
      loops.forEach((loop) => loop.stop());
    };
  }, [isAnimating, barHeights]);

  const getBarColor = (index: number) => {
    if (colorMode === 'teal') return zenColors.sageTeal;
    if (colorMode === 'terracotta') return zenColors.terracotta;
    // 7-bar gradient: Terracotta/Ochre -> Sage-Teal matching brand bridge
    const colors = [
      '#C46215',
      '#B85D19',
      '#985116',
      '#2C1A0E',
      '#3B7F78',
      '#3B9B8E',
      '#45B2A4',
    ];
    return colors[index % colors.length];
  };

  return (
    <View style={[styles.soundwaveContainer, { gap: barGap, height: maxHeight }]}>
      {animValues.map((anim, index) => {
        const height = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [minHeight, maxHeight],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.soundwaveBar,
              {
                width: barWidth,
                height,
                backgroundColor: getBarColor(index),
                borderRadius: barWidth / 2,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export interface BrandLogoBadgeProps {
  size?: number;
  showWave?: boolean;
}

export const BrandLogoBadge: React.FC<BrandLogoBadgeProps> = ({ size = 40 }) => {
  return (
    <View
      style={[
        styles.badgeContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Image
        source={require('@/assets/images/logo-circle-badge.png')}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: zenColors.cardWhite,
    borderWidth: 1.5,
    borderColor: zenColors.borderWarm,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  soundwaveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundwaveBar: {
    alignSelf: 'center',
  },
});

export default BrandLogoBadge;
