import { Route, Routes } from "react-router-dom";
import Report from "./screens/Report";
import FruitPurchase from "./screens/FruitPurchase";

function App() {

  return (
    <Routes>
        <Route index element={<Report />} />
        <Route path="/purchases" element={<FruitPurchase />} />
    </Routes>
  )
}

export default App
