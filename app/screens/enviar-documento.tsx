import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Header, MobileNav } from '@/components';
import { useDocumentPicker } from '@/hooks/useDocumentPicker';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';

export default function EnviarDocumento() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
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

    Alert.alert('Sucesso', 'Documento enviado com sucesso!');
    setSelectedFile(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Enviar Documento" showBackButton />

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        <View style={[styles.infoCard, { backgroundColor: colors.cardSecondary }]}>
          <Ionicons name="information-circle" size={24} color={colors.accent} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Envie fotos ou PDFs dos seus documentos
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable style={[styles.optionButton, { backgroundColor: colors.card }]} onPress={handleTakePhoto}>
            <Ionicons name="camera" size={48} color={colors.accent} />
            <Text style={[styles.optionText, { color: colors.accent }]}>Tirar Foto</Text>
          </Pressable>

          <Pressable style={[styles.optionButton, { backgroundColor: colors.card }]} onPress={handlePickDocument}>
            <Ionicons name="document" size={48} color={colors.accent} />
            <Text style={[styles.optionText, { color: colors.accent }]}>Escolher Arquivo</Text>
          </Pressable>
        </View>

        {selectedFile && (
          <View style={[styles.previewCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.previewTitle, { color: colors.text }]}>Arquivo Selecionado</Text>
            {selectedFile.uri && selectedFile.mimeType?.startsWith('image/') && (
              <Image source={{ uri: selectedFile.uri }} style={styles.previewImage} />
            )}
            <View style={styles.fileInfo}>
              <Ionicons name="document-text" size={24} color={colors.textSecondary} />
              <View style={styles.fileDetails}>
                <Text style={[styles.fileName, { color: colors.text }]}>{selectedFile.name || 'Imagem'}</Text>
                <Text style={[styles.fileSize, { color: colors.textSecondary }]}>
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

        <View style={[styles.documentsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.documentsTitle, { color: colors.text }]}>Documentos Aceitos</Text>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[styles.documentText, { color: colors.textSecondary }]}>RG ou CNH</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[styles.documentText, { color: colors.textSecondary }]}>CPF</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[styles.documentText, { color: colors.textSecondary }]}>Comprovante de Residência</Text>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[styles.documentText, { color: colors.textSecondary }]}>Contracheque</Text>
          </View>
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
  infoCard: {
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
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  optionButton: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  previewCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  fileSize: {
    fontSize: 12,
    marginTop: 2,
  },
  uploadContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  documentsCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  documentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
});
