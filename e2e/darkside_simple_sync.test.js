const { log, device, by, element } = require('detox');

import { loadDarksideWallet } from "./e2e-utils/loadDarksideWallet.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

describe('Syncs a darkside chain', () => {
  it('loads the wallet', async () => await loadDarksideWallet());
  it('should sync the darkside chain', async () => {
    // wait for fully synced.
    //await sleep(4000);

    // verify pool balances
    await waitFor(element(by.id('header.drawmenu'))).toBeVisible().withTimeout(sync_timeout);
    await element(by.id('header.drawmenu')).tap();
    await waitFor(element(by.id('menu.fundpools'))).toBeVisible().withTimeout(sync_timeout);
    await element(by.id('menu.fundpools')).tap();
    await expect(element(by.id('orchard-total-balance.big-part'))).toHaveText(' 1.0000');
    await expect(element(by.id('orchard-total-balance.small-part'))).not.toBeVisible();
    await expect(element(by.id('orchard-spendable-balance.big-part'))).toHaveText(' 1.0000');
    await expect(element(by.id('orchard-spendable-balance.small-part'))).not.toBeVisible();
    await expect(element(by.id('sapling-total-balance.big-part'))).toHaveText(' 0.0000');
    await expect(element(by.id('sapling-total-balance.small-part'))).not.toBeVisible();
    await expect(element(by.id('sapling-spendable-balance.big-part'))).toHaveText(' 0.0000');
    await expect(element(by.id('sapling-spendable-balance.small-part'))).not.toBeVisible();
    await expect(element(by.id('transparent-balance.big-part'))).toHaveText(' 0.0000');
    await expect(element(by.id('transparent-total-balance.small-part'))).not.toBeVisible();
    await waitFor(element(by.id('fundpools.button.close'))).toBeVisible().withTimeout(sync_timeout);
    await element(by.id('fundpools.button.close')).tap();
  });
});
