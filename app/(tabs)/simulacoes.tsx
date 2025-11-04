import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Simulacoes() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simulações</Text>
      </View>

      <ScrollView style={styles.content}>
        <Pressable style={styles.newSimulation}>
          <Ionicons name="add-circle" size={48} color="#007AFF" />
          <Text style={styles.newSimulationText}>Nova Simulação</Text>
          <Text style={styles.newSimulationSubtext}>
            Simule um empréstimo consignável
          </Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simulações Salvas</Text>
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={48} color="#8E8E93" />
            <Text style={styles.emptyText}>Nenhuma simulação salva</Text>
            <Text style={styles.emptySubtext}>
              Suas simulações aparecerão aqui
            </Text>
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
  newSimulation: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  newSimulationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 12,
  },
  newSimulationSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
