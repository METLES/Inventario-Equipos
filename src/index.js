import express from 'express';  
import indexRoutes from './routes/index.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));
app.use('/', indexRoutes);

app.listen(3000, '0.0.0.0', () => {  
  console.log('Server is listenning on port 3000');  
});


