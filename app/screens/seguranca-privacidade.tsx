import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Header, MobileNav, Input, ThemeToggle } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';

export default function SegurancaPrivacidade() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [usageAnalysis, setUsageAnalysis] = useState(true);

  const handlePasswordChange = () => {
    // Implementar lógica de alteração de senha
    if (newPassword !== confirmPassword) {
      // Mostrar erro
      return;
    }
    // Chamar API para alterar senha
    console.log('Alterar senha');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Segurança e Privacidade" showBackButton />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {/* Alterar Senha */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: colors.accent + '20' }]}>
              <Ionicons name="lock-closed-outline" size={24} color={colors.accent} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Alterar Senha</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Senha Atual</Text>
              <Input
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                placeholder="Digite sua senha atual"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Nova Senha</Text>
              <Input
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholder="Digite sua nova senha"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Confirmar Nova Senha</Text>
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Confirme sua nova senha"
                style={styles.input}
              />
            </View>

            <Button
              title="Alterar Senha"
              onPress={handlePasswordChange}
              style={styles.submitButton}
            />
          </View>
        </View>

        {/* Privacidade */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: colors.accent + '20' }]}>
              <Ionicons name="shield-checkmark-outline" size={24} color={colors.accent} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Privacidade</Text>
          </View>

          <View style={styles.settingsList}>
            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Notificações por Email</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Receber atualizações por email
                </Text>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Notificações Push</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Receber notificações no dispositivo
                </Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Análise de Uso</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Ajudar a melhorar o app
                </Text>
              </View>
              <Switch
                value={usageAnalysis}
                onValueChange={setUsageAnalysis}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Tema</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Modo claro ou escuro
                </Text>
              </View>
              <ThemeToggle />
            </View>
          </View>
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
  },
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    marginTop: spacing.sm,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    // Styles applied via Input component
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  settingsList: {
    marginTop: spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  settingContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
  },
});
