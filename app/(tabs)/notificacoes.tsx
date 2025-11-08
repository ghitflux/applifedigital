import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, borderRadius, spacing } from '@/constants/theme';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export default function Notificacoes() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Simulação Aprovada!',
      message: 'Sua simulação #1233 foi aprovada. Revise os termos e prossiga.',
      type: 'success',
      isRead: false,
      createdAt: 'Há 2 horas',
    },
    {
      id: '2',
      title: 'Documento Verificado',
      message: 'Seu contracheque foi verificado com sucesso.',
      type: 'info',
      isRead: false,
      createdAt: 'Hoje, 14:30',
    },
    {
      id: '3',
      title: 'Simulação em Análise',
      message: 'Sua solicitação #1234 está sendo analisada pela equipe.',
      type: 'warning',
      isRead: true,
      createdAt: 'Ontem, 18:45',
    },
    {
      id: '4',
      title: 'Bem-vindo!',
      message: 'Seja bem-vindo ao nosso app de crédito consignado.',
      type: 'info',
      isRead: true,
      createdAt: '15 Out 2025',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIconName = (type: string) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'time';
      case 'error':
        return 'close-circle';
      default:
        return 'document-text';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      default:
        return colors.accent;
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'success':
        return colors.success + '20';
      case 'warning':
        return colors.warning + '20';
      case 'error':
        return colors.error + '20';
      default:
        return colors.accent + '20';
    }
  };

  if (notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Notificações</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color={colors.textTertiary} />
          <Text style={styles.emptyText}>Nenhuma notificação</Text>
          <Text style={styles.emptySubtext}>Você está em dia!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notificações</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} não lidas</Text>
          )}
        </View>
        <Pressable>
          <Text style={styles.markAllRead}>Marcar todas como lidas</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.list}>
        {notifications.map((notification) => (
          <Pressable
            key={notification.id}
            style={[styles.notification, !notification.isRead && styles.unread]}
          >
            <View style={[styles.iconContainer, { backgroundColor: getIconBackground(notification.type) }]}>
              <Ionicons
                name={getIconName(notification.type) as any}
                size={24}
                color={getIconColor(notification.type)}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.createdAt}</Text>
            </View>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </Pressable>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    color: colors.text,
    marginBottom: 4,
  },
  unreadCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  markAllRead: {
    color: colors.accent,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  list: {
    flex: 1,
  },
  notification: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    padding: spacing.md,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: spacing.xs,
  },
});
