import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { typography, borderRadius, spacing } from '@/constants/theme';
import { Header, MobileNav } from '@/components';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>({
    margin: null,
    latestSimulation: null,
    documentsCount: 0,
    approvedDocuments: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [simulations, documents] = await Promise.all([
        api.get('/api/v1/simulations'),
        api.get('/api/v1/documents'),
      ]);

      // Get latest pending simulation
      const latestPending = simulations.data.find((s: any) => s.status === 'pending');

      // Count approved documents
      const approvedDocs = documents.data.filter((d: any) => d.status === 'approved');

      setDashboardData({
        margin: null, // Will come from real margin API later
        latestSimulation: latestPending,
        documentsCount: documents.data.length,
        approvedDocuments: approvedDocs.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData();
  }, []);

  const handleConsultarMargem = () => {
    router.push('/screens/consultar-margem');
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

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Carregando dashboard...</Text>
        </View>
        <MobileNav />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
      >

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Sua Margem</Text>
        <View style={[styles.marginCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.marginLabel, { color: colors.textSecondary }]}>Margem Disponível</Text>
          <View style={styles.marginValueContainer}>
            <Text style={[styles.marginValue, { color: colors.accent }]}>R$ 5.240,00</Text>
            <View style={[styles.dollarIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="logo-usd" size={24} color={colors.success} />
            </View>
          </View>
          <View style={styles.marginStatus}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={[styles.marginStatusText, { color: colors.textSecondary }]}>Atualizado há 2 horas</Text>
          </View>
          <Pressable style={[styles.detailsButton, { backgroundColor: colors.cardSecondary }]} onPress={handleConsultarMargem}>
            <Text style={[styles.detailsButtonText, { color: colors.accent }]}>Ver Detalhes</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.accent} />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ações Rápidas</Text>
        <Pressable style={[styles.actionCardFull, { backgroundColor: colors.card }]} onPress={handleEnviarDocumento}>
          <View style={[styles.actionIconContainer, { backgroundColor: colors.accent + '15' }]}>
            <Ionicons name="cloud-upload-outline" size={28} color={colors.accent} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionText, { color: colors.text }]}>Enviar Documento</Text>
            <Text style={[styles.actionSubtext, { color: colors.textSecondary }]}>Envie seus documentos para análise</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Status Atual</Text>
        
        <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
          <Ionicons
            name={dashboardData.approvedDocuments === dashboardData.documentsCount ? "checkmark-circle" : "document-text"}
            size={24}
            color={dashboardData.approvedDocuments === dashboardData.documentsCount ? colors.success : colors.warning}
          />
          <View style={styles.statusContent}>
            <Text style={[styles.statusTitle, { color: colors.text }]}>Documentos</Text>
            <Text style={[styles.statusSubtitle, { color: colors.textSecondary }]}>
              {dashboardData.documentsCount === 0
                ? 'Nenhum documento enviado'
                : `${dashboardData.approvedDocuments}/${dashboardData.documentsCount} aprovados`}
            </Text>
          </View>
          <Pressable onPress={() => router.push('/screens/meus-documentos')}>
            <Text style={[styles.statusLink, { color: colors.accent }]}>Ver</Text>
          </Pressable>
        </View>

        {dashboardData.latestSimulation && (
          <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
            <Ionicons name="time-outline" size={24} color={colors.warning} />
            <View style={styles.statusContent}>
              <Text style={[styles.statusTitle, { color: colors.text }]}>
                Simulação #{dashboardData.latestSimulation.id.substring(0, 8)}
              </Text>
              <Text style={[styles.statusSubtitle, { color: colors.textSecondary }]}>Em análise</Text>
            </View>
            <Pressable onPress={() => router.push({
              pathname: '/screens/detalhes-simulacao',
              params: { id: dashboardData.latestSimulation.id }
            })}>
              <Text style={[styles.statusLink, { color: colors.accent }]}>Ver</Text>
            </Pressable>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  marginCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  marginLabel: {
    fontSize: 14,
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
  },
  dollarIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
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
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: 8,
  },
  detailsButtonText: {
    fontSize: 14,
  },
  actionCardFull: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  actionSubtext: {
    fontSize: 12,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
  },
  statusLink: {
    fontSize: 14,
  },
});

