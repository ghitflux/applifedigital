import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Button, Header, MobileNav } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';

export default function DadosPessoais() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Dados Pessoais" showBackButton />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Informações Básicas</Text>

          <Input label="Nome Completo" value={name} onChangeText={setName} />
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input label="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Input label="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Endereço</Text>

          <Input label="CEP" keyboardType="numeric" />
          <Input label="Rua" />
          <Input label="Número" />
          <Input label="Complemento" />
          <Input label="Bairro" />
          <Input label="Cidade" />
          <Input label="Estado" />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Salvar Alterações" onPress={() => {}} />
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
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  buttonContainer: {
    padding: spacing.lg,
  },
});

