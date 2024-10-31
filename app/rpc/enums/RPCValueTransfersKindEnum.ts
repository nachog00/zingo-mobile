export enum RPCValueTransfersKindEnum {
  sent = 'sent',
  memoToSelf = 'memo-to-self',
  shield = 'shield',
  received = 'received',
  basic = 'basic',
  ephemeral320Tex = 'ephemeral-320-tex',

  // obsolete -> same as `basic`.
  //sendToSelf = 'send-to-self',
}
