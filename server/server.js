const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// Database configuration
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "andrewpeters",
  user: "andrewpeters",
  password: "",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Database initialization
async function initializeDatabase() {
  try {
    // Create items table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert initial data if table is empty
    const result = await pool.query("SELECT COUNT(*) as count FROM items");
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO items (name) VALUES
        ('guitar'),
        ('car'),
        ('box')
      `);
      console.log("Initial data inserted into items table");
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Initialize database on server start
initializeDatabase();

app.get("/api", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, type FROM items ORDER BY created_at DESC"
    );
    res.json({ stuff: result.rows });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/items - Create a new item
app.post("/api/items", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Item name is required" });
    }

    const result = await pool.query(
      "INSERT INTO items (name) VALUES ($1) RETURNING id, name, created_at",
      [name]
    );

    res.status(201).json({ item: result.rows[0] });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/items/:id - Update an item
app.put("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Item name is required" });
    }

    const result = await pool.query(
      "UPDATE items SET name = $1 WHERE id = $2 RETURNING id, name, created_at",
      [name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ item: result.rows[0] });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/items/:id - Delete an item
app.delete("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING id, name",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", item: result.rows[0] });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
