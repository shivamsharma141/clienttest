"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./checkout.module.css";
import { useCart } from "../component/Cartcontext.js";

const RAZORPAY_KEY = "rzp_test_XXXXXXXXXXXXXXXX"; // Replace with your actual Razorpay key

const DELHI_KEYWORDS = [
  "delhi",
  "new delhi",
  "north delhi",
  "south delhi",
  "east delhi",
  "west delhi",
  "central delhi",
  "ndmc",
];

const DELHI_PINCODES = [
  "110001","110002","110003","110004","110005","110006","110007","110008","110009","110010",
  "110011","110012","110013","110014","110015","110016","110017","110018","110019","110020",
  "110021","110022","110023","110024","110025","110026","110027","110028","110029","110030",
  "110031","110032","110033","110034","110035","110036","110037","110038","110039","110040",
  "110041","110042","110043","110044","110045","110046","110047","110048","110049","110050",
  "110051","110052","110053","110054","110055","110056","110057","110058","110059","110060",
  "110061","110062","110063","110064","110065","110066","110067","110068","110069","110070",
  "110071","110072","110073","110074","110075","110076","110077","110078","110079","110080",
  "110081","110082","110083","110084","110085","110086","110087","110088","110089","110090",
  "110091","110092","110093","110094","110095","110096","110097","110098","110099",
];

function isDelhi(city, pincode) {
  const cityLower = city.toLowerCase().trim();
  const isDelhiCity = DELHI_KEYWORDS.some((k) => cityLower.includes(k));
  const isDelhiPin = DELHI_PINCODES.includes(pincode.trim());
  return isDelhiCity || isDelhiPin;
}

export default function CheckoutPage() {
  const router = useRouter();

  // ── Cart data ──────────────────────────────────────────────
  const { cartItems, cartTotal } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isDelhi_, setIsDelhi_] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [errors, setErrors] = useState({});
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const delhiStatus = isDelhi(form.city, form.pincode);
    setIsDelhi_(delhiStatus);
    if (!delhiStatus && paymentMethod === "cod") {
      setPaymentMethod("online");
    }
  }, [form.city, form.pincode]);

  useEffect(() => {
    const allFilled =
      form.fullName.trim() &&
      form.phone.trim().length === 10 &&
      form.address.trim() &&
      form.city.trim() &&
      form.pincode.trim().length === 6;
    setFormFilled(!!allFilled);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim() || form.phone.trim().length !== 10)
      newErrors.phone = "Enter valid 10-digit mobile number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim() || form.pincode.trim().length !== 6)
      newErrors.pincode = "Enter valid 6-digit pincode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRazorpay = () => {
    if (!razorpayLoaded) {
      alert("Payment gateway loading, please try again.");
      return;
    }
    const options = {
      key: RAZORPAY_KEY,
      amount: cartTotal * 100,           // ← dynamic total
      currency: "INR",
      name: "Gaav Se",
      description: `Order (${cartItems.length} item${cartItems.length > 1 ? "s" : ""})`,
      image: "/logo.png",
      prefill: {
        name: form.fullName,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: `${form.address}, ${form.city} - ${form.pincode}`,
      },
      theme: { color: "#4a9e6a" },
      handler: function (response) {
        alert(
          `Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`
        );
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (paymentMethod === "online") {
      handleRazorpay();
    } else {
      alert("Order placed with Cash on Delivery!");
    }
  };

  const buttonLabel = formFilled
    ? paymentMethod === "cod"
      ? "Place Order (COD)"
      : "Pay & Place Order"
    : "Fill Details Above";

  // Don't render if cart is empty (redirect is happening)
  if (cartItems.length === 0) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.grid}>
          {/* LEFT COLUMN */}
          <div className={styles.left}>
            {/* Customer Details */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Customer Details</h2>
              <div className={styles.divider} />

              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.label}>FULL NAME *</label>
                  <input
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <span className={styles.error}>{errors.fullName}</span>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>PHONE NUMBER *</label>
                  <input
                    className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className={styles.error}>{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>EMAIL</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Delivery Address</h2>
              <div className={styles.divider} />

              <div className={styles.field}>
                <label className={styles.label}>FULL ADDRESS *</label>
                <textarea
                  className={`${styles.textarea} ${errors.address ? styles.inputError : ""}`}
                  name="address"
                  placeholder="House no., Street, Locality..."
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.address && (
                  <span className={styles.error}>{errors.address}</span>
                )}
              </div>

              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.label}>CITY *</label>
                  <input
                    className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <span className={styles.error}>{errors.city}</span>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>PINCODE *</label>
                  <input
                    className={`${styles.input} ${errors.pincode ? styles.inputError : ""}`}
                    type="text"
                    name="pincode"
                    placeholder="6-digit pincode"
                    maxLength={6}
                    value={form.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && (
                    <span className={styles.error}>{errors.pincode}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method — only shown when form is filled */}
            {formFilled && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Payment Method</h2>
                <div className={styles.divider} />

                {!isDelhi_ && (
                  <div className={styles.infoBox}>
                    <span className={styles.infoIcon}>ℹ</span>
                    Outside Delhi, only prepaid orders are accepted.
                  </div>
                )}

                <div className={styles.paymentOptions}>
                  <label
                    className={`${styles.paymentOption} ${paymentMethod === "online" ? styles.paymentSelected : ""}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className={styles.radioInput}
                    />
                    <div className={styles.paymentIcon}>
                      <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                        <rect width="28" height="20" rx="3" fill="#F5A623" />
                        <rect x="0" y="5" width="28" height="5" fill="#C8811A" />
                        <rect x="3" y="13" width="6" height="2" rx="1" fill="white" opacity="0.7" />
                      </svg>
                    </div>
                    <div className={styles.paymentInfo}>
                      <span className={styles.paymentName}>Online Payment</span>
                      <span className={styles.paymentSub}>Razorpay — UPI, Cards, Net Banking</span>
                    </div>
                  </label>

                  {isDelhi_ && (
                    <label
                      className={`${styles.paymentOption} ${paymentMethod === "cod" ? styles.paymentSelected : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className={styles.radioInput}
                      />
                      <div className={styles.paymentIcon}>
                        <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                          <rect width="28" height="20" rx="3" fill="#4a9e6a" />
                          <circle cx="14" cy="10" r="5" fill="white" opacity="0.3" />
                          <text x="14" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">₹</text>
                        </svg>
                      </div>
                      <div className={styles.paymentInfo}>
                        <span className={styles.paymentName}>Cash on Delivery</span>
                        <span className={styles.paymentSub}>Available only in Delhi</span>
                      </div>
                    </label>
                  )}
                </div>

                <p className={styles.paymentNote}>
                  {isDelhi_
                    ? "Cash on Delivery & Online payment available for Delhi."
                    : "Cash on Delivery available only in Delhi. Online payment available for all locations."}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — Order Summary (DYNAMIC) */}
          <div className={styles.right}>
            <div className={styles.summaryCard}>
              <h2 className={styles.cardTitle}>Order Summary</h2>
              <div className={styles.divider} />

              {/* Dynamic cart items list */}
              {cartItems.map((item) => (
                <div key={item.itemId} className={styles.summaryItem}>
                  <div>
                    <p className={styles.productName}>{item.name}</p>
                    <p className={styles.productQty}>
                      {item.variantLabel} × {item.quantity}
                    </p>
                  </div>
                  <span className={styles.productPrice}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}

              <div className={styles.divider} />

              {/* Dynamic total */}
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                className={`${styles.ctaBtn} ${!formFilled ? styles.ctaBtnDisabled : ""}`}
                onClick={handleSubmit}
                disabled={false}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}