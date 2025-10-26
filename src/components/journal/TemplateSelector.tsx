import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Card} from '@/components/ui';
import {Template} from '@/types';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing} from '@/constants/theme';

interface TemplateSelectorProps {
  templates: Template[];
  onSelect: (template: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  onSelect,
}) => {
  const {colors} = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {templates.map(template => (
        <Card
          key={template.id}
          onPress={() => onSelect(template)}
          style={styles.templateCard}
          accessibilityLabel={`Template: ${template.name}`}>
          <View style={styles.templateHeader}>
            {template.icon && (
              <Text style={styles.icon}>{template.icon}</Text>
            )}
            <Text style={[styles.title, {color: colors.text}]} numberOfLines={1}>
              {template.name}
            </Text>
          </View>
          {template.description && (
            <Text
              style={[styles.description, {color: colors.textSecondary}]}
              numberOfLines={2}>
              {template.description}
            </Text>
          )}
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  templateCard: {
    width: 160,
    marginRight: Spacing.md,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    ...Typography.headline,
    flex: 1,
  },
  description: {
    ...Typography.caption1,
  },
});
