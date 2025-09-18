import Sidebar from '@/components/Sidebar';
import SqlPlayground from '@/components/SglPlayground';
import { useState } from 'react';


const examples = {
products: `-- Example tasks (copy/paste)
-- 4) Display all rows
SELECT * FROM products;
-- 8) Only can_be_returned
SELECT * FROM products WHERE can_be_returned;
-- 11) Sale: $20 off
UPDATE products SET price = price - 20;`,
playstore: `-- Example analytics
-- 4) Top 5 most-reviewed apps
SELECT app, reviews FROM analytics ORDER BY reviews DESC LIMIT 5;`
};


export default function SQLQueryingPage() {
const [tab, setTab] = useState<'products'|'playstore'>('products');
return (
<div className="flex">
<Sidebar />
<main className="p-6 max-w-6xl mx-auto w-full">
<h1 className="text-2xl font-bold mb-4">SQL Querying</h1>
<div className="flex gap-2 mb-4">
<button onClick={()=>setTab('products')} className={`px-3 py-1.5 rounded-lg border ${tab==='products'?'bg-sky-100':''}`}>Products</button>
<button onClick={()=>setTab('playstore')} className={`px-3 py-1.5 rounded-lg border ${tab==='playstore'?'bg-sky-100':''}`}>Play Store</button>
</div>
<div className="grid md:grid-cols-2 gap-4">
<SqlPlayground db={tab==='products'?'products':'playstore'} theme="blue" />
<div className="rounded-2xl border p-4 bg-white">
<h2 className="font-semibold mb-2">Prompts & Examples</h2>
<pre className="text-xs whitespace-pre-wrap">{examples[tab]}</pre>
</div>
</div>
</main>
</div>
);
}