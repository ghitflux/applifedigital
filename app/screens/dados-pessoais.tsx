import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { Input, Button } from '@/components';

export default function DadosPessoais() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dados Pessoais</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações Básicas</Text>

          <Input label="Nome Completo" value={name} onChangeText={setName} />
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input label="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Input label="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Endereço</Text>

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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  buttonContainer: {
    padding: 20,
  },
});
