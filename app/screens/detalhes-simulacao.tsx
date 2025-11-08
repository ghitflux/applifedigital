import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { typography, borderRadius, spacing } from '@/constants/theme';
import { Header, MobileNav } from '@/components';
import { formatCurrency } from '@/utils/formatters';

export default function DetalhesSimulacao() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const simulacao = {
    id: (params.id as string) || '1234',
    tipo: 'Refinanciamento',
    status: 'aprovado',
    atribuidoA: 'Patrine',
    bancosIncluidos: ['DAYCOVAL', 'CAIXA'],
    prazo: '96 meses',
    consultoria: '8%',
    totaisBancos: {
      valorParcelaTotal: 1613.31,
      saldoDevedorTotal: 45734.90,
      valorLiberadoTotal: 37712.31,
      seguroObrigatorioBanco: 1500.00,
    },
    calculosFinanceiros: {
      valorTotalFinanciado: 83447.21,
      valorLiquido: 36212.31,
      custoConsultoria: 6675.78,
      custoConsultoriaLiquido: 5741.17,
      consultoriaPercentual: '86%',
    },
    liberadoCliente: 29536.54,
    data: '15 Out 2025',
  };

  const handleReprovar = () => {
    Alert.alert(
      'Reprovar Simulação',
      'Tem certeza que deseja reprovar esta simulação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reprovar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Simulação reprovada com sucesso');
            router.back();
          },
        },
      ]
    );
  };

  const handleAprovar = () => {
    Alert.alert(
      'Aprovar e Enviar',
      'Tem certeza que deseja aprovar e enviar esta simulação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aprovar',
          onPress: () => {
            Alert.alert('Sucesso', 'Simulação aprovada e enviada com sucesso');
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header 
        title="Resultado da Simulação" 
        subtitle={`#${simulacao.id}`}
        showBackButton 
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {simulacao.status === 'aprovado' && (
          <View style={styles.statusBadgeContainer}>
            <View style={[styles.statusBadge, { backgroundColor: colors.success + '20', borderColor: colors.success + '50' }]}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={[styles.statusBadgeText, { color: colors.success }]}>Calculado</Text>
            </View>
          </View>
        )}
        <View style={[styles.preApprovedCard, { borderColor: colors.success + '80', backgroundColor: colors.success + '15' }]}>
          <Text style={[styles.preApprovedLabel, { color: colors.success + 'CC' }]}>
            Valor Pré-Liberado para Você!
          </Text>
          <Text style={[styles.preApprovedValue, { color: colors.success }]}>
            {formatCurrency(simulacao.liberadoCliente)}
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={[styles.rejectButton, { borderColor: colors.error + '50', backgroundColor: colors.card }]} onPress={handleReprovar}>
            <Ionicons name="close-circle" size={20} color={colors.error} />
            <Text style={[styles.rejectButtonText, { color: colors.error }]}>Reprovar</Text>
          </Pressable>
          <Pressable style={[styles.approveButton, { backgroundColor: colors.success }]} onPress={handleAprovar}>
            <Ionicons name="checkmark-circle" size={20} color={colors.text} />
            <Text style={[styles.approveButtonText, { color: colors.text }]}>Aprovar e Enviar</Text>
          </Pressable>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border + '80' }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Bancos Incluídos</Text>
          <View style={styles.banksRow}>
            {simulacao.bancosIncluidos.map((banco) => (
              <View key={banco} style={[styles.bankBadge, { backgroundColor: colors.accent + '30', borderColor: colors.accent + '50' }]}>
                <Text style={[styles.bankBadgeText, { color: colors.accent }]}>{banco}</Text>
              </View>
            ))}
          </View>
          <View style={styles.bankInfo}>
            <Text style={[styles.bankInfoText, { color: colors.textSecondary }]}>Prazo: {simulacao.prazo}</Text>
            <Text style={[styles.bankInfoText, { color: colors.textSecondary }]}>% Consultoria: {simulacao.consultoria}</Text>
          </View>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border + '80' }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bar-chart" size={20} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Totais dos Bancos</Text>
          </View>
          <View style={styles.totalsList}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Valor Parcela Total</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulacao.totaisBancos.valorParcelaTotal)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Saldo Devedor Total</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulacao.totaisBancos.saldoDevedorTotal)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Valor Liberado Total</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulacao.totaisBancos.valorLiberadoTotal)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Seguro Obrigatório Banco</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulacao.totaisBancos.seguroObrigatorioBanco)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border + '80' }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calculator" size={20} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Cálculos Financeiros</Text>
          </View>
          <View style={styles.totalsList}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Valor Total Financiado</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulacao.calculosFinanceiros.valorTotalFinanciado)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Valor Líquido</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulacao.calculosFinanceiros.valorLiquido)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border + '50' }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Custo Consultoria</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                {formatCurrency(simulacao.calculosFinanceiros.custoConsultoria)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.formulasCard, { backgroundColor: colors.card, borderColor: colors.border + '80' }]}>
          <Text style={[styles.formulasText, { color: colors.textSecondary }]}>
            <Text style={[styles.formulasBold, { color: colors.text }]}>Fórmulas:</Text> Total Financiado = Saldo + Liberado |{' '}
            Valor Líquido = Liberado - Seguro | Custo = Total × % | Cliente = Líquido - Custo
          </Text>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
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
