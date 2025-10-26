import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useAnimatedPress} from '@/hooks';
import {useTheme} from '@/hooks/useTheme';
import {Spacing, BorderRadius, Shadows} from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  padding?: keyof typeof Spacing;
  accessibilityLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevated = true,
  padding = 'md',
  accessibilityLabel,
}) => {
  const {colors} = useTheme();
  const {gesture, animatedStyle} = useAnimatedPress(onPress);

  const cardStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[padding],
    ...(elevated ? Shadows.md : {}),
  };

  const CardContent = (
    <Animated.View
      style={[cardStyle, style, onPress ? animatedStyle : null]}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}>
      {children}
    </Animated.View>
  );

  if (onPress) {
    return <GestureDetector gesture={gesture}>{CardContent}</GestureDetector>;
  }

  return CardContent;
};
