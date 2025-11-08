import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Button, Header, MobileNav } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';

export default function NovaSimulacao() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const [interestRate] = useState('2.5'); // Fixed rate for now

  const handleSimulate = () => {
    if (!amount || !installments) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const requestedAmount = parseFloat(amount);
    const numInstallments = parseInt(installments);
    const rate = parseFloat(interestRate) / 100;

    // Calculate installment value
    const installmentValue =
      (requestedAmount * rate * Math.pow(1 + rate, numInstallments)) /
      (Math.pow(1 + rate, numInstallments) - 1);

    const totalAmount = installmentValue * numInstallments;

    // Navigate to results
    router.push({
      pathname: '/screens/resultado-simulacao',
      params: {
        requestedAmount: requestedAmount.toFixed(2),
        installments: numInstallments,
        interestRate,
        installmentValue: installmentValue.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Nova Simulação" showBackButton />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Dados da Simulação</Text>

          <Input
            label="Valor Desejado (R$)"
            placeholder="Ex: 10000"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Input
            label="Número de Parcelas"
            placeholder="Ex: 24"
            keyboardType="numeric"
            value={installments}
            onChangeText={setInstallments}
          />

          <Input
            label="Taxa de Juros (%)"
            value={interestRate}
            editable={false}
          />

          <Text style={[styles.info, { color: colors.textSecondary }]}>
            * Taxa de juros fixa mensal
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Simular" onPress={handleSimulate} />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  info: {
    fontSize: 12,
    marginTop: spacing.sm,
  },
  buttonContainer: {
    padding: spacing.lg,
  },
});

