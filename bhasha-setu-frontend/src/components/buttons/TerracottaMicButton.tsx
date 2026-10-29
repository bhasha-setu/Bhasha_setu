// src/components/buttons/TerracottaMicButton.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { zenColors } from '@/theme/zenTheme';

export interface TerracottaMicButtonProps {
  size?: number;
  isListening?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const TerracottaMicButton: React.FC<TerracottaMicButtonProps> = ({
  size = 64,
  isListening = false,
  onPressIn,
  onPressOut,
  onPress,
  accessibilityLabel = 'Microphone button',
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(1)).current;
  const rippleOpacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (!isListening) {
      pulseAnim.setValue(1);
      rippleAnim.setValue(1);
      rippleOpacity.setValue(0);
      return;
    }

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.96,
          duration: 350,
          useNativeDriver: true,
        }),
      ])
    );

    const ripple = Animated.loop(
      Animated.parallel([
        Animated.timing(rippleAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    ripple.start();

    return () => {
      pulse.stop();
      ripple.stop();
    };
  }, [isListening]);

  const iconSize = Math.round(size * 0.45);

  return (
    <View style={[styles.outerWrapper, { width: size * 1.5, height: size * 1.5 }]}>
      {isListening && (
        <Animated.View
          style={[
            styles.rippleRing,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: [{ scale: rippleAnim }],
              opacity: rippleOpacity,
            },
          ]}
        />
      )}

      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity
          style={[
            styles.micCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            isListening && styles.micCircleActive,
          ]}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.88}
          accessibilityLabel={accessibilityLabel}
        >
          <Text style={[styles.micIcon, { fontSize: iconSize }]}>🎙️</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  rippleRing: {
    position: 'absolute',
    backgroundColor: zenColors.terracotta,
  },
  micCircle: {
    backgroundColor: zenColors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: zenColors.terracotta,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  micCircleActive: {
    backgroundColor: '#A85A12',
    borderWidth: 2,
    borderColor: '#F9D7B8',
  },
  micIcon: {
    textAlign: 'center',
  },
});

export default TerracottaMicButton;
