import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { typography, borderRadius, spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { AlertDialog } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/hooks/useAlert';

export default function Login() {
  const router = useRouter();
  const { colors } = useTheme();
  const { login } = useAuth();
  const { alert, showError, dismissAlert } = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showError('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)/dashboard');
    } else {
      showError('Erro', result.error || 'Erro ao fazer login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: colors.card, borderColor: colors.accent }]}>
          <Ionicons name="trending-up" size={32} color={colors.accent} />
        </View>
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>Bem-vindo de volta</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Entre com sua conta para continuar</Text>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          placeholder="seu@email.com"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          placeholder="••••••••"
          placeholderTextColor={colors.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary, opacity: loading ? 0.7 : 1 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.text }]}>Entrar</Text>
          )}
        </Pressable>

        <View style={styles.separator}>
          <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.separatorText, { color: colors.textSecondary }]}>OU CONTINUE COM</Text>
          <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
        </View>

        <Pressable style={[styles.googleButton, { backgroundColor: colors.card }]}>
          <Ionicons name="logo-google" size={20} color={colors.text} />
          <Text style={[styles.googleButtonText, { color: colors.text }]}>Continuar com Google</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/(auth)/register')}>
          <Text style={[styles.link, { color: colors.accent }]}>Não tem conta? Criar conta</Text>
        </Pressable>
      </View>

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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  form: {
    gap: spacing.md,
  },
  label: {
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
  },
  button: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    fontSize: 16,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    fontSize: 12,
    marginHorizontal: spacing.md,
    textTransform: 'uppercase',
  },
  googleButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  googleButtonText: {
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    marginTop: spacing.sm,
    fontSize: 14,
  },
});

