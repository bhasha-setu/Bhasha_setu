// src/screens/CricketCommentaryScreen.tsx
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
import { StadiumRoarMeterCard } from '@/components/chat/StadiumRoarMeterCard';
import { DailyFlipBanner } from '@/components/chat/DailyFlipBanner';
import { LiveVoiceCaptureCard } from '@/components/chat/LiveVoiceCaptureCard';
import { TerracottaMicButton } from '@/components/buttons/TerracottaMicButton';
import { PublicSilentTogglePill } from '@/components/buttons/PublicSilentTogglePill';
import { ActiveDevanagariInput } from '@/components/inputs/ActiveDevanagariInput';
import { DevanagariKeyboard } from '@/components/inputs/DevanagariKeyboard';
import { DockedTealButton } from '@/components/buttons/DockedTealButton';
import { ApiClient } from '@/lib/api/client';
import { userSocketService } from '@/lib/websockets/user_services';
import { triggerKeycapHaptic, triggerSuccessHaptic } from '@/lib/services/hapticsService';

export interface CricketCommentaryScreenProps {
  onNavigate?: (screen: string) => void;
}

export const CricketCommentaryScreen: React.FC<CricketCommentaryScreenProps> = ({ onNavigate }) => {
  const router = useRouter();
  const { xp, addXp, isSilentMode, toggleSilentMode, completeLevel } = useFrontendStore();

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('quest-map');
    } else {
      router.replace('/quest-map');
    }
  };

  const handleNext = () => {
    if (onNavigate) {
      onNavigate('street-food');
    } else {
      router.push('/street-food');
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [decibels, setDecibels] = useState(92);
  const [recordedSuccess, setRecordedSuccess] = useState(false);
  const [typedPhrase, setTypedPhrase] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Dynamic Drill Data from Backend
  const [drillData, setDrillData] = useState<{
    promptPart1: string;
    promptPart2: string;
    romanPrompt: string;
    thrillerBadge: string;
    overNotation: string;
    dailyFlipPhrase: string;
    dailyFlipMeaning: string;
    xpAward: number;
    audioClipId: string;
  }>({
    promptPart1: 'आख़िरी गेंद पर शानदार',
    promptPart2: 'छक्का!',
    romanPrompt: '"Aakhiri gend par shaandaar chhakka!"',
    thrillerBadge: 'MATCH THRILLER • FINAL BALL',
    overNotation: 'Over 19.6',
    dailyFlipPhrase: '“आख़िरी मिनट पर”',
    dailyFlipMeaning: 'At the last minute',
    xpAward: 35,
    audioClipId: 'cricket-commentary-crowd',
  });

  // Fetch dynamic drill configuration on screen mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const drill = await ApiClient.getDrill('CRICKET');
        if (drill && isMounted) {
          const meta = drill.metadata || {};
          setDrillData({
            promptPart1: 'आख़िरी गेंद पर शानदार',
            promptPart2: drill.targetWord || 'छक्का!',
            romanPrompt: drill.romanPrompt ? `"${drill.romanPrompt}"` : '"Aakhiri gend par shaandaar chhakka!"',
            thrillerBadge: meta.thrillerBadge || 'MATCH THRILLER • FINAL BALL',
            overNotation: meta.overNotation || 'Over 19.6',
            dailyFlipPhrase: meta.dailyFlipPhrase || '“आख़िरी मिनट पर”',
            dailyFlipMeaning: meta.dailyFlipMeaning || 'At the last minute',
            xpAward: drill.xpAward || 35,
            audioClipId: drill.audioClipId || 'cricket-commentary-crowd',
          });
        }
      } catch {
        // Keep initial state
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    triggerKeycapHaptic();
    userSocketService.emitUserMicChunk('mock_live_audio_chunk', 92);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    triggerSuccessHaptic();
    setDecibels(95);
    setRecordedSuccess(true);

    // Evaluate voice turn with backend
    const evalResult = await ApiClient.evaluateVoiceTurn(
      'आख़िरी गेंद पर शानदार छक्का!',
      'CRICKET',
      95,
      240
    );

    const xpEarned = evalResult?.xpAwarded || drillData.xpAward;
    addXp(xpEarned);
    completeLevel('LEVEL_2');
    await ApiClient.completeQuestLevel('LEVEL_2', 3, 95);
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

  const handlePlayPronunciation = async () => {
    setIsPlayingAudio(true);
    await ApiClient.playPromptAudio(drillData.audioClipId, 1.0);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2000);
  };

  const handleSilentSubmit = async () => {
    if (!typedPhrase.trim()) return;
    triggerSuccessHaptic();
    setRecordedSuccess(true);
    addXp(drillData.xpAward);
    completeLevel('LEVEL_2');
    await ApiClient.completeQuestLevel('LEVEL_2', 3, 90);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopScreenBar
        title="Zen Cricket Commentary"
        rightIconType="profile"
        onBack={handleBack}
      />

      <SubHeaderHUD
        categoryOverline="LIVE HINDI VOICE DRILL"
        lessonTitle="Cricket Commentary"
        comboLabel={drillData.overNotation}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dynamic Stadium Roar Meter */}
        <StadiumRoarMeterCard decibelPercent={decibels} />

        {/* Dynamic Center Commentary Prompt Card */}
        <View style={styles.promptCard}>
          <View style={styles.badgeRow}>
            <View style={styles.thrillerBadge}>
              <Text style={styles.thrillerText}>{drillData.thrillerBadge}</Text>
            </View>
          </View>

          <Text style={styles.hindiPromptText}>{drillData.promptPart1}</Text>
          <Text style={styles.hindiPromptText}>{drillData.promptPart2}</Text>
          <Text style={styles.romanPromptText}>{drillData.romanPrompt}</Text>

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

        {/* Dynamic Daily Flip Banner */}
        <DailyFlipBanner
          hindiPhrase={drillData.dailyFlipPhrase}
          englishMeaning={drillData.dailyFlipMeaning}
        />

        {/* Live Voice Capture Card */}
        <LiveVoiceCaptureCard
          clarityPercent={90}
          capturedText={`“...गेंद पर शानदार ${drillData.promptPart2}”`}
          highlightWord={drillData.promptPart2}
          xpBonus={drillData.xpAward}
          isListening={isRecording}
          pitchDescription="Microphone detected pitch: Crisp & Exuberant"
        />

        {/* Dynamic Success Milestone Action */}
        {recordedSuccess && (
          <View style={styles.successCard}>
            <Text style={styles.successCardTitle}>
              🏏 Match-Winning Roar Recorded! (+{drillData.xpAward} XP)
            </Text>
            <TouchableOpacity
              style={styles.nextLevelButton}
              onPress={handleNext}
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
                label={`Submit Commentary • +${drillData.xpAward} XP →`}
                onPress={handleSilentSubmit}
                disabled={!typedPhrase.trim()}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Controls: Silent Mode Toggle & Large Terracotta Mic CTA */}
      <View style={styles.footerContainer}>
        <View style={styles.toggleRow}>
          <PublicSilentTogglePill
            isSilentMode={isSilentMode}
            onToggle={toggleSilentMode}
          />
        </View>

        {!isSilentMode ? (
          <View style={styles.micRow}>
            <TerracottaMicButton
              isListening={isRecording}
              onPress={handleToggleMic}
            />
          </View>
        ) : (
          <DevanagariKeyboard
            variant="bollywood"
            onKeyPress={(char) => setTypedPhrase((prev) => prev + char)}
            onBackspace={() => setTypedPhrase((prev) => prev.slice(0, -1))}
            onClear={() => setTypedPhrase('')}
          />
        )}
      </View>
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
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    alignItems: 'center',
    marginBottom: zenSpacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: zenSpacing.sm,
  },
  thrillerBadge: {
    backgroundColor: '#FBEBEB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: zenRadius.sm,
  },
  thrillerText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: '#D9534F',
    letterSpacing: 0.5,
  },
  hindiPromptText: {
    fontFamily: 'NotoSansDevanagari_700Bold',
    fontSize: 24,
    lineHeight: 34,
    color: zenColors.espressoText,
    textAlign: 'center',
  },
  romanPromptText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: zenColors.mutedBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: zenSpacing.sm,
  },
  listenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: zenColors.surfaceSand,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
  },
  listenIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  listenText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: zenColors.terracotta,
  },
  successCard: {
    backgroundColor: zenColors.surfaceMint,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.successGreen,
    padding: zenSpacing.md,
    alignItems: 'center',
    marginBottom: zenSpacing.md,
  },
  successCardTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: zenColors.successGreen,
    marginBottom: zenSpacing.sm,
  },
  nextLevelButton: {
    backgroundColor: zenColors.sageTeal,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: zenRadius.sm,
    width: '100%',
    alignItems: 'center',
  },
  nextLevelText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: zenColors.cardWhite,
  },
  silentInputWrapper: {
    marginTop: zenSpacing.sm,
    marginBottom: zenSpacing.md,
  },
  silentInputLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1,
    color: zenColors.mutedBrown,
    marginBottom: 6,
  },
  submitRow: {
    marginTop: zenSpacing.sm,
  },
  footerContainer: {
    paddingBottom: 4,
  },
  toggleRow: {
    alignItems: 'center',
    marginBottom: 6,
  },
  micRow: {
    alignItems: 'center',
    paddingVertical: 4,
  },
});

export default CricketCommentaryScreen;
