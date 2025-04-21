import { type Equipment } from "./data"; // Adjust the path if needed

type TableProps = {
  equipments: Equipment[] | null | undefined;
  handleEdit: (id: string, ename: string) => void;
  handleDelete: (id: string, ename: string) => void;
};

const Table: React.FC<TableProps> = ({
  equipments,
  handleEdit,
  handleDelete,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left border-b">No.</th>
            <th className="px-4 py-3 text-left border-b">Name</th>
            <th className="px-4 py-3 text-left border-b">Email</th>
            <th className="px-4 py-3 text-left border-b">Price</th>
            <th className="px-4 py-3 text-left border-b">Date</th>
            <th className="px-4 py-3 text-center border-b" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {equipments && equipments.length > 0 ? (
            equipments.map((equipment, i) => (
              <tr
                key={equipment.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 border-b">{i + 1}</td>
                <td className="px-4 py-3 border-b">{equipment.ename}</td>
                <td className="px-4 py-3 border-b">{equipment.email}</td>
                <td className="px-4 py-3 border-b">
                  {formatter.format(Number(equipment.price))}
                </td>
                <td className="px-4 py-3 border-b">{equipment.date}</td>
                <td className="px-4 py-3 border-b text-right">
                  <button
                    onClick={() => handleEdit(equipment.id!, equipment.ename)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-3 border-b text-left">
                  <button
                    onClick={() => handleDelete(equipment.id!, equipment.ename)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                No equipments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
