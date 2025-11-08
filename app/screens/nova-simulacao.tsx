import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input, Button } from '@/components';

export default function NovaSimulacao() {
  const router = useRouter();
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nova Simulação</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados da Simulação</Text>

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

          <Text style={styles.info}>
            * Taxa de juros fixa mensal
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Simular" onPress={handleSimulate} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  info: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  buttonContainer: {
    padding: 20,
  },
});

