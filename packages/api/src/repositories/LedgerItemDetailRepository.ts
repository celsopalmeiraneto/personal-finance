import { ApiDataSource } from '../data-source';
import { LedgerItem } from '../entities/LedgerItem';
import { LedgerItemDetail } from '../entities/LedgerItemDetail';
import { LedgerItemRepository } from './LedgerItemRepository';

export const LedgerItemDetailRepository = ApiDataSource.getRepository(LedgerItemDetail).extend({
  async addDetail({
    item,
    name,
    category,
    ts,
    valueInCents,
  }: {
    item: LedgerItem;
    name: string;
    category: string;
    ts: Date;
    valueInCents: number;
  }): Promise<LedgerItemDetail> {
    const detail = new LedgerItemDetail();
    detail.item = item;
    detail.name = name;
    detail.category = category;
    detail.ts = ts;
    detail.valueInCents = valueInCents;

    return this.manager.transaction(async (manager) => {
      await manager.getRepository(LedgerItemDetail).save(detail, { reload: true });
      await manager.withRepository(LedgerItemRepository).incrementTotal({
        amountInCents: valueInCents,
        item,
      });

      return detail;
    });
  },
});
