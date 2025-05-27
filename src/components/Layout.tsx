import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link to="/customers" className="hover:text-blue-200">
              Customers
            </Link>
          </nav>
        </h2>
      </aside>

      {/* Main content Area */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
