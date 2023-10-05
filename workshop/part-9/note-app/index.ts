import express from 'express';
import { calculator,Operation } from './multiplier';
const app = express();
app.use(express.json())

app.get('/ping', (_req, res) => {
  res.send('pong');
});


app.post('/calculate', (req, res) => {
    const { value1, value2, op } = req.body;

    //assert type
    const operation = op as Operation
  
    const result = calculator(Number(value1), Number(value2), operation);
    res.send({ result });
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});