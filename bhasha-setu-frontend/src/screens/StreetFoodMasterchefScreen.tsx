// src/screens/StreetFoodMasterchefScreen.tsx
import React, { useState, useEffect } from 'react';
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

  // Dynamic Drill Configuration from Backend
  const [drillData, setDrillData] = useState<{
    expectedWord: string;
    stallName: string;
    locationOverline: string;
    promptLine1: string;
    promptLine2Post: string;
    promptLine3: string;
    translation: string;
    audioClipId: string;
    xpAward: number;
    categoryOverline: string;
  }>({
    expectedWord: 'तीखा',
    stallName: 'Pani Puri Cart • Old Delhi',
    locationOverline: 'CUSTOMER AT COUNTER',
    promptLine1: 'भैया, पानी पूरी थोड़ा',
    promptLine2Post: 'और कम मीठा',
    promptLine3: 'बनाना।',
    translation: '"Make the Pani Puri a little [spicy] and less sweet."',
    audioClipId: 'pani-puri-order',
    xpAward: 50,
    categoryOverline: 'Street Food Kitchen • Order 3 of 5',
  });

  const [evaluationState, setEvaluationState] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    message: string;
  } | null>(null);

  // Fetch dynamic drill configuration on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const drill = await ApiClient.getDrill('STREET_FOOD');
        if (drill && isMounted) {
          const meta = drill.metadata || {};
          setDrillData({
            expectedWord: drill.targetWord || 'तीखा',
            stallName: meta.stallName || 'Pani Puri Cart • Old Delhi',
            locationOverline: 'CUSTOMER AT COUNTER',
            promptLine1: 'भैया, पानी पूरी थोड़ा',
            promptLine2Post: 'और कम मीठा',
            promptLine3: 'बनाना।',
            translation: drill.englishTranslation || '"Make the Pani Puri a little [spicy] and less sweet."',
            audioClipId: drill.audioClipId || 'pani-puri-order',
            xpAward: drill.xpAward || 50,
            categoryOverline: drill.categoryOverline || 'Street Food Kitchen • Order 3 of 5',
          });
          if (drill.defaultSpeed) {
            setSpeed(drill.defaultSpeed as 1.0 | 0.8 | 0.75);
          }
        }
      } catch {
        // Keep initial fallback
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

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
    await ApiClient.playPromptAudio(drillData.audioClipId, speed);
    setTimeout(() => {
      setIsPlayingCustomerAudio(false);
    }, 2500);
  };

  const handleToggleSpeed = () => {
    setSpeed((prev) => (prev === 0.8 ? 1.0 : prev === 1.0 ? 0.75 : 0.8));
  };

  const handleServeOrder = async () => {
    if (!typedWord.trim()) return;

    const result = await ApiClient.checkDevanagariAnswer(
      'STREET_FOOD',
      typedWord,
      drillData.expectedWord
    );

    if (result.isCorrect) {
      triggerSuccessHaptic();
      const awarded = result.xpAwarded || drillData.xpAward;
      addXp(awarded);
      incrementStreak();
      completeLevel('LEVEL_3');
      await ApiClient.completeQuestLevel('LEVEL_3', 3, 100);

      setEvaluationState({
        submitted: true,
        isCorrect: true,
        message: result.feedbackHindi || `स्वाद आ गया! Perfect Spicy Pani Puri Served! +${awarded} XP awarded.`,
      });
    } else {
      triggerWarningHaptic();
      setEvaluationState({
        submitted: true,
        isCorrect: false,
        message: result.feedbackHindi || `थोड़ा और सोचिए! The Hindi word for "Spicy" is ${drillData.expectedWord}.`,
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
        lessonTitle={drillData.categoryOverline}
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
        {/* Dynamic Location Banner */}
        <View style={styles.locationBanner}>
          <BrandLogoBadge size={36} />
          <View style={styles.locationTextColumn}>
            <Text style={styles.locationOverline}>{drillData.locationOverline}</Text>
            <Text style={styles.locationTitle}>{drillData.stallName}</Text>
          </View>
          <View style={styles.stallIconBadge}>
            <Text style={styles.stallIcon}>🏪</Text>
          </View>
        </View>

        {/* Dynamic Customer Request Card */}
        <View style={styles.requestCard}>
          <Text style={styles.requestPromptLabel}>
            Listen to the customer's request
          </Text>

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

          {/* Dynamic Prompt Sentence Box */}
          <View style={styles.promptSentenceBox}>
            <Text style={styles.promptHindiSentence}>{drillData.promptLine1}</Text>
            <View style={styles.blankHighlightWrapper}>
              <Text style={styles.promptHindiSentence}>
                <Text style={styles.blankBox}>
                  [ {typedWord.trim() ? typedWord : '_ _ _ _ _'} ]
                </Text>{' '}
                {drillData.promptLine2Post}
              </Text>
            </View>
            <Text style={styles.promptHindiSentence}>{drillData.promptLine3}</Text>

            <Text style={styles.promptEnglishSentence}>{drillData.translation}</Text>
          </View>
        </View>

        {/* Active Devanagari Input Card */}
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionHeader}>Active Devanagari Input</Text>
          <ActiveDevanagariInput
            value={typedWord}
            placeholder={`Type '${drillData.expectedWord}' here...`}
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
          </View>
        )}
      </ScrollView>

      {/* Docked Action Button */}
      <View style={styles.dockedButtonContainer}>
        <DockedTealButton
          label={`Serve Pani Puri • +${drillData.xpAward} XP →`}
          onPress={handleServeOrder}
          disabled={!typedWord.trim()}
        />
      </View>

      {/* Street Food Variant Devanagari Virtual Keyboard */}
      <DevanagariKeyboard
        variant="streetfood"
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onClear={handleClear}
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
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.sm,
    marginBottom: zenSpacing.sm,
  },
  locationTextColumn: {
    flex: 1,
    marginLeft: zenSpacing.sm,
  },
  locationOverline: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    letterSpacing: 1,
    color: zenColors.mutedBrown,
  },
  locationTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: zenColors.espressoText,
    marginTop: 2,
  },
  stallIconBadge: {
    backgroundColor: zenColors.surfaceSand,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stallIcon: {
    fontSize: 16,
  },
  requestCard: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    marginBottom: zenSpacing.sm,
  },
  requestPromptLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: zenColors.mutedBrown,
    marginBottom: zenSpacing.sm,
    textAlign: 'center',
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: zenSpacing.md,
  },
  speakerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: zenColors.surfaceSand,
    borderWidth: 2,
    borderColor: zenColors.borderWarm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.sm,
  },
  speakerCircleActive: {
    borderColor: zenColors.ochreAccent,
    backgroundColor: '#FDEFE5',
  },
  speakerIcon: {
    fontSize: 22,
  },
  speedPill: {
    backgroundColor: zenColors.surfaceSand,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  speedPillText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: zenColors.espressoText,
  },
  promptSentenceBox: {
    backgroundColor: zenColors.surfaceSand,
    borderRadius: zenRadius.sm,
    padding: zenSpacing.md,
    alignItems: 'center',
  },
  promptHindiSentence: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 20,
    lineHeight: 30,
    color: zenColors.espressoText,
    textAlign: 'center',
  },
  blankHighlightWrapper: {
    marginVertical: 4,
  },
  blankBox: {
    color: zenColors.ochreAccent,
    fontFamily: 'NotoSansDevanagari_700Bold',
  },
  promptEnglishSentence: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: zenColors.mutedBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: zenSpacing.sm,
  },
  inputSection: {
    marginBottom: zenSpacing.xs,
  },
  inputSectionHeader: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1,
    color: zenColors.mutedBrown,
    marginBottom: 6,
    paddingLeft: 2,
  },
  evaluationBanner: {
    borderRadius: zenRadius.sm,
    padding: zenSpacing.sm,
    marginTop: 4,
    marginBottom: zenSpacing.sm,
    borderWidth: 1,
  },
  evaluationSuccess: {
    backgroundColor: zenColors.surfaceMint,
    borderColor: zenColors.successGreen,
  },
  evaluationError: {
    backgroundColor: '#FDF2F2',
    borderColor: '#E74C3C',
  },
  evaluationText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    textAlign: 'center',
  },
  evaluationSuccessText: {
    color: zenColors.successGreen,
  },
  evaluationErrorText: {
    color: '#C0392B',
  },
  dockedButtonContainer: {
    paddingHorizontal: zenSpacing.md,
    paddingBottom: 4,
  },
});

export default StreetFoodMasterchefScreen;
