// src/screens/BollywoodStudioScreen.tsx
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
import { AudioSpeedPills } from '@/components/buttons/AudioSpeedPills';
import { ActiveDevanagariInput } from '@/components/inputs/ActiveDevanagariInput';
import { DockedTealButton } from '@/components/buttons/DockedTealButton';
import { DevanagariKeyboard } from '@/components/inputs/DevanagariKeyboard';
import { ApiClient } from '@/lib/api/client';
import { triggerSuccessHaptic, triggerWarningHaptic } from '@/lib/services/hapticsService';

export interface BollywoodStudioScreenProps {
  onNavigate?: (screen: string) => void;
}

export const BollywoodStudioScreen: React.FC<BollywoodStudioScreenProps> = ({ onNavigate }) => {
  const router = useRouter();
  const { xp, addXp, completeLevel } = useFrontendStore();

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('quest-map');
    } else {
      router.replace('/quest-map');
    }
  };

  const handleNext = () => {
    if (onNavigate) {
      onNavigate('cricket-commentary');
    } else {
      router.push('/cricket-commentary');
    }
  };

  const [typedWord, setTypedWord] = useState('');
  const [speed, setSpeed] = useState<1.0 | 0.8 | 0.75>(0.75);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isLoadingDrill, setIsLoadingDrill] = useState(true);

  // Dynamic Drill Metadata from Backend
  const [drillData, setDrillData] = useState<{
    expectedWord: string;
    verseLine1: string;
    verseLine2Post: string;
    verseLine3: string;
    translation: string;
    phoneticHint: string;
    audioClipId: string;
    xpAward: number;
    tagLabel: string;
  }>({
    expectedWord: 'दिल',
    verseLine1: 'कभी कभी मेरे',
    verseLine2Post: 'में ख़्याल',
    verseLine3: 'आता है',
    translation: '"Sometimes a thought comes into my [heart]"',
    phoneticHint: 'Phonetic Clue: Rhymes with "Bill", starts with "द" (meaning "heart").',
    audioClipId: 'kabhi-kabhi-lyric',
    xpAward: 20,
    tagLabel: '🎵 1976 CLASSIC',
  });

  const [evaluationState, setEvaluationState] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    message: string;
  } | null>(null);

  // Fetch dynamic drill configuration on screen mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const drill = await ApiClient.getDrill('BOLLYWOOD');
        if (drill && isMounted) {
          const lines = drill.metadata?.verseLines || ['कभी कभी मेरे', 'में ख़्याल', 'आता है'];
          setDrillData({
            expectedWord: drill.targetWord || 'दिल',
            verseLine1: lines[0] || 'कभी कभी मेरे',
            verseLine2Post: lines[1] || 'में ख़्याल',
            verseLine3: lines[2] || 'आता है',
            translation: drill.englishTranslation || '"Sometimes a thought comes into my [heart]"',
            phoneticHint: drill.phoneticHint || 'Phonetic Clue: Rhymes with "Bill", starts with "द".',
            audioClipId: drill.audioClipId || 'kabhi-kabhi-lyric',
            xpAward: drill.xpAward || 20,
            tagLabel: drill.categoryOverline || '🎵 1976 CLASSIC',
          });
          if (drill.defaultSpeed) {
            setSpeed(drill.defaultSpeed as 1.0 | 0.8 | 0.75);
          }
        }
      } finally {
        if (isMounted) setIsLoadingDrill(false);
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

  const handlePlayMelody = async () => {
    setIsPlayingAudio(true);
    await ApiClient.playPromptAudio(drillData.audioClipId, speed);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2800);
  };

  const handleCheckAnswer = async () => {
    if (!typedWord.trim()) return;

    const result = await ApiClient.checkDevanagariAnswer(
      'BOLLYWOOD',
      typedWord,
      drillData.expectedWord
    );

    if (result.isCorrect) {
      triggerSuccessHaptic();
      addXp(result.xpAwarded || drillData.xpAward);
      completeLevel('LEVEL_1');
      setEvaluationState({
        submitted: true,
        isCorrect: true,
        message: result.feedbackHindi || `शानदार! Perfect recall! +${result.xpAwarded} XP awarded.`,
      });
    } else {
      triggerWarningHaptic();
      setEvaluationState({
        submitted: true,
        isCorrect: false,
        message: result.feedbackHindi || `करीब हैं! Think of the Hindi word for "Heart" (${drillData.expectedWord}).`,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopScreenBar
        title="Zen Bollywood Studio"
        rightIconType="profile"
        onBack={handleBack}
      />

      <SubHeaderHUD
        lessonTitle="Bollywood Studio"
        categoryOverline=""
        comboLabel={`+${drillData.xpAward} XP • 2x Combo`}
        progressPercent={66}
        progressBarColor={zenColors.terracotta}
        showLogo={true}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dynamic Lyric Prompt Card */}
        <View style={styles.card}>
          <AudioSpeedPills
            label="Play melody"
            duration="0:05"
            tagLabel={drillData.tagLabel}
            playbackSpeed={speed}
            isPlaying={isPlayingAudio}
            onPlay={handlePlayMelody}
            onToggleSpeed={setSpeed}
          />

          <View style={styles.verseBox}>
            <Text style={styles.verseText}>{drillData.verseLine1}</Text>
            <Text style={styles.verseText}>
              <Text style={styles.blankHighlight}>
                {typedWord.trim() ? typedWord : '_ _ _ _ _ _ _'}
              </Text>{' '}
              {drillData.verseLine2Post}
            </Text>
            <Text style={styles.verseText}>{drillData.verseLine3}</Text>
            <Text style={styles.translationText}>{drillData.translation}</Text>
          </View>

          {/* Dynamic Hint Accordion */}
          <View style={styles.hintContainer}>
            <TouchableOpacity
              style={styles.hintButton}
              onPress={() => setShowHint(!showHint)}
              activeOpacity={0.7}
            >
              <Text style={styles.hintButtonText}>
                {showHint ? '💡 Hide hint' : '💡 Show hint'}
              </Text>
            </TouchableOpacity>

            {showHint && (
              <View style={styles.hintBox}>
                <Text style={styles.hintText}>{drillData.phoneticHint}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Dynamic Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionTitle}>ACTIVE DEVANAGARI INPUT</Text>
          <ActiveDevanagariInput
            value={typedWord}
            placeholder="Type missing word..."
            onBackspace={handleBackspace}
            onClear={handleClear}
          />
        </View>

        {/* Dynamic Evaluation Banner */}
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
                style={styles.continueButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>
                  Continue to Cricket Commentary →
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Docked Submit Action Button */}
      <View style={styles.dockedButtonContainer}>
        <DockedTealButton
          label={`Check Answer • +${drillData.xpAward} XP →`}
          onPress={handleCheckAnswer}
          disabled={!typedWord.trim()}
        />
      </View>

      {/* Tactile Devanagari Mobile Keyboard */}
      <DevanagariKeyboard
        variant="bollywood"
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
  card: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    marginBottom: zenSpacing.md,
  },
  verseBox: {
    marginTop: zenSpacing.md,
    marginBottom: zenSpacing.sm,
    paddingVertical: zenSpacing.xs,
  },
  verseText: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 22,
    lineHeight: 34,
    color: zenColors.espressoText,
    textAlign: 'center',
  },
  blankHighlight: {
    color: zenColors.terracotta,
    textDecorationLine: 'underline',
  },
  translationText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: zenColors.mutedBrown,
    textAlign: 'center',
    marginTop: zenSpacing.sm,
    fontStyle: 'italic',
  },
  hintContainer: {
    marginTop: zenSpacing.xs,
    alignItems: 'center',
  },
  hintButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  hintButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: zenColors.sageTeal,
  },
  hintBox: {
    marginTop: 6,
    padding: zenSpacing.sm,
    backgroundColor: zenColors.surfaceSand,
    borderRadius: zenRadius.sm,
    width: '100%',
  },
  hintText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: zenColors.espressoText,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: zenSpacing.sm,
  },
  inputSectionTitle: {
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
    marginTop: zenSpacing.xs,
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
  continueButton: {
    backgroundColor: zenColors.sageTeal,
    borderRadius: zenRadius.sm,
    paddingVertical: 10,
    marginTop: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: zenColors.cardWhite,
  },
  dockedButtonContainer: {
    paddingHorizontal: zenSpacing.md,
    paddingBottom: 4,
  },
});

export default BollywoodStudioScreen;
