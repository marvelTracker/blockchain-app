import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Blockchain } from './src/Blockchain';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const blockchain = new Blockchain();

console.log('Initiating the blockchain');

console.log('===== Blockchain ======');

blockchain.createGenesisBlock();

app.get('/', async (req: Request, res: Response) => {
  await blockchain.createTransaction({
    sender: 'BoB',
    recipient: 'Tom',
    amount: 2000
  });

  await blockchain.createTransaction({
    sender: 'John',
    recipient: 'Kate',
    amount: 50
  });
  await blockchain.createTransaction({
    sender: 'Kate',
    recipient: 'Mike',
    amount: 10
  });

  await blockchain.MinePendingTransactions();

  await blockchain.createTransaction({
    sender: 'Alex',
    recipient: 'Rosa',
    amount: 15
  });
  await blockchain.createTransaction({
    sender: 'Gina',
    recipient: 'Rick',
    amount: 60
  });

  await blockchain.MinePendingTransactions();

  console.log(JSON.stringify(blockchain, null, 2));

  res.send(blockchain);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
