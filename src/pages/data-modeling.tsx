import Sidebar from '@/components/Sidebar';
import SqlPlayground from '@/components/SglPlayground';

export default function DataModelingPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Data Modeling</h1>
        <p className="mb-4 text-slate-600">
          Design tables (DDL) and try inserts. Use the <code>products</code> DB
          as a scratch pad or create new schemas.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <SqlPlayground db="products" theme="purple" />
          <div className="rounded-2xl border p-4 bg-white">
            <h2 className="font-semibold mb-2">DDL Samples</h2>
            <pre className="text-xs whitespace-pre-wrap">{`
-- Medical Center (doctors-patients many-to-many)
CREATE TABLE IF NOT EXISTS doctors(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS patients(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS visits(
  id SERIAL PRIMARY KEY,
  doctor_id INT REFERENCES doctors(id),
  patient_id INT REFERENCES patients(id),
  visited_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS diseases(
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS visit_diseases(
  visit_id INT REFERENCES visits(id) ON DELETE CASCADE,
  disease_id INT REFERENCES diseases(id) ON DELETE CASCADE,
  PRIMARY KEY (visit_id, disease_id)
);

-- Craigslist (regions, users, categories, posts)
CREATE TABLE IF NOT EXISTS regions(id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL);
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  preferred_region_id INT REFERENCES regions(id)
);
CREATE TABLE IF NOT EXISTS categories(id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL);
CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  region_id INT REFERENCES regions(id),
  location TEXT,
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE IF NOT EXISTS post_categories(
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY(post_id, category_id)
);

-- Soccer League (teams, players, matches, goals, referees, seasons)
CREATE TABLE IF NOT EXISTS teams(id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL);
CREATE TABLE IF NOT EXISTS players(id SERIAL PRIMARY KEY, name TEXT NOT NULL, team_id INT REFERENCES teams(id));
CREATE TABLE IF NOT EXISTS referees(id SERIAL PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS seasons(id SERIAL PRIMARY KEY, start_date DATE, end_date DATE);
CREATE TABLE IF NOT EXISTS matches(
  id SERIAL PRIMARY KEY,
  season_id INT REFERENCES seasons(id),
  home_team_id INT REFERENCES teams(id),
  away_team_id INT REFERENCES teams(id),
  played_at TIMESTAMP
);
CREATE TABLE IF NOT EXISTS goals(
  id SERIAL PRIMARY KEY,
  match_id INT REFERENCES matches(id) ON DELETE CASCADE,
  player_id INT REFERENCES players(id),
  minute INT CHECK (minute BETWEEN 0 AND 120)
);
            `}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}
