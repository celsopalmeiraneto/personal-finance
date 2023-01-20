import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ledger } from './Ledger';
import { LedgerItemDetail } from './LedgerItemDetail';

@Entity()
export class LedgerItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ledger, (ledger) => ledger.items)
  ledger: Ledger;

  @Column({
    type: 'timestamp',
  })
  ts: Date;

  @OneToMany(() => LedgerItemDetail, (detail) => detail.item)
  details: LedgerItemDetail[];

  @Column()
  name: string;

  @Column({
    type: 'integer',
  })
  totalInCents: number;
}
