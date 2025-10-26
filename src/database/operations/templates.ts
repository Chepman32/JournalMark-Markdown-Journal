import {getDatabase} from '../index';
import {Template} from '@/types';
import {v4 as uuidv4} from 'uuid';
import {DEFAULT_TEMPLATES} from '@/constants';

export const initializeDefaultTemplates = (): void => {
  const db = getDatabase();

  for (const template of DEFAULT_TEMPLATES) {
    db.execute(
      `INSERT OR IGNORE INTO templates (id, name, content, description, icon, created_at, is_default)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [template.id, template.name, template.content, template.description || '', template.icon || '', Date.now()],
    );
  }
};

export const createTemplate = (
  name: string,
  content: string,
  description?: string,
  icon?: string,
): Template => {
  const db = getDatabase();
  const id = uuidv4();
  const now = Date.now();

  db.execute(
    'INSERT INTO templates (id, name, content, description, icon, created_at, usage_count) VALUES (?, ?, ?, ?, ?, ?, 0)',
    [id, name, content, description || null, icon || null, now],
  );

  return {
    id,
    name,
    content,
    description,
    icon,
    createdAt: now,
    usageCount: 0,
  };
};

export const updateTemplate = (
  id: string,
  updates: {name?: string; content?: string; description?: string; icon?: string},
): void => {
  const db = getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  if (updates.name) {
    fields.push('name = ?');
    values.push(updates.name);
  }
  if (updates.content !== undefined) {
    fields.push('content = ?');
    values.push(updates.content);
  }
  if (updates.description !== undefined) {
    fields.push('description = ?');
    values.push(updates.description);
  }
  if (updates.icon !== undefined) {
    fields.push('icon = ?');
    values.push(updates.icon);
  }

  if (fields.length > 0) {
    values.push(id);
    db.execute(`UPDATE templates SET ${fields.join(', ')} WHERE id = ?`, values);
  }
};

export const deleteTemplate = (id: string): void => {
  const db = getDatabase();
  // Don't delete default templates
  db.execute('DELETE FROM templates WHERE id = ? AND is_default = 0', [id]);
};

export const getTemplate = (id: string): Template | null => {
  const db = getDatabase();
  const result = db.execute('SELECT * FROM templates WHERE id = ?', [id]);

  if (!result.rows || result.rows.length === 0) {
    return null;
  }

  return rowToTemplate(result.rows.item(0));
};

export const getAllTemplates = (): Template[] => {
  const db = getDatabase();
  const result = db.execute('SELECT * FROM templates ORDER BY is_default DESC, usage_count DESC, name ASC');

  const templates: Template[] = [];
  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      templates.push(rowToTemplate(result.rows.item(i)));
    }
  }

  return templates;
};

export const incrementTemplateUsage = (id: string): void => {
  const db = getDatabase();
  db.execute('UPDATE templates SET usage_count = usage_count + 1 WHERE id = ?', [id]);
};

const rowToTemplate = (row: any): Template => {
  return {
    id: row.id,
    name: row.name,
    content: row.content,
    description: row.description,
    icon: row.icon,
    createdAt: row.created_at,
    usageCount: row.usage_count || 0,
  };
};
