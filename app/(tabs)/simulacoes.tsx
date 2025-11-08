import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, borderRadius, spacing } from '@/constants/theme';

export default function Simulacoes() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Simulações</Text>
      </View>

      <ScrollView style={styles.content}>
        <Pressable style={styles.newSimulation}>
          <Ionicons name="add-circle" size={48} color={colors.accent} />
          <Text style={styles.newSimulationText}>Nova Simulação</Text>
          <Text style={styles.newSimulationSubtext}>
            Simule um empréstimo consignável
          </Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simulações Salvas</Text>
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={48} color={colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma simulação salva</Text>
            <Text style={styles.emptySubtext}>
              Suas simulações aparecerão aqui
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 32,
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  newSimulation: {
    backgroundColor: colors.card,
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    borderStyle: 'dashed',
  },
  newSimulationText: {
    fontSize: 20,
    color: colors.accent,
    marginTop: spacing.sm,
  },
  newSimulationSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyState: {
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    marginTop: spacing.sm,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

