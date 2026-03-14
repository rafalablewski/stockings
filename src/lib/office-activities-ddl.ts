// DDL for office_activities table — auto-creates and seeds if missing.

export const OFFICE_ACTIVITIES_CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS office_activities (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    label TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    requires_furniture TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;

export const OFFICE_ACTIVITIES_UNIQUE_IDX_SQL = `
  CREATE UNIQUE INDEX IF NOT EXISTS office_activities_type_idx ON office_activities (type);
`;

/** Default seed: only working, chatting, phone are enabled (no furniture needed). */
export const OFFICE_ACTIVITIES_SEED_SQL = `
  INSERT INTO office_activities (type, label, enabled, requires_furniture) VALUES
    ('working',  'Working',    true,  NULL),
    ('idle',     'Idle',       true,  NULL),
    ('chatting', 'Chatting',   true,  NULL),
    ('phone',    'Phone Call', true,  NULL),
    ('coffee',   'Coffee',     false, 'coffee-machine'),
    ('reading',  'Reading',    false, 'bookshelf'),
    ('gaming',   'Gaming',     false, 'gaming-console'),
    ('bathroom', 'Bathroom',   false, 'toilet-room')
  ON CONFLICT (type) DO NOTHING;
`;
