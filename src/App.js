import { OrderContextFunction } from "./context/OrderContext";
import OrderPage from "./pages/OrderPage/OrderPage";
import Type from "./pages/OrderPage/Type";
import SummaryPage from "./pages/SummaryPage/SummaryPage";

function App() {
  return (
    <div className="App">
      <OrderContextFunction>
        <OrderPage />
      </OrderContextFunction>
    </div>
  );
}

export default App;
