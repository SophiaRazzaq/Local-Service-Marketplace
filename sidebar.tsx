import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-2"><Link to="/" className="hover:underline">Dashboard</Link></li>
          <li className="mb-2"><Link to="/users" className="hover:underline">Users</Link></li>
          <li className="mb-2"><Link to="/bookings" className="hover:underline">Bookings</Link></li>
        </ul>
      </nav>
    </div>
  );
}
