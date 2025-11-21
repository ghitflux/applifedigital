import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';

export default function Welcome() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>App Life Digital</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Bem-vindo ao seu app de simulação de crédito</Text>

      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>Começar</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

