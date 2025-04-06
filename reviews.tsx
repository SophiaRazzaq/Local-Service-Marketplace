const reviews = [{ id: 401, review: "Great service!", status: "Pending" }];

export default function Reviews() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Review Moderation</h2>
      {reviews.map((r) => (
        <div key={r.id} className="p-2 border mb-2">
          {r.review} - {r.status}
        </div>
      ))}
    </div>
  );
}
