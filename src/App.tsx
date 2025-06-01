import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import CustomerDetails from "./pages/CustomerDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />

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
