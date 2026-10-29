// src/screens/DiwaliNaniBossScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
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
import { triggerKeycapHaptic, triggerSuccessHaptic } from '@/lib/services/hapticsService';

export const DiwaliNaniBossScreen: React.FC = () => {
  const router = useRouter();
  const { chatHistory, addChatMessage, addXp, unlockArtifact, completeLevel } = useFrontendStore();

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<any>(null);
  const lootCardRef = useRef<any>(null);

  const handleSendText = () => {
    if (!inputText.trim()) return;

    triggerKeycapHaptic();
    addChatMessage({
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      duration: '0:03',
      hindiText: `“${inputText.trim()}”`,
      englishSubtext: '“User spoken/typed response”',
      fluencyScore: 94,
      respectWord: 'आप',
      timestamp: '10:16 AM',
    });

    setInputText('');
    addXp(25);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);

    // Nani AI response
    setTimeout(() => {
      addChatMessage({
        id: `nani-reply-${Date.now()}`,
        sender: 'nani',
        duration: '0:04',
        hindiText: '“जीते रहो बेटा! तुम्हारा इंतज़ार रहेगा। खूब खुश रहो! 🪔”',
        englishSubtext: '“Live long son! I will be waiting for you. Stay blessed!”',
        timestamp: '10:16 AM',
      });
      triggerSuccessHaptic();
      unlockArtifact('golden-diya');
      completeLevel('LEVEL_4');
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }, 1200);
  };

  const handleMicPress = () => {
    if (!isRecording) {
      setIsRecording(true);
      triggerKeycapHaptic();
      setTimeout(() => {
        setIsRecording(false);
        triggerSuccessHaptic();
        addChatMessage({
          id: `user-voice-${Date.now()}`,
          sender: 'user',
          duration: '0:04',
          hindiText: '“हाँ नानी, मैं समय पर आ जाऊँगा, आप चिंता मत कीजिए।”',
          englishSubtext: '“Yes Nani, I will arrive on time, please do not worry.”',
          fluencyScore: 98,
          respectWord: 'आप',
          timestamp: '10:16 AM',
        });
        addXp(100);
        unlockArtifact('golden-diya');
        completeLevel('LEVEL_4');
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
        title="Boss Level: Diwali Call With Nani"
        onBack={() => router.push('/quest-map')}
      />

      {/* Nani Contact Card Header */}
      <View style={styles.contactCard}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('@/assets/images/nani-avatar.png')}
            style={styles.naniAvatar}
            defaultSource={require('@/assets/images/logo-circle-badge.png')}
          />
          <View style={styles.onlineDot} />
        </View>

        <View style={styles.contactInfo}>
          <View style={styles.contactTitleRow}>
            <Text style={styles.naniName}>नानी (Nani)</Text>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeDot}>●</Text>
              <Text style={styles.liveBadgeText}>Live</Text>
            </View>
          </View>
          <Text style={styles.poweredByText}>Powered by Bolna Voice AI</Text>
        </View>

        <BrandLogoBadge size={38} />
      </View>

      {/* Sub-Banner */}
      <View style={styles.subBanner}>
        <Text style={styles.subBannerText}>
          🏠 Boss Level: Diwali Phone Call with Nani
        </Text>
        <View style={styles.starsRow}>
          <Text style={styles.goldStar}>★</Text>
          <Text style={styles.goldStar}>★</Text>
          <Text style={styles.goldStar}>★</Text>
        </View>
      </View>

      {/* WhatsApp Voice Chat Canvas */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatScrollView}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {chatHistory.map((item) => (
          <WhatsAppVoiceBubble
            key={item.id}
            sender={item.sender}
            duration={item.duration}
            hindiText={item.hindiText}
            englishSubtext={item.englishSubtext}
            fluencyScore={item.fluencyScore}
            respectWord={item.respectWord}
            timestamp={item.timestamp}
          />
        ))}

        {/* Golden Diya Loot Milestone Card */}
        <GoldenDiyaLootCard
          containerRef={lootCardRef}
          culturalXp={100}
          onNextQuest={() => router.push('/quest-map')}
        />
      </ScrollView>

      {/* Bottom WhatsApp Chat Input Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.inputPill}>
          <Text style={styles.inputEmoji}>😊</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type or hold mic to speak Hindi..."
            placeholderTextColor={zenColors.mutedBrown}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendText}
            returnKeyType="send"
          />
          {inputText.trim().length > 0 ? (
            <TouchableOpacity onPress={handleSendText} style={styles.sendIconBtn}>
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.attachIcon}>📎</Text>
          )}
        </View>

        <TerracottaMicButton
          size={48}
          isListening={isRecording}
          onPress={handleMicPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: zenColors.bgCream,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: zenColors.cardWhite,
    marginHorizontal: zenSpacing.md,
    marginVertical: 4,
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 10,
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    shadowColor: zenColors.espressoText,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: zenSpacing.sm,
  },
  naniAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEAD4',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: zenColors.successGreen,
    borderWidth: 2,
    borderColor: zenColors.cardWhite,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  naniName: {
    fontSize: 15,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F7ED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: zenRadius.pill,
    gap: 3,
  },
  liveBadgeDot: {
    fontSize: 8,
    color: zenColors.successGreen,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: zenColors.successGreen,
  },
  poweredByText: {
    fontSize: 11,
    color: zenColors.mutedBrown,
    marginTop: 2,
  },
  subBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: zenSpacing.lg,
    paddingVertical: 6,
    backgroundColor: zenColors.surfaceSand,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  subBannerText: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  goldStar: {
    fontSize: 12,
    color: zenColors.goldStar,
  },
  chatScrollView: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: zenSpacing.md,
    paddingTop: zenSpacing.sm,
    paddingBottom: zenSpacing.md,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: zenSpacing.md,
    paddingVertical: 8,
    backgroundColor: zenColors.bgCream,
    gap: zenSpacing.sm,
  },
  inputPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.pill,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  inputEmoji: {
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: zenColors.espressoText,
    padding: 0,
  },
  attachIcon: {
    fontSize: 15,
    color: zenColors.mutedBrown,
  },
  sendIconBtn: {
    paddingHorizontal: 4,
  },
  sendIcon: {
    fontSize: 15,
    color: zenColors.sageTeal,
    fontWeight: '700',
  },
});

export default DiwaliNaniBossScreen;
