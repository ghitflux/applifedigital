import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';
import { Header, MobileNav } from '@/components';
import { api } from '@/services/api';
import { formatDateSafe } from '@/utils/formatters';

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
  type: 'simulation';
}

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  status: string;
  created_at?: string | null;
  uploaded_at: string;
  type: 'document';
}

type HistoryItem = Simulation | Document;

export default function Historico() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const [simulationsRes, documentsRes] = await Promise.all([
        api.get('/api/v1/simulations').catch(() => ({ data: [] })),
        api.get('/api/v1/documents').catch(() => ({ data: [] })),
      ]);

      // Add type field to distinguish between items
      const simulationsWithType: Simulation[] = simulationsRes.data.map((sim: any) => ({
        ...sim,
        type: 'simulation' as const,
      }));

      const documentsWithType: Document[] = documentsRes.data.map((doc: any) => ({
        ...doc,
        type: 'document' as const,
      }));

      // Combine and sort by creation date (newest first)
      const combined = [...simulationsWithType, ...documentsWithType].sort(
        (a: HistoryItem, b: HistoryItem) => {
          const dateA = a.type === 'document'
            ? (a.created_at || a.uploaded_at)
            : a.created_at;
          const dateB = b.type === 'document'
            ? (b.created_at || b.uploaded_at)
            : b.created_at;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        }
      );

      setItems(combined);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHistory();
  }, []);

  const handleBack = () => {
    router.push('/(tabs)/dashboard');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return colors.success || '#22c55e';
      case 'rejected':
        return colors.error || '#ef4444';
      case 'pending':
        return colors.warning || '#f59e0b';
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'checkmark-circle';
      case 'rejected':
        return 'close-circle';
      case 'pending':
        return 'time';
      default:
        return 'information-circle';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      case 'pending':
        return 'Em Análise';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
        <Header title="Histórico" subtitle="Acompanhe suas simulações" showBackButton onBackPress={handleBack} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Carregando histórico...</Text>
        </View>
        <MobileNav />
      </SafeAreaView>
    );
  }

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
      >
        {items.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <Ionicons name="time-outline" size={64} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>Nenhum histórico ainda</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Suas atividades aparecerão aqui
            </Text>
          </View>
        ) : (
          items.map((item) => {
            const statusColor = getStatusColor(item.status);

            if (item.type === 'document') {
              const document = item as Document;
              return (
                <View
                  key={`doc-${document.id}`}
                  style={[styles.card, { backgroundColor: colors.card }]}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.cardType, { color: colors.text }]}>
                          📄 Documento Enviado
                        </Text>
                        <Text style={[styles.cardAmount, { color: colors.accent }]}>
                          {document.document_type}
                        </Text>
                        <Text style={[styles.cardSubtext, { color: colors.textSecondary, marginTop: 4 }]}>
                          {document.file_name}
                        </Text>
                      </View>
                      <View style={[styles.statusIcon, { borderColor: statusColor }]}>
                        <Ionicons
                          name={getStatusIcon(document.status) as any}
                          size={24}
                          color={statusColor}
                        />
                      </View>
                    </View>
                    <View style={styles.cardFooter}>
                      <Text style={[styles.cardStatus, { color: statusColor }]}>
                        {getStatusText(document.status)}
                      </Text>
                      <Text style={[styles.cardDate, { color: colors.textSecondary }]}>
                        {formatDateSafe(document.created_at || document.uploaded_at)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            } else {
              const simulation = item as Simulation;
              const handleNavigateToDetails = () => {
                router.push({
                  pathname: '/screens/detalhes-simulacao',
                  params: { id: simulation.id }
                });
              };

              return (
                <Pressable
                  key={`sim-${simulation.id}`}
                  style={[styles.card, { backgroundColor: colors.card }]}
                  onPress={handleNavigateToDetails}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <View>
                        <Text style={[styles.cardType, { color: colors.text }]}>
                          {simulation.simulation_type} #{simulation.id.substring(0, 8)}
                        </Text>
                        <Text style={[styles.cardAmount, { color: colors.accent }]}>
                          R$ {simulation.requested_amount.toFixed(2).replace('.', ',')}
                        </Text>
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
                        {getStatusText(simulation.status)}
                      </Text>
                      <Text style={[styles.cardDate, { color: colors.textSecondary }]}>
                        {formatDateSafe(simulation.created_at)}
                      </Text>
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
            }
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: 14,
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
  cardSubtext: {
    fontSize: 12,
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
