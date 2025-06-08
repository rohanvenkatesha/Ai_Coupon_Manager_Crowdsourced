import { useState } from "react";

type CouponResponse = {
  message?: string;
  coupon?: string;
};

type ValidationResponse = {
  valid: boolean;
  message?: string;
  code?: string;
  store?: string;
  discount?: number;
  expires_at?: string;
};

type StoreValidationResponse = {
  valid: boolean;
  message?: string;
  store?: string;
  coupons?: {
    code: string;
    discount: number;
    expires_at: string;
    expired: boolean;
    ai_rating?: string;
    user_rating?: number;
  }[];
};

export default function Home() {
  const [store, setStore] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [generateCode, setGenerateCode] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<CouponResponse | null>(null);

  const [validateQuery, setValidateQuery] = useState("");
  const [validateResponse, setValidateResponse] = useState<ValidationResponse | null>(null);

  const [validateStore, setValidateStore] = useState("");
  const [storeValidateResponse, setStoreValidateResponse] = useState<StoreValidationResponse | null>(null);

  async function handleSubmitCoupon(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      store,
      code: generateCode ? undefined : code,
      discount: parseFloat(discount),
      expires_at: expiresAt,
    };

    const queryParam = generateCode ? "?generate_code=true" : "";

    const res = await fetch(`/submit-coupon${queryParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setSubmitResponse(data);
  }

  async function handleValidateCoupon(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/validate-coupon-ai?query=${encodeURIComponent(validateQuery)}`);
    const data = await res.json();
    setValidateResponse(data);
  }

  async function handleValidateByStore(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/validate-by-store?store=${encodeURIComponent(validateStore)}`);
    const data = await res.json();
    setStoreValidateResponse(data);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-white text-black">

      <div className="max-w-2xl w-full rounded-xl shadow-lg p-8 space-y-10 bg-white">
        <h1 className="text-4xl font-bold text-center text-foreground">Coupon Manager</h1>

        {/* Submit Coupon Form */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-foreground">Submit Coupon</h2>
          <form onSubmit={handleSubmitCoupon} className="space-y-6">
            <input
              className="input"
              type="text"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              required
              placeholder="Store name"
            />

            {!generateCode && (
              <input
                className="input"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Coupon code"
              />
            )}

            <input
              className="input"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              max="100"
              step="0.01"
              required
              placeholder="Discount (%)"
            />

            <input
              className="input"
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              required
            />

            <label className="flex items-center space-x-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={generateCode}
                onChange={(e) => setGenerateCode(e.target.checked)}
              />
              <span>Generate Coupon Code with AI</span>
            </label>

            <button type="submit" className="btn-blue">Submit Coupon</button>
          </form>

          {submitResponse && (
            <p className="mt-4 text-green-600 text-center">
              {submitResponse.message}{" "}
              {submitResponse.coupon && <strong>Code: {submitResponse.coupon}</strong>}
            </p>
          )}
        </section>

        {/* Validate Coupon */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-foreground">Validate Coupon</h2>
          <form onSubmit={handleValidateCoupon} className="space-y-4">
            <input
              className="input"
              type="text"
              value={validateQuery}
              onChange={(e) => setValidateQuery(e.target.value)}
              required
              placeholder="Enter coupon code or description"
            />
            <button type="submit" className="btn-green">Validate Coupon</button>
          </form>

          {validateResponse && (
            <div className={`mt-4 p-4 rounded-lg ${validateResponse.valid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {validateResponse.valid ? (
                <>
                  <p><strong>Code:</strong> {validateResponse.code}</p>
                  <p><strong>Store:</strong> {validateResponse.store}</p>
                  <p><strong>Discount:</strong> {validateResponse.discount}%</p>
                  <p><strong>Expires At:</strong> {validateResponse.expires_at}</p>
                </>
              ) : (
                <p>{validateResponse.message}</p>
              )}
            </div>
          )}
        </section>

        {/* Validate by Store */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-foreground">Coupons by Store</h2>
          <form onSubmit={handleValidateByStore} className="space-y-4">
            <input
              className="input"
              type="text"
              value={validateStore}
              onChange={(e) => setValidateStore(e.target.value)}
              required
              placeholder="Enter store name"
            />
            <button type="submit" className="btn-purple">Get Coupons</button>
          </form>

          {storeValidateResponse && (
            <div className={`mt-4 ${storeValidateResponse.valid ? "bg-blue-100 text-blue-900" : "bg-red-100 text-red-800"} rounded-lg p-4`}>
              {storeValidateResponse.valid ? (
                <>
                  <p className="font-semibold mb-4">Coupons for: {storeValidateResponse.store}</p>
                  <ul className="space-y-4 list-none p-0 m-0">
                    {storeValidateResponse.coupons?.map((c) => (
                      <li
                        key={c.code}
                        className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                      >
                        <div>
                          <strong>{c.code}</strong> - {c.discount.toFixed(2)}% off - Expires: {c.expires_at}
                          <br />
                          <div className="mt-2 flex gap-2">
                            <button className="btn-success">Works</button>
                            <button className="btn-danger">Doesn’t Work</button>
                          </div>
                        </div>

                        {/* Ratings on right */}
                        <div className="flex flex-col items-center space-y-1 ml-4 min-w-[110px]">
                          {/* Customer Rating */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-white">
                              {c.user_rating !== undefined ? c.user_rating.toFixed(1) : "N/A"}
                            </div>
                            <span className="text-xs mt-1 text-gray-600 ">Customer Rating</span>
                          </div>

                          {/* AI Rating */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-white">
                              N/A
                            </div>
                            <span className="text-xs mt-1 text-gray-600 ">AI Rating (Coming Soon)</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>{storeValidateResponse.message}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
