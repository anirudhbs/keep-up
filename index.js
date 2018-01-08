const { Client } = require('pg')
const connectionString = 'postgresql://postgres:postgres@localhost:5432/postgres'

const client = new Client({
  connectionString: connectionString
})

client.connect()

client.query('SELECT * FROM temp', (err, res) => {
  if (err) throw err
  console.log(res.rows)
})

const insert = 'INSERT INTO temp VALUES($1, $2) RETURNING id'
const value1 = [6, 'michael']
const update = 'UPDATE temp SET name = $2 WHERE id = $1'
const value2 = [1, 'jackson']
const deleteQuery = 'DELETE FROM temp WHERE id = $1'
const value3 = [3]

client.query(insert, value1, (err, res) => {
  if (err) throw err
  console.log(res.rows[0])
})

client.query(update, value2, (err, res) => {
  if (err) throw err
  console.log(res.rows[0])
})

client.query(deleteQuery, value3, (err, res) => {
  if (err) throw err
  console.log(res.rows[0])
})

// client.end()
