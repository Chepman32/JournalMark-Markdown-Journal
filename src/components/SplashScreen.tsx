import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import {Canvas, Circle, Group, vec} from '@shopify/react-native-skia';
import {useTheme} from '@/hooks/useTheme';
import {Typography} from '@/constants/theme';

const {width, height} = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const {colors} = useTheme();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, {
      stiffness: 180,
      damping: 12,
    });

    opacity.value = withSequence(
      withTiming(1, {duration: 300}),
      withTiming(1, {duration: 1500}),
      withTiming(0, {duration: 300}),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Animated.View style={animatedStyle}>
        <Canvas style={styles.canvas}>
          <Group>
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={60}
              color={colors.primary}
              opacity={0.2}
            />
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={40}
              color={colors.primary}
              opacity={0.5}
            />
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={20}
              color={colors.primary}
            />
          </Group>
        </Canvas>

        <Text style={[styles.title, {color: colors.text}]}>JournalMark</Text>
        <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
          Your offline journal
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    width: width,
    height: 200,
  },
  title: {
    ...Typography.largeTitle,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    marginTop: 8,
    textAlign: 'center',
  },
});
