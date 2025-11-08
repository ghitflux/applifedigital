import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Document {
  id: string;
  name: string;
  status: string;
}

export default function MeusDocumentos() {
  const router = useRouter();
  const documents: Document[] = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Documentos</Text>
      </View>

      <ScrollView style={styles.content}>
        <Pressable
          style={styles.uploadButton}
          onPress={() => router.push('/screens/enviar-documento')}
        >
          <Ionicons name="cloud-upload" size={32} color="#007AFF" />
          <Text style={styles.uploadText}>Enviar Novo Documento</Text>
        </Pressable>

        {documents.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#8E8E93" />
            <Text style={styles.emptyText}>Nenhum documento enviado</Text>
            <Text style={styles.emptySubtext}>
              Envie seus documentos para agilizar o processo
            </Text>
          </View>
        ) : (
          documents.map((doc) => (
            <View key={doc.id} style={styles.documentCard}>
              <Ionicons name="document" size={24} color="#007AFF" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{doc.name}</Text>
                <Text style={styles.documentStatus}>{doc.status}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </View>
          ))
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
  uploadButton: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  documentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  documentStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

