import { Pool } from 'pg';


function makePool(url?: string) {
if (!url) throw new Error('Missing database URL');
return new Pool({ connectionString: url, max: 5, idleTimeoutMillis: 10_000 });
}


export const pools = {
products: makePool(process.env.DATABASE_URL_PRODUCTS),
playstore: makePool(process.env.DATABASE_URL_PLAYSTORE),
joins: makePool(process.env.DATABASE_URL_JOINS),
};


export async function runSQL(db: keyof typeof pools, sql: string) {
const pool = pools[db];
const client = await pool.connect();
try {
const res = await client.query(sql);
// res.rows for SELECT, res.rowCount for DML
return { rows: res.rows, rowCount: res.rowCount, fields: res.fields?.map(f => f.name) };
} finally {
client.release();
}
}