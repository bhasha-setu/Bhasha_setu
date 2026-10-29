// src/screens/QuestMapScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { zenColors, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';
import { TopScreenBar } from '@/components/menu/TopScreenBar';
import { SubHeaderHUD } from '@/components/menu/SubHeaderHUD';
import { BottomTabBar, BottomTabType } from '@/components/menu/BottomTabBar';
import { ActiveRecallHeroCard } from '@/components/dashboard/ActiveRecallHeroCard';
import { RiverCrossingTrail } from '@/components/dashboard/RiverCrossingTrail';
import { QuestNodeCard } from '@/components/dashboard/QuestNodeCard';
import { MilestoneChestBar } from '@/components/dashboard/MilestoneChestBar';

export const QuestMapScreen: React.FC = () => {
  const router = useRouter();
  const { xp, streak, unlockedArtifacts } = useFrontendStore();
  const [activeTab, setActiveTab] = useState<BottomTabType>('quest');

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopScreenBar
        title="Zen Setu Quest Map"
        showBack={false}
        streak={streak}
      />

      <SubHeaderHUD
        lessonTitle="Quest Map"
        categoryOverline="BHASHA SETU"
        streakDays={streak}
        xpPoints={xp}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 100% Active Recall Hero Card with Artifact Shelf */}
        <ActiveRecallHeroCard unlockedArtifactIds={unlockedArtifacts} />

        {/* River Crossing Path Trail Header */}
        <RiverCrossingTrail currentStage={3} totalStages={4} />

        {/* Quest Level Nodes */}
        {/* Level 1: Mastered */}
        <QuestNodeCard
          levelNumber={1}
          status="mastered"
          tagOverline="LEVEL 1 - MASTERED"
          stars={3}
          icon="🎬"
          title="Zen Bollywood Studio"
          subtitle="Dialogue & Spontaneous Enunciation"
          onPress={() => router.push('/bollywood-studio')}
        />

        {/* Level 2: Mastered (Indented Right) */}
        <QuestNodeCard
          levelNumber={2}
          status="mastered"
          tagOverline="LEVEL 2 - MASTERED"
          stars={3}
          icon="🏏"
          title="Zen Cricket Commentary"
          subtitle="Fast-Action Sentence Framing"
          isIndented={true}
          onPress={() => router.push('/cricket-commentary')}
        />

        {/* Level 3: Active Quest (Highlighted Teal Border) */}
        <QuestNodeCard
          levelNumber={3}
          status="active"
          tagOverline="ACTIVE QUEST - NOW PLAYING"
          xpReward={50}
          icon="🍲"
          title="Level 3: Street Food Masterchef"
          subtitle="Order authentic chaat and negotiate portions using zero English crutches."
          ctaLabel="Play Quest • +50 XP →"
          onPress={() => router.push('/street-food')}
        />

        {/* Boss Quest: Diwali WhatsApp Call with Nani */}
        <QuestNodeCard
          levelNumber={4}
          status="locked"
          tagOverline="BOSS QUEST - FINAL BRIDGE"
          icon="🔒"
          title="Diwali WhatsApp Call with Nani"
          subtitle="Master 3-Minute Live Dialogue Flow"
          onPress={() => router.push('/diwali-nani-boss')}
        />

        {/* Milestone Chest Bar */}
        <MilestoneChestBar currentXp={xp} targetXp={500} />
      </ScrollView>

      {/* Docked Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
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
});

export default QuestMapScreen;
