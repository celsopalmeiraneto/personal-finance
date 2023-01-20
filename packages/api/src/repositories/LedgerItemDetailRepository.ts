import { ApiDataSource } from '../data-source';
import { LedgerItem } from '../entities/LedgerItem';
import { LedgerItemDetail } from '../entities/LedgerItemDetail';
import { LedgerItemRepository } from './LedgerItemRepository';

export const LedgerItemDetailRepository = ApiDataSource.getRepository(LedgerItemDetail).extend({
  async addDetail({
    item,
    name,
    valueInCents,
  }: {
    item: LedgerItem;
    name: string;
    valueInCents: number;
  }): Promise<LedgerItemDetail> {
    const detail = new LedgerItemDetail();
    detail.item = item;
    detail.name = name;
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
