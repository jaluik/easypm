class Easypm {
  nameSpace: string;
  eventMapper: Record<
    string,
    { origin: Function; target: (e: MessageEvent<any>) => void }[]
  >;
  constructor() {
    window.easypm = window.easypm || {};
    this.eventMapper = {};
  }

  on(event: string, callback: Function) {
    window.easypm[event] = window.easypm[event] || {};
    window.easypm[event].subscribeNum =
      (window.easypm[event].subscribeNum || 0) + 1;
    const handler = (e: MessageEvent<any>) => {
      if (e.data?.source !== event) {
        return;
      }
      window.easypm[event].tmp.restSubscribeNum -= 1;
      callback(window.easypm[event].tmp.data);
      if (!window.easypm[event].tmp.restSubscribeNum) {
        delete window.easypm[event].tmp;
      }
    };
    this.eventMapper[event] = this.eventMapper[event] || [];
    this.eventMapper[event].push({ origin: callback, target: handler });
    window.addEventListener('message', handler);
  }

  off(event: string, callback: Function) {
    const handler = (this.eventMapper[event] || []).find(
      (i) => i.origin === callback,
    );
    if (!handler) {
      return;
    }
    this.eventMapper[event] = this.eventMapper[event].filter(
      (i) => i.origin !== callback,
    );
    window.easypm[event].subscribeNum = window.easypm[event].subscribeNum - 1;
    window.removeEventListener('message', handler.target);
  }

  emit(event: string, data: any) {
    window.easypm[event] = window.easypm[event] || {};
    window.easypm[event].tmp = {
      restSubscribeNum: window.easypm[event].subscribeNum,
      data,
    };
    window.postMessage({ source: event });
  }
}

export default Easypm;
