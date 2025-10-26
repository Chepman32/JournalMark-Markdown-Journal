import {getDatabase} from '../index';
import {JournalEntry} from '@/types';
import {v4 as uuidv4} from 'uuid';

export const createEntry = (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>): JournalEntry => {
  const db = getDatabase();
  const now = Date.now();
  const id = uuidv4();

  const newEntry: JournalEntry = {
    ...entry,
    id,
    createdAt: now,
    updatedAt: now,
  };

  db.execute(
    `INSERT INTO entries (id, title, content, created_at, updated_at, mood, weather, location, favorite, archived, template_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newEntry.id,
      newEntry.title,
      newEntry.content,
      newEntry.createdAt,
      newEntry.updatedAt,
      newEntry.mood || null,
      newEntry.weather || null,
      newEntry.location || null,
      newEntry.favorite ? 1 : 0,
      newEntry.archived ? 1 : 0,
      newEntry.templateId || null,
    ],
  );

  // Add tags
  if (entry.tags && entry.tags.length > 0) {
    addTagsToEntry(newEntry.id, entry.tags);
  }

  return newEntry;
};

export const updateEntry = (id: string, updates: Partial<JournalEntry>): void => {
  const db = getDatabase();
  const now = Date.now();

  const fields: string[] = [];
  const values: any[] = [];

  if (updates.title !== undefined) {
    fields.push('title = ?');
    values.push(updates.title);
  }
  if (updates.content !== undefined) {
    fields.push('content = ?');
    values.push(updates.content);
  }
  if (updates.mood !== undefined) {
    fields.push('mood = ?');
    values.push(updates.mood);
  }
  if (updates.weather !== undefined) {
    fields.push('weather = ?');
    values.push(updates.weather);
  }
  if (updates.location !== undefined) {
    fields.push('location = ?');
    values.push(updates.location);
  }
  if (updates.favorite !== undefined) {
    fields.push('favorite = ?');
    values.push(updates.favorite ? 1 : 0);
  }
  if (updates.archived !== undefined) {
    fields.push('archived = ?');
    values.push(updates.archived ? 1 : 0);
  }

  fields.push('updated_at = ?');
  values.push(now);
  values.push(id);

  if (fields.length > 1) {
    db.execute(`UPDATE entries SET ${fields.join(', ')} WHERE id = ?`, values);
  }

  // Update tags if provided
  if (updates.tags) {
    db.execute('DELETE FROM entry_tags WHERE entry_id = ?', [id]);
    if (updates.tags.length > 0) {
      addTagsToEntry(id, updates.tags);
    }
  }
};

export const deleteEntry = (id: string): void => {
  const db = getDatabase();
  db.execute('DELETE FROM entries WHERE id = ?', [id]);
};

export const getEntry = (id: string): JournalEntry | null => {
  const db = getDatabase();
  const result = db.execute('SELECT * FROM entries WHERE id = ?', [id]);

  if (!result.rows || result.rows.length === 0) {
    return null;
  }

  const row = result.rows.item(0);
  return rowToEntry(row);
};

export const getAllEntries = (options: {
  limit?: number;
  offset?: number;
  archived?: boolean;
  favorite?: boolean;
  sortBy?: 'created' | 'updated';
  sortOrder?: 'ASC' | 'DESC';
} = {}): JournalEntry[] => {
  const db = getDatabase();

  let query = 'SELECT * FROM entries WHERE 1=1';
  const params: any[] = [];

  if (options.archived !== undefined) {
    query += ' AND archived = ?';
    params.push(options.archived ? 1 : 0);
  }

  if (options.favorite !== undefined) {
    query += ' AND favorite = ?';
    params.push(options.favorite ? 1 : 0);
  }

  const sortColumn = options.sortBy === 'updated' ? 'updated_at' : 'created_at';
  const sortOrder = options.sortOrder || 'DESC';
  query += ` ORDER BY ${sortColumn} ${sortOrder}`;

  if (options.limit) {
    query += ' LIMIT ?';
    params.push(options.limit);
  }

  if (options.offset) {
    query += ' OFFSET ?';
    params.push(options.offset);
  }

  const result = db.execute(query, params);
  const entries: JournalEntry[] = [];

  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      entries.push(rowToEntry(result.rows.item(i)));
    }
  }

  return entries;
};

export const searchEntries = (searchTerm: string): JournalEntry[] => {
  const db = getDatabase();
  const result = db.execute(
    `SELECT * FROM entries
     WHERE title LIKE ? OR content LIKE ?
     ORDER BY updated_at DESC
     LIMIT 100`,
    [`%${searchTerm}%`, `%${searchTerm}%`],
  );

  const entries: JournalEntry[] = [];
  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      entries.push(rowToEntry(result.rows.item(i)));
    }
  }

  return entries;
};

export const getEntriesByTag = (tagId: string): JournalEntry[] => {
  const db = getDatabase();
  const result = db.execute(
    `SELECT e.* FROM entries e
     INNER JOIN entry_tags et ON e.id = et.entry_id
     WHERE et.tag_id = ?
     ORDER BY e.created_at DESC`,
    [tagId],
  );

  const entries: JournalEntry[] = [];
  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      entries.push(rowToEntry(result.rows.item(i)));
    }
  }

  return entries;
};

export const getEntriesByDateRange = (startDate: number, endDate: number): JournalEntry[] => {
  const db = getDatabase();
  const result = db.execute(
    `SELECT * FROM entries
     WHERE created_at BETWEEN ? AND ?
     ORDER BY created_at DESC`,
    [startDate, endDate],
  );

  const entries: JournalEntry[] = [];
  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      entries.push(rowToEntry(result.rows.item(i)));
    }
  }

  return entries;
};

const addTagsToEntry = (entryId: string, tagNames: string[]): void => {
  const db = getDatabase();

  for (const tagName of tagNames) {
    // Get or create tag
    let tagResult = db.execute('SELECT id FROM tags WHERE name = ?', [tagName]);

    let tagId: string;
    if (tagResult.rows && tagResult.rows.length > 0) {
      tagId = tagResult.rows.item(0).id;
    } else {
      // Create new tag
      tagId = uuidv4();
      const color = getRandomTagColor();
      db.execute(
        'INSERT INTO tags (id, name, color, created_at) VALUES (?, ?, ?, ?)',
        [tagId, tagName, color, Date.now()],
      );
    }

    // Link tag to entry
    db.execute(
      'INSERT OR IGNORE INTO entry_tags (entry_id, tag_id) VALUES (?, ?)',
      [entryId, tagId],
    );
  }
};

const getRandomTagColor = (): string => {
  const colors = [
    '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE',
    '#30B0C7', '#007AFF', '#5856D6', '#AF52DE', '#FF2D55',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const rowToEntry = (row: any): JournalEntry => {
  const db = getDatabase();

  // Get tags for this entry
  const tagResult = db.execute(
    `SELECT t.name FROM tags t
     INNER JOIN entry_tags et ON t.id = et.tag_id
     WHERE et.entry_id = ?`,
    [row.id],
  );

  const tags: string[] = [];
  if (tagResult.rows) {
    for (let i = 0; i < tagResult.rows.length; i++) {
      tags.push(tagResult.rows.item(i).name);
    }
  }

  return {
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    tags,
    mood: row.mood,
    weather: row.weather,
    location: row.location,
    favorite: row.favorite === 1,
    archived: row.archived === 1,
    templateId: row.template_id,
  };
};
