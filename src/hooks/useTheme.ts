import {useColorScheme} from 'react-native';
import {Colors} from '@/constants/theme';
import {useSettingsStore} from '@/store';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const settings = useSettingsStore(state => state.settings);

  const colorScheme =
    settings.theme === 'auto'
      ? systemColorScheme || 'light'
      : settings.theme;

  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return {
    colors,
    isDark: colorScheme === 'dark',
  };
};
