import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components';
import { useBiometric } from '@/hooks/useBiometric';

export default function SegurancaPrivacidade() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { isAvailable, biometricType, authenticate } = useBiometric();

  const handleBiometricToggle = async (value: boolean) => {
    if (value && isAvailable) {
      const result = await authenticate('Ative a autenticação biométrica');
      if (result.success) {
        setBiometricEnabled(true);
      }
    } else {
      setBiometricEnabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Segurança</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autenticação</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="finger-print" size={24} color="#007AFF" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Biometria</Text>
                <Text style={styles.settingDescription}>
                  {isAvailable
                    ? `Use ${biometricType.join(' ou ')} para entrar`
                    : 'Não disponível neste dispositivo'}
                </Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricToggle}
              disabled={!isAvailable}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color="#007AFF" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Notificações</Text>
                <Text style={styles.settingDescription}>
                  Receba atualizações importantes
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Senha</Text>

          <View style={styles.buttonContainer}>
            <Button title="Alterar Senha" variant="outline" onPress={() => {}} />
          </View>
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  buttonContainer: {
    padding: 20,
  },
});

