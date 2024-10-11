import Pool from 'pg'

const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

(async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        description TEXT,
        author VARCHAR(100),
        genre VARCHAR(50),
        publisher VARCHAR(100)
      );
    `)
    console.log("Table created or already exists!");
  } catch (error) {
    console.error(`Erro ao criar tabela: ${error}`);
  } finally {
    client.release();
  }
})();

export default pool;
