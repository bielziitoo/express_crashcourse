import express from 'express';
import path from 'path';
import postsRouter from './routes/posts.js';

const PORT = process.env.PORT || 8000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

