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

      {/* 2. 실제 영수증 인쇄 영역 */}
      <div
        className="hidden print:block"
        style={{ width: "80mm", color: "black", backgroundColor: "white" }}
      >
        <div
          style={{
            textAlign: "center",
            borderBottom: "2px solid black",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>방 문 증</h2>
        </div>
        <div style={{ fontSize: "20px", lineHeight: "1.5" }}>
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
        <div
          style={{
            textAlign: "center",
            borderTop: "2px solid black",
            marginTop: "20px",
            paddingTop: "10px",
          }}
        >
          <p>감사합니다.</p>
        </div>
      </div>

      {/* 3. 영수증 최적화 CSS */}
      {/* 3. 영수증 최적화 CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
  @media print {
    .print\:block { display: block !important; }
    * { 
      color: black !important; 
      -webkit-print-color-adjust: exact; 
      print-color-adjust: exact;
    }
  }
`,
        }}
      />
    </div>
  );
}

export default App;
