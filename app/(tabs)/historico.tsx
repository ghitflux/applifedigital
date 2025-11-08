import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, borderRadius, spacing } from '@/constants/theme';

interface Simulation {
  id: string;
  type: 'Refinanciamento' | 'Novo Empréstimo';
  number: string;
  amount: string;
  status: 'Em Análise' | 'Aprovado' | 'Rejeitado';
  date: string;
}

export default function Historico() {
  // Mock data - replace with real data from API
  const simulations: Simulation[] = [
    {
      id: '1',
      type: 'Refinanciamento',
      number: '#1234',
      amount: 'R$ 15.000,00',
      status: 'Em Análise',
      date: '15 Out 2025',
    },
    {
      id: '2',
      type: 'Novo Empréstimo',
      number: '#1233',
      amount: 'R$ 8.500,00',
      status: 'Aprovado',
      date: '08 Out 2025',
    },
    {
      id: '3',
      type: 'Refinanciamento',
      number: '#1232',
      amount: 'R$ 12.000,00',
      status: 'Rejeitado',
      date: '01 Out 2025',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return colors.success;
      case 'Rejeitado':
        return colors.error;
      case 'Em Análise':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'checkmark-circle';
      case 'Rejeitado':
        return 'close-circle';
      case 'Em Análise':
        return 'time';
      default:
        return 'information-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico</Text>
        <Text style={styles.subtitle}>Acompanhe suas simulações</Text>
      </View>

      <ScrollView style={styles.content}>
        {simulations.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color={colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhum histórico ainda</Text>
            <Text style={styles.emptySubtext}>
              Suas atividades aparecerão aqui
            </Text>
          </View>
        ) : (
          simulations.map((simulation) => (
            <Pressable key={simulation.id} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardType}>
                      {simulation.type} {simulation.number}
                    </Text>
                    <Text style={styles.cardAmount}>{simulation.amount}</Text>
                  </View>
                  <View style={[styles.statusIcon, { borderColor: getStatusColor(simulation.status) }]}>
                    <Ionicons
                      name={getStatusIcon(simulation.status) as any}
                      size={24}
                      color={getStatusColor(simulation.status)}
                    />
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <Text style={[styles.cardStatus, { color: getStatusColor(simulation.status) }]}>
                    {simulation.status}
                  </Text>
                  <Text style={styles.cardDate}>{simulation.date}</Text>
                </View>
              </View>
              <Pressable style={styles.cardAction}>
                <Text style={styles.cardActionText}>Ver Detalhes</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.accent} />
              </Pressable>
            </Pressable>
          ))
        )}
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  cardContent: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  cardType: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  cardAmount: {
    fontSize: 20,
    color: colors.accent,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardStatus: {
    fontSize: 14,
  },
  cardDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  cardActionText: {
    fontSize: 14,
    color: colors.accent,
  },
  emptyState: {
    backgroundColor: colors.card,
    padding: 60,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
