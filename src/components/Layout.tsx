import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">CRM</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="select-none hover:text-blue-200">
            Dashboard
          </Link>
          <Link to="/customers" className="select-none hover:text-blue-200">
            Customers
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
