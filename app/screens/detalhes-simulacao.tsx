import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { typography, borderRadius, spacing } from '@/constants/theme';
import { Header, MobileNav, AlertDialog } from '@/components';
import { formatCurrency } from '@/utils/formatters';
import { api } from '@/services/api';
import { useAlert } from '@/hooks/useAlert';

interface Simulation {
  id: string;
  simulation_type: string;
  requested_amount: number;
  installments: number;
  interest_rate: number;
  installment_value: number;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function DetalhesSimulacao() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { alert, showError, showSuccess, showConfirm, showDestructive, dismissAlert } = useAlert();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimulation();
  }, []);

  const fetchSimulation = async () => {
    try {
      const response = await api.get(`/api/v1/simulations/${params.id}`);
      setSimulation(response.data);
    } catch (error) {
      console.error('Error fetching simulation:', error);
      showError('Erro', 'Não foi possível carregar a simulação');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleReprovar = () => {
    showDestructive(
      'Reprovar Simulação',
      'Tem certeza que deseja reprovar esta simulação?',
      async () => {
        try {
          await api.put(`/api/v1/simulations/${params.id}/status`, { status: 'rejected' });
          showSuccess('Sucesso', 'Simulação reprovada com sucesso', () => router.back());
        } catch (error) {
          showError('Erro', 'Não foi possível reprovar a simulação');
        }
      }
    );
  };

  const handleAprovar = () => {
    showConfirm(
      'Aprovar e Enviar',
      'Tem certeza que deseja aprovar e enviar esta simulação?',
      async () => {
        try {
          await api.put(`/api/v1/simulations/${params.id}/status`, { status: 'approved' });
          showSuccess('Sucesso', 'Simulação aprovada e enviada com sucesso', () => router.back());
        } catch (error) {
          showError('Erro', 'Não foi possível aprovar a simulação');
        }
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return colors.success || '#22c55e';
      case 'pending': return '#f59e0b';
      case 'rejected': return colors.error || '#ef4444';
      default: return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovada';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitada';
      default: return status;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <Header title="Detalhes da Simulação" showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Carregando simulação...</Text>
        </View>
        <MobileNav />
      </SafeAreaView>
    );
  }

  if (!simulation) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Detalhes da Simulação"
        subtitle={`#${simulation.id.substring(0, 8)}`}
        showBackButton
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        <View style={styles.statusBadgeContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(simulation.status) + '20', borderColor: getStatusColor(simulation.status) + '50' }]}>
            <Ionicons
              name={simulation.status === 'approved' ? 'checkmark-circle' : simulation.status === 'rejected' ? 'close-circle' : 'time'}
              size={14}
              color={getStatusColor(simulation.status)}
            />
            <Text style={[styles.statusBadgeText, { color: getStatusColor(simulation.status) }]}>
              {getStatusText(simulation.status)}
            </Text>
          </View>
        </View>

        <View style={[styles.preApprovedCard, { borderColor: colors.accent + '80', backgroundColor: colors.accent + '15' }]}>
          <Text style={[styles.preApprovedLabel, { color: colors.accent + 'CC' }]}>
            Valor Solicitado
          </Text>
          <Text style={[styles.preApprovedValue, { color: colors.accent }]}>
            {formatCurrency(simulation.requested_amount)}
          </Text>
        </View>

        {simulation.status === 'pending' && (
          <View style={styles.actionsRow}>
            <Pressable style={[styles.rejectButton, { borderColor: (colors.error || '#ef4444') + '50', backgroundColor: colors.card }]} onPress={handleReprovar}>
              <Ionicons name="close-circle" size={20} color={colors.error || '#ef4444'} />
              <Text style={[styles.rejectButtonText, { color: colors.error || '#ef4444' }]}>Reprovar</Text>
            </Pressable>
            <Pressable style={[styles.approveButton, { backgroundColor: colors.success || '#22c55e' }]} onPress={handleAprovar}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={[styles.approveButtonText, { color: '#fff' }]}>Aprovar e Enviar</Text>
            </Pressable>
          </View>
        )}

        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border + '80' }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calculator" size={20} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Detalhes Financeiros</Text>
          </View>
          <View style={styles.totalsList}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Valor Solicitado</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulation.requested_amount)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Número de Parcelas</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {simulation.installments}x
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Taxa de Juros (mensal)</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {simulation.interest_rate.toFixed(2)}%
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Valor da Parcela</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulation.installment_value)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Valor Total a Pagar</Text>
              <Text style={[styles.totalValue, { color: colors.accent, fontWeight: 'bold' }]}>
                {formatCurrency(simulation.total_amount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border + '80' }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Informações</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Tipo:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{simulation.simulation_type}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Data:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {new Date(simulation.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </ScrollView>

      {alert && (
        <AlertDialog
          visible={!!alert}
          title={alert.title}
          message={alert.message}
          buttons={alert.buttons}
          icon={alert.icon as any}
          iconColor={alert.iconColor}
          onDismiss={dismissAlert}
        />
      )}

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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: 14,
  },
  statusBadgeContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  preApprovedCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  preApprovedLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  preApprovedValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  approveButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  banksRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  bankBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  bankBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bankInfo: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  bankInfoText: {
    fontSize: 14,
  },
  totalsList: {
    gap: 0,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginVertical: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
  },
  formulasCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
  },
  formulasText: {
    fontSize: 12,
    lineHeight: 18,
  },
  formulasBold: {
    fontWeight: 'bold',
  },
});
