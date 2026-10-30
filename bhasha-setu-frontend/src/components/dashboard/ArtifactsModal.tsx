// src/components/dashboard/ArtifactsModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';

export interface ArtifactsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ArtifactsModal: React.FC<ArtifactsModalProps> = ({ visible, onClose }) => {
  const { unlockedArtifacts } = useFrontendStore();

  const allArtifacts = [
    {
      id: 'vintage-mic',
      name: 'Vintage Mic',
      icon: '🎙️',
      level: 'Level 1: Bollywood Studio',
      description: 'Mastered spontaneous lyric enunciation without multiple-choice cues.',
      unlocked: unlockedArtifacts.includes('vintage-mic'),
      bonus: '+20 XP Active Recall Boost',
    },
    {
      id: 'cricket-ball',
      name: 'Cricket Ball',
      icon: '🏏',
      level: 'Level 2: Cricket Commentary',
      description: 'Spoke match-winning commentary with authentic Wankhede stadium cadence.',
      unlocked: unlockedArtifacts.includes('cricket-ball'),
      bonus: '+35 XP Fluency Cadence',
    },
    {
      id: 'chai-kulhad',
      name: 'Chai Kulhad',
      icon: '☕',
      level: 'Level 3: Street Food Masterchef',
      description: 'Negotiated authentic street food portions using zero English crutches.',
      unlocked: unlockedArtifacts.includes('chai-kulhad'),
      bonus: '+50 XP Negotiation Mastery',
    },
    {
      id: 'golden-diya',
      name: 'Golden Diya',
      icon: '🪔',
      level: 'Boss Level: Diwali Call with Nani',
      description: 'Maintained 3-minute live conversational Hindi with natural respect markers.',
      unlocked: unlockedArtifacts.includes('golden-diya'),
      bonus: '+100 XP Cultural Fluency',
    },
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
        <View style={styles.modalHeader}>
          <View>
            <Text style={styles.modalOverline}>BHASHA SETU ARCHIVE</Text>
            <Text style={styles.modalTitle}>Cultural Artifacts Shelf</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.modalSubtitle}>
          Artifacts unlocked through 100% active recall and spoken dialogue.
        </Text>

        <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
          {allArtifacts.map((item) => (
            <View
              key={item.id}
              style={[
                styles.artifactCard,
                item.unlocked ? styles.artifactCardUnlocked : styles.artifactCardLocked,
              ]}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.artifactIcon}>{item.icon}</Text>
                <View
                  style={[
                    styles.statusDot,
                    item.unlocked ? styles.statusDotCheck : styles.statusDotLock,
                  ]}
                >
                  <Text style={styles.statusDotText}>{item.unlocked ? '✓' : '🔒'}</Text>
                </View>
              </View>

              <View style={styles.artifactDetails}>
                <View style={styles.titleRow}>
                  <Text style={styles.artifactName}>{item.name}</Text>
                  <Text
                    style={[
                      styles.badgeTag,
                      item.unlocked ? styles.badgeTagUnlocked : styles.badgeTagLocked,
                    ]}
                  >
                    {item.unlocked ? 'Unlocked' : 'Locked'}
                  </Text>
                </View>
                <Text style={styles.levelLabel}>{item.level}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <Text style={styles.bonusText}>{item.bonus}</Text>
              </View>
            </View>
          ))}
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  modalOverline: {
    fontSize: 10,
    fontWeight: '800',
    color: zenColors.ochreAccent,
    letterSpacing: 1.1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: zenColors.espressoText,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: zenColors.surfaceSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: zenColors.espressoText,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 13,
    color: zenColors.mutedBrown,
    marginBottom: zenSpacing.md,
  },
  scrollList: {
    marginBottom: zenSpacing.sm,
  },
  artifactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: zenSpacing.md,
    borderRadius: zenRadius.md,
    marginBottom: zenSpacing.sm,
    borderWidth: 1,
  },
  artifactCardUnlocked: {
    backgroundColor: '#FAF5EE',
    borderColor: '#EFE7DC',
  },
  artifactCardLocked: {
    backgroundColor: '#F7F3EE',
    borderColor: '#EFE7DC',
    opacity: 0.65,
  },
  iconCircle: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: zenColors.cardWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.md,
    borderWidth: 1,
    borderColor: zenColors.borderWarm,
  },
  artifactIcon: {
    fontSize: 24,
  },
  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: zenColors.cardWhite,
  },
  statusDotCheck: {
    backgroundColor: '#27AE60',
  },
  statusDotLock: {
    backgroundColor: '#7A6455',
  },
  statusDotText: {
    fontSize: 9,
    color: zenColors.cardWhite,
    fontWeight: '800',
  },
  artifactDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  artifactName: {
    fontSize: 14,
    fontWeight: '800',
    color: zenColors.espressoText,
  },
  badgeTag: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: zenRadius.pill,
  },
  badgeTagUnlocked: {
    backgroundColor: zenColors.surfaceMint,
    color: zenColors.sageTeal,
  },
  badgeTagLocked: {
    backgroundColor: zenColors.surfaceSand,
    color: zenColors.mutedBrown,
  },
  levelLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.ochreAccent,
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 12,
    color: zenColors.mutedBrown,
    lineHeight: 16,
    marginBottom: 4,
  },
  bonusText: {
    fontSize: 11,
    fontWeight: '700',
    color: zenColors.sageTeal,
  },
});

export default ArtifactsModal;

