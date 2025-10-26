// SQLite Database Schema and Migrations

export const DB_NAME = 'journalmark.db';
export const DB_VERSION = 1;

export const SCHEMA_SQL = `
  -- Journal Entries Table
  CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    mood TEXT,
    weather TEXT,
    location TEXT,
    favorite INTEGER DEFAULT 0,
    archived INTEGER DEFAULT 0,
    template_id TEXT,
    FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_entries_created ON entries(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_entries_updated ON entries(updated_at DESC);
  CREATE INDEX IF NOT EXISTS idx_entries_favorite ON entries(favorite, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_entries_archived ON entries(archived);

  -- Tags Table
  CREATE TABLE IF NOT EXISTS tags (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT UNIQUE NOT NULL,
    color TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);

  -- Entry Tags Junction Table
  CREATE TABLE IF NOT EXISTS entry_tags (
    entry_id TEXT NOT NULL,
    tag_id TEXT NOT NULL,
    PRIMARY KEY (entry_id, tag_id),
    FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_entry_tags_entry ON entry_tags(entry_id);
  CREATE INDEX IF NOT EXISTS idx_entry_tags_tag ON entry_tags(tag_id);

  -- Templates Table
  CREATE TABLE IF NOT EXISTS templates (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at INTEGER NOT NULL,
    usage_count INTEGER DEFAULT 0,
    is_default INTEGER DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_templates_usage ON templates(usage_count DESC);

  -- Settings Table (Key-Value Store)
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  );

  -- User Stats Table
  CREATE TABLE IF NOT EXISTS user_stats (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    total_entries INTEGER DEFAULT 0,
    total_words INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_entry_date INTEGER,
    longest_streak INTEGER DEFAULT 0,
    is_pro INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  INSERT OR IGNORE INTO user_stats (id, created_at, updated_at)
  VALUES (1, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);

  -- Attachments Table (for future use)
  CREATE TABLE IF NOT EXISTS attachments (
    id TEXT PRIMARY KEY NOT NULL,
    entry_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_attachments_entry ON attachments(entry_id);
`;

export const MIGRATIONS = {
  1: SCHEMA_SQL,
  // Future migrations will be added here
};
