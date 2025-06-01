import { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";
import Modal from "../components/Modal";

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
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const stored = localStorage.getItem("customers");
    return stored ? JSON.parse(stored) : initialCustomers;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleAddCustomer = (data: Omit<Customer, "id">) => {
    const newCustomer: Customer = {
      id: customers.length + 1,
      ...data,
    };
    setCustomers([...customers, newCustomer]);
    setIsModalOpen(false);
  };

  const handleUpdateCustomer = (data: Omit<Customer, "id">) => {
    if (!editCustomer) return;
    const updated = customers.map((customer) =>
      customer.id === editCustomer.id ? { ...customer, ...data } : customer
    );
    setCustomers(updated);
    setEditCustomer(null);
    setIsModalOpen(false);
  };

  const handleDeleteCustomer = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmed) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  const handleEditClick = (customer: Customer) => {
    setEditCustomer(customer);
    setIsModalOpen(true);
  };

  const handleOpenAddForm = () => {
    setEditCustomer(null);
    setIsModalOpen(true);
  };
  console.log("CustomerList component rendered");

  return (
    <div className="p-4 w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <button
        onClick={handleOpenAddForm}
        className="bg-gray-600 text-white py-2 px-4 mb-4 rounded hover:bg-gray-700"
      >
        Add
      </button>
      <CustomerTable
        customers={customers}
        onDelete={handleDeleteCustomer}
        onEdit={handleEditClick}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CustomerForm
          onSubmit={editCustomer ? handleUpdateCustomer : handleAddCustomer}
          defaultValues={
            editCustomer
              ? {
                  name: editCustomer.name,
                  email: editCustomer.email,
                  phone: editCustomer.phone,
                }
              : undefined
          }
          isEditing={!!editCustomer}
        />
      </Modal>
    </div>
  );
};

export default Customers;
