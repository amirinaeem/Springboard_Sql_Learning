import type { NextApiRequest, NextApiResponse } from 'next';
import { pools } from '@/lib/db';
import fs from 'fs';
import path from 'path';


const FILES: Record<string,string> = {
products: 'seed_products.sql',
playstore: 'seed_playstore.sql',
joins: 'data.sql',
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
const { db } = req.body as { db: 'products'|'playstore'|'joins' };
const file = FILES[db];
if (!file) return res.status(400).json({ error: 'Unknown db' });


const sqlPath = path.join(process.cwd(), 'sql', file);
const sql = fs.readFileSync(sqlPath, 'utf8');


const pool = pools[db];
const client = await pool.connect();
try {
await client.query('BEGIN');
await client.query(sql);
await client.query('COMMIT');
res.status(200).json({ ok: true });
} catch (e:any) {
await client.query('ROLLBACK');
res.status(400).json({ error: e.message });
} finally {
client.release();
}
}