module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@store': './src/store',
          '@database': './src/database',
          '@types': './src/types',
          '@animations': './src/animations',
          '@constants': './src/constants',
        },
      },
    ],
  ],
};
