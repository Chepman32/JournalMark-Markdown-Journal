import {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {SpringConfigs} from '@/animations';

export const useAnimatedPress = (onPress?: () => void) => {
  const scale = useSharedValue(1);

  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.96, SpringConfigs.normal);
    })
    .onFinalize(() => {
      scale.value = withSpring(1, SpringConfigs.normal);
    })
    .onEnd(() => {
      onPress?.();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return {gesture, animatedStyle};
};
