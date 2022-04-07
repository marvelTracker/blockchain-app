import { Transaction, Block } from './Block';

export class Blockchain {
  private readonly chain: Block[] = [];
  private pendingTransactions: Transaction[] = [];

  constructor() {}

  private get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  private get getChain(): Block[] {
    return [...this.chain];
  }

  private get getPendingTransactions(): Transaction[] {
    return [...this.pendingTransactions];
  }

  public async createGenesisBlock(): Promise<void> {
    const genesisBlock = new Block('0', Date.now(), []);
    await genesisBlock.Mine();
    this.chain.push(genesisBlock);
  }

  public async createTransaction(transaction: Transaction): Promise<void> {
    this.pendingTransactions.push(transaction);
  }

  public async MinePendingTransactions(): Promise<void> {
    const block = new Block(
      this.latestBlock.hash,
      Date.now(),
      this.pendingTransactions
    );
    await block.Mine();
    this.chain.push(block);
    this.pendingTransactions = [];
  }
}
