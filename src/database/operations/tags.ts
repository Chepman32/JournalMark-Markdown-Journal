import {getDatabase} from '../index';
import {Tag} from '@/types';
import {v4 as uuidv4} from 'uuid';

export const createTag = (name: string, color: string): Tag => {
  const db = getDatabase();
  const id = uuidv4();
  const now = Date.now();

  db.execute(
    'INSERT INTO tags (id, name, color, created_at) VALUES (?, ?, ?, ?)',
    [id, name, color, now],
  );

  return {
    id,
    name,
    color,
    createdAt: now,
    entryCount: 0,
  };
};

export const updateTag = (id: string, updates: {name?: string; color?: string}): void => {
  const db = getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  if (updates.name) {
    fields.push('name = ?');
    values.push(updates.name);
  }
  if (updates.color) {
    fields.push('color = ?');
    values.push(updates.color);
  }

  if (fields.length > 0) {
    values.push(id);
    db.execute(`UPDATE tags SET ${fields.join(', ')} WHERE id = ?`, values);
  }
};

export const deleteTag = (id: string): void => {
  const db = getDatabase();
  db.execute('DELETE FROM tags WHERE id = ?', [id]);
};

export const getTag = (id: string): Tag | null => {
  const db = getDatabase();
  const result = db.execute('SELECT * FROM tags WHERE id = ?', [id]);

  if (!result.rows || result.rows.length === 0) {
    return null;
  }

  return rowToTag(result.rows.item(0));
};

export const getAllTags = (): Tag[] => {
  const db = getDatabase();
  const result = db.execute('SELECT * FROM tags ORDER BY name ASC');

  const tags: Tag[] = [];
  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      tags.push(rowToTag(result.rows.item(i)));
    }
  }

  return tags;
};

export const getTagsWithCounts = (): Tag[] => {
  const db = getDatabase();
  const result = db.execute(
    `SELECT t.*, COUNT(et.entry_id) as entry_count
     FROM tags t
     LEFT JOIN entry_tags et ON t.id = et.tag_id
     GROUP BY t.id
     ORDER BY entry_count DESC, t.name ASC`,
  );

  const tags: Tag[] = [];
  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      tags.push({
        id: row.id,
        name: row.name,
        color: row.color,
        createdAt: row.created_at,
        entryCount: row.entry_count || 0,
      });
    }
  }

  return tags;
};

const rowToTag = (row: any): Tag => {
  const db = getDatabase();

  // Get entry count
  const countResult = db.execute(
    'SELECT COUNT(*) as count FROM entry_tags WHERE tag_id = ?',
    [row.id],
  );

  const entryCount = countResult.rows ? countResult.rows.item(0).count : 0;

  return {
    id: row.id,
    name: row.name,
    color: row.color,
    createdAt: row.created_at,
    entryCount,
  };
};
