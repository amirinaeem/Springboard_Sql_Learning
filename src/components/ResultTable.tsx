type Props = { rows: any[]; };
export default function ResultTable({ rows }: Props) {
if (!rows?.length) return <div className="text-sm text-slate-500">No rows.</div>;
const cols = Object.keys(rows[0] ?? {});
return (
<div className="overflow-auto border rounded-xl bg-white">
<table className="min-w-full text-sm">
<thead className="bg-slate-100 sticky top-0">
<tr>{cols.map(c => <th key={c} className="text-left p-2 border-b">{c}</th>)}</tr>
</thead>
<tbody>
{rows.map((r, i) => (
<tr key={i} className="odd:bg-white even:bg-slate-50">
{cols.map(c => <td key={c} className="p-2 border-b">{String(r[c])}</td>)}
</tr>
))}
</tbody>
</table>
</div>
);
}