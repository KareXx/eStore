import pkg from "pg";

const pool = new pkg.Pool({
    user: "postgres",
    password: "1111",
    host: "127.0.0.1",
    port: 5432,
    database: "mydatabase"
})

export default pool;