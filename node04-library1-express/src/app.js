import express from 'express';
import handlebars from 'express-handlebars';

const app = express();
const port = 3000;

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('list', {
    title: 'Books list',
    books: [
      {
        id: 1,
        title: 'Book title 1',
        author: 'Book author 1',
        genre: 'Book genre 1'
      },
      {
        id: 2,
        title: 'Book title 2',
        author: 'Book author 2',
        genre: 'Book genre 2'
      }
    ]
  });
});

app.get('/book', (req, res) => {
  res.render('details', {
    title: 'Book details',
    book: {
      id: 1,
      title: 'Book title',
      author: 'Book author',
      genre: 'Book genre'
    }
  });
});

app.get('/book/create', (req, res) => {
  res.render('create', {
    title: 'Create new book'
  });
});

app.get('/book/edit', (req, res) => {
  res.render('edit', {
    title: 'Edit book',
    book: {
      id: 1,
      title: 'Book title',
      author: 'Book author',
      genre: 'Book genre'
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});


const server = app.listen(port, () => {
  console.log(`Server listens ${port}`);
})

export { app, server }