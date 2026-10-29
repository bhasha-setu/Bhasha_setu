import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export const DiwaliNaniBossScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DiwaliNaniBossScreen</Text>
      <Text style={styles.subtitle}>Boss Level: Diwali Call with Nani (Screen 5)</Text>

      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/street-food')}>
          <Text style={styles.backButtonText}>← Back to Street Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/')}>
          <Text style={styles.navButtonText}>Return to Splash / Home ↺</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: zenColors.bgCream,
    alignItems: 'center',
    justifyContent: 'center',
    padding: zenSpacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: zenColors.espressoText,
    marginBottom: zenSpacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: zenColors.mutedBrown,
    marginBottom: zenSpacing.xl,
  },
  navContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    gap: zenSpacing.sm,
  },
  backButton: {
    backgroundColor: zenColors.surfaceSand,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: zenRadius.pill,
  },
  backButtonText: {
    color: zenColors.espressoText,
    fontSize: 14,
    fontWeight: '500',
  },
  navButton: {
    backgroundColor: zenColors.ochreAccent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: zenRadius.pill,
  },
  navButtonText: {
    color: zenColors.cardWhite,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DiwaliNaniBossScreen;

