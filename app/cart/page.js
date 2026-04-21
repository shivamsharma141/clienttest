"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../component/Cartcontext.js";
import styles from "./cart.module.css";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const isEmpty = cartItems.length === 0;
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

  const goToProducts = (e) => {
    e.preventDefault();
    window.__scrollTarget = "products";
    router.push("/home");
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Your Cart</h1>
          <p className={styles.pageSubtitle}>
            {isEmpty
              ? "Nothing here yet"
              : `${totalQty} item${totalQty > 1 ? "s" : ""} in cart`}
          </p>
        </div>

        {isEmpty ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyText}>
              Looks like you haven't added anything yet. Explore our pure desi products!
            </p>
            <a href="/home#products" onClick={goToProducts} className={styles.emptyBtn}>
              Browse Products →
            </a>
          </div>
        ) : (
          <div className={styles.layout}>

            <div className={styles.itemsCol}>
              {cartItems.map((item) => (
                <div key={item.itemId} className={styles.cartCard}>

                  <div className={styles.itemImg}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className={styles.itemImgEl} />
                    ) : (
                      <div className={styles.itemImgPlaceholder}>
                        <span className={styles.itemIcon}>{item.icon}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.itemInfo}>
                    <span className={styles.itemCategory}>
                      {item.categoryLabel?.split("·")[0]?.trim()}
                    </span>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <span className={styles.itemVariant}>{item.variantLabel}</span>
                  </div>

                  <div className={styles.itemPriceBlock}>
                    <span className={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    <span className={styles.itemUnitPrice}>
                      ₹{item.price.toLocaleString("en-IN")} each
                    </span>
                  </div>

                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.itemId, -1)} aria-label="Decrease">−</button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.itemId, 1)} aria-label="Increase">+</button>
                    </div>
                    <button className={styles.deleteBtn} onClick={() => removeFromCart(item.itemId)} aria-label="Remove item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6" />
                        <path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6" />
                        <path d="M10,11v6M14,11v6" />
                        <path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2" />
                      </svg>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <aside className={styles.summaryCol}>
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <div className={styles.summaryDivider} />

                <div className={styles.summaryLines}>
                  {cartItems.map((item) => (
                    <div key={item.itemId} className={styles.summaryLine}>
                      <span className={styles.summaryLineLabel}>
                        {item.name} ({item.variantLabel}) × {item.quantity}
                      </span>
                      <span className={styles.summaryLinePrice}>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryDivider} />

                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span className={styles.summaryTotalAmount}>
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className={styles.codNote}>
                  <span className={styles.codIcon}>◎</span>
                  <span>COD available only in Delhi. Online payment available pan‑India.</span>
                </div>

                <a href="/checkout" className={styles.checkoutBtn}>
                  Proceed to Checkout →
                </a>

                <a href="/home#products" onClick={goToProducts} className={styles.continueLink}>
                  ← Continue Shopping
                </a>
              </div>
            </aside>

          </div>
        )}
      </div>
    </main>
  );
}