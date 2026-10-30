// src/screens/BollywoodStudioScreen.tsx
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
import { AudioSpeedPills } from '@/components/buttons/AudioSpeedPills';
import { ActiveDevanagariInput } from '@/components/inputs/ActiveDevanagariInput';
import { DockedTealButton } from '@/components/buttons/DockedTealButton';
import { DevanagariKeyboard } from '@/components/inputs/DevanagariKeyboard';
import { ApiClient } from '@/lib/api/client';
import { triggerSuccessHaptic, triggerWarningHaptic } from '@/lib/services/hapticsService';

export const BollywoodStudioScreen: React.FC = () => {
  const router = useRouter();
  const { xp, addXp, completeLevel } = useFrontendStore();

  const [typedWord, setTypedWord] = useState('');
  const [speed, setSpeed] = useState<1.0 | 0.8 | 0.75>(0.75);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [evaluationState, setEvaluationState] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    message: string;
  } | null>(null);

  const EXPECTED_WORD = 'दिल';

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
    await ApiClient.playPromptAudio('kabhi-kabhi-lyric', speed);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2800);
  };

  const handleCheckAnswer = async () => {
    if (!typedWord.trim()) return;

    const result = await ApiClient.checkDevanagariAnswer('BOLLYWOOD', typedWord, EXPECTED_WORD);
    if (result.isCorrect) {
      triggerSuccessHaptic();
      addXp(result.xpAwarded);
      completeLevel('LEVEL_1');
      setEvaluationState({
        submitted: true,
        isCorrect: true,
        message: 'शानदार! Perfect recall! +20 XP awarded.',
      });
    } else {
      triggerWarningHaptic();
      setEvaluationState({
        submitted: true,
        isCorrect: false,
        message: 'करीब हैं! Think of the Hindi word for "Heart" (दिल).',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopScreenBar
        title="Zen Bollywood Studio"
        rightIconType="profile"
        onBack={() => router.replace('/quest-map')}
      />

      <SubHeaderHUD
        lessonTitle="Bollywood Studio"
        categoryOverline=""
        comboLabel="+20 XP • 2x Combo"
        progressPercent={66}
        progressBarColor={zenColors.terracotta}
        showLogo={true}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lyric Prompt Card */}
        <View style={styles.card}>
          <AudioSpeedPills
            label="Play melody"
            duration="0:05"
            tagLabel="🎵 1976 CLASSIC"
            playbackSpeed={speed}
            isPlaying={isPlayingAudio}
            onPlay={handlePlayMelody}
            onToggleSpeed={setSpeed}
          />

          <View style={styles.verseBox}>
            <Text style={styles.verseText}>कभी कभी मेरे</Text>
            <Text style={styles.verseText}>
              <Text style={styles.blankHighlight}>
                {typedWord.trim() ? typedWord : '_ _ _ _ _ _ _'}
              </Text>{' '}
              में ख़्याल
            </Text>
            <Text style={styles.verseText}>आता है</Text>
            <Text style={styles.translationText}>
              "Sometimes a thought comes into my [blank]"
            </Text>
          </View>

          {/* Hint Toggle */}
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
                <Text style={styles.hintText}>
                  Phonetic Clue: Rhymes with "Bill", starts with "द" (meaning "heart").
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionTitle}>ACTIVE DEVANAGARI INPUT</Text>
          <ActiveDevanagariInput
            value={typedWord}
            placeholder="Type missing word..."
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
                style={styles.continueButton}
                onPress={() => router.push('/cricket-commentary')}
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

      {/* Docked Action Button Strictly Above Keyboard */}
      <View style={styles.dockedButtonContainer}>
        <DockedTealButton
          label="Check Answer • +20 XP →"
          onPress={handleCheckAnswer}
          disabled={!typedWord.trim()}
        />
      </View>

      {/* Custom Devanagari Virtual Keyboard matching Image 1 */}
      <DevanagariKeyboard
        variant="bollywood"
        ctaLabel="Check"
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onClear={handleClear}
        onSubmit={handleCheckAnswer}
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
    borderRadius: zenRadius.lg,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: zenSpacing.sm,
  },
  verseBox: {
    backgroundColor: '#FAF5EE',
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    marginVertical: zenSpacing.sm,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    alignItems: 'center',
  },
  verseText: {
    fontSize: 22,
    fontWeight: '800',
    color: zenColors.espressoText,
    textAlign: 'center',
    lineHeight: 32,
  },
  blankHighlight: {
    color: zenColors.ochreAccent,
    textDecorationLine: 'underline',
    fontWeight: '800',
  },
  translationText: {
    fontSize: 13,
    color: zenColors.mutedBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  hintContainer: {
    marginTop: 4,
    alignItems: 'center',
  },
  hintButton: {
    paddingVertical: 4,
  },
  hintButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.ochreAccent,
  },
  hintBox: {
    backgroundColor: '#FFF8F0',
    borderRadius: zenRadius.sm,
    padding: zenSpacing.sm,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#F3DEC2',
  },
  hintText: {
    fontSize: 12,
    color: zenColors.espressoText,
    lineHeight: 16,
  },
  inputSection: {
    marginVertical: zenSpacing.xs,
  },
  inputSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: zenColors.espressoText,
    letterSpacing: 0.8,
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
  continueButton: {
    backgroundColor: zenColors.sageTeal,
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: zenRadius.pill,
    alignItems: 'center',
  },
  continueButtonText: {
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

export default BollywoodStudioScreen;
