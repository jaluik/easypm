type EasypmWindowType = {
  subscribeNum?: number;
  tmp?: {
    data: any;
    restSubscribeNum: number;
  };
};

interface Window {
  easypm: Record<string, EasypmWindowType | undefined>;
}
