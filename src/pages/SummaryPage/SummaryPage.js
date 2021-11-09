import React, { useState } from "react";

function SummaryPage() {
  const [confirm, setconfirm] = useState(false);

  return (
    <div>
      <label htmlFor="check">주문을 한번 더 확인해주세요</label>
      <input
        type="checkbox"
        id="check"
        onChange={(e) => setconfirm(e.target.checked)}
      />
      <button disabled={!confirm} type="submit">
        확인
      </button>
    </div>
  );
}

export default SummaryPage;
