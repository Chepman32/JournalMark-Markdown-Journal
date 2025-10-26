import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import {Card} from '@/components/ui';
import {Tag} from '@/components/ui/Tag';
import {JournalEntry} from '@/types';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing} from '@/constants/theme';

interface EntryCardProps {
  entry: JournalEntry;
  onPress: () => void;
}

export const EntryCard: React.FC<EntryCardProps> = ({entry, onPress}) => {
  const {colors} = useTheme();

  const preview = entry.content.substring(0, 150);
  const hasMore = entry.content.length > 150;

  return (
    <Card onPress={onPress} accessibilityLabel={`Journal entry: ${entry.title}`}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, {color: colors.text}]} numberOfLines={1}>
            {entry.title || 'Untitled'}
          </Text>
          <Text style={[styles.date, {color: colors.textTertiary}]}>
            {format(entry.createdAt, 'MMM d, yyyy • h:mm a')}
          </Text>
        </View>
        {entry.favorite && (
          <Text style={styles.favoriteIcon}>⭐</Text>
        )}
      </View>

      {preview && (
        <Text style={[styles.preview, {color: colors.textSecondary}]} numberOfLines={3}>
          {preview}
          {hasMore && '...'}
        </Text>
      )}

      {entry.mood && (
        <View style={styles.metadata}>
          <Text style={styles.mood}>{entry.mood}</Text>
        </View>
      )}

      {entry.tags.length > 0 && (
        <View style={styles.tags}>
          {entry.tags.slice(0, 3).map(tag => (
            <Tag key={tag} label={tag} size="small" />
          ))}
          {entry.tags.length > 3 && (
            <Text style={[styles.moreTag, {color: colors.textTertiary}]}>
              +{entry.tags.length - 3}
            </Text>
          )}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    ...Typography.headline,
    marginBottom: 4,
  },
  date: {
    ...Typography.caption1,
  },
  favoriteIcon: {
    fontSize: 20,
    marginLeft: Spacing.sm,
  },
  preview: {
    ...Typography.body,
    marginBottom: Spacing.sm,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  mood: {
    fontSize: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    alignItems: 'center',
  },
  moreTag: {
    ...Typography.caption1,
    marginLeft: Spacing.xs,
  },
});
