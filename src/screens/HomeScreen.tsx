import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {EntryCard} from '@/components/journal';
import {Button, EmptyState, LoadingSpinner, Input} from '@/components/ui';
import {useEntriesStore, useSettingsStore} from '@/store';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing} from '@/constants/theme';

export const HomeScreen: React.FC = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {entries, isLoading, loadEntries, searchEntries} = useEntriesStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      searchEntries(text);
    } else {
      loadEntries();
    }
  };

  const handleNewEntry = () => {
    navigation.navigate('Editor' as never, {mode: 'new'} as never);
  };

  const handleEntryPress = (entryId: string) => {
    navigation.navigate('Editor' as never, {entryId} as never);
  };

  if (isLoading && entries.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: colors.text}]}>Journal</Text>
        <Input
          placeholder="Search entries..."
          value={searchQuery}
          onChangeText={handleSearch}
          containerStyle={styles.searchBar}
        />
      </View>

      {entries.length === 0 ? (
        <EmptyState
          title="No Entries Yet"
          message="Start your journaling journey by creating your first entry"
          actionLabel="Create Entry"
          onAction={handleNewEntry}
        />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <EntryCard entry={item} onPress={() => handleEntryPress(item.id)} />
          )}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{height: Spacing.md}} />}
        />
      )}

      <View style={styles.fab}>
        <Button
          title="+ New Entry"
          onPress={handleNewEntry}
          variant="primary"
          size="large"
          accessibilityLabel="Create new entry"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.largeTitle,
    marginBottom: Spacing.md,
  },
  searchBar: {
    marginBottom: 0,
  },
  list: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
  },
});
