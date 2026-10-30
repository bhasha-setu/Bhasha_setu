// src/screens/QuestMapScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { zenColors, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore, QuestLevelData } from '@/store/useFrontendStore';
import { TopScreenBar } from '@/components/menu/TopScreenBar';
import { SubHeaderHUD } from '@/components/menu/SubHeaderHUD';
import { BottomTabBar, BottomTabType } from '@/components/menu/BottomTabBar';
import { ActiveRecallHeroCard } from '@/components/dashboard/ActiveRecallHeroCard';
import { RiverCrossingTrail } from '@/components/dashboard/RiverCrossingTrail';
import { QuestNodeCard } from '@/components/dashboard/QuestNodeCard';
import { MilestoneChestBar } from '@/components/dashboard/MilestoneChestBar';
import { ArtifactsModal } from '@/components/dashboard/ArtifactsModal';
import { ProfileModal } from '@/components/dashboard/ProfileModal';

// Static fallback nodes in case device is completely offline on first launch
const FALLBACK_LEVELS: QuestLevelData[] = [
  {
    id: 'LEVEL_1',
    levelNumber: 1,
    slug: 'bollywood-studio',
    title: 'Zen Bollywood Studio',
    subtitle: 'Dialogue & Spontaneous Enunciation',
    tagOverline: 'LEVEL 1 - MASTERED',
    icon: '🎬',
    route: '/bollywood-studio',
    status: 'mastered',
    stars: 3,
    xpReward: 20,
    isIndented: false,
  },
  {
    id: 'LEVEL_2',
    levelNumber: 2,
    slug: 'cricket-commentary',
    title: 'Zen Cricket Commentary',
    subtitle: 'Fast-Action Sentence Framing',
    tagOverline: 'LEVEL 2 - MASTERED',
    icon: '🏏',
    route: '/cricket-commentary',
    status: 'mastered',
    stars: 3,
    xpReward: 35,
    isIndented: true,
  },
  {
    id: 'LEVEL_3',
    levelNumber: 3,
    slug: 'street-food',
    title: 'Level 3: Street Food Masterchef',
    subtitle: 'Order authentic chaat and negotiate portions using zero English crutches.',
    tagOverline: 'ACTIVE QUEST - NOW PLAYING',
    icon: '🍲',
    route: '/street-food',
    status: 'active',
    stars: 0,
    xpReward: 50,
    ctaLabel: 'Play Quest • +50 XP →',
    isIndented: false,
  },
  {
    id: 'LEVEL_4',
    levelNumber: 4,
    slug: 'diwali-nani-boss',
    title: 'Diwali WhatsApp Call with Nani',
    subtitle: 'Master 3-Minute Live Dialogue Flow',
    tagOverline: 'BOSS QUEST - FINAL BRIDGE',
    icon: '🪔',
    route: '/diwali-nani-boss',
    status: 'locked',
    stars: 0,
    xpReward: 100,
    ctaLabel: 'Challenge Boss • +100 XP →',
    isIndented: true,
  },
];

export interface QuestMapScreenProps {
  onNavigate?: (screen: string) => void;
}

export const QuestMapScreen: React.FC<QuestMapScreenProps> = ({ onNavigate }) => {
  const router = useRouter();
  const {
    xp,
    streak,
    unlockedArtifacts,
    questMapData,
    fetchQuestMap,
  } = useFrontendStore();

  const [activeTab, setActiveTab] = useState<BottomTabType>('quest');
  const [showArtifactsModal, setShowArtifactsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Sync dynamic quest map from backend on mount
  useEffect(() => {
    fetchQuestMap();
  }, [fetchQuestMap]);

  const goTo = (screenOrRoute: string) => {
    const screenKey = screenOrRoute.replace(/^\//, '');
    if (onNavigate) {
      onNavigate(screenKey);
    } else {
      router.push(`/${screenKey}` as any);
    }
  };

  const handleTabPress = (tab: BottomTabType) => {
    setActiveTab(tab);
    if (tab === 'artifacts') {
      setShowArtifactsModal(true);
    } else if (tab === 'profile') {
      setShowProfileModal(true);
    }
  };

  const levels: QuestLevelData[] = questMapData?.levels?.length
    ? questMapData.levels
    : FALLBACK_LEVELS;

  const currentStage = questMapData?.riverTrail?.currentStage ?? 3;
  const totalStages = questMapData?.riverTrail?.totalStages ?? 4;
  const chestTargetXp = questMapData?.milestoneChest?.targetXp ?? 500;
  const currentChestXp = questMapData?.milestoneChest?.currentXp ?? xp;

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
        {/* Dynamic 100% Active Recall Hero Card with Artifact Shelf */}
        <ActiveRecallHeroCard unlockedArtifactIds={unlockedArtifacts} />

        {/* Dynamic River Crossing Path Trail */}
        <RiverCrossingTrail
          currentStage={currentStage}
          totalStages={totalStages}
        />

        {/* Dynamic Quest Level Nodes from Backend */}
        {levels.map((lvl) => (
          <QuestNodeCard
            key={lvl.id || lvl.levelNumber}
            levelNumber={lvl.levelNumber}
            status={lvl.status}
            tagOverline={lvl.tagOverline}
            stars={lvl.stars}
            icon={lvl.icon}
            title={lvl.title}
            subtitle={lvl.subtitle}
            ctaLabel={lvl.ctaLabel}
            xpReward={lvl.xpReward}
            isIndented={lvl.isIndented}
            onPress={() => goTo(lvl.slug || lvl.route)}
          />
        ))}

        {/* Dynamic Milestone Chest Bar */}
        <MilestoneChestBar currentXp={currentChestXp} targetXp={chestTargetXp} />
      </ScrollView>

      {/* Docked Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />

      {/* Interactive Modals */}
      <ArtifactsModal
        visible={showArtifactsModal}
        onClose={() => {
          setShowArtifactsModal(false);
          setActiveTab('quest');
        }}
      />

      <ProfileModal
        visible={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setActiveTab('quest');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: zenColors.bgCream,
    position: 'relative',
    overflow: 'hidden',
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
