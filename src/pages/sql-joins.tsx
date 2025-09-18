import Sidebar from '@/components/Sidebar';
import SqlPlayground from '@/components/SglPlayground';


export default function JoinsPage() {
return (
<div className="flex">
<Sidebar />
<main className="p-6 max-w-6xl mx-auto w-full">
<h1 className="text-2xl font-bold mb-4">SQL Joins</h1>
<p className="mb-4 text-slate-600">Run against <code>joins_exercise</code>. Use FULL OUTER JOIN for the first task.</p>
<div className="grid md:grid-cols-2 gap-4">
<SqlPlayground db="joins" theme="green" />
<div className="rounded-2xl border p-4 bg-white">
<h2 className="font-semibold mb-2">Hints</h2>
<pre className="text-xs whitespace-pre-wrap">{`
-- 1) Show all columns/records even when owner_id is NULL
SELECT *
FROM people p
FULL OUTER JOIN cars c
ON p.id = c.owner_id
ORDER BY p.id NULLS LAST, c.id;


-- 2) Count cars per owner
SELECT p.first_name, p.last_name, COUNT(c.id) AS count
FROM people p
JOIN cars c ON c.owner_id = p.id
GROUP BY p.id
ORDER BY p.first_name ASC;


-- 3) Avg price and count (filters)
SELECT p.first_name, p.last_name,
CAST(AVG(c.price) AS INTEGER) AS average_price,
COUNT(*) AS count
FROM people p
JOIN cars c ON c.owner_id = p.id
GROUP BY p.id
HAVING COUNT(*) > 1 AND AVG(c.price) > 10000
ORDER BY p.first_name DESC;`}</pre>
</div>
</div>
</main>
</div>
);
}