const bookings = [
  { id: 101, service: "Plumbing", status: "Pending" },
  { id: 102, service: "Cleaning", status: "Completed" },
];

export default function Bookings() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} className="p-2 border mb-2">
            {booking.service} - {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
