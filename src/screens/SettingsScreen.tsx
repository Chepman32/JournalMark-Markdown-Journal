import React from 'react';
import {View, Text, ScrollView, StyleSheet, Switch} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, Button} from '@/components/ui';
import {useSettingsStore} from '@/store';
import {useTheme} from '@/hooks/useTheme';
import {Typography, Spacing} from '@/constants/theme';

export const SettingsScreen: React.FC = () => {
  const {colors} = useTheme();
  const {settings, updateSettings, resetSettings, userPreferences} = useSettingsStore();

  const handleToggle = (key: string, value: boolean) => {
    updateSettings({[key]: value} as any);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>Preferences</Text>

        <Card>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={[styles.label, {color: colors.text}]}>Dark Mode</Text>
              <Text style={[styles.description, {color: colors.textSecondary}]}>
                Current: {settings.theme}
              </Text>
            </View>
            <Switch
              value={settings.theme === 'dark'}
              onValueChange={value =>
                updateSettings({theme: value ? 'dark' : 'light'})
              }
            />
          </View>
        </Card>

        <Card>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={[styles.label, {color: colors.text}]}>Auto-save</Text>
              <Text style={[styles.description, {color: colors.textSecondary}]}>
                Automatically save changes
              </Text>
            </View>
            <Switch
              value={settings.autosave}
              onValueChange={value => handleToggle('autosave', value)}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={[styles.label, {color: colors.text}]}>Show Word Count</Text>
            </View>
            <Switch
              value={settings.showWordCount}
              onValueChange={value => handleToggle('showWordCount', value)}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={[styles.label, {color: colors.text}]}>Notifications</Text>
              <Text style={[styles.description, {color: colors.textSecondary}]}>
                Daily reminders
              </Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={value => handleToggle('notifications', value)}
            />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, {color: colors.text}]}>Statistics</Text>

        <Card>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
              Total Entries
            </Text>
            <Text style={[styles.statValue, {color: colors.text}]}>
              {userPreferences.totalEntries}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
              Current Streak
            </Text>
            <Text style={[styles.statValue, {color: colors.text}]}>
              {userPreferences.streakDays} days
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
              Pro Status
            </Text>
            <Text style={[styles.statValue, {color: colors.text}]}>
              {userPreferences.isPro ? 'Active' : 'Free'}
            </Text>
          </View>
        </Card>

        <Text style={[styles.sectionTitle, {color: colors.text}]}>Advanced</Text>

        <Button
          title="Reset All Settings"
          onPress={resetSettings}
          variant="outline"
          fullWidth
        />

        <View style={styles.version}>
          <Text style={[styles.versionText, {color: colors.textTertiary}]}>
            JournalMark v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  sectionTitle: {
    ...Typography.title3,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flex: 1,
  },
  label: {
    ...Typography.body,
    marginBottom: 4,
  },
  description: {
    ...Typography.caption1,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  statLabel: {
    ...Typography.body,
  },
  statValue: {
    ...Typography.headline,
  },
  version: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  versionText: {
    ...Typography.caption1,
  },
});
