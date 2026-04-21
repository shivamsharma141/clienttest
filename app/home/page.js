'use client';

import React from 'react';
import styles from './home.module.css';
import Products from '../component/Products.jsx';

const MARQUEE_ITEMS = [
  'A2 Desi Cow Ghee', 'Bilona Method', 'Farm Fresh Paneer',
  'Cold Pressed Oils', 'Zero Additives', 'All India Delivery',
  'Pure Tradition Since 1987',
];

const TRUST_ITEMS = [
  { icon: '🌿', text: 'No Preservatives' },
  { icon: '🐄', text: 'Indigenous Desi Cows' },
  { icon: '🏡', text: 'Farm-to-Home' },
  { icon: '🔄', text: 'Traditional Bilona Process' },
  { icon: '💚', text: 'No Artificial Colours' },
];

export default function Home() {
  /* Duplicate items so the seamless loop works */
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  // Smooth scroll function
  const scrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>

        {/* Dot-grid background */}
        <div className={styles.bgPattern}></div>

        {/* Ambient radial glow + spinning rings (top-right) */}
        <div className={styles.mandalaBg}>
          <div className={styles.mandalaRing}></div>
          <div className={styles.mandalaRing2}></div>
        </div>

        {/* ── Nav ── */}
        <nav className={styles.nav}>
          <div className={styles.navLogo}>
            YASHODA
            <span className={styles.navLogoSub}>Dairy Farm &nbsp;·&nbsp; Est. 1987</span>
          </div>
          <div className={styles.navLinks}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="#products" onClick={scrollToProducts} className={styles.navLink}>Products</a>
            <a href="#story" className={styles.navLink}>Our Story</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </div>
          <div className={styles.navPill}>✦ Bilona Method Certified</div>
        </nav>

        {/* ── Scrolling Marquee strip ── */}
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {marqueeItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < marqueeItems.length - 1 && (
                  <span className={styles.marqueeSep}> &nbsp;✦&nbsp; </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Hero inner ── */}
        <div className={styles.heroInner}>

          {/* ── Left Content ── */}
          <div className={styles.heroLeft}>

            {/* Eyebrow label */}
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot}></span>
              Bhati Family Farm &nbsp;·&nbsp; Since 1987
            </div>

            <div className={styles.headingGroup}>
              <h1 className={styles.headingWhite}>The Taste of</h1>
              <h1 className={styles.headingGold}><em>Pure Tradition</em></h1>
            </div>

            <p className={styles.heroDesc}>
              <span className={styles.descLine1}>
                🫙 A2 Desi Cow Bilona Ghee, Fresh Paneer,
              </span>
              <span className={styles.descLine2}>
                Butter &amp; Cold-Pressed Oils —
              </span>
              <span className={styles.descLine3}>
                Crafted the traditional way by the Bhati family
              </span>
              <span className={styles.descLine4}>
                at Yashoda Dairy Farm, straight from our cows to your kitchen.
              </span>
            </p>

            <div className={styles.btnGroup}>
              <a href="#products" onClick={scrollToProducts} className={styles.btnPrimary}>
                Shop Now &rarr;
              </a>
              <a href="#story" className={styles.btnSecondary}>
                Our Story &nbsp;↗
              </a>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Natural</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>A2</span>
                <span className={styles.statLabel}>Desi Cow</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Zero</span>
                <span className={styles.statLabel}>Additives</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Delivery</span>
                <span className={styles.statLabel}>All Over India</span>
              </div>
               <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>37+</span>
                <span className={styles.statLabel}>Years Legacy</span>
              </div>
            </div>

          </div>

          {/* ── Right Visual ── */}
          <div className={styles.heroRight}>
            <div className={styles.circleWrap}>

              {/* Spinning rings */}
              <div className={styles.outerRing}></div>
              <div className={styles.midRing}></div>

              {/* Glow halo behind image */}
              <div className={styles.glowHalo}></div>

              {/* Product image */}
              <div className={styles.imgCircle}>
                <img
                  src="https://as2.ftcdn.net/v2/jpg/11/78/19/51/1000_F_1178195135_SqX3awKdhZaBlCPYxkE8mXwKmTqP4xBo.jpg"
                  alt="Pure A2 Bilona Ghee in a glass jar"
                  className={styles.gheeImg}
                />
                <div className={styles.imgOverlay}></div>
              </div>

              {/* Rotating seal badge */}
              <div className={styles.seal}>
                <div className={styles.sealInner}></div>
                <span className={styles.sealText}>PURE{'\n'}BILONA{'\n'}✦</span>
              </div>

              {/* Floating chips */}
              <div className={styles.deliveryBadge}>Cod only in Delhi 🚚</div>
              <div className={styles.floatBadge1}>Farm Fresh 🌿</div>
              <div className={styles.floatBadge2}>Desi Cow 🐄</div>

            </div>
          </div>

        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className={styles.trustBar}>
        {TRUST_ITEMS.map((item, i) => (
          <React.Fragment key={i}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>{item.icon}</span>
              <span>{item.text}</span>
            </div>
            {i < TRUST_ITEMS.length - 1 && (
              <div className={styles.trustDot}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Products Section ── */}
      <div id="products">
        <Products />
      </div>
    </>
  );
}