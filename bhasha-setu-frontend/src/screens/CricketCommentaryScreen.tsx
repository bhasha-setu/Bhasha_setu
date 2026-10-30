// src/screens/CricketCommentaryScreen.tsx
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
import { StadiumRoarMeterCard } from '@/components/chat/StadiumRoarMeterCard';
import { DailyFlipBanner } from '@/components/chat/DailyFlipBanner';
import { LiveVoiceCaptureCard } from '@/components/chat/LiveVoiceCaptureCard';
import { TerracottaMicButton } from '@/components/buttons/TerracottaMicButton';
import { PublicSilentTogglePill } from '@/components/buttons/PublicSilentTogglePill';
import { ActiveDevanagariInput } from '@/components/inputs/ActiveDevanagariInput';
import { DevanagariKeyboard } from '@/components/inputs/DevanagariKeyboard';
import { DockedTealButton } from '@/components/buttons/DockedTealButton';
import { triggerKeycapHaptic, triggerSuccessHaptic } from '@/lib/services/hapticsService';

export const CricketCommentaryScreen: React.FC = () => {
  const router = useRouter();
  const { xp, addXp, isSilentMode, toggleSilentMode, completeLevel } = useFrontendStore();

  const [isRecording, setIsRecording] = useState(false);
  const [decibels, setDecibels] = useState(92);
  const [recordedSuccess, setRecordedSuccess] = useState(false);
  const [typedPhrase, setTypedPhrase] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    triggerKeycapHaptic();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    triggerSuccessHaptic();
    setDecibels(95);
    setRecordedSuccess(true);
    addXp(35);
    completeLevel('LEVEL_2');
  };

  const handleToggleMic = () => {
    if (!isRecording) {
      handleStartRecording();
      setTimeout(() => {
        handleStopRecording();
      }, 2400);
    } else {
      handleStopRecording();
    }
  };

  const handlePlayPronunciation = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2000);
  };

  const handleSilentSubmit = () => {
    if (!typedPhrase.trim()) return;
    triggerSuccessHaptic();
    setRecordedSuccess(true);
    addXp(35);
    completeLevel('LEVEL_2');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopScreenBar
        title="Zen Cricket Commentary"
        rightIconType="profile"
        onBack={() => router.replace('/quest-map')}
      />

      <SubHeaderHUD
        categoryOverline="LIVE HINDI VOICE DRILL"
        lessonTitle="Cricket Commentary"
        comboLabel="Over 19.6"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stadium Roar Meter */}
        <StadiumRoarMeterCard decibelPercent={decibels} />

        {/* Center Commentary Prompt Card */}
        <View style={styles.promptCard}>
          <View style={styles.badgeRow}>
            <View style={styles.thrillerBadge}>
              <Text style={styles.thrillerText}>MATCH THRILLER • FINAL BALL</Text>
            </View>
          </View>

          <Text style={styles.hindiPromptText}>आख़िरी गेंद पर शानदार</Text>
          <Text style={styles.hindiPromptText}>छक्का!</Text>
          <Text style={styles.romanPromptText}>"Aakhiri gend par shaandaar chhakka!"</Text>

          <TouchableOpacity
            style={styles.listenPill}
            onPress={handlePlayPronunciation}
            activeOpacity={0.8}
          >
            <Text style={styles.listenIcon}>{isPlayingAudio ? '🔊' : '🔈'}</Text>
            <Text style={styles.listenText}>
              {isPlayingAudio ? 'Playing model cadence...' : 'Listen pronunciation'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Daily Flip Banner */}
        <DailyFlipBanner
          hindiPhrase="“आख़िरी मिनट पर”"
          englishMeaning="At the last minute"
        />

        {/* Live Voice Capture Card */}
        <LiveVoiceCaptureCard
          clarityPercent={90}
          capturedText="“...गेंद पर शानदार छक्का!”"
          highlightWord="छक्का!"
          xpBonus={35}
          isListening={isRecording}
          pitchDescription="Microphone detected pitch: Crisp & Exuberant"
        />

        {/* Success Milestone Action */}
        {recordedSuccess && (
          <View style={styles.successCard}>
            <Text style={styles.successCardTitle}>
              🏏 Match-Winning Roar Recorded! (+35 XP)
            </Text>
            <TouchableOpacity
              style={styles.nextLevelButton}
              onPress={() => router.push('/street-food')}
              activeOpacity={0.85}
            >
              <Text style={styles.nextLevelText}>
                Proceed to Level 3: Street Food Masterchef →
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Silent Fallback Typing Area when activated */}
        {isSilentMode && (
          <View style={styles.silentInputWrapper}>
            <Text style={styles.silentInputLabel}>SILENT MODE TYPING INPUT</Text>
            <ActiveDevanagariInput
              value={typedPhrase}
              placeholder="Type commentary here (e.g. छक्का!)..."
              onBackspace={() => setTypedPhrase((prev) => prev.slice(0, -1))}
              onClear={() => setTypedPhrase('')}
            />
            <View style={styles.submitRow}>
              <DockedTealButton
                label="Submit Commentary • +35 XP →"
                onPress={handleSilentSubmit}
                disabled={!typedPhrase.trim()}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Controls Area */}
      {!isSilentMode ? (
        <View style={styles.bottomControls}>
          <TerracottaMicButton
            size={64}
            isListening={isRecording}
            onPress={handleToggleMic}
            onPressIn={handleStartRecording}
            onPressOut={handleStopRecording}
          />
          <Text style={styles.micInstructionTitle}>Tap to speak</Text>
          <Text style={styles.micInstructionSubtitle}>
            Hold cadence steady like Ravi Shastri
          </Text>

          <View style={styles.silentToggleContainer}>
            <PublicSilentTogglePill
              isSilentMode={isSilentMode}
              onToggle={toggleSilentMode}
            />
          </View>
        </View>
      ) : (
        <View style={styles.keyboardContainer}>
          <View style={styles.silentToggleContainer}>
            <PublicSilentTogglePill
              isSilentMode={isSilentMode}
              onToggle={toggleSilentMode}
            />
          </View>
          <DevanagariKeyboard
            variant="bollywood"
            ctaLabel="Submit"
            onKeyPress={(ch) => setTypedPhrase((prev) => prev + ch)}
            onBackspace={() => setTypedPhrase((prev) => prev.slice(0, -1))}
            onClear={() => setTypedPhrase('')}
            onSubmit={handleSilentSubmit}
          />
        </View>
      )}
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
    paddingBottom: zenSpacing.md,
  },
  promptCard: {
    backgroundColor: '#FAF5EE',
    borderRadius: zenRadius.lg,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    padding: zenSpacing.md,
    marginVertical: zenSpacing.xs,
    alignItems: 'center',
  },
  badgeRow: {
    marginBottom: 6,
  },
  thrillerBadge: {
    backgroundColor: '#FDEEE0',
    borderWidth: 1,
    borderColor: '#F3DEC2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: zenRadius.pill,
  },
  thrillerText: {
    fontSize: 10,
    fontWeight: '800',
    color: zenColors.ochreAccent,
    letterSpacing: 0.8,
  },
  hindiPromptText: {
    fontSize: 24,
    fontWeight: '800',
    color: zenColors.espressoText,
    textAlign: 'center',
    lineHeight: 32,
  },
  romanPromptText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: zenColors.mutedBrown,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  listenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7EFE6',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: zenRadius.pill,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    gap: 6,
  },
  listenIcon: {
    fontSize: 14,
  },
  listenText: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.terracotta,
  },
  successCard: {
    backgroundColor: zenColors.surfaceMint,
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    borderWidth: 1,
    borderColor: zenColors.sageTeal,
    marginVertical: zenSpacing.xs,
    alignItems: 'center',
  },
  successCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: zenColors.sageTeal,
    marginBottom: 8,
  },
  nextLevelButton: {
    backgroundColor: zenColors.sageTeal,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: zenRadius.pill,
  },
  nextLevelText: {
    color: zenColors.cardWhite,
    fontSize: 13,
    fontWeight: '700',
  },
  silentInputWrapper: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    marginVertical: zenSpacing.xs,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  silentInputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: zenColors.ochreAccent,
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  submitRow: {
    marginTop: 8,
  },
  bottomControls: {
    alignItems: 'center',
    paddingVertical: zenSpacing.sm,
    paddingHorizontal: zenSpacing.md,
    backgroundColor: zenColors.bgCream,
  },
  micInstructionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: zenColors.espressoText,
    marginTop: 4,
  },
  micInstructionSubtitle: {
    fontSize: 11,
    color: zenColors.mutedBrown,
    marginBottom: 8,
  },
  silentToggleContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  keyboardContainer: {
    backgroundColor: zenColors.bgCream,
  },
});

export default CricketCommentaryScreen;
