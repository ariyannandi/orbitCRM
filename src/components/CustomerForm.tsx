import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email in Invalid"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  onSubmit: (customer: FormData) => void;
  defaultValues?: FormData;
  isEditing?: boolean;
};

const CustomerForm = ({
  onSubmit,
  defaultValues,
  isEditing = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    if (!isEditing) reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-4 rounded shadow w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Edit Customer" : "Add New Customer"}
      </h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="text"
          {...register("phone")}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEditing ? "Update Customer" : "Add Customer"}
      </button>
    </form>
  );
};

export default CustomerForm;
