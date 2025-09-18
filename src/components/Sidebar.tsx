import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';


const items = [
{ href: '/', label: 'Home' },
{ href: '/sql-querying', label: 'SQL Querying' },
{ href: '/sql-joins', label: 'SQL Joins' },
{ href: '/data-modeling', label: 'Data Modeling' },
];


export default function Sidebar() {
const { pathname } = useRouter();
return (
<aside className="w-60 shrink-0 h-screen sticky top-0 bg-white border-r">
<div className="p-4 font-bold">SQL Learning</div>
<nav className="flex flex-col gap-1 p-2">
{items.map(i => (
<Link key={i.href} href={i.href} className={clsx(
'px-3 py-2 rounded-lg hover:bg-slate-100',
pathname===i.href && 'bg-slate-200 font-semibold'
)}>{i.label}</Link>
))}
</nav>
</aside>
);
}