import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: number;
};

const Dashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("customers");
    if (stored) {
      setCustomers(JSON.parse(stored));
    }
  }, []);

  const totalCustomers = customers.length;
  const recentCustomers = [...customers].slice(-5).reverse();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl text-blue-300 font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-blue-400">
            Total Customers
          </h2>
          <p className="text-2xl pt-4 font-semibold">{totalCustomers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-blue-400">
            Emails Collected
          </h2>
          <p className="text-2xl pt-4 font-semibold">
            {customers.filter((customer) => customer.email).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-blue-400">Phone Numbers</h2>
          <p className="text-2xl pt-4 font-semibold">
            {customers.filter((customer) => customer.phone).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-blue-400">New This Week</h2>
          <p className="text-2xl pt-4 font-semibold">--</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <caption className="py-5 px-2 text-3xl text-blue-300 font-semibold text-left ">
            Recent Customers
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-blue-50 rounded-md">
            <tr className="text-sm text-gray-600 border-b">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {recentCustomers.map((customer) => (
              <tr key={customer.id} className="text-lg">
                <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
                  {customer.name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
                  {customer.email}
                </td>
                <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
                  {customer.phone}
                </td>
              </tr>
            ))}
            {recentCustomers.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No customer yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
