import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Customers from "./pages/Customers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <h1 className="text-2xl font-bold text-center p-5">Dashboard</h1>
          }
        />
        <Route path="/customers" element={<Customers />} />
        <Route
          path="*"
          element={
            <h1 className="p-10 text-red-500 text-center text-6xl">
              404 - Page Not Found
            </h1>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
