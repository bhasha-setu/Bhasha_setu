// src/components/dashboard/ProfileModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';
import { BrandLogoBadge } from '@/components/menu/BrandLogoBadge';
import { ApiClient } from '@/lib/api/client';

export interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const DEFAULT_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const { xp, streak, completedLevels, unlockedArtifacts } = useFrontendStore();

  const [profileData, setProfileData] = useState<{
    name: string;
    badge: string;
    stats: Array<{ label: string; value: string; icon: string; color: string }>;
  }>({
    name: 'Hindi Explorer',
    badge: 'Level 3 • Setu Spoken Pioneer',
    stats: [
      { label: 'Current Streak', value: `${streak} Days`, icon: '🔥', color: zenColors.terracotta },
      { label: 'Total Experience', value: `${xp} XP`, icon: '⚡', color: zenColors.sageTeal },
      { label: 'Mastered Quests', value: `${completedLevels.length}/4`, icon: '🗺️', color: zenColors.ochreAccent },
      { label: 'Artifacts Found', value: `${unlockedArtifacts.length}/4`, icon: '🏺', color: '#27AE60' },
    ],
  });

  const [weeklyDays, setWeeklyDays] = useState<Array<{ day: string; isCompleted: boolean }>>(
    DEFAULT_DAYS.map((d) => ({ day: d, isCompleted: true }))
  );

  const [milestones, setMilestones] = useState<Array<{ title: string; desc: string; done: boolean }>>([
    { title: 'Deewani Mastani Enunciation', desc: 'Active Lyric Recall Mastered', done: true },
    { title: 'Wankhede Commentary Cadence', desc: 'Match Thriller Spoken Drill Completed', done: true },
    { title: 'Chandni Chowk Bargainer', desc: 'Spontaneous Hindi Street Negotiation', done: completedLevels.includes('LEVEL_3') },
    { title: 'Nani Ki Ladli / Ladla', desc: '100% Respectful Tone & Fluency Dialogue', done: unlockedArtifacts.includes('golden-diya') },
  ]);

  // Fetch dynamic profile and milestones from backend on open
  useEffect(() => {
    if (visible) {
      let isMounted = true;
      (async () => {
        try {
          const [prof, streakData, mileData] = await Promise.allSettled([
            ApiClient.getUserProfile(),
            ApiClient.getWeeklyPracticeStreak(),
            ApiClient.getCulturalMilestones(),
          ]);

          if (isMounted) {
            if (prof.status === 'fulfilled' && prof.value) {
              setProfileData({
                name: prof.value.profile?.name || 'Hindi Explorer',
                badge: prof.value.profile?.title || 'Level 3 • Setu Spoken Pioneer',
                stats: prof.value.stats || [
                  { label: 'Current Streak', value: `${prof.value.profile?.streak ?? streak} Days`, icon: '🔥', color: zenColors.terracotta },
                  { label: 'Total Experience', value: `${prof.value.profile?.xp ?? xp} XP`, icon: '⚡', color: zenColors.sageTeal },
                  { label: 'Mastered Quests', value: `${prof.value.completedLevels?.length ?? completedLevels.length}/4`, icon: '🗺️', color: zenColors.ochreAccent },
                  { label: 'Artifacts Found', value: `${prof.value.unlockedArtifacts?.length ?? unlockedArtifacts.length}/4`, icon: '🏺', color: '#27AE60' },
                ],
              });
            }

            if (streakData.status === 'fulfilled' && streakData.value?.days) {
              setWeeklyDays(
                streakData.value.days.map((d: any) => ({
                  day: d.day,
                  isCompleted: d.isCompleted,
                }))
              );
            }

            if (mileData.status === 'fulfilled' && mileData.value?.milestones) {
              setMilestones(mileData.value.milestones);
            }
          }
        } catch {
          // Keep defaults
        }
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [visible, xp, streak, completedLevels, unlockedArtifacts]);

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <TouchableOpacity
        style={styles.backdropDismiss}
        activeOpacity={1}
        onPress={onClose}
      />
      <View style={styles.modalCard}>
        <View style={styles.dragHandleBar}>
          <View style={styles.dragHandle} />
        </View>
        <View style={styles.headerRow}>
          <View style={styles.profileInfo}>
            <BrandLogoBadge size={48} />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{profileData.name}</Text>
              <Text style={styles.profileBadge}>{profileData.badge}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Dynamic Stats Grid */}
          <View style={styles.statsGrid}>
            {profileData.stats.map((s, idx) => (
              <View key={idx} style={styles.statBox}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Dynamic Weekly Streak Tracker */}
          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <Text style={styles.streakTitle}>Weekly Practice Streak</Text>
              <Text style={styles.streakCount}>
                🔥 {weeklyDays.filter((d) => d.isCompleted).length} of 7 Days
              </Text>
            </View>
            <View style={styles.daysRow}>
              {weeklyDays.map((d, i) => (
                <View
                  key={i}
                  style={d.isCompleted ? styles.dayCircleActive : styles.dayCircleInactive}
                >
                  <Text
                    style={d.isCompleted ? styles.dayLabelActive : styles.dayLabelInactive}
                  >
                    {d.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Dynamic Cultural Milestones */}
          <View style={styles.milestoneSection}>
            <Text style={styles.sectionTitle}>Cultural Spoken Milestones</Text>
            {milestones.map((m, i) => (
              <View key={i} style={styles.milestoneRow}>
                <View
                  style={[
                    styles.checkCircle,
                    m.done ? styles.checkDone : styles.checkPending,
                  ]}
                >
                  <Text style={styles.checkText}>{m.done ? '✓' : '○'}</Text>
                </View>
                <View style={styles.milestoneTexts}>
                  <Text style={styles.milestoneTitle}>{m.title}</Text>
                  <Text style={styles.milestoneDesc}>{m.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 16, 9, 0.65)',
    justifyContent: 'flex-end',
    zIndex: 200,
  },
  backdropDismiss: {
    flex: 1,
    width: '100%',
  },
  dragHandleBar: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1C7BD',
  },
  modalCard: {
    backgroundColor: zenColors.cardWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: zenSpacing.lg,
    paddingBottom: zenSpacing.xl + 12,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: zenSpacing.md,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    marginLeft: zenSpacing.sm,
  },
  profileName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: zenColors.espressoText,
  },
  profileBadge: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: zenColors.terracotta,
    marginTop: 2,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: zenColors.surfaceSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    color: zenColors.espressoText,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: zenSpacing.sm,
    marginBottom: zenSpacing.md,
  },
  statBox: {
    width: '48%',
    backgroundColor: zenColors.surfaceSand,
    borderRadius: zenRadius.sm,
    padding: zenSpacing.sm,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: zenColors.mutedBrown,
    marginTop: 2,
  },
  streakCard: {
    backgroundColor: zenColors.cardWhite,
    borderRadius: zenRadius.sm,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
    padding: zenSpacing.md,
    marginBottom: zenSpacing.md,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: zenSpacing.sm,
  },
  streakTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: zenColors.espressoText,
  },
  streakCount: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: zenColors.terracotta,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: zenColors.surfaceMint,
    borderWidth: 1,
    borderColor: zenColors.successGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: zenColors.surfaceSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabelActive: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: zenColors.successGreen,
  },
  dayLabelInactive: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: zenColors.mutedBrown,
  },
  milestoneSection: {
    marginTop: zenSpacing.xs,
    marginBottom: zenSpacing.md,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: zenColors.espressoText,
    marginBottom: zenSpacing.sm,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: zenColors.surfaceSand,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.sm,
  },
  checkDone: {
    backgroundColor: zenColors.successGreen,
  },
  checkPending: {
    backgroundColor: zenColors.surfaceSand,
  },
  checkText: {
    color: zenColors.cardWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  milestoneTexts: {
    flex: 1,
  },
  milestoneTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: zenColors.espressoText,
  },
  milestoneDesc: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: zenColors.mutedBrown,
  },
});

export default ProfileModal;
