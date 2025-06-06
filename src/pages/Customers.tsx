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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Customer | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedCustomers = [...customers].sort((a, b) => {
    if (!sortField) return 0;

    const valueA = a[sortField].toString().toLowerCase();
    const valueB = b[sortField].toString().toLowerCase();

    if (sortOrder === "asc") return valueA.localeCompare(valueB);
    return valueB.localeCompare(valueA);
  });

  const filteredCustomers = sortedCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  console.log("CustomerList component rendered");

  return (
    <div className="p-4 h-screen w-full overflow-x-auto select-none relative">
      <h1 className="text-3xl text-blue-400 uppercase text-center font-bold mb-4">
        Customers
      </h1>

      <form className="max-w-md mx-auto">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none block w-full p-4 ps-10 text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
          />
          {/* <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button> */}
        </div>
      </form>

      <CustomerTable
        customers={paginatedCustomers}
        onDelete={handleDeleteCustomer}
        onEdit={handleEditClick}
        onSort={handleSort}
      />

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 cursor-pointer bg-blue-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-blue-150"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 cursor-pointer bg-blue-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

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

      <button
        onClick={handleOpenAddForm}
        className="absolute bottom-10 size-15 right-4 rounded-2xl bg-blue-300 text-white py-2 px-4 mb-4  hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            fill="#ffffff"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Customers;
