import React from 'react';
import {TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing, BorderRadius} from '@/constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const {colors} = useTheme();

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          style={{
            ...Typography.subheadline,
            color: colors.textSecondary,
            marginBottom: Spacing.xs,
          }}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: error ? colors.error : colors.border,
            borderRadius: BorderRadius.md,
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.sm,
            ...Typography.body,
            color: colors.text,
          },
          style,
        ]}
        placeholderTextColor={colors.textTertiary}
        {...props}
      />
      {error && (
        <Text
          style={{
            ...Typography.caption1,
            color: colors.error,
            marginTop: Spacing.xs,
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};
