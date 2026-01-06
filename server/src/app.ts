import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());

app.use('/', (req, res) => {
  res.send('Server is running');
});

export default app