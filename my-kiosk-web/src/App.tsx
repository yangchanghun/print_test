import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePrint = () => {
    if (!name || !phone) {
      alert("이름과 전화번호를 모두 입력해주세요.");
      return;
    }

    // 🔥 EPSON 프린터로 보낼 문자열
    const receipt = `
접수 확인서
----------------
이름: ${name}
전화번호: ${phone}
----------------
감사합니다
`;

    // 🔥 Android Native 호출 (핵심)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).Android?.printText) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Android.printText(receipt);
    } else {
      alert("Android 프린터 브릿지를 찾을 수 없습니다.");
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
