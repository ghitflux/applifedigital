import { useState } from 'react';
import { Alert, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Input, Loading, Card } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '@/utils/formatters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

export default function ConsultarMargem() {
  const insets = useSafeAreaInsets();
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <Text style={styles.headerTitle}>Consultar Margem</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {!marginData ? (
            <View style={styles.section}>
              <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
                <Text style={styles.infoText}>
                  Consulte sua margem consignável disponível
                </Text>
              </View>

              <Card>
                <Input
                  label="CPF"
                  placeholder="000.000.000-00"
                  keyboardType="numeric"
                  value={cpf}
                  onChangeText={setCpf}
                />

                <Button title="Consultar" onPress={handleConsult} />
              </Card>
            </View>
          ) : (
            <>
              <Card style={styles.successCard}>
                <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
                <Text style={styles.successText}>Consulta Realizada!</Text>
              </Card>

              <Card style={styles.marginCard}>
                <View style={styles.marginItem}>
                  <Text style={styles.label}>Margem Total</Text>
                  <Text style={styles.value}>
                    {formatCurrency(marginData.totalMargin)}
                  </Text>
                </View>

                <View style={styles.marginItem}>
                  <Text style={styles.label}>Margem Utilizada</Text>
                  <Text style={[styles.value, { color: colors.error }]}>
                    {formatCurrency(marginData.usedMargin)}
                  </Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.marginItem}>
                  <Text style={styles.labelBold}>Margem Disponível</Text>
                  <Text style={styles.valueLarge}>
                    {formatCurrency(marginData.availableMargin)}
                  </Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.marginItem}>
                  <Text style={styles.label}>Empregador</Text>
                  <Text style={styles.valueText}>{marginData.employer}</Text>
                </View>

                <View style={styles.marginItem}>
                  <Text style={styles.label}>Tipo de Vínculo</Text>
                  <Text style={styles.valueText}>{marginData.employmentType}</Text>
                </View>
              </Card>

              <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 20 }]}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: `${colors.primary}1A`,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  successCard: {
    margin: 20,
    padding: 32,
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  marginCard: {
    marginHorizontal: 20,
  },
  marginItem: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  labelBold: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '500',
  },
  valueLarge: {
    fontSize: 24,
    color: colors.success,
    fontWeight: '700',
  },
  valueText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 20,
  },
});

