const codes = [{ id: 301, code: "SAVE20", discount: "20%" }];

export default function DiscountCodes() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Discount Codes</h2>
      {codes.map((code) => (
        <div key={code.id} className="p-2 border mb-2">
          {code.code} - {code.discount}
        </div>
      ))}
    </div>
  );
}
