const payments = [
  { id: 201, amount: "$100", status: "Completed" },
  { id: 202, amount: "$50", status: "Refunded" },
];

export default function Payments() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      {payments.map((payment) => (
        <div key={payment.id} className="p-2 border mb-2">
          {payment.amount} - {payment.status}
        </div>
      ))}
    </div>
  );
}
