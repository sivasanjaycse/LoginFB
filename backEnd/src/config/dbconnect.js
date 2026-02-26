// dbconnect.js

import postgres from "postgres";

const connectionString =
  "postgresql://postgres.sueehiqjmtazytsqkzse:Yajnas_Avis2005@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres";

const sql = postgres(connectionString, {
  ssl: "require",
});

export default sql;
