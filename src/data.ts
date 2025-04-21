import { v4 as uuidv4 } from "uuid";
type Equipment = {
  id?: string;
  ename: string;
  email: string;
  price: number;
  date: string;
};
export type { Equipment };

const fetchEquipments = async () => {
  try {
    const response = await fetch(
      "https://62d5lee52a.execute-api.ca-central-1.amazonaws.com/items"
    );
    if (!response.ok) throw new Error("Failed to fetch equipment");

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data as Equipment[];
    }
    return null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
  }
};

const fetchEquipment = async (id: string, ename: string) => {
  try {
    const response = await fetch(
      `https://62d5lee52a.execute-api.ca-central-1.amazonaws.com/items/${id}/${ename}`
    );
    if (!response.ok) throw new Error("Failed to fetch equipment");

    const data = await response.json();
    if (data) return data as Equipment;
    return null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
  }
};

const deleteEquipment = async (id: string, ename: string) => {
  try {
    const response = await fetch(
      `https://62d5lee52a.execute-api.ca-central-1.amazonaws.com/items/${id}/${ename}`,
      {
        method: "Delete",
      }
    );
    if (!response.ok) throw new Error("Failed to fetch equipment");
  } catch (error) {
    console.error("Error fetching equipment:", error);
  }
};

const addEquipment = async (equipment: Equipment) => {
  try {
    const response = await fetch(
      `https://62d5lee52a.execute-api.ca-central-1.amazonaws.com/items`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          ename: equipment.ename,
          email: equipment.email,
          price: equipment.price,
          date: equipment.date,
        }),
      }
    );
    if (!response.ok) throw new Error("Failed to fetch equipment");
  } catch (error) {
    console.error("Error fetching equipment:", error);
  }
};

const putEquipment = async (equipment: Equipment) => {
  try {
    const response = await fetch(
      `https://62d5lee52a.execute-api.ca-central-1.amazonaws.com/items/${equipment.id}/${equipment.ename}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: equipment.email,
          price: equipment.price,
          date: equipment.date,
        }),
      }
    );
    if (!response.ok) throw new Error("Failed to fetch equipment");

    const data = await response.json();
    if (data) return data as Equipment;
    return null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
  }
};

export { fetchEquipments, fetchEquipment, deleteEquipment, addEquipment,putEquipment };
