import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '@/utils/formatters';

export default function ResultadoSimulacao() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const requestedAmount = parseFloat(params.requestedAmount as string);
  const installments = parseInt(params.installments as string);
  const interestRate = parseFloat(params.interestRate as string);
  const installmentValue = parseFloat(params.installmentValue as string);
  const totalAmount = parseFloat(params.totalAmount as string);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resultado</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.successCard}>
          <Ionicons name="checkmark-circle" size={64} color="#34C759" />
          <Text style={styles.successTitle}>Simulação Realizada!</Text>
          <Text style={styles.successText}>
            Confira os detalhes abaixo
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Valor Solicitado</Text>
            <Text style={styles.value}>{formatCurrency(requestedAmount)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Número de Parcelas</Text>
            <Text style={styles.value}>{installments}x</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Taxa de Juros</Text>
            <Text style={styles.value}>{interestRate}% a.m.</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.labelBold}>Valor da Parcela</Text>
            <Text style={styles.valueBold}>{formatCurrency(installmentValue)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Valor Total</Text>
            <Text style={styles.value}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Contratar" onPress={() => {}} />
          <Button
            title="Fazer Nova Simulação"
            variant="outline"
            onPress={() => router.back()}
            style={{ marginTop: 12 }}
          />
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
  successCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 16,
  },
  successText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  labelBold: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  valueBold: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 20,
  },
});
