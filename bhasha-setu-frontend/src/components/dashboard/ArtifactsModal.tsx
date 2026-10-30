// src/components/dashboard/ArtifactsModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { zenColors, zenRadius, zenSpacing } from '@/theme/zenTheme';
import { useFrontendStore } from '@/store/useFrontendStore';
import { ApiClient } from '@/lib/api/client';

export interface ArtifactsModalProps {
  visible: boolean;
  onClose: () => void;
}

const DEFAULT_ARTIFACTS = [
  {
    id: 'vintage-mic',
    name: 'Vintage Mic',
    icon: '🎙️',
    level: 'Level 1: Bollywood Studio',
    description: 'Mastered spontaneous lyric enunciation without multiple-choice cues.',
    bonus: '+20 XP Active Recall Boost',
  },
  {
    id: 'cricket-ball',
    name: 'Cricket Ball',
    icon: '🏏',
    level: 'Level 2: Cricket Commentary',
    description: 'Spoke match-winning commentary with authentic Wankhede stadium cadence.',
    bonus: '+35 XP Fluency Cadence',
  },
  {
    id: 'chai-kulhad',
    name: 'Chai Kulhad',
    icon: '☕',
    level: 'Level 3: Street Food Masterchef',
    description: 'Negotiated authentic street food portions using zero English crutches.',
    bonus: '+50 XP Negotiation Mastery',
  },
  {
    id: 'golden-diya',
    name: 'Golden Diya',
    icon: '🪔',
    level: 'Boss Level: Diwali Call with Nani',
    description: 'Maintained 3-minute live conversational Hindi with natural respect markers.',
    bonus: '+100 XP Cultural Fluency',
  },
];

export const ArtifactsModal: React.FC<ArtifactsModalProps> = ({ visible, onClose }) => {
  const { unlockedArtifacts } = useFrontendStore();
  const [artifacts, setArtifacts] = useState<any[]>(DEFAULT_ARTIFACTS);

  // Fetch dynamic artifacts shelf from backend when modal opens
  useEffect(() => {
    if (visible) {
      let isMounted = true;
      (async () => {
        try {
          const data = await ApiClient.getArtifactsShelf();
          if (data?.artifacts && isMounted) {
            setArtifacts(data.artifacts);
          }
        } catch {
          // Keep defaults
        }
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [visible]);

  const allArtifacts = artifacts.map((item) => ({
    ...item,
    unlocked: item.unlocked !== undefined ? item.unlocked : unlockedArtifacts.includes(item.id),
  }));

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
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
                      {item.unlocked ? 'CLAIMED' : 'LOCKED'}
                    </Text>
                  </View>

                  <Text style={styles.artifactLevel}>{item.level}</Text>
                  <Text style={styles.artifactDescription}>{item.description}</Text>

                  <View style={styles.bonusBadge}>
                    <Text style={styles.bonusText}>{item.bonus}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44, 26, 14, 0.55)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: zenColors.cardWhite,
    borderTopLeftRadius: zenRadius.lg,
    borderTopRightRadius: zenRadius.lg,
    padding: zenSpacing.md,
    maxHeight: '82%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  modalOverline: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    color: zenColors.terracotta,
  },
  modalTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: zenColors.espressoText,
    marginTop: 2,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: zenColors.surfaceSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    color: zenColors.espressoText,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: zenColors.mutedBrown,
    marginBottom: zenSpacing.md,
  },
  scrollList: {
    marginBottom: zenSpacing.sm,
  },
  artifactCard: {
    flexDirection: 'row',
    borderRadius: zenRadius.md,
    padding: zenSpacing.md,
    marginBottom: zenSpacing.sm,
    borderWidth: 1,
  },
  artifactCardUnlocked: {
    backgroundColor: zenColors.cardWhite,
    borderColor: zenColors.borderWarm,
  },
  artifactCardLocked: {
    backgroundColor: '#FAF7F2',
    borderColor: '#ECE3D8',
    opacity: 0.65,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: zenColors.surfaceSand,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: zenSpacing.md,
    position: 'relative',
  },
  artifactIcon: {
    fontSize: 24,
  },
  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: zenColors.cardWhite,
  },
  statusDotCheck: {
    backgroundColor: zenColors.successGreen,
  },
  statusDotLock: {
    backgroundColor: zenColors.mutedBrown,
  },
  statusDotText: {
    color: zenColors.cardWhite,
    fontSize: 9,
    fontWeight: 'bold',
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
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: zenColors.espressoText,
  },
  badgeTag: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeTagUnlocked: {
    backgroundColor: zenColors.surfaceMint,
    color: zenColors.successGreen,
  },
  badgeTagLocked: {
    backgroundColor: zenColors.surfaceSand,
    color: zenColors.mutedBrown,
  },
  artifactLevel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: zenColors.terracotta,
    marginBottom: 4,
  },
  artifactDescription: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: zenColors.espressoText,
    lineHeight: 16,
    marginBottom: 6,
  },
  bonusBadge: {
    backgroundColor: zenColors.surfaceSand,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: zenRadius.sm,
  },
  bonusText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 10,
    color: zenColors.sageTeal,
  },
});

export default ArtifactsModal;
