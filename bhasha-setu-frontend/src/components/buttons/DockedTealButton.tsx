// src/components/buttons/DockedTealButton.tsx
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface DockedTealButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const DockedTealButton: React.FC<DockedTealButtonProps> = ({
  label,
  onPress,
  disabled = false,
  isLoading = false,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.82}
    >
      {isLoading ? (
        <ActivityIndicator color={zenColors.cardWhite} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, disabled && styles.disabledLabel]}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: zenColors.sageTeal,
    paddingVertical: 14,
    paddingHorizontal: zenSpacing.xl,
    borderRadius: zenRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: zenSpacing.xs,
    shadowColor: zenColors.sageTeal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#B5D1CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    color: zenColors.cardWhite,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  disabledLabel: {
    color: '#E0EDE9',
  },
});

export default DockedTealButton;
