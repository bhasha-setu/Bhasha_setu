// src/screens/StreetFoodMasterchefScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';
import { TopScreenBar } from '@/components/menu/TopScreenBar';
import { SubHeaderHUD } from '@/components/menu/SubHeaderHUD';
import { BrandLogoBadge } from '@/components/menu/BrandLogoBadge';
import { ActiveDevanagariInput } from '@/components/inputs/ActiveDevanagariInput';
import { DevanagariKeyboard } from '@/components/inputs/DevanagariKeyboard';
import { DockedTealButton } from '@/components/buttons/DockedTealButton';
import { ApiClient } from '@/lib/api/client';
import { triggerSuccessHaptic, triggerWarningHaptic } from '@/lib/services/hapticsService';

export const StreetFoodMasterchefScreen: React.FC = () => {
  const router = useRouter();
  const { xp, addXp, incrementStreak, completeLevel } = useFrontendStore();

  const [typedWord, setTypedWord] = useState('');
  const [speed, setSpeed] = useState<1.0 | 0.8 | 0.75>(0.8);
  const [isPlayingCustomerAudio, setIsPlayingCustomerAudio] = useState(false);
  const [evaluationState, setEvaluationState] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    message: string;
  } | null>(null);

  const EXPECTED_WORD = 'तीखा';

  const handleKeyPress = (char: string) => {
    setTypedWord((prev) => prev + char);
  };

  const handleBackspace = () => {
    setTypedWord((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setTypedWord('');
    setEvaluationState(null);
  };

  const handlePlayCustomerAudio = async () => {
    setIsPlayingCustomerAudio(true);
    await ApiClient.playPromptAudio('pani-puri-order', speed);
    setTimeout(() => {
      setIsPlayingCustomerAudio(false);
    }, 2500);
  };

  const handleToggleSpeed = () => {
    setSpeed((prev) => (prev === 0.8 ? 1.0 : prev === 1.0 ? 0.75 : 0.8));
  };

  const handleServeOrder = async () => {
    if (!typedWord.trim()) return;

    const result = await ApiClient.checkDevanagariAnswer('STREET_FOOD', typedWord, EXPECTED_WORD);
    if (result.isCorrect) {
      triggerSuccessHaptic();
      addXp(result.xpAwarded);
      incrementStreak();
      completeLevel('LEVEL_3');
      setEvaluationState({
        submitted: true,
        isCorrect: true,
        message: 'स्वाद आ गया! Perfect Spicy Pani Puri Served! +50 XP awarded.',
      });
    } else {
      triggerWarningHaptic();
      setEvaluationState({
        submitted: true,
        isCorrect: false,
        message: 'थोड़ा और सोचिए! The Hindi word for "Spicy" is तीखा.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopScreenBar
        title="Zen Street Food Masterchef"
        rightIconType="clipboard"
        onBack={() => router.replace('/quest-map')}
      />

      <SubHeaderHUD
        lessonTitle="Street Food Kitchen • Order 3 of 5"
        categoryOverline=""
        comboLabel="Streak: 3"
        progressPercent={60}
        progressBarColor={zenColors.ochreAccent}
        showLogo={false}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Banner */}
        <View style={styles.locationBanner}>
          <BrandLogoBadge size={36} />
          <View style={styles.locationTextColumn}>
            <Text style={styles.locationOverline}>CUSTOMER AT COUNTER</Text>
            <Text style={styles.locationTitle}>Pani Puri Cart • Old Delhi</Text>
          </View>
          <View style={styles.stallIconBadge}>
            <Text style={styles.stallIcon}>🏪</Text>
          </View>
        </View>

        {/* Customer Request Card (Spoiler-Free) */}
        <View style={styles.requestCard}>
          <Text style={styles.requestPromptLabel}>
            Listen to the customer's request
          </Text>

          {/* Large 52px Circular Speaker Button paired with 0.8x Pill */}
          <View style={styles.audioRow}>
            <TouchableOpacity
              style={[
                styles.speakerCircle,
                isPlayingCustomerAudio && styles.speakerCircleActive,
              ]}
              onPress={handlePlayCustomerAudio}
              activeOpacity={0.85}
            >
              <Text style={styles.speakerIcon}>
                {isPlayingCustomerAudio ? '🔊' : '🔈'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.speedPill}
              onPress={handleToggleSpeed}
              activeOpacity={0.8}
            >
              <Text style={styles.speedPillText}>🐢 {speed}x</Text>
            </TouchableOpacity>
          </View>

          {/* Unspoiled Hindi Prompt Box */}
          <View style={styles.promptSentenceBox}>
            <Text style={styles.promptHindiSentence}>भैया, पानी पूरी थोड़ा</Text>
            <View style={styles.blankHighlightWrapper}>
              <Text style={styles.promptHindiSentence}>
                <Text style={styles.blankBox}>
                  [ {typedWord.trim() ? typedWord : '_ _ _ _ _'} ]
                </Text>{' '}
                और कम मीठा
              </Text>
            </View>
            <Text style={styles.promptHindiSentence}>बनाना।</Text>

            <Text style={styles.promptEnglishSentence}>
              "Make the Pani Puri a little [spicy] and less sweet."
            </Text>
          </View>
        </View>

        {/* Active Devanagari Input Card */}
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionHeader}>Active Devanagari Input</Text>
          <ActiveDevanagariInput
            value={typedWord}
            placeholder="Type 'तीखा' here..."
            onBackspace={handleBackspace}
            onClear={handleClear}
          />
        </View>

        {/* Evaluation Banner */}
        {evaluationState && (
          <View
            style={[
              styles.evaluationBanner,
              evaluationState.isCorrect
                ? styles.evaluationSuccess
                : styles.evaluationError,
            ]}
          >
            <Text
              style={[
                styles.evaluationText,
                evaluationState.isCorrect
                  ? styles.evaluationSuccessText
                  : styles.evaluationErrorText,
              ]}
            >
              {evaluationState.message}
            </Text>

            {evaluationState.isCorrect && (
              <TouchableOpacity
                style={styles.bossButton}
                onPress={() => router.push('/diwali-nani-boss')}
                activeOpacity={0.85}
              >
                <Text style={styles.bossButtonText}>
                  Proceed to Boss Level: Diwali Call with Nani 🪔 →
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Docked Sage-Teal Action Button strictly above keyboard */}
      <View style={styles.dockedButtonContainer}>
        <DockedTealButton
          label="Serve Order →"
          onPress={handleServeOrder}
          disabled={!typedWord.trim()}
        />
      </View>

      {/* Devanagari Virtual Keyboard matching Image 3 */}
      <DevanagariKeyboard
        variant="streetfood"
        ctaLabel="Serve"
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onClear={handleClear}
        onSubmit={handleServeOrder}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: zenColors.bgCream,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: zenSpacing.md,
    paddingTop: zenSpacing.xs,
    paddingBottom: zenSpacing.sm,
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5EE',
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    marginBottom: zenSpacing.sm,
  },
  locationTextColumn: {
    flex: 1,
    marginLeft: zenSpacing.sm,
  },
  locationOverline: {
    fontSize: 10,
    fontWeight: '800',
    color: zenColors.ochreAccent,
    letterSpacing: 0.8,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  stallIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: zenColors.cardWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  stallIcon: {
    fontSize: 18,
  },
  requestCard: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.lg,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    marginBottom: zenSpacing.sm,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  requestPromptLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.mutedBrown,
    marginBottom: 10,
    alignSelf: 'center',
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: zenSpacing.md,
    gap: zenSpacing.sm,
  },
  speakerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: zenColors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: zenColors.terracotta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  speakerCircleActive: {
    backgroundColor: '#A85A12',
  },
  speakerIcon: {
    fontSize: 22,
    color: zenColors.cardWhite,
  },
  speedPill: {
    backgroundColor: '#F5EBE1',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: zenRadius.pill,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  speedPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.ochreAccent,
  },
  promptSentenceBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 4,
  },
  promptHindiSentence: {
    fontSize: 22,
    fontWeight: '800',
    color: zenColors.espressoText,
    lineHeight: 32,
    textAlign: 'center',
  },
  blankHighlightWrapper: {
    backgroundColor: '#F6EAE0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: zenRadius.sm,
    marginVertical: 4,
  },
  blankBox: {
    color: zenColors.espressoText,
    fontWeight: '800',
  },
  promptEnglishSentence: {
    fontSize: 12,
    color: zenColors.mutedBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  inputSection: {
    marginVertical: zenSpacing.xs,
  },
  inputSectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: zenColors.espressoText,
    marginBottom: 4,
  },
  evaluationBanner: {
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    marginVertical: zenSpacing.xs,
    borderWidth: 1,
  },
  evaluationSuccess: {
    backgroundColor: zenColors.surfaceMint,
    borderColor: zenColors.sageTeal,
  },
  evaluationError: {
    backgroundColor: '#FDF2F2',
    borderColor: '#E8A5A5',
  },
  evaluationText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  evaluationSuccessText: {
    color: zenColors.sageTeal,
  },
  evaluationErrorText: {
    color: zenColors.terracotta,
  },
  bossButton: {
    backgroundColor: zenColors.sageTeal,
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: zenRadius.pill,
    alignItems: 'center',
  },
  bossButtonText: {
    color: zenColors.cardWhite,
    fontSize: 13,
    fontWeight: '700',
  },
  dockedButtonContainer: {
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 8,
    backgroundColor: zenColors.bgCream,
  },
});

export default StreetFoodMasterchefScreen;
