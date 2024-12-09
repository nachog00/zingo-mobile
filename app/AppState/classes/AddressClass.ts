import { AddressKindEnum } from '../enums/AddressKindEnum';

export default class AddressClass {
  uaAddress: string;
  address: string;
  addressKind: AddressKindEnum;
  receivers: string;

  constructor(uaAddress: string, address: string, addressKind: AddressKindEnum, receivers: string) {
    this.uaAddress = uaAddress;
    this.address = address;
    this.addressKind = addressKind;
    this.receivers = receivers;
  }
}
