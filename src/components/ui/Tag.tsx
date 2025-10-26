import React from 'react';
import {Text, View, StyleSheet, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useAnimatedPress} from '@/hooks';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing, BorderRadius} from '@/constants/theme';

interface TagProps {
  label: string;
  color?: string;
  onPress?: () => void;
  onRemove?: () => void;
  size?: 'small' | 'medium';
}

export const Tag: React.FC<TagProps> = ({
  label,
  color,
  onPress,
  onRemove,
  size = 'medium',
}) => {
  const {colors} = useTheme();
  const {gesture, animatedStyle} = useAnimatedPress(onPress);

  const tagColor = color || colors.primary;

  const tagStyle: ViewStyle = {
    backgroundColor: `${tagColor}20`,
    borderRadius: BorderRadius.full,
    paddingHorizontal: size === 'small' ? Spacing.sm : Spacing.md,
    paddingVertical: size === 'small' ? 4 : Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  };

  const textStyle = {
    ...(size === 'small' ? Typography.caption1 : Typography.callout),
    color: tagColor,
    fontWeight: '600' as const,
  };

  const TagContent = (
    <Animated.View style={[tagStyle, onPress ? animatedStyle : null]}>
      <Text style={textStyle}>{label}</Text>
      {onRemove && (
        <Text style={{...textStyle, fontSize: 16}}>×</Text>
      )}
    </Animated.View>
  );

  if (onPress) {
    return <GestureDetector gesture={gesture}>{TagContent}</GestureDetector>;
  }

  return TagContent;
};
