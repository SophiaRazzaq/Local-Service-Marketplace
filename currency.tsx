export default function Currency() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Currency Selection</h2>
      <select className="mt-4 p-2 border rounded">
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>
    </div>
  );
}
