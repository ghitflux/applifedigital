import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { useTheme } from '@/contexts/ThemeContext';
import { borderRadius, spacing } from '@/constants/theme';
import { Header, MobileNav } from '@/components';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export default function Notificacoes() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const handleBack = () => {
    router.push('/(tabs)/dashboard');
  };

  const [notifications, setNotifications] = useState<Notification[]>([
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

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    swipeableRefs.current[id]?.close();
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    Object.values(swipeableRefs.current).forEach(ref => {
      if (ref) ref.close();
    });
  };

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
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <Header title="Notificações" showBackButton onBackPress={handleBack} />
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color={colors.textTertiary} />
          <Text style={[styles.emptyText, { color: colors.text }]}>Nenhuma notificação</Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Você está em dia!</Text>
        </View>
        <MobileNav />
      </SafeAreaView>
    );
  }

  const renderMarkAsReadAction = (notification: Notification, progress: Animated.AnimatedInterpolation<number>) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.rightAction, { backgroundColor: colors.success + '20' }]}>
        <Animated.View style={[styles.actionContent, { transform: [{ scale }] }]}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={[styles.actionText, { color: colors.text }]}>Marcar como lido</Text>
        </Animated.View>
      </View>
    );
  };

  const renderDeleteAction = (notification: Notification, progress: Animated.AnimatedInterpolation<number>) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.leftAction, { backgroundColor: colors.error + '20' }]}>
        <Animated.View style={[styles.actionContent, { transform: [{ scale }] }]}>
          <Ionicons name="trash" size={24} color={colors.error} />
          <Text style={[styles.actionText, { color: colors.text }]}>Excluir</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
        <Header 
          title="Notificações" 
          subtitle={unreadCount > 0 ? `${unreadCount} não lidas` : undefined}
          showBackButton 
          onBackPress={handleBack} 
        />
        {unreadCount > 0 && (
          <Pressable style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={[styles.markAllText, { color: colors.accent }]}>Marcar todas como lidas</Text>
          </Pressable>
        )}
      </View>

      <ScrollView 
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {notifications.map((notification) => (
          <Swipeable
            key={notification.id}
            ref={(ref) => {
              if (ref) {
                swipeableRefs.current[notification.id] = ref;
              }
            }}
            renderLeftActions={(progress) => renderDeleteAction(notification, progress)}
            renderRightActions={(progress) => renderMarkAsReadAction(notification, progress)}
            onSwipeableLeftOpen={() => deleteNotification(notification.id)}
            onSwipeableRightOpen={() => markAsRead(notification.id)}
            leftThreshold={40}
            rightThreshold={40}
          >
            <Pressable
              style={[
                styles.notification,
                { backgroundColor: colors.card },
                !notification.isRead && { borderLeftColor: colors.accent, borderLeftWidth: 3 }
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: getIconBackground(notification.type) }]}>
                <Ionicons
                  name={getIconName(notification.type) as any}
                  size={24}
                  color={getIconColor(notification.type)}
                />
              </View>
              <View style={styles.content}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>{notification.title}</Text>
                <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>{notification.message}</Text>
                <Text style={[styles.notificationTime, { color: colors.textSecondary }]}>{notification.createdAt}</Text>
              </View>
              {!notification.isRead && <View style={[styles.unreadDot, { backgroundColor: colors.accent }]} />}
            </Pressable>
          </Swipeable>
        ))}
      </ScrollView>
      
      <MobileNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // backgroundColor applied dynamically
  },
  markAllButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'flex-end',
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: spacing.sm,
  },
  list: {
    flex: 1,
  },
  notification: {
    flexDirection: 'row',
    padding: spacing.md,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
    alignItems: 'flex-start',
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
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: spacing.xs,
  },
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: spacing.md,
    borderRadius: borderRadius.md,
    paddingLeft: spacing.md,
  },
  rightAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: spacing.md,
    borderRadius: borderRadius.md,
    paddingRight: spacing.md,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
