import * as crypto from 'crypto';

export interface Transaction {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
}

export class Block {
  hash: string = '';
  private nonce: number = 0;

  constructor(
    readonly previousHash: string,
    readonly timestamp: number,
    readonly transactions: Transaction[]
  ) {}
  private CalculateHash(nonce: number): Promise<string> {
    const data =
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      nonce;
    return Promise.resolve(
      crypto.createHash('sha256').update(data).digest('hex')
    );
  }

  async Mine(): Promise<void> {
    do {
      this.hash = await this.CalculateHash(++this.nonce);
    } while (this.hash.startsWith('0000') === false);
  }
}
