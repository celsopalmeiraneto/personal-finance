import { ApiDataSource } from '../data-source';
import { Ledger } from '../entities/Ledger';

export const LedgerRepository = ApiDataSource.getRepository(Ledger).extend({
  async incrementBalance({ amountInCents, ledger }: { amountInCents: number; ledger: Ledger }) {
    await this.manager.transaction(async (manager) => {
      await manager.getRepository(Ledger).increment(
        {
          id: ledger.id,
        },
        'balanceInCents',
        amountInCents,
      );

      ledger.balanceInCents += amountInCents;
    });

    return true;
  },
});
