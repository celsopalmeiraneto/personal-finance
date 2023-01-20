/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LedgerItem } from './LedgerItem';

@Entity()
export class LedgerItemDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LedgerItem, (item) => item.details)
  item: LedgerItem;

  @Column()
  name: string;

  @Column({
    type: 'integer',
  })
  valueInCents: number;
}
