import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-green-100 p-4 rounded">Revenue: $5,000</div>
          <div className="bg-blue-100 p-4 rounded">Users: 1,200</div>
          <div className="bg-yellow-100 p-4 rounded">Bookings: 300</div>
        </div>
      </div>
    </div>
  );
}
