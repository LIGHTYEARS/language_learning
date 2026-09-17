-- Free-tier D1 schema for language_learning FSRS backend
-- No Durable Objects / paid bindings required

CREATE TABLE IF NOT EXISTS fsrs_state (
  lemma TEXT NOT NULL,
  home_scene_id TEXT NOT NULL,
  due TEXT NOT NULL,
  stability REAL NOT NULL DEFAULT 0,
  difficulty REAL NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'new',
  last_reviewed TEXT,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (lemma, home_scene_id)
);

CREATE INDEX IF NOT EXISTS idx_fsrs_due ON fsrs_state (due);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lemma TEXT NOT NULL,
  home_scene_id TEXT NOT NULL,
  rating TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews (created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_lemma ON reviews (lemma, home_scene_id);

-- Optional mirror of vocab cards for API serving
CREATE TABLE IF NOT EXISTS cards (
  slug TEXT PRIMARY KEY,
  lemma TEXT NOT NULL,
  home_scene_id TEXT NOT NULL,
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cards_lemma ON cards (lemma, home_scene_id);
