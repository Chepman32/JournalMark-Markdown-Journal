import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing} from '@/constants/theme';
import {Button} from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      {message && (
        <Text style={[styles.message, {color: colors.textSecondary}]}>{message}</Text>
      )}
      {actionLabel && onAction && (
        <View style={styles.action}>
          <Button title={actionLabel} onPress={onAction} variant="primary" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  icon: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.title2,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    ...Typography.body,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  action: {
    marginTop: Spacing.md,
  },
});
