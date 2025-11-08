import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, MobileNav } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';

interface Document {
  id: string;
  name: string;
  status: string;
}

export default function MeusDocumentos() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const documents: Document[] = [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Meus Documentos" showBackButton />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        <Pressable
          style={[styles.uploadButton, { backgroundColor: colors.card }]}
          onPress={() => router.push('/screens/enviar-documento')}
        >
          <Ionicons name="cloud-upload" size={32} color={colors.accent} />
          <Text style={[styles.uploadText, { color: colors.accent }]}>Enviar Novo Documento</Text>
        </Pressable>

        {documents.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>Nenhum documento enviado</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Envie seus documentos para agilizar o processo
            </Text>
          </View>
        ) : (
          documents.map((doc) => (
            <View key={doc.id} style={[styles.documentCard, { backgroundColor: colors.card }]}>
              <Ionicons name="document" size={24} color={colors.accent} />
              <View style={styles.documentInfo}>
                <Text style={[styles.documentName, { color: colors.text }]}>{doc.name}</Text>
                <Text style={[styles.documentStatus, { color: colors.textSecondary }]}>{doc.status}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
            </View>
          ))
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
  },
  uploadButton: {
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  documentCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  documentStatus: {
    fontSize: 14,
    marginTop: 2,
  },
});
