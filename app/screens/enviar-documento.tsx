import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components';
import { useDocumentPicker } from '@/hooks/useDocumentPicker';
import { colors, borderRadius, spacing } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';

export default function EnviarDocumento() {
  const insets = useSafeAreaInsets();
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Enviar Documento</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + spacing.md }}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={colors.accent} />
          <Text style={styles.infoText}>
            Envie fotos ou PDFs dos seus documentos
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.optionButton} onPress={handleTakePhoto}>
            <Ionicons name="camera" size={48} color={colors.accent} />
            <Text style={styles.optionText}>Tirar Foto</Text>
          </Pressable>

          <Pressable style={styles.optionButton} onPress={handlePickDocument}>
            <Ionicons name="document" size={48} color={colors.accent} />
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
              <Ionicons name="document-text" size={24} color={colors.textSecondary} />
              <View style={styles.fileDetails}>
                <Text style={styles.fileName}>{selectedFile.name || 'Imagem'}</Text>
                <Text style={styles.fileSize}>
                  {selectedFile.size ? `${(selectedFile.size / 1024).toFixed(2)} KB` : ''}
                </Text>
              </View>
              <Pressable onPress={() => setSelectedFile(null)}>
                <Ionicons name="close-circle" size={24} color={colors.error} />
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
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.documentText}>RG ou CNH</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.documentText}>CPF</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.documentText}>Comprovante de Residência</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.documentText}>Contracheque</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: colors.cardSecondary,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  optionButton: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  previewCard: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  fileSize: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  uploadContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  documentsCard: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  documentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  documentText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
