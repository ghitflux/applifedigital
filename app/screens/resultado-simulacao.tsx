import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '@/utils/formatters';
import { colors, typography, borderRadius, spacing } from '@/constants/theme';

export default function ResultadoSimulacao() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const requestedAmount = parseFloat(params.requestedAmount as string) || 29536.54;
  const installments = parseInt(params.installments as string) || 96;
  const interestRate = parseFloat(params.interestRate as string) || 8;
  const installmentValue = parseFloat(params.installmentValue as string) || 1613.31;
  const totalAmount = parseFloat(params.totalAmount as string) || 45734.90;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Resultado da Simulação</Text>
          <Text style={styles.subtitle}>#1234</Text>
        </View>
        <View style={styles.statusBadge}>
          <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          <Text style={styles.statusText}>Calculado</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.preApprovedCard}>
          <Text style={styles.preApprovedLabel}>Valor Pré-Liberado para Você!</Text>
          <Text style={styles.preApprovedValue}>R$ {formatCurrency(requestedAmount)}</Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.rejectButton}>
            <Ionicons name="close" size={20} color={colors.text} />
            <Text style={styles.rejectButtonText}>Reprovar</Text>
          </Pressable>
          <Pressable style={styles.approveButton}>
            <Ionicons name="checkmark" size={20} color={colors.text} />
            <Text style={styles.approveButtonText}>Aprovar e Enviar</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bancos Incluídos</Text>
          <View style={styles.banksRow}>
            <Pressable style={styles.bankButton}>
              <Text style={styles.bankButtonText}>DAYCOVAL</Text>
            </Pressable>
            <Pressable style={styles.bankButton}>
              <Text style={styles.bankButtonText}>CAIXA</Text>
            </Pressable>
          </View>
          <View style={styles.bankInfo}>
            <Text style={styles.bankInfoText}>Prazo: {installments} meses</Text>
            <Text style={styles.bankInfoText}>% Consultoria: {interestRate}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bar-chart" size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>Totais dos Bancos</Text>
          </View>
          <View style={styles.totalsCard}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Valor Parcela Total</Text>
              <Text style={styles.totalValue}>R$ {formatCurrency(installmentValue)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Saldo Devedor Total</Text>
              <Text style={styles.totalValue}>R$ {formatCurrency(totalAmount)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Valor Liberado Total</Text>
              <Text style={styles.totalValue}>R$ {formatCurrency(requestedAmount * 0.8)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Seguro Obrigatório Banco</Text>
              <Text style={styles.totalValue}>R$ 1.500,00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingTop: 60,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    color: colors.success,
  },
  content: {
    flex: 1,
  },
  preApprovedCard: {
    backgroundColor: colors.card,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  preApprovedLabel: {
    fontSize: 14,
    color: colors.success,
    marginBottom: spacing.sm,
  },
  preApprovedValue: {
    fontSize: 36,
    color: colors.success,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  rejectButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  approveButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.text,
  },
  banksRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  bankButton: {
    flex: 1,
    backgroundColor: colors.cardSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
  },
  bankButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  bankInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bankInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  totalsCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 14,
    color: colors.text,
  },
});

