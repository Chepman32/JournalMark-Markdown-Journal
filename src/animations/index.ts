import {withSpring, withTiming, Easing, SharedValue} from 'react-native-reanimated';

export const SpringConfigs = {
  gentle: {
    stiffness: 180,
    damping: 14,
    mass: 1,
  },
  normal: {
    stiffness: 240,
    damping: 18,
    mass: 1,
  },
  bouncy: {
    stiffness: 320,
    damping: 22,
    mass: 1,
  },
};

export const TimingConfigs = {
  fast: {
    duration: 200,
    easing: Easing.out(Easing.cubic),
  },
  normal: {
    duration: 300,
    easing: Easing.out(Easing.cubic),
  },
  slow: {
    duration: 500,
    easing: Easing.out(Easing.cubic),
  },
};

export const pressSpring = (value: SharedValue<number>, target: number = 1) => {
  'worklet';
  value.value = withSpring(target, SpringConfigs.normal);
};

export const pressScale = (value: SharedValue<number>, pressed: boolean) => {
  'worklet';
  value.value = withSpring(pressed ? 0.96 : 1, SpringConfigs.normal);
};

export const fadeIn = (value: SharedValue<number>) => {
  'worklet';
  value.value = withTiming(1, TimingConfigs.normal);
};

export const fadeOut = (value: SharedValue<number>) => {
  'worklet';
  value.value = withTiming(0, TimingConfigs.normal);
};

export const slideIn = (value: SharedValue<number>, from: number = 100) => {
  'worklet';
  value.value = withSpring(0, SpringConfigs.normal);
};

export const slideOut = (value: SharedValue<number>, to: number = 100) => {
  'worklet';
  value.value = withTiming(to, TimingConfigs.fast);
};
