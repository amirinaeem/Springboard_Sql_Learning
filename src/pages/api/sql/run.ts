import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { runSQL } from '@/lib/db';


const schema = z.object({
db: z.enum(['products','playstore','joins']),
sql: z.string().min(1),
mode: z.enum(['read','write']).default('read')
});


const READ_ONLY_BLOCKLIST = [/\bdrop\b/i, /\btruncate\b/i, /\bdrop\s+schema\b/i];


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
const parsed = schema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
const { db, sql, mode } = parsed.data;


if (mode === 'read') {
// prevent destructive statements in read mode
if (/\b(insert|update|delete|alter|create|drop|truncate)\b/i.test(sql)) {
return res.status(400).json({ error: 'Read mode only allows SELECT/CTEs.' });
}
} else {
// basic protection: forbid drop/truncate entirely
if (READ_ONLY_BLOCKLIST.some(rx => rx.test(sql))) {
return res.status(400).json({ error: 'Dangerous statement blocked.' });
}
}


try {
const result = await runSQL(db, sql);
res.status(200).json(result);
} catch (e:any) {
res.status(400).json({ error: e.message });
}
}