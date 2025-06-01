import { Link } from "react-router-dom";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  customers: Customer[];
  onDelete: (id: number) => void;
  onEdit: (customer: Customer) => void;
};

const CustomerTable = ({ customers, onDelete, onEdit }: Props) => {
  return (
    <div className="select-none">
      <table className="w-full table-auto bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left ">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className=" border-b hover:bg-gray-100">
              <td className="px-4 py-2">{customer.id}</td>
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.phone}</td>
              <td className="px-4 py-2 gap-2">
                <Link to={`/customers/${customer.id}`}>
                  <button className="text-yellow-400 hover:underline">
                    View
                  </button>
                </Link>
                <button
                  onClick={() => onEdit(customer)}
                  className="text-blue-400 mx-4 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
