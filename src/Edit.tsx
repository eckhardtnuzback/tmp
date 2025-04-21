import { useState } from "react";
import {
  type Equipment,
  putEquipment,
} from "./data";

type EditProps = {
  selectedEquipment: Equipment;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const Edit: React.FC<EditProps> = ({ selectedEquipment, setIsEditing }) => {
  const [ename, setename] = useState(selectedEquipment.ename);
  const [email, setEmail] = useState(selectedEquipment.email);
  const [price, setprice] = useState(selectedEquipment.price);
  const [date, setDate] = useState(selectedEquipment.date);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ename || !email || !price || !date) return;

    const equipment: Equipment = {
      id: selectedEquipment.id,
      ename,
      email,
      price,
      date,
    };
    await putEquipment(equipment);

    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <form onSubmit={handleUpdate} className="space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Equipment</h1>

        <div>
          <label htmlFor="ename" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="ename"
            type="text"
            name="ename"
            value={ename}
            onChange={(e) => setename(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setprice(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
