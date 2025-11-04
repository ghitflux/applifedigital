import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá! 👋</Text>
          <Text style={styles.name}>Bem-vindo de volta</Text>
        </View>
        <Pressable>
          <Ionicons name="notifications-outline" size={24} color="#1a1a1a" />
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Margem Disponível</Text>
        <Text style={styles.cardValue}>R$ 0,00</Text>
        <Text style={styles.cardSubtitle}>Consulte sua margem consignável</Text>
        <Pressable style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Consultar Margem</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionCard}>
            <Ionicons name="calculator" size={32} color="#007AFF" />
            <Text style={styles.actionText}>Nova Simulação</Text>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <Ionicons name="document-text" size={32} color="#007AFF" />
            <Text style={styles.actionText}>Enviar Documento</Text>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <Ionicons name="time" size={32} color="#007AFF" />
            <Text style={styles.actionText}>Histórico</Text>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <Ionicons name="help-circle" size={32} color="#007AFF" />
            <Text style={styles.actionText}>Ajuda</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Simulações Recentes</Text>
        <View style={styles.emptyState}>
          <Ionicons name="document-outline" size={48} color="#8E8E93" />
          <Text style={styles.emptyText}>Nenhuma simulação ainda</Text>
          <Text style={styles.emptySubtext}>Crie sua primeira simulação</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
