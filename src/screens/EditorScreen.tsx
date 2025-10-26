import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MarkdownEditor, TagInput, TemplateSelector} from '@/components/journal';
import {Button, IconButton} from '@/components/ui';
import {useEntriesStore, useTemplatesStore} from '@/store';
import {useTheme} from '@/hooks/useTheme';
import {Spacing} from '@/constants/theme';
import {JournalEntry} from '@/types';

export const EditorScreen: React.FC = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {createEntry, updateEntry, entries, deleteEntry} = useEntriesStore();
  const {templates, loadTemplates} = useTemplatesStore();

  const params = route.params as {entryId?: string; mode?: 'new' | 'edit'} | undefined;
  const entryId = params?.entryId;
  const isNewEntry = params?.mode === 'new' || !entryId;

  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [mood, setMood] = useState<string | undefined>();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadTemplates();

    if (entryId) {
      const entry = entries.find(e => e.id === entryId);
      if (entry) {
        const fullContent = entry.title ? `# ${entry.title}\n\n${entry.content}` : entry.content;
        setContent(fullContent);
        setTags(entry.tags);
        setMood(entry.mood);
      }
    }
  }, [entryId]);

  const handleSave = () => {
    if (!content.trim()) {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }

    // Parse title and content
    const lines = content.split('\n');
    const titleLine = lines.find(line => line.startsWith('# '));
    const title = titleLine ? titleLine.replace('# ', '') : 'Untitled';
    const bodyContent = lines.filter(line => line !== titleLine).join('\n').trim();

    if (isNewEntry) {
      createEntry({
        title,
        content: bodyContent,
        tags,
        mood,
        favorite: false,
        archived: false,
      });
    } else if (entryId) {
      updateEntry(entryId, {
        title,
        content: bodyContent,
        tags,
        mood,
      });
    }

    setHasChanges(false);
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!entryId) return;

    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEntry(entryId);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const handleTemplateSelect = (template: any) => {
    setContent(template.content);
    setHasChanges(true);
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    setHasChanges(true);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]} edges={['top']}>
      <View style={styles.header}>
        <Button title="Cancel" onPress={() => navigation.goBack()} variant="ghost" />
        <View style={styles.headerActions}>
          {!isNewEntry && (
            <Button title="Delete" onPress={handleDelete} variant="ghost" />
          )}
          <Button title="Save" onPress={handleSave} variant="primary" />
        </View>
      </View>

      {isNewEntry && templates.length > 0 && (
        <TemplateSelector templates={templates} onSelect={handleTemplateSelect} />
      )}

      <MarkdownEditor
        value={content}
        onChange={handleContentChange}
        autoFocus={isNewEntry}
      />

      <View style={[styles.footer, {backgroundColor: colors.surface, borderTopColor: colors.divider}]}>
        <TagInput tags={tags} onTagsChange={setTags} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
  },
});
