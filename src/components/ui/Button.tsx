import React from 'react';
import {Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useAnimatedPress} from '@/hooks';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing, BorderRadius} from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
  accessibilityLabel,
}) => {
  const {colors} = useTheme();
  const {gesture, animatedStyle} = useAnimatedPress(disabled ? undefined : onPress);

  const buttonStyle: ViewStyle = {
    backgroundColor:
      variant === 'primary'
        ? colors.primary
        : variant === 'secondary'
        ? colors.secondary
        : variant === 'outline'
        ? 'transparent'
        : 'transparent',
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? colors.border : undefined,
    paddingHorizontal: size === 'small' ? Spacing.md : size === 'large' ? Spacing.xl : Spacing.lg,
    paddingVertical: size === 'small' ? Spacing.xs : size === 'large' ? Spacing.md : Spacing.sm,
    borderRadius: BorderRadius.md,
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : undefined,
  };

  const textStyle: TextStyle = {
    color:
      variant === 'primary' || variant === 'secondary'
        ? '#FFFFFF'
        : colors.primary,
    ...(size === 'small' ? Typography.callout : size === 'large' ? Typography.headline : Typography.body),
    fontWeight: '600',
    textAlign: 'center',
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[buttonStyle, animatedStyle]}
        accessible
        accessibilityLabel={accessibilityLabel || title}
        accessibilityRole="button"
        accessibilityState={{disabled}}>
        <Text style={textStyle}>{title}</Text>
      </Animated.View>
    </GestureDetector>
  );
};
