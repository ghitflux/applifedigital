import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Button, Input, Loading } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '@/utils/formatters';

export default function ConsultarMargem() {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [marginData, setMarginData] = useState<any>(null);

  const handleConsult = async () => {
    if (!cpf) {
      Alert.alert('Erro', 'Digite seu CPF');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMarginData({
        totalMargin: 15000,
        usedMargin: 3000,
        availableMargin: 12000,
        employer: 'Empresa Exemplo',
        employmentType: 'CLT',
      });
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consultar Margem</Text>
      </View>

      <ScrollView style={styles.content}>
        {!marginData ? (
          <View style={styles.form}>
            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
              <Text style={styles.infoText}>
                Consulte sua margem consignável disponível
              </Text>
            </View>

            <View style={styles.card}>
              <Input
                label="CPF"
                placeholder="000.000.000-00"
                keyboardType="numeric"
                value={cpf}
                onChangeText={setCpf}
              />

              <Button title="Consultar" onPress={handleConsult} />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.resultCard}>
              <Ionicons name="checkmark-circle" size={48} color="#34C759" />
              <Text style={styles.resultTitle}>Consulta Realizada!</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.marginItem}>
                <Text style={styles.marginLabel}>Margem Total</Text>
                <Text style={styles.marginValue}>
                  {formatCurrency(marginData.totalMargin)}
                </Text>
              </View>

              <View style={styles.marginItem}>
                <Text style={styles.marginLabel}>Margem Utilizada</Text>
                <Text style={[styles.marginValue, { color: '#FF3B30' }]}>
                  {formatCurrency(marginData.usedMargin)}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.marginItem}>
                <Text style={styles.marginLabelBold}>Margem Disponível</Text>
                <Text style={styles.marginValueBold}>
                  {formatCurrency(marginData.availableMargin)}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.marginItem}>
                <Text style={styles.marginLabel}>Empregador</Text>
                <Text style={styles.marginValue}>{marginData.employer}</Text>
              </View>

              <View style={styles.marginItem}>
                <Text style={styles.marginLabel}>Tipo de Vínculo</Text>
                <Text style={styles.marginValue}>{marginData.employmentType}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Nova Consulta"
                variant="outline"
                onPress={() => setMarginData(null)}
              />
            </View>
          </>
        )}
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
  form: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#EBF5FF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 12,
  },
  marginItem: {
    paddingVertical: 12,
  },
  marginLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  marginValue: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  marginLabelBold: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  marginValueBold: {
    fontSize: 24,
    color: '#34C759',
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
