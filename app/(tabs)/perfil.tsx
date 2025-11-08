import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, borderRadius, spacing } from '@/constants/theme';

export default function Perfil() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <Text style={styles.userName}>João Silva</Text>
          <Text style={styles.userEmail}>joao.silva@email.com</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Simulações</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>R$ 5.240</Text>
              <Text style={styles.statLabel}>Margem</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>

          <Pressable style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color={colors.text} />
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Dados Pessoais</Text>
              <Text style={styles.menuSubtext}>CPF, WhatsApp, Email</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={24} color={colors.text} />
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Meus Documentos</Text>
              <Text style={styles.menuSubtext}>Contracheques, comprovantes</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Notificações</Text>
              <Text style={styles.menuSubtext}>Gerencie suas preferências</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.text} />
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Segurança e Privacidade</Text>
              <Text style={styles.menuSubtext}>Senha, autenticação</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte</Text>

          <Pressable style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color={colors.text} />
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Ajuda e Suporte</Text>
              <Text style={styles.menuSubtext}>Central de ajuda, contato</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>
        </View>

        <Text style={styles.version}>Versão 1.0.0</Text>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </Pressable>
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
  profileCard: {
    backgroundColor: colors.card,
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  avatarText: {
    fontSize: 36,
    color: colors.text,
  },
  userName: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    color: colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  version: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  logoutButton: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.error,
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
  },
});
