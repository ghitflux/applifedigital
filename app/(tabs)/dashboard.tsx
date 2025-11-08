import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, borderRadius, spacing } from '@/constants/theme';

export default function Dashboard() {
  const router = useRouter();

  const handleNotifications = () => {
    router.push('/(tabs)/notificacoes');
  };

  const handleConsultarMargem = () => {
    router.push('/screens/consultar-margem');
  };

  const handleNovaSimulacao = () => {
    router.push('/screens/nova-simulacao');
  };

  const handleEnviarDocumento = () => {
    router.push('/screens/enviar-documento');
  };

  const handleHistorico = () => {
    router.push('/(tabs)/historico');
  };

  const handleAjuda = () => {
    router.push('/screens/ajuda-suporte');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, João!</Text>
          <Text style={styles.name}>Bem-vindo de volta</Text>
        </View>
        <Pressable onPress={handleNotifications}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sua Margem</Text>
        <View style={styles.marginCard}>
          <Text style={styles.marginLabel}>Margem Disponível</Text>
          <View style={styles.marginValueContainer}>
            <Text style={styles.marginValue}>R$ 5.240,00</Text>
            <View style={styles.dollarIcon}>
              <Ionicons name="logo-usd" size={24} color={colors.success} />
            </View>
          </View>
          <View style={styles.marginStatus}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.marginStatusText}>Atualizado há 2 horas</Text>
          </View>
          <Pressable style={styles.detailsButton} onPress={handleConsultarMargem}>
            <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.accent} />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionCard} onPress={handleNovaSimulacao}>
            <Ionicons name="document-text-outline" size={32} color={colors.accent} />
            <Text style={styles.actionText}>Nova Simulação</Text>
          </Pressable>

          <Pressable style={styles.actionCard} onPress={handleEnviarDocumento}>
            <Ionicons name="cloud-upload-outline" size={32} color={colors.accent} />
            <Text style={styles.actionText}>Enviar Documento</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status Atual</Text>
        
        <View style={styles.statusCard}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Documentos</Text>
            <Text style={styles.statusSubtitle}>Todos verificados</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <Ionicons name="time-outline" size={24} color={colors.warning} />
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Simulação #1234</Text>
            <Text style={styles.statusSubtitle}>Em análise</Text>
          </View>
          <Pressable>
            <Text style={styles.statusLink}>Ver</Text>
          </Pressable>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.md,
  },
  greeting: {
    fontSize: 24,
    color: colors.text,
  },
  name: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: colors.text,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.md,
  },
  marginCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  marginLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  marginValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  marginValue: {
    fontSize: 36,
    color: colors.accent,
  },
  dollarIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  marginStatusText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardSecondary,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    color: colors.accent,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    width: '48%',
    gap: spacing.sm,
  },
  actionText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusLink: {
    fontSize: 14,
    color: colors.accent,
  },
});

