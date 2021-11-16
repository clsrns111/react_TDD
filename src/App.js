import { useState } from "react";
import { OrderContextFunction } from "./context/OrderContext";
import CompletePage from "./pages/CompletePage/CompletePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import Type from "./pages/OrderPage/Type";
import SummaryPage from "./pages/SummaryPage/SummaryPage";

function App() {
  const [step, setstep] = useState(0);
  return (
    <div className="App">
      <OrderContextFunction>
        {step === 0 && <OrderPage setstep={setstep} />}
        {step === 1 && <SummaryPage setstep={setstep} />}
        {step === 2 && <CompletePage setstep={setstep} />}
      </OrderContextFunction>
    </div>
  );
}

export default App;
