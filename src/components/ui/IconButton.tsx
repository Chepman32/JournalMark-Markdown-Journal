import React from 'react';
import {ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useAnimatedPress} from '@/hooks';
import {useTheme} from '@/hooks/useTheme';
import {Spacing, BorderRadius, HitSlop} from '@/constants/theme';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'filled' | 'outlined';
  color?: string;
  disabled?: boolean;
  accessibilityLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 'medium',
  variant = 'default',
  color,
  disabled = false,
  accessibilityLabel,
}) => {
  const {colors} = useTheme();
  const {gesture, animatedStyle} = useAnimatedPress(disabled ? undefined : onPress);

  const sizeValue = size === 'small' ? 32 : size === 'large' ? 48 : 40;

  const buttonStyle: ViewStyle = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      variant === 'filled'
        ? color || colors.primary
        : variant === 'outlined'
        ? 'transparent'
        : 'transparent',
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderColor: variant === 'outlined' ? color || colors.border : undefined,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[buttonStyle, animatedStyle]}
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{disabled}}>
        {icon}
      </Animated.View>
    </GestureDetector>
  );
};
