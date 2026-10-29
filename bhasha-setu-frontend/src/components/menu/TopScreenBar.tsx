// src/components/menu/TopScreenBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface TopScreenBarProps {
  title: string;
  subtitle?: string;
  streak?: number;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  rightIconType?: 'streak' | 'profile' | 'clipboard' | 'none';
}

export const TopScreenBar: React.FC<TopScreenBarProps> = ({
  title,
  subtitle,
  streak,
  showBack = true,
  onBack,
  rightElement,
  rightIconType,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const renderRight = () => {
    if (rightElement) return rightElement;

    if (rightIconType === 'streak' || (streak !== undefined && !rightIconType)) {
      return (
        <View style={styles.streakPill}>
          <Text style={styles.streakText}>🔥 {streak ?? 7}</Text>
        </View>
      );
    }

    if (rightIconType === 'clipboard') {
      return (
        <View style={styles.iconCircle}>
          <Text style={styles.clipboardIcon}>📋</Text>
        </View>
      );
    }

    if (rightIconType === 'profile') {
      return (
        <View style={styles.profileCircle}>
          <Image
            source={require('@/assets/images/logo-circle-badge.png')}
            style={styles.profileImage}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.logoBadgeContainer}>
            <Image
              source={require('@/assets/images/logo-circle-badge.png')}
              style={styles.headerLogo}
            />
          </View>
        )}

        <View style={styles.titleColumn}>
          <Text style={styles.overline}>BHASHA SETU</Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      <View style={styles.rightContainer}>{renderRight()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 8,
    backgroundColor: zenColors.bgCream,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: zenRadius.pill,
    backgroundColor: zenColors.cardWhite,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.sm,
  },
  backArrow: {
    fontSize: 18,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  logoBadgeContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: zenSpacing.sm,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  headerLogo: {
    width: '100%',
    height: '100%',
  },
  titleColumn: {
    flex: 1,
  },
  overline: {
    fontSize: 10,
    fontWeight: '700',
    color: zenColors.ochreAccent,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  subtitle: {
    fontSize: 11,
    color: zenColors.mutedBrown,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: zenSpacing.xs,
  },
  streakPill: {
    backgroundColor: zenColors.surfaceSand,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: zenRadius.pill,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.terracotta,
  },
  profileCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: zenColors.cardWhite,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clipboardIcon: {
    fontSize: 16,
  },
});

export default TopScreenBar;
