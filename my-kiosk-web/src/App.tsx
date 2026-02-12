import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePrint = () => {
    // 안드로이드 앱이라면 브릿지 사용, PC라면 window.print()
    if (window.AndroidBridge?.printReceipt) {
      window.AndroidBridge.printReceipt(
        name || "홍길동",
        phone || "방문 정보 없음",
      );
    } else {
      window.print();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* 1. 웹 화면용 UI (인쇄 시에는 숨겨짐) */}
      <div className="print:hidden w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
          📄 접수 확인서
        </h1>
        <div className="mb-4 text-left">
          <label className="block font-semibold mb-1">이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="mb-6 text-left">
          <label className="block font-semibold mb-1">전화번호</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded"
            placeholder="번호를 입력하세요"
          />
        </div>
        <button
          onClick={handlePrint}
          className="w-full rounded-xl bg-black py-4 text-xl font-bold text-white hover:bg-gray-800 transition-all"
        >
          🖨️ 영수증 출력
        </button>
      </div>

      {/* 2. 실제 영수증 인쇄 영역 (평소엔 숨김, 인쇄 시에만 80mm 너비로 나타남) */}
      <div className="hidden print:block print:w-[80mm] text-black bg-white leading-tight font-mono">
        <div className="text-center border-b border-black pb-2 mb-2">
          <h2 className="text-2xl font-bold">방 문 증</h2>
        </div>
        <div className="text-lg space-y-2 py-4">
          <p>
            <strong>성 함:</strong> {name || "홍길동"}
          </p>
          <p>
            <strong>정 보:</strong> {phone || "방문 정보 없음"}
          </p>
          <p>
            <strong>일 시:</strong> {new Date().toLocaleString("ko-KR")}
          </p>
        </div>
        <div className="text-center border-t border-black mt-4 pt-2">
          <p className="text-sm">감사합니다.</p>
        </div>
      </div>

      {/* 3. 영수증 최적화 CSS */}
      {/* 3. 영수증 최적화 CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
    @media print {
      @page {
        size: 80mm auto; /* EU-m30 기본 너비 */
        margin: 0;
      }
      body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; }
      
      /* Tailwind의 콜론(:) 클래스를 인쇄 시 인식하도록 수정 */
      .print:hidden { display: none !important; }
      .print:block { display: block !important; }
      
      /* 배경색이나 그림자가 인쇄 안 될 경우를 대비 */
      * { color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  `,
        }}
      />
    </div>
  );
}

export default App;
