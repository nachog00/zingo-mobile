export type RPCSendProgressType = {
  id: number;
  sending: boolean;
  progress: number;
  total: number;
  txids: string[];
  error: string;
  sync_interrupt: boolean;
};
