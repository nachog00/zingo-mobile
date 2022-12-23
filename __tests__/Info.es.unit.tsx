/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';
import Info from '../components/Info';
import { ContextLoadedProvider, defaultAppStateLoaded } from '../app/context';

jest.useFakeTimers();
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
jest.mock('react-native-localize', () => ({
  getNumberFormatSettings: () => {
    return {
      decimalSeparator: ',', // es
      groupingSeparator: '.', // es
    };
  },
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// test suite
describe('Component Info - test', () => {
  //unit test
  test('Info - price with es (,) decimal point', () => {
    const state = defaultAppStateLoaded;
    state.info = {
      serverUri: 'https://zcash.es',
      latestBlock: 2000100,
      connections: 0,
      version: '3.3.3.0',
      verificationProgress: 0,
      currencyName: 'ZEC',
      solps: 0,
      zecPrice: 33.33,
      defaultFee: 1000,
      chain_name: 'mainnet',
    };
    state.translate = () => 'translated text';
    state.totalBalance.total = 1.12345678;
    const onClose = jest.fn();
    const text: any = render(
      <ContextLoadedProvider value={state}>
        <Info closeModal={onClose} />
      </ContextLoadedProvider>,
    ).toJSON();
    expect(text.type).toBe('RCTSafeAreaView');
    expect(text.children[1].children[0].children[0].children[5].children[1].children[0]).toBe('$ 33,33');
  });
});
