import { useState } from 'react';
import ResultTable from './ResultTable';


type DB = 'products'|'playstore'|'joins';


export default function SqlPlayground({ db, theme }: { db: DB; theme?: 'blue'|'green'|'purple' }) {
const [sql, setSql] = useState('SELECT 1');
const [rows, setRows] = useState<any[]|null>(null);
const [error, setError] = useState<string|undefined>();
const [mode, setMode] = useState<'read'|'write'>('read');


async function run() {
setError(undefined); setRows(null);
const res = await fetch('/api/sql/run', {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ db, sql, mode })
});
const data = await res.json();
if (!res.ok) return setError(data.error || 'Error');
setRows(data.rows || []);
}


async function reset() {
const res = await fetch('/api/sql/reset', {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ db })
});
if (!res.ok) alert((await res.json()).error);
else alert('Database reseeded!');
}


const themeCls = theme === 'green' ? 'from-emerald-50' : theme === 'purple' ? 'from-violet-50' : 'from-sky-50';


return (
<div className={`p-4 rounded-2xl bg-gradient-to-b ${themeCls} to-white border`}>
<div className="flex items-center justify-between gap-2 mb-3">
<div className="text-sm font-semibold uppercase tracking-wider">DB: {db}</div>
<div className="flex items-center gap-2">
<select value={mode} onChange={e=>setMode(e.target.value as any)} className="border rounded px-2 py-1">
<option value="read">Read</option>
<option value="write">Write</option>
</select>
<button onClick={run} className="px-3 py-1.5 rounded-lg bg-black text-white">Run</button>
<button onClick={reset} className="px-3 py-1.5 rounded-lg border">Reset DB</button>
</div>
</div>
<textarea value={sql} onChange={e=>setSql(e.target.value)} rows={8} className="w-full font-mono text-sm p-3 border rounded-xl" />
{error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
{rows && <div className="mt-3"><ResultTable rows={rows} /></div>}
</div>
);
}