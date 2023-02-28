import { ApiDataSource } from '../data-source';
import { Ledger } from '../entities/Ledger';
import { LedgerItem } from '../entities/LedgerItem';
import { LedgerItemDetailRepository } from './LedgerItemDetailRepository';
import { LedgerRepository } from './LedgerRepository';

export const LedgerItemRepository = ApiDataSource.getRepository(LedgerItem).extend({
  async addItem({
    ts,
    name,
    amountInCents,
    ledger,
    category,
  }: {
    ts: Date;
    name: string;
    category: string;
    amountInCents: number;
    ledger: Ledger;
  }): Promise<LedgerItem> {
    const item = new LedgerItem();
    item.ledger = ledger;
    item.name = name;
    item.ts = ts;
    item.totalInCents = 0;

    await this.manager.transaction(async (manager) => {
      await manager.getRepository(LedgerItem).save(item, { reload: true });
      await manager.withRepository(LedgerItemDetailRepository).addDetail({
        item,
        name,
        valueInCents: amountInCents,
        ts,
        category,
      });

      return item;
    });

    return item;
  },

  async incrementTotal({ item, amountInCents }: { item: LedgerItem; amountInCents: number }) {
    await this.manager.transaction(async (manager) => {
      await manager.getRepository(LedgerItem).increment(
        {
          id: item.id,
        },
        'totalInCents',
        amountInCents,
      );
      item.totalInCents += amountInCents;

      await manager.withRepository(LedgerRepository).incrementBalance({
        amountInCents,
        ledger: item.ledger,
      });
    });
  },
});
