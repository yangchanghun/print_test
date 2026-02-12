import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [log, setLog] = useState("");

  // 리액트(웹)의 출력 버튼 클릭 시
  const handlePrint = () => {
    const name = "홍길동";
    const info = "방문 정보 블라블라";

    // 여기서 'printReceipt'라는 이름이 안드로이드 함수명과 똑같아야 합니다!
    if (window.AndroidBridge) {
      window.AndroidBridge.printReceipt(name, info);
    } else {
      alert("키오스크 앱에서 실행해 주세요.");
    }
    if (window.AndroidBridge) {
      const result = window.AndroidBridge.printReceipt(name, phone);
      setLog(`최신 상태: ${result}`); // 화면 하단에 에러 노출
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
        <p>오류코드출력: {log}</p>
      </div>
    </div>
  );
}

export default App;
