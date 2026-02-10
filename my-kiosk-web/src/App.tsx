import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePrint = () => {
    if (!name || !phone) {
      alert("이름과 전화번호를 모두 입력해주세요.");
      return;
    }

    // 🔥 인쇄 트리거
    window.print();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl print:shadow-none print:max-w-full">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800 print:text-black">
          📄 접수 확인서
        </h1>

        <div className="mb-4 text-lg">
          <strong>이름:</strong> {name || "—"}
        </div>

        <div className="mb-6 text-lg">
          <strong>전화번호:</strong> {phone || "—"}
        </div>

        {/* 화면에서만 보이는 입력 */}
        <div className="print:hidden">
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
            🖨️ 인쇄
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
