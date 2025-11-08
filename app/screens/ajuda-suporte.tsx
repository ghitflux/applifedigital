import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AjudaSuporte() {
  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/5511999999999');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:suporte@applifedigital.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:08001234567');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajuda e Suporte</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entre em Contato</Text>

          <Pressable style={styles.contactCard} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>WhatsApp</Text>
              <Text style={styles.contactText}>(11) 99999-9999</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </Pressable>

          <Pressable style={styles.contactCard} onPress={handleEmail}>
            <Ionicons name="mail" size={32} color="#007AFF" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactText}>suporte@applifedigital.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </Pressable>

          <Pressable style={styles.contactCard} onPress={handlePhone}>
            <Ionicons name="call" size={32} color="#34C759" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Telefone</Text>
              <Text style={styles.contactText}>0800 123 4567</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Como fazer uma simulação?</Text>
            <Text style={styles.faqAnswer}>
              Acesse o menu Simulações e preencha os dados solicitados.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Quanto tempo leva a aprovação?</Text>
            <Text style={styles.faqAnswer}>
              Em média, 2 a 3 dias úteis após o envio de todos os documentos.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Quais documentos são necessários?</Text>
            <Text style={styles.faqAnswer}>
              RG ou CNH, CPF, comprovante de residência e contracheque.
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
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  faqCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

