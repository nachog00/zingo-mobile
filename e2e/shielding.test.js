const { log, device, by, element, expect } = require('detox');

import { loadRecipientWallet } from './e2e-utils/loadRecipientWallet.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

describe('Renders wallet data correctly.', () => {
  // i just pulled this seed out of thin air
  it('loads a wallet', async () => await loadRecipientWallet());
  it('shields transparent funds successfully', async () => {
    // Shield Assets
    await waitFor(element(by.id('header.shield')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('header.shield')).tap();
    // Confirm dialog
    await expect(element(by.text('CONFIRM'))).toBeVisible();
    await element(by.text('CONFIRM')).tap();
    // Close and reopen to check that the transaction does not disappear
    await device.launchApp({
      newInstance: true,
    });

    await waitFor(element(by.id('vt-1'))).toExist();
    const element = await element(by.id('vt-1'));
    console.log(element);
    await sleep(30000);
  });
});
