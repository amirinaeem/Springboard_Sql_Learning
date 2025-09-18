import Sidebar from '@/components/Sidebar';
import Link from 'next/link';


export default function Home() {
return (
<div className="flex">
<Sidebar />
<main className="p-8 max-w-5xl mx-auto w-full">
<h1 className="text-3xl font-bold mb-4">SQL Learning Platform</h1>
<p className="mb-8 text-slate-600">One platform, three exercises — each with its own look & feel.</p>
<div className="grid md:grid-cols-3 gap-4">
<Link href="/sql-querying" className="rounded-2xl p-6 bg-sky-50 border hover:shadow">SQL Querying →</Link>
<Link href="/sql-joins" className="rounded-2xl p-6 bg-emerald-50 border hover:shadow">SQL Joins →</Link>
<Link href="/data-modeling" className="rounded-2xl p-6 bg-violet-50 border hover:shadow">Data Modeling →</Link>
</div>
</main>
</div>
);
}