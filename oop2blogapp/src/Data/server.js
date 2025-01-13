import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('./src/Data/posts.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        dislikes INTEGER DEFAULT 0,
        comments TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create `comments` table
    db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        author TEXT DEFAULT 'Anonymous', -- New column for author
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp for comment creation
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
      )
    `);
  }
});

// Retrieve a specific post by ID
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM posts WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.status(200).json(row);
    }
  });
});

// Create a new post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.run(query, [title, content], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, content });
  });
});

// Retrieve all posts (ordered by newest first)
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM posts ORDER BY created_at DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// Update a post
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  db.run(query, [title, content, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Post updated successfully.' });
  });
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM posts WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Post deleted successfully.' });
  });
});

// Like a post
app.post('/api/posts/:id/like', (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE posts SET likes = likes + 1 WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Post liked successfully.' });
  });
});

// Dislike a post
app.post('/api/posts/:id/dislike', (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Post disliked successfully.' });
  });
});

// Add a comment to a specific post
app.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params; // Post ID
  const { text, author = 'Anonymous' } = req.body; // Author defaults to 'Anonymous'

  if (!text) {
    return res.status(400).json({ error: 'Comment text is required.' });
  }

  const query = 'INSERT INTO comments (post_id, text, author) VALUES (?, ?, ?)';
  db.run(query, [id, text, author], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, text, author });
    }
  });
});

// Retrieve comments for a specific post
app.get('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params; // Post ID

  const query = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC';
  db.all(query, [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});