/* Kodiak site content API — GET /api/site-content
   Returns editable site values (stats, pay ranges, cities, certifications…)
   as { value: [{ key, value }] }. The public pages ship with baked-in filler
   text in <span data-content="key"> slots; js/site-data.js swaps in whatever
   this endpoint returns, so real values are managed in dbo.SiteContent
   without touching HTML. */
const sql = require("mssql");

let pool; // reused across warm invocations
async function getPool() {
  if (pool && pool.connected) return pool;
  pool = await sql.connect(process.env.DATABASE_CONNECTION_STRING);
  return pool;
}

module.exports = async function (context, req) {
  try {
    const p = await getPool();
    const result = await p.request().query(
      "SELECT ContentKey AS [key], ContentValue AS [value] FROM dbo.SiteContent ORDER BY ContentKey"
    );
    context.res = { status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" },
      body: { value: result.recordset, source: "azure-sql" } };
  } catch (e) {
    context.log.error("SQL error:", e.message);
    context.res = { status: 500, headers: { "Content-Type": "application/json" },
      body: { error: "Database unavailable" } };
  }
};
