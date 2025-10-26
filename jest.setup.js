// Jest setup file
import 'react-native-gesture-handler/jestSetup';

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-quick-sqlite
jest.mock('react-native-quick-sqlite', () => ({
  open: jest.fn(() => ({
    execute: jest.fn(),
    close: jest.fn(),
  })),
}));

// Mock RNFS
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/path',
  writeFile: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-iap
jest.mock('react-native-iap', () => ({
  initConnection: jest.fn(() => Promise.resolve()),
  getProducts: jest.fn(() => Promise.resolve([])),
  requestPurchase: jest.fn(() => Promise.resolve()),
  finishTransaction: jest.fn(() => Promise.resolve()),
  purchaseUpdatedListener: jest.fn(() => ({remove: jest.fn()})),
  purchaseErrorListener: jest.fn(() => ({remove: jest.fn()})),
}));

// Silence console errors during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
