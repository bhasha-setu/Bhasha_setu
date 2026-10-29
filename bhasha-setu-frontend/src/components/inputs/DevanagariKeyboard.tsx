// src/components/inputs/DevanagariKeyboard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { triggerKeycapHaptic } from '@/lib/services/hapticsService';

export interface DevanagariKeyboardProps {
  ctaLabel?: string;
  variant?: 'bollywood' | 'streetfood' | 'full';
  onKeyPress: (ch: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onSubmit?: () => void;
}

export const DevanagariKeyboard: React.FC<DevanagariKeyboardProps> = ({
  ctaLabel,
  variant = 'bollywood',
  onKeyPress,
  onBackspace,
  onClear,
  onSubmit,
}) => {
  const handlePress = (char: string) => {
    triggerKeycapHaptic();
    onKeyPress(char);
  };

  const handleBackspace = () => {
    triggerKeycapHaptic();
    onBackspace();
  };

  const handleClear = () => {
    triggerKeycapHaptic();
    onClear?.();
  };

  const renderKeyRow = (keys: string[], isMatra = false) => (
    <View style={styles.keyRow}>
      {keys.map((k, index) => (
        <TouchableOpacity
          key={`${k}-${index}`}
          style={[styles.keyCap, isMatra && styles.matraKeyCap]}
          onPress={() => handlePress(k)}
          activeOpacity={0.65}
        >
          <Text style={[styles.keyText, isMatra && styles.matraKeyText]}>{k}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (variant === 'streetfood') {
    // Exact keyboard matching Image 3 (Street Food Masterchef)
    const row1 = ['क', 'ख', 'ग', 'च', 'ज', 'ट'];
    const row2 = ['त', 'थ', 'द', 'ध', 'न', 'प'];
    const row3 = ['ा', 'ि', 'ी', 'ु', 'ू', 'े'];

    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>देवनागरी कीबोर्ड</Text>
          <Text style={styles.headerSubtitle}>हिन्दी इनपुट</Text>
        </View>

        <View style={styles.gridContainer}>
          {renderKeyRow(row1)}
          {renderKeyRow(row2)}
          {renderKeyRow(row3, true)}

          <View style={styles.bottomControlRow}>
            <TouchableOpacity
              style={styles.symbolKeyCap}
              onPress={() => handlePress('ं')}
              activeOpacity={0.7}
            >
              <Text style={styles.symbolKeyText}>ं</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.symbolKeyCap}
              onPress={() => handlePress('ँ')}
              activeOpacity={0.7}
            >
              <Text style={styles.symbolKeyText}>ँ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.spaceBar}
              onPress={() => handlePress(' ')}
              activeOpacity={0.7}
            >
              <Text style={styles.spaceBarText}>␣ Space</Text>
            </TouchableOpacity>

            {onClear && (
              <TouchableOpacity
                style={styles.clearKeyCap}
                onPress={handleClear}
                activeOpacity={0.7}
              >
                <Text style={styles.clearKeyText}>Clear</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.backspaceKeyCap}
              onPress={handleBackspace}
              activeOpacity={0.7}
            >
              <Text style={styles.backspaceKeyText}>⌫</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Exact keyboard matching Image 1 (Bollywood Studio)
  const matrasRow = ['ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ा', 'ं', 'ँ'];
  const consonantsRow1 = ['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज'];
  const consonantsRow2 = ['त', 'थ', 'द', 'न', 'प', 'ब', 'म'];
  const consonantsRow3 = ['य', 'र', 'ल', 'व', 'स', 'ह'];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {renderKeyRow(matrasRow, true)}
        {renderKeyRow(consonantsRow1)}
        {renderKeyRow(consonantsRow2)}
        {renderKeyRow(consonantsRow3)}

        <View style={styles.bottomControlRow}>
          <TouchableOpacity
            style={styles.spaceBarWide}
            onPress={() => handlePress(' ')}
            activeOpacity={0.7}
          >
            <Text style={styles.spaceBarText}>स्पेस (space)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backspaceKeyCap}
            onPress={handleBackspace}
            activeOpacity={0.7}
          >
            <Text style={styles.backspaceKeyText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F5EBE1',
    borderTopLeftRadius: zenRadius.md,
    borderTopRightRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: '#EAE0D5',
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: zenSpacing.xs,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C4A08',
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7A6455',
  },
  gridContainer: {
    gap: 5,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  keyCap: {
    flex: 1,
    maxWidth: 38,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: zenRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DC',
    shadowColor: '#2C1A0E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 1,
  },
  matraKeyCap: {
    backgroundColor: '#FFFFFF',
  },
  keyText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C1A0E',
  },
  matraKeyText: {
    color: '#2C1A0E',
  },
  bottomControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 2,
  },
  symbolKeyCap: {
    width: 38,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: zenRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  symbolKeyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A0E',
  },
  spaceBarWide: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: zenRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  spaceBar: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: zenRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  spaceBarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7A6455',
  },
  clearKeyCap: {
    paddingHorizontal: 12,
    height: 42,
    backgroundColor: '#F5E6E6',
    borderRadius: zenRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ECC8C8',
  },
  clearKeyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C0392B',
  },
  backspaceKeyCap: {
    width: 48,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: zenRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  backspaceKeyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A0E',
  },
});

export default DevanagariKeyboard;
