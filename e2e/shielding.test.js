const { log, device, by, element, expect } = require('detox');

import { loadRecipientWallet } from './e2e-utils/loadRecipientWallet.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

describe('Renders wallet data correctly.', () => {
  // i just pulled this seed out of thin air
  it('loads a wallet', async () => await loadRecipientWallet());
  it('shields transparent funds successfully', async () => {
    await waitFor(element(by.id('header.shield'))).toExist();
    await element(by.id('header.shield')).tap();
    // await sleep(400000);

    //await element(by.id('send.scroll-view')).scrollTo('bottom');
    //await expect(element(by.id('send.checkboxua'))).toBeVisible();
    //await element(by.id('send.checkboxua')).tap();
    //await element(by.id('send.scroll-view')).scrollTo('bottom');
    await expect(element(by.id('send.memo-field'))).toBeVisible();
    await element(by.id('send.memo-field')).replaceText('1\n2\n3\n4\n5\n6\n7\n8');
    await element(by.id('send.scroll-view')).scrollTo('bottom');

    await waitFor(element(by.id('send.button')))
      .toBeVisible()
      .withTimeout(sync_timeout);
    await element(by.id('send.button')).tap();

    await expect(element(by.id('send.confirm.scroll-view'))).toExist();
    await expect(element(by.id('send.confirm.scroll-view'))).toBeVisible(20);
    await element(by.id('send.confirm.scroll-view')).scrollTo('bottom');

    const memo = element(by.id('send.confirm-memo'));

    await expect(memo).toBeVisible(100);
    //await expect(memo).toHaveText(
    //  '1\n2\n3\n4\n5\n6\n7\n8\nReply to: \nuregtest1zkuzfv5m3yhv2j4fmvq5rjurkxenxyq8r7h4daun2zkznrjaa8ra8asgdm8wwgwjvlwwrxx7347r8w0ee6dqyw4rufw4wg9djwcr6frzkezmdw6dud3wsm99eany5r8wgsctlxquu009nzd6hsme2tcsk0v3sgjvxa70er7h27z5epr67p5q767s2z5gt88paru56mxpm6pwz0cu35m',
    //);
    await expect(memo).toHaveText('1\n2\n3\n4\n5\n6\n7\n8');

    await expect(element(by.id('send.confirm.button'))).toBeVisible();
    await element(by.id('send.confirm.button')).tap();

    await waitFor(element(by.text('SEND')))
      .toExist()
      .withTimeout(30000);

    // await sleep(10000);
    await device.launchApp({
      newInstance: true,
    });
    // await sleep(30000);
  });
});
