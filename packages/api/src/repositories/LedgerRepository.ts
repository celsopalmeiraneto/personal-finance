import { ApiDataSource } from '../data-source';
import { Ledger } from '../entities/Ledger';
import { LedgerItem } from '../entities/LedgerItem';
import { LedgerItemDetail } from '../entities/LedgerItemDetail';

export const LedgerRepository = ApiDataSource.getRepository(Ledger).extend({
  async addItem({
    ts,
    name,
    amount,
    ledger,
  }: {
    ts: Date;
    name: string;
    amount: number;
    ledger: Ledger;
  }): Promise<LedgerItem> {
    const item = new LedgerItem();
    item.ledger = ledger;
    item.name = name;
    item.ts = ts;
    item.total = Math.ceil(amount * 100);

    const detail = new LedgerItemDetail();
    detail.item = item;
    detail.name = name;
    detail.value = item.total;

    await this.manager.transaction(async (manager) => {
      await manager.getRepository(LedgerItem).save(item, { reload: true });
      await manager.getRepository(LedgerItemDetail).save(detail, { reload: true });
      await manager.getRepository(Ledger).increment(
        {
          id: ledger.id,
        },
        'balance',
        item.total,
      );
    });

    ledger.balance += item.total;

    return item;
  },
});
