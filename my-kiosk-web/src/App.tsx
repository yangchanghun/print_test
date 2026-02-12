import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePrint = () => {
    const nameValue = name || "홍길동"; // 입력값이 없으면 기본값
    const infoValue = phone || "방문 정보 없음";

    // 안드로이드에 심어둔 AndroidBridge가 있는지 확인
    if (
      window.AndroidBridge &&
      typeof window.AndroidBridge.printReceipt === "function"
    ) {
      // 안드로이드 함수 호출
      const result = window.AndroidBridge.printReceipt(nameValue, infoValue);
      console.log("인쇄 요청 결과:", result);
    } else {
      // 브라우저 테스트용 (안드로이드 앱이 아닐 때)
      alert("안드로이드 키오스크 앱 환경이 아닙니다. 일반 인쇄창을 띄웁니다.");
      window.print();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
          📄 접수 확인서 17:12
        </h1>

        <div className="mb-4">
          <label className="block font-semibold">이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold">전화번호</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3"
          />
        </div>

        <button
          onClick={handlePrint}
          className="w-full rounded-xl bg-black py-4 text-xl font-bold text-white"
        >
          🖨️ 출력
        </button>
      </div>
    </div>
  );
}

export default App;
