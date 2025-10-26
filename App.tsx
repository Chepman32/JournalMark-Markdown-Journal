import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigation/AppNavigator';
import {initDatabase, initializeDefaultTemplates} from './src/database';
import {useSettingsStore, useEntriesStore, useTemplatesStore, useTagsStore} from './src/store';
import {LoadingSpinner} from './src/components/ui';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const loadSettings = useSettingsStore(state => state.loadSettings);
  const loadUserPreferences = useSettingsStore(state => state.loadUserPreferences);
  const loadEntries = useEntriesStore(state => state.loadEntries);
  const loadTemplates = useTemplatesStore(state => state.loadTemplates);
  const loadTags = useTagsStore(state => state.loadTags);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize database
        await initDatabase();

        // Initialize default templates
        initializeDefaultTemplates();

        // Load data into stores
        loadSettings();
        loadUserPreferences();
        loadEntries();
        loadTemplates();
        loadTags();

        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // In production, you might want to show an error screen
        setIsReady(true);
      }
    };

    initialize();
  }, []);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
