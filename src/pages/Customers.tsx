import { useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Bob Smithson",
    email: "bob@example.com",
    phone: "234-567-8901",
  },
  {
    id: 3,
    name: "Charlie Brownson",
    email: "charlie@example.com",
    phone: "345-678-9012",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <table className="w-full table-auto border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{customer.id}</td>
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name || !email || !phone) {
            alert("Please fill in all fields");
            return;
          }
          const newCustomer: Customer = {
            id: customers.length + 1,
            name,
            email,
            phone,
          };
          setCustomers([...customers, newCustomer]);

          setName("");
          setEmail("");
          setPhone("");
        }}
        className="bg-white p-4 rounded shadow w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default Customers;
