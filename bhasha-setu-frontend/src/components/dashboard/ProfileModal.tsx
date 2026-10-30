// src/components/dashboard/ProfileModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';
import { BrandLogoBadge } from '@/components/menu/BrandLogoBadge';

export interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const { xp, streak, completedLevels, unlockedArtifacts } = useFrontendStore();

  const stats = [
    { label: 'Current Streak', value: `${streak} Days`, icon: '🔥', color: zenColors.terracotta },
    { label: 'Total Experience', value: `${xp} XP`, icon: '⚡', color: zenColors.sageTeal },
    { label: 'Mastered Quests', value: `${completedLevels.length}/4`, icon: '🗺️', color: zenColors.ochreAccent },
    { label: 'Artifacts Found', value: `${unlockedArtifacts.length}/4`, icon: '🏺', color: '#27AE60' },
  ];

  const milestones = [
    { title: 'Deewani Mastani Enunciation', desc: 'Active Lyric Recall Mastered', done: true },
    { title: 'Wankhede Commentary Cadence', desc: 'Match Thriller Spoken Drill Completed', done: true },
    { title: 'Chandni Chowk Bargainer', desc: 'Spontaneous Hindi Street Negotiation', done: completedLevels.includes('LEVEL_3') },
    { title: 'Nani Ki Ladli / Ladla', desc: '100% Respectful Tone & Fluency Dialogue', done: unlockedArtifacts.includes('golden-diya') },
  ];

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
              <Text style={styles.profileName}>Hindi Explorer</Text>
              <Text style={styles.profileBadge}>Level 3 • Setu Spoken Pioneer</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {stats.map((s, idx) => (
              <View key={idx} style={styles.statBox}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Weekly Streak Tracker */}
          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <Text style={styles.streakTitle}>Weekly Practice Streak</Text>
              <Text style={styles.streakCount}>🔥 7 of 7 Days</Text>
            </View>
            <View style={styles.daysRow}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <View key={i} style={styles.dayCircleActive}>
                  <Text style={styles.dayLabelActive}>{day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Cultural Milestones */}
          <View style={styles.milestoneSection}>
            <Text style={styles.sectionTitle}>Cultural Spoken Milestones</Text>
            {milestones.map((m, i) => (
              <View key={i} style={styles.milestoneRow}>
                <View style={[styles.checkCircle, m.done ? styles.checkDone : styles.checkPending]}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: zenSpacing.md,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: zenSpacing.sm,
  },
  profileText: {
    marginLeft: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: zenColors.espressoText,
  },
  profileBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: zenColors.ochreAccent,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: zenColors.surfaceSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: zenSpacing.md,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FAF5EE',
    borderRadius: zenRadius.md,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    padding: zenSpacing.sm,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    color: zenColors.mutedBrown,
    marginTop: 2,
  },
  streakCard: {
    backgroundColor: '#F5EBE1',
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    marginBottom: zenSpacing.md,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: zenSpacing.sm,
  },
  streakTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: zenColors.espressoText,
  },
  streakCount: {
    fontSize: 12,
    fontWeight: '800',
    color: zenColors.terracotta,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircleActive: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: zenColors.sageTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabelActive: {
    color: zenColors.cardWhite,
    fontSize: 12,
    fontWeight: '800',
  },
  milestoneSection: {
    marginBottom: zenSpacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: zenColors.espressoText,
    marginBottom: zenSpacing.sm,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5EBE1',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.sm,
  },
  checkDone: {
    backgroundColor: '#27AE60',
  },
  checkPending: {
    backgroundColor: zenColors.surfaceSand,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  checkText: {
    fontSize: 12,
    color: zenColors.cardWhite,
    fontWeight: '800',
  },
  milestoneTexts: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: zenColors.espressoText,
  },
  milestoneDesc: {
    fontSize: 11,
    color: zenColors.mutedBrown,
  },
});

export default ProfileModal;

