// src/components/inputs/ActiveDevanagariInput.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { zenColors, zenSpacing } from '@/theme/zenTheme';

export interface ActiveDevanagariInputProps {
  value: string;
  placeholder?: string;
  onBackspace?: () => void;
  onClear?: () => void;
  editable?: boolean;
}

export const ActiveDevanagariInput: React.FC<ActiveDevanagariInputProps> = ({
  value,
  placeholder = 'Type missing word...',
  onBackspace,
  onClear,
  editable = true,
}) => {
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!editable) return;
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();

    return () => blink.stop();
  }, [editable]);

  const hasValue = value.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <View style={styles.textRow}>
          {hasValue ? (
            <Text style={styles.typedText}>{value}</Text>
          ) : (
            <Text style={styles.placeholderText}>{placeholder}</Text>
          )}

          {editable && (
            <Animated.Text style={[styles.cursor, { opacity: cursorOpacity }]}>
              |
            </Animated.Text>
          )}
        </View>

        {hasValue && (onBackspace || onClear) && (
          <TouchableOpacity
            style={styles.backspaceButton}
            onPress={onBackspace || onClear}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backspaceIcon}>⌫</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FDF2E9',
    borderRadius: 14,
    paddingHorizontal: zenSpacing.md,
    height: 54,
    borderWidth: 1,
    borderColor: '#F3E4D6',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typedText: {
    fontSize: 20,
    fontWeight: '700',
    color: zenColors.espressoText,
    letterSpacing: 0.5,
  },
  placeholderText: {
    fontSize: 16,
    color: '#B3A195',
  },
  cursor: {
    fontSize: 20,
    fontWeight: '300',
    color: zenColors.ochreAccent,
    marginLeft: 2,
  },
  backspaceButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backspaceIcon: {
    fontSize: 18,
    color: zenColors.espressoText,
    fontWeight: '700',
  },
});

export default ActiveDevanagariInput;
