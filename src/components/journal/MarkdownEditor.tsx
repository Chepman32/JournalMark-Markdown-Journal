import React, {useState, useEffect} from 'react';
import {View, TextInput, ScrollView, StyleSheet, Platform} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing} from '@/constants/theme';

interface MarkdownEditorProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  autoFocus = false,
}) => {
  const {colors} = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Parse title and content from markdown
    const lines = value.split('\n');
    const titleLine = lines.find(line => line.startsWith('# '));
    if (titleLine) {
      setTitle(titleLine.replace('# ', ''));
      setContent(lines.filter(line => line !== titleLine).join('\n').trim());
    } else {
      setTitle('');
      setContent(value);
    }
  }, [value]);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    const newValue = `# ${text}\n\n${content}`;
    onChange(newValue);
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    const newValue = title ? `# ${title}\n\n${text}` : text;
    onChange(newValue);
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.contentContainer}
      keyboardDismissMode="interactive">
      <TextInput
        style={[
          styles.titleInput,
          {
            color: colors.text,
            ...Typography.title1,
          },
        ]}
        placeholder="Title"
        placeholderTextColor={colors.textTertiary}
        value={title}
        onChangeText={handleTitleChange}
        autoFocus={autoFocus}
        accessible
        accessibilityLabel="Entry title"
      />

      <TextInput
        style={[
          styles.contentInput,
          {
            color: colors.text,
            ...Typography.body,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={content}
        onChangeText={handleContentChange}
        multiline
        textAlignVertical="top"
        accessible
        accessibilityLabel="Entry content"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
  },
  titleInput: {
    marginBottom: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  contentInput: {
    flex: 1,
    minHeight: 400,
    paddingTop: Platform.OS === 'ios' ? Spacing.sm : 0,
  },
});
