import RNFS from 'react-native-fs';
import {JournalEntry} from '@/types';
import {format} from 'date-fns';

export const exportToMarkdown = async (entries: JournalEntry[]): Promise<string> => {
  let markdown = '# Journal Export\n\n';
  markdown += `Exported on: ${format(new Date(), 'MMMM d, yyyy')}\n\n`;
  markdown += `Total Entries: ${entries.length}\n\n`;
  markdown += '---\n\n';

  for (const entry of entries) {
    markdown += `## ${entry.title || 'Untitled'}\n\n`;
    markdown += `**Date:** ${format(entry.createdAt, 'MMMM d, yyyy h:mm a')}\n\n`;

    if (entry.tags.length > 0) {
      markdown += `**Tags:** ${entry.tags.join(', ')}\n\n`;
    }

    if (entry.mood) {
      markdown += `**Mood:** ${entry.mood}\n\n`;
    }

    markdown += `${entry.content}\n\n`;
    markdown += '---\n\n';
  }

  const path = `${RNFS.DocumentDirectoryPath}/journal_export_${Date.now()}.md`;
  await RNFS.writeFile(path, markdown, 'utf8');

  return path;
};

export const exportToJSON = async (entries: JournalEntry[]): Promise<string> => {
  const exportData = {
    exportDate: new Date().toISOString(),
    totalEntries: entries.length,
    entries: entries.map(entry => ({
      ...entry,
      createdAt: new Date(entry.createdAt).toISOString(),
      updatedAt: new Date(entry.updatedAt).toISOString(),
    })),
  };

  const path = `${RNFS.DocumentDirectoryPath}/journal_export_${Date.now()}.json`;
  await RNFS.writeFile(path, JSON.stringify(exportData, null, 2), 'utf8');

  return path;
};

export const exportToText = async (entries: JournalEntry[]): Promise<string> => {
  let text = 'JOURNAL EXPORT\n\n';
  text += `Exported: ${format(new Date(), 'MMMM d, yyyy')}\n`;
  text += `Total Entries: ${entries.length}\n\n`;
  text += '='.repeat(50) + '\n\n';

  for (const entry of entries) {
    text += `${entry.title || 'Untitled'}\n`;
    text += `${format(entry.createdAt, 'MMMM d, yyyy h:mm a')}\n`;

    if (entry.tags.length > 0) {
      text += `Tags: ${entry.tags.join(', ')}\n`;
    }

    text += '\n' + entry.content + '\n\n';
    text += '-'.repeat(50) + '\n\n';
  }

  const path = `${RNFS.DocumentDirectoryPath}/journal_export_${Date.now()}.txt`;
  await RNFS.writeFile(path, text, 'utf8');

  return path;
};
