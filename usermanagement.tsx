const users = [
  { id: 1, name: "John Doe", role: "Customer" },
  { id: 2, name: "Jane Smith", role: "Service Provider" },
];

export default function UserManagement() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
