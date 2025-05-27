type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const customers: Customer[] = [
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
    </div>
  );
};

export default Customers;
