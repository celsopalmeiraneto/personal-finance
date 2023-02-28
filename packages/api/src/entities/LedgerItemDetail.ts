import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LedgerItem } from './LedgerItem';

@Entity()
@Index(['item', 'ts', 'category'])
export class LedgerItemDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LedgerItem, (item) => item.details)
  item: LedgerItem;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({
    type: 'datetime',
  })
  ts: Date;

  @Column({
    type: 'integer',
  })
  valueInCents: number;
}
