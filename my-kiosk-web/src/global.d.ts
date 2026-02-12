export {};

declare global {
  interface Window {
    // 안드로이드에서 정의한 브릿지 이름을 속성으로 추가합니다.
    AndroidBridge: {
      printReceipt: (userName: string, details: string) => void;
    };
  }
}
