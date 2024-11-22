export type RPCSendProgressType = {
  id: number;
  sending: boolean;
  progress: number;
  total: number;
  txids: string[] | null;
  error: string | null;
  sync_interrupt: boolean;
};
