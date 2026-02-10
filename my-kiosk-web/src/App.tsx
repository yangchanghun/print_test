import { useState } from "react";

declare global {
  interface Window {
    Android?: {
      printReceipt: (name: string, phone: string) => void;
    };
  }
}

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePrint = () => {
    if (!name || !phone) {
      alert("이름과 전화번호를 모두 입력해주세요.");
      return;
    }

    if (window.Android?.printReceipt) {
      window.Android.printReceipt(name, phone);
    } else {
      alert("Android 키오스크 환경에서만 출력이 가능합니다.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
          📄 출력 정보 입력
        </h1>

        {/* 이름 */}
        <div className="mb-4">
          <label className="mb-1 block text-lg font-semibold text-gray-700">
            이름
          </label>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-lg focus:border-black focus:outline-none"
          />
        </div>

        {/* 전화번호 */}
        <div className="mb-6">
          <label className="mb-1 block text-lg font-semibold text-gray-700">
            전화번호
          </label>
          <input
            type="tel"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-lg focus:border-black focus:outline-none"
          />
        </div>

        {/* 출력 버튼 */}
        <button
          onClick={handlePrint}
          className="w-full rounded-xl bg-black py-4 text-xl font-bold text-white active:scale-95"
        >
          🖨️ 프린터 출력
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          버튼을 누르면 연결된 프린터에서 출력됩니다
        </p>
      </div>
    </div>
  );
}

export default App;
