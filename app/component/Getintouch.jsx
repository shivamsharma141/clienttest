import React from "react";
import styles from "./getintouch.module.css";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Traditional Bilona Method",
    desc: "We churn curd using the ancient bilona (wooden churner) method — not industrial separation. This preserves all nutrients and gives ghee its authentic aroma.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l2-2m0 0l7-7 7 7M5 7v12a1 1 0 001 1h4m6 0a1 1 0 001-1V7m-6 4v8m-4-4h8" />
        <ellipse cx="12" cy="8" rx="3" ry="2" />
      </svg>
    ),
    title: "Indigenous A2 Desi Cows",
    desc: "Our cows are native Indian breeds producing A2 beta-casein milk, which is far more digestible and nutritious than hybrid cow milk.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 7 7 5 3 7M12 12C12 7 17 5 21 7" />
        <path d="M3 7c0 5 4 9 9 9s9-4 9-9" />
      </svg>
    ),
    title: "Natural Fodder & Free Grazing",
    desc: "No hormones, no antibiotics. Our cows eat natural fodder and live freely — happy cows produce the purest milk.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Zero Additives",
    desc: "No preservatives, no artificial colour, no flavouring — just pure dairy as nature intended.",
  },
];

const stats = [
  { value: "A2", label: "MILK TYPE" },
  { value: "Bilona", label: "METHOD" },
  { value: "0", label: "ADDITIVES" },
];

export default function GaavDifference() {
  return (
    <>
      {/* ── WHY CHOOSE US SECTION ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Left column */}
          <div className={styles.left}>
            <div className={styles.eyebrow}>
              <span className={styles.line} />
              WHY CHOOSE US
              <span className={styles.line} />
            </div>

            <h2 className={styles.heading}>The GAAV Difference</h2>
            <span className={styles.headingAccent} />

            <ul className={styles.featureList}>
              {features.map((f, i) => (
                <li key={i} className={styles.featureItem}>
                  <div className={styles.iconWrap}>{f.icon}</div>
                  <div>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — Farm Card */}
          <div className={styles.right}>
            <div className={styles.farmCard}>
              <div className={styles.cowEmoji}>🐄</div>
              <h3 className={styles.farmName}>Bhati Family Farm</h3>
              <p className={styles.farmSub}>Yashoda Dairy Farm, Delhi</p>

              <div className={styles.divider} />

              <div className={styles.statsRow}>
                {stats.map((s, i) => (
                  <div key={i} className={styles.stat}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaHeading}>Ready to taste the difference?</h2>
            <p className={styles.ctaSubtext}>
              Order pure dairy products directly from our farm. COD available in Delhi.
            </p>
          </div>
         <Link href="/home#products" className={styles.ctaBtn}>
            Shop Now&nbsp;→
         </Link>
        </div>
      </section>
    </>
  );
}