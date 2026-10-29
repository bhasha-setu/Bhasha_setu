// src/components/chat/DailyFlipBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export interface DailyFlipBannerProps {
  hindiPhrase?: string;
  englishMeaning?: string;
}

export const DailyFlipBanner: React.FC<DailyFlipBannerProps> = ({
  hindiPhrase = '“आख़िरी मिनट पर”',
  englishMeaning = 'At the last minute',
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.pinIcon}>📍</Text>
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.tagText}>Daily Flip</Text>
          <Text style={styles.phraseText}>
            {hindiPhrase} <Text style={styles.dotSeparator}>•</Text>{' '}
            <Text style={styles.meaningText}>{englishMeaning}</Text>
          </Text>
        </View>
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
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 10,
    marginVertical: zenSpacing.xs,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5EBE1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.sm,
  },
  pinIcon: {
    fontSize: 14,
  },
  textColumn: {
    flex: 1,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: zenColors.ochreAccent,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  phraseText: {
    fontSize: 13,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  dotSeparator: {
    color: zenColors.mutedBrown,
    fontWeight: '400',
  },
  meaningText: {
    fontSize: 12,
    fontWeight: '500',
    color: zenColors.mutedBrown,
    fontStyle: 'italic',
  },
});

export default DailyFlipBanner;
