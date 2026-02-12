import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePrint = () => {
    const userName = name || "홍길동";
    const userPhone = phone || "010-0000-0000";

    // 안드로이드 앱의 브릿지 호출
    if (
      window.AndroidBridge &&
      typeof window.AndroidBridge.printReceipt === "function"
    ) {
      const result = window.AndroidBridge.printReceipt(userName, userPhone);
      if (result !== "SUCCESS") {
        alert("인쇄 실패: " + result);
      }
    } else {
      // 일반 브라우저 테스트용
      console.log("안드로이드 환경이 아닙니다.");
      window.print();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-center mb-8">
          📄 키오스크 접수
        </h1>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              성함
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 rounded-xl text-xl focus:border-black outline-none"
              placeholder="이름 입력"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              연락처
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 rounded-xl text-xl focus:border-black outline-none"
              placeholder="번호 입력"
            />
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl text-2xl font-bold transition-all active:scale-95"
        >
          🖨️ 영수증 출력
        </button>
      </div>
    </div>
  );
}

export default App;
