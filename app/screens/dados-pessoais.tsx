import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Button, Header, MobileNav } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';

export default function DadosPessoais() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Carregar dados básicos do contexto de autenticação
      if (user) {
        setName(user.name || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setCpf(user.cpf || '');
      }

      // Carregar dados de endereço do backend (se disponível)
      if (user?.id) {
        try {
          const profileRes = await api.get('/api/v1/users/profile');
          if (profileRes.data) {
            const profile = profileRes.data;
            setCep(profile.address_zipcode || '');
            setStreet(profile.address_street || '');
            setNumber(profile.address_number || '');
            setComplement(profile.address_complement || '');
            setNeighborhood(profile.address_neighborhood || '');
            setCity(profile.address_city || '');
            setState(profile.address_state || '');
          }
        } catch (error) {
          // Endpoint pode não existir, continuar com dados básicos
          console.log('Profile endpoint não disponível');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updateData = {
        name,
        phone,
      };

      const addressData = {
        address_zipcode: cep,
        address_street: street,
        address_number: number,
        address_complement: complement,
        address_neighborhood: neighborhood,
        address_city: city,
        address_state: state,
      };

      // Tentar atualizar dados básicos
      try {
        await api.put('/api/v1/users/me', updateData);
      } catch (error) {
        console.log('Erro ao atualizar dados básicos:', error);
      }

      // Tentar atualizar endereço
      try {
        await api.put('/api/v1/users/profile', addressData);
      } catch (error) {
        console.log('Erro ao atualizar endereço:', error);
      }

      // Recarregar dados após salvar
      await loadUserData();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <Header title="Dados Pessoais" showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Carregando dados...</Text>
        </View>
        <MobileNav />
      </SafeAreaView>
    );
  }

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
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" editable={false} />
          <Input label="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Input label="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" editable={false} />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Endereço</Text>

          <Input label="CEP" value={cep} onChangeText={setCep} keyboardType="numeric" />
          <Input label="Rua" value={street} onChangeText={setStreet} />
          <Input label="Número" value={number} onChangeText={setNumber} />
          <Input label="Complemento" value={complement} onChangeText={setComplement} />
          <Input label="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
          <Input label="Cidade" value={city} onChangeText={setCity} />
          <Input label="Estado" value={state} onChangeText={setState} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title={saving ? "Salvando..." : "Salvar Alterações"} onPress={handleSave} disabled={saving} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: 14,
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

