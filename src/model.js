import pool from './db.js';

export default class Model {
  constructor (name, description, author, genre, publisher) {
    this.name = name;
    this.description = description;
    this.author = author;
    this.genre = genre;
    this.publisher = publisher;
  }

  toDBObject() {
    return {
      name: this.name,
      description: this.description,
      author: this.author,
      genre: this.genre,
      publisher: this.publisher,
    };
  }

  static async insertMany(items) {
    const query = `
      INSERT INTO books (name, description, author, genre, publisher)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (let item of items ) {
        await client.query(query, [
          item.name,
          item.description,
          item.author,
          item.genre,
          item.publisher
        ]);
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`Error to insert products on db: ${error}`);

    } finally {
      client.release();
    }
  }
}
