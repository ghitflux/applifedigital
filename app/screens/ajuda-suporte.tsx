import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, MobileNav, Accordion } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';

export default function AjudaSuporte() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const faqs = [
    {
      pergunta: 'Como solicitar uma simulação?',
      resposta:
        'Vá até a página inicial e clique em "Nova Simulação". Preencha os dados solicitados e aguarde a análise.',
    },
    {
      pergunta: 'Quanto tempo leva para receber o resultado?',
      resposta:
        'A análise leva em média de 2 a 4 horas úteis. Você será notificado assim que o resultado estiver disponível.',
    },
    {
      pergunta: 'Quais documentos são necessários?',
      resposta:
        'Você precisará enviar seu contracheque recente (últimos 3 meses) e documento de identidade.',
    },
    {
      pergunta: 'A simulação afeta meu score de crédito?',
      resposta:
        'Não, a simulação não impacta seu score de crédito. É apenas uma análise preliminar.',
    },
  ];

  const handleChat = () => {
    console.log('Abrir chat online');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:suporte@lifedigital.com.br');
  };

  const handlePhone = () => {
    Linking.openURL('tel:08001234567');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Ajuda e Suporte" showBackButton />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {/* Canais de Contato */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Entre em Contato</Text>

          <Pressable style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleChat}>
            <View style={[styles.iconWrapper, { backgroundColor: colors.accent + '20' }]}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.accent} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: colors.text }]}>Chat Online</Text>
              <Text style={[styles.contactSubtext, { color: colors.textSecondary }]}>Atendimento imediato</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>

          <Pressable style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleEmail}>
            <View style={[styles.iconWrapper, { backgroundColor: colors.accent + '20' }]}>
              <Ionicons name="mail-outline" size={24} color={colors.accent} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: colors.text }]}>Email</Text>
              <Text style={[styles.contactSubtext, { color: colors.textSecondary }]}>suporte@lifedigital.com.br</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>

          <Pressable style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handlePhone}>
            <View style={[styles.iconWrapper, { backgroundColor: colors.accent + '20' }]}>
              <Ionicons name="call-outline" size={24} color={colors.accent} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: colors.text }]}>Telefone</Text>
              <Text style={[styles.contactSubtext, { color: colors.textSecondary }]}>0800 123 4567</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <View style={styles.faqHeader}>
            <Ionicons name="help-circle-outline" size={24} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Perguntas Frequentes</Text>
          </View>

          <Accordion items={faqs} />
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
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    gap: spacing.md,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactSubtext: {
    fontSize: 12,
  },
});
