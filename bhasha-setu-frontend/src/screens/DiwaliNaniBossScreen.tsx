// src/screens/DiwaliNaniBossScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';
import { TopScreenBar } from '@/components/menu/TopScreenBar';
import { BrandLogoBadge } from '@/components/menu/BrandLogoBadge';
import { WhatsAppVoiceBubble } from '@/components/chat/WhatsAppVoiceBubble';
import { GoldenDiyaLootCard } from '@/components/chat/GoldenDiyaLootCard';
import { TerracottaMicButton } from '@/components/buttons/TerracottaMicButton';
import { ApiClient } from '@/lib/api/client';
import { userSocketService } from '@/lib/websockets/user_services';
import { triggerKeycapHaptic, triggerSuccessHaptic } from '@/lib/services/hapticsService';

export const DiwaliNaniBossScreen: React.FC = () => {
  const router = useRouter();
  const {
    chatHistory,
    addChatMessage,
    addXp,
    unlockArtifact,
    completeLevel,
    fetchChatHistory,
  } = useFrontendStore();

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<any>(null);

  // Sync WhatsApp dialogue history from backend on mount
  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  const handleSendText = async () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    triggerKeycapHaptic();

    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsgId = `user-msg-${Date.now()}`;
    addChatMessage({
      id: userMsgId,
      sender: 'user',
      duration: '0:03',
      hindiText: `“${userText}”`,
      englishSubtext: '“User typed response”',
      fluencyScore: 94,
      respectWord: userText.includes('आप') ? 'आप' : undefined,
      timestamp,
    });

    addXp(25);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);

    // Call backend API / WebSocket to evaluate cultural etiquette and get Nani's reply
    try {
      const evalResult = await ApiClient.evaluateVoiceTurn(userText, 'NANI_BOSS');
      const hasRespect = evalResult?.respectMarkersFound && evalResult.respectMarkersFound.length > 0;

      const replyHindi = hasRespect
        ? '“जीते रहो बेटा! तुम्हारा इंतज़ार रहेगा। खूब खुश रहो! 🪔”'
        : '“बेटा, बड़ों से ‘आप’ कहकर बात करते हैं। लेकिन तुम खूब खुश रहो!”';

      const replyEnglish = hasRespect
        ? '“Live long son! I will be waiting for you. Stay blessed!”'
        : '“Son, we speak using ‘Aap’ to elders. But stay blessed!”';

      setTimeout(() => {
        addChatMessage({
          id: `nani-reply-${Date.now()}`,
          sender: 'nani',
          duration: '0:04',
          hindiText: replyHindi,
          englishSubtext: replyEnglish,
          timestamp,
        });

        triggerSuccessHaptic();

        if (evalResult?.unlockGoldenDiya || hasRespect) {
          unlockArtifact('golden-diya');
          completeLevel('LEVEL_4');
          ApiClient.completeQuestLevel('LEVEL_4', 3, 100);
        }

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 150);
      }, 1000);
    } catch {
      // Fallback response if offline
      setTimeout(() => {
        addChatMessage({
          id: `nani-reply-${Date.now()}`,
          sender: 'nani',
          duration: '0:04',
          hindiText: '“जीते रहो बेटा! तुम्हारा इंतज़ार रहेगा। खूब खुश रहो! 🪔”',
          englishSubtext: '“Live long son! I will be waiting for you. Stay blessed!”',
          timestamp,
        });
        triggerSuccessHaptic();
        unlockArtifact('golden-diya');
        completeLevel('LEVEL_4');
      }, 1000);
    }
  };

  const handleMicPress = () => {
    if (!isRecording) {
      setIsRecording(true);
      triggerKeycapHaptic();
      userSocketService.emitUserMicChunk('mock_nani_audio_chunk', 88);

      setTimeout(async () => {
        setIsRecording(false);
        triggerSuccessHaptic();

        const timestamp = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const spokenHindi = '“हाँ नानी, मैं समय पर आ जाऊँगा, आप चिंता मत कीजिए।”';
        const spokenEnglish = '“Yes Nani, I will arrive on time, please do not worry.”';

        // Evaluate spoken turn on backend
        const evalResult = await ApiClient.evaluateVoiceTurn(spokenHindi, 'NANI_BOSS', 88, 220);

        addChatMessage({
          id: `user-voice-${Date.now()}`,
          sender: 'user',
          duration: '0:04',
          hindiText: spokenHindi,
          englishSubtext: spokenEnglish,
          fluencyScore: evalResult?.fluencyScore || 98,
          respectWord: 'आप',
          timestamp,
        });

        const awardedXp = evalResult?.xpAwarded || 100;
        addXp(awardedXp);
        unlockArtifact('golden-diya');
        completeLevel('LEVEL_4');
        await ApiClient.completeQuestLevel('LEVEL_4', 3, 100);

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 150);
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopScreenBar
        title="Diwali Nani Boss"
        showBack={true}
        onBack={() => router.replace('/quest-map')}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Authentic WhatsApp Contact Header */}
        <View style={styles.naniHeaderCard}>
          <BrandLogoBadge size={38} />
          <View style={styles.naniTextColumn}>
            <Text style={styles.naniName}>Nani (दादी/नानी)</Text>
            <Text style={styles.naniStatus}>Online • WhatsApp Voice Call</Text>
          </View>
        </View>

        {/* Encrypted Notice Banner */}
        <View style={styles.securityNotice}>
          <Text style={styles.securityNoticeText}>
            🔒 Messages and calls are simulated with real-time Indian cultural respect tone analysis.
          </Text>
        </View>

        {/* Dynamic WhatsApp Voice Dialogue Messages */}
        {chatHistory.map((msg) => (
          <WhatsAppVoiceBubble
            key={msg.id}
            sender={msg.sender}
            duration={msg.duration}
            hindiText={msg.hindiText}
            englishSubtext={msg.englishSubtext}
            fluencyScore={msg.fluencyScore}
            respectWord={msg.respectWord}
            timestamp={msg.timestamp}
          />
        ))}

        {/* Golden Diya Loot Card (Unlocked upon completing conversation) */}
        <GoldenDiyaLootCard
          culturalXp={100}
          onShareMilestone={() => {}}
        />
      </ScrollView>

      {/* Docked WhatsApp Input Bar with Voice CTA */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Type message in Hindi..."
          placeholderTextColor={zenColors.mutedBrown}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendText}
          returnKeyType="send"
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendText}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>

        <View style={styles.micWrapper}>
          <TerracottaMicButton
            isListening={isRecording}
            onPress={handleMicPress}
          />
        </View>
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
  naniHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.sm,
    marginBottom: zenSpacing.xs,
  },
  naniTextColumn: {
    marginLeft: zenSpacing.sm,
  },
  naniName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: zenColors.espressoText,
  },
  naniStatus: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: zenColors.successGreen,
    marginTop: 1,
  },
  securityNotice: {
    backgroundColor: '#F5EBE1',
    borderRadius: zenRadius.sm,
    padding: 8,
    marginVertical: zenSpacing.xs,
    alignItems: 'center',
  },
  securityNoticeText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 10,
    color: zenColors.mutedBrown,
    textAlign: 'center',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 8,
    backgroundColor: zenColors.cardWhite,
    borderTopWidth: 1,
    borderTopColor: zenColors.borderWarm,
  },
  textInput: {
    flex: 1,
    backgroundColor: zenColors.surfaceInput,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 14,
    color: zenColors.espressoText,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  sendButton: {
    backgroundColor: zenColors.sageTeal,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: zenColors.cardWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  micWrapper: {
    marginLeft: 8,
  },
});

export default DiwaliNaniBossScreen;
