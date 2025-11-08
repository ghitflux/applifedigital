import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { typography, borderRadius, spacing } from '@/constants/theme';
import { Header, MobileNav } from '@/components';

export default function Simulacoes() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handleBack = () => {
    router.push('/(tabs)/dashboard');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Simulações" showBackButton onBackPress={handleBack} />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        <Pressable style={[styles.newSimulation, { backgroundColor: colors.card, borderColor: colors.accent }]}>
          <Ionicons name="add-circle" size={48} color={colors.accent} />
          <Text style={[styles.newSimulationText, { color: colors.accent }]}>Nova Simulação</Text>
          <Text style={[styles.newSimulationSubtext, { color: colors.textSecondary }]}>
            Simule um empréstimo consignável
          </Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Simulações Salvas</Text>
          <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <Ionicons name="document-outline" size={48} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>Nenhuma simulação salva</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Suas simulações aparecerão aqui
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <MobileNav />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  newSimulation: {
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  newSimulationText: {
    fontSize: 20,
    marginTop: spacing.sm,
  },
  newSimulationSubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: spacing.md,
  },
  emptyState: {
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    marginTop: spacing.sm,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 4,
  },
});
