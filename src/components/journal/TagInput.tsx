import React, {useState} from 'react';
import {View, TextInput, StyleSheet, FlatList} from 'react-native';
import {Tag} from '@/components/ui/Tag';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing, BorderRadius} from '@/constants/theme';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add tags...',
}) => {
  const {colors} = useTheme();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const handleRemove = (tag: string) => {
    onTagsChange(tags.filter(t => t !== tag));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text,
            ...Typography.body,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        accessible
        accessibilityLabel="Tag input"
      />
      {tags.length > 0 && (
        <View style={styles.tagsList}>
          {tags.map(tag => (
            <Tag
              key={tag}
              label={tag}
              onRemove={() => handleRemove(tag)}
              size="medium"
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
});
