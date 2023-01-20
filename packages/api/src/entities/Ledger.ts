/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LedgerItem } from './LedgerItem';

@Entity()
export class Ledger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'integer',
  })
  balanceInCents: number;

  @Column({
    type: 'varchar',
    length: 3,
  })
  currency: string;

  @OneToMany(() => LedgerItem, (ledgerItem) => ledgerItem.ledger)
  items: LedgerItem[];
}
