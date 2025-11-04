import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components';
import { useDocumentPicker } from '@/hooks/useDocumentPicker';
import * as ImagePicker from 'expo-image-picker';

export default function EnviarDocumento() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const { pickDocument } = useDocumentPicker();

  const handlePickDocument = async () => {
    const file = await pickDocument();
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso à câmera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedFile(result.assets[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      Alert.alert('Erro', 'Selecione um documento primeiro');
      return;
    }

    // TODO: Implement upload to API
    Alert.alert('Sucesso', 'Documento enviado com sucesso!');
    setSelectedFile(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enviar Documento</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#007AFF" />
          <Text style={styles.infoText}>
            Envie fotos ou PDFs dos seus documentos
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.optionButton} onPress={handleTakePhoto}>
            <Ionicons name="camera" size={48} color="#007AFF" />
            <Text style={styles.optionText}>Tirar Foto</Text>
          </Pressable>

          <Pressable style={styles.optionButton} onPress={handlePickDocument}>
            <Ionicons name="document" size={48} color="#007AFF" />
            <Text style={styles.optionText}>Escolher Arquivo</Text>
          </Pressable>
        </View>

        {selectedFile && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Arquivo Selecionado</Text>
            {selectedFile.uri && selectedFile.mimeType?.startsWith('image/') && (
              <Image source={{ uri: selectedFile.uri }} style={styles.previewImage} />
            )}
            <View style={styles.fileInfo}>
              <Ionicons name="document-text" size={24} color="#666" />
              <View style={styles.fileDetails}>
                <Text style={styles.fileName}>{selectedFile.name || 'Imagem'}</Text>
                <Text style={styles.fileSize}>
                  {selectedFile.size ? `${(selectedFile.size / 1024).toFixed(2)} KB` : ''}
                </Text>
              </View>
              <Pressable onPress={() => setSelectedFile(null)}>
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </Pressable>
            </View>
          </View>
        )}

        {selectedFile && (
          <View style={styles.uploadContainer}>
            <Button title="Enviar Documento" onPress={handleUpload} />
          </View>
        )}

        <View style={styles.documentsCard}>
          <Text style={styles.documentsTitle}>Documentos Aceitos</Text>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.documentText}>RG ou CNH</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.documentText}>CPF</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.documentText}>Comprovante de Residência</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.documentText}>Contracheque</Text>
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
  infoCard: {
    backgroundColor: '#EBF5FF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  previewCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  uploadContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  documentsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  documentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  documentText: {
    fontSize: 14,
    color: '#666',
  },
});
