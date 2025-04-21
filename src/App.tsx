import { useState, useEffect } from "react";

import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

import {
  type Equipment,
  fetchEquipments,
  fetchEquipment,
  deleteEquipment,
} from "./data";

const App = () => {
  const [equipments, setEquipments] = useState<Equipment[] | null>();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchData = async () => {
    const equipments = await fetchEquipments();
    setEquipments(equipments);
  };

  useEffect(() => {
    fetchData();
  }, [isAdding, isEditing]);

  const handleEdit = async (id: string, ename: string) => {
    const equipment = await fetchEquipment(id, ename);
    setSelectedEquipment(equipment ?? null);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, ename: string) => {
    await deleteEquipment(id, ename);
    fetchData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!isAdding && !isEditing && (
        <>
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Equipment Management Software
            </h1>
            <div className="mt-6">
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Add Equipment
              </button>
            </div>
          </header>

          <Table
            equipments={equipments}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}

      {isAdding && <Add setIsAdding={setIsAdding} />}

      {isEditing && selectedEquipment && (
        <Edit
          selectedEquipment={selectedEquipment}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default App;
