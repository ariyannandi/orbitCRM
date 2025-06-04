import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen select-none">
      <aside className="w-64 bg-blue-300  p-4">
        <h1 className="text-3xl text-blue-400 text-center underline font-extrabold mb-6">
          CRM
        </h1>
        <nav className="flex flex-col text-center gap-4">
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
