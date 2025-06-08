import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: number;
};

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("customers");
    if (stored) {
      const customers: Customer[] = JSON.parse(stored);
      const found = customers.find((customer) => customer.id === Number(id));
      setCustomer(found || null);
    }
  }, [id]);

  if (!customer) {
    return (
      <div className="p-6 text-center text-red-600">Customer not found.</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <div className="bg-white p-4 shadow rounded">
        <p>
          <strong>ID:</strong>
          {customer.id}
        </p>
        <p>
          <strong>Name:</strong>
          {customer.name}
        </p>
        <p>
          <strong>Email</strong>
          {customer.email}
        </p>
        <p>
          <strong>Phone</strong>
          {customer.phone}
        </p>
      </div>
    </div>
  );
};

export default CustomerDetails;
