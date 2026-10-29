import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';

export const SplashLoadingScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SplashLoadingScreen</Text>
      <Text style={styles.subtitle}>Zen Loading Screen (Screen 0)</Text>

      <View style={styles.navContainer}>
        <Text style={styles.navHeader}>Navigate to Screen:</Text>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/quest-map')}>
          <Text style={styles.navButtonText}>1. Quest Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/bollywood-studio')}>
          <Text style={styles.navButtonText}>2. Bollywood Studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/cricket-commentary')}>
          <Text style={styles.navButtonText}>3. Cricket Commentary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/street-food')}>
          <Text style={styles.navButtonText}>4. Street Food Masterchef</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/diwali-nani-boss')}>
          <Text style={styles.navButtonText}>5. Diwali Nani Boss</Text>
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
  navHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: zenColors.espressoText,
    marginBottom: zenSpacing.xs,
  },
  navButton: {
    backgroundColor: zenColors.surfaceSand,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: zenRadius.pill,
  },
  navButtonText: {
    color: zenColors.espressoText,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SplashLoadingScreen;

