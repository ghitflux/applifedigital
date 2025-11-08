import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';
import { Header, MobileNav } from '@/components';

interface Simulation {
  id: string;
  type: 'Refinanciamento' | 'Novo Empréstimo';
  number: string;
  amount: string;
  status: 'Em Análise' | 'Aprovado' | 'Rejeitado';
  date: string;
}

export default function Historico() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handleBack = () => {
    router.push('/(tabs)/dashboard');
  };

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      <Header 
        title="Histórico" 
        subtitle="Acompanhe suas simulações" 
        showBackButton 
        onBackPress={handleBack} 
      />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {simulations.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <Ionicons name="time-outline" size={64} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>Nenhum histórico ainda</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Suas atividades aparecerão aqui
            </Text>
          </View>
        ) : (
          simulations.map((simulation) => {
            const handleNavigateToDetails = () => {
              router.push({
                pathname: '/screens/detalhes-simulacao',
                params: { id: simulation.id }
              });
            };

            const statusColor = getStatusColor(simulation.status);

            return (
              <Pressable 
                key={simulation.id} 
                style={[styles.card, { backgroundColor: colors.card }]}
                onPress={handleNavigateToDetails}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={[styles.cardType, { color: colors.text }]}>
                        {simulation.type} {simulation.number}
                      </Text>
                      <Text style={[styles.cardAmount, { color: colors.accent }]}>{simulation.amount}</Text>
                    </View>
                    <View style={[styles.statusIcon, { borderColor: statusColor }]}>
                      <Ionicons
                        name={getStatusIcon(simulation.status) as any}
                        size={24}
                        color={statusColor}
                      />
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={[styles.cardStatus, { color: statusColor }]}>
                      {simulation.status}
                    </Text>
                    <Text style={[styles.cardDate, { color: colors.textSecondary }]}>{simulation.date}</Text>
                  </View>
                </View>
                <Pressable 
                  style={[styles.cardAction, { borderTopColor: colors.border }]}
                  onPress={handleNavigateToDetails}
                >
                  <Text style={[styles.cardActionText, { color: colors.accent }]}>Ver Detalhes</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.accent} />
                </Pressable>
              </Pressable>
            );
          })
        )}
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
    padding: spacing.md,
  },
  card: {
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
    marginBottom: 4,
  },
  cardAmount: {
    fontSize: 20,
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
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderTopWidth: 1,
    gap: 8,
  },
  cardActionText: {
    fontSize: 14,
  },
  emptyState: {
    padding: 60,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
