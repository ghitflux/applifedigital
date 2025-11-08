import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, typography, borderRadius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    router.replace('/(tabs)/dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="trending-up" size={32} color={colors.accent} />
        </View>
      </View>
      
      <Text style={styles.title}>Bem-vindo de volta</Text>
      <Text style={styles.subtitle}>Entre com sua conta para continuar</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor={colors.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OU CONTINUE COM</Text>
          <View style={styles.separatorLine} />
        </View>

        <Pressable style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color={colors.text} />
          <Text style={styles.googleButtonText}>Continuar com Google</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.link}>Não tem conta? Criar conta</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.card,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  separatorText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginHorizontal: 16,
    textTransform: 'uppercase',
  },
  googleButton: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleButtonText: {
    color: colors.text,
    fontSize: 16,
  },
  link: {
    color: colors.accent,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
  },
});

