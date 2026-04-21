"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";

const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordStrength(pass) {
  if (!pass) return 0;
  let s = 0;
  if (pass.length >= 8)           s++;
  if (/[A-Z]/.test(pass))         s++;
  if (/[0-9]/.test(pass))         s++;
  if (/[^A-Za-z0-9]/.test(pass))  s++;
  return s;
}

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", "#e53935", "#fb8c00", "#43a047", "#1b5e20"];

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.39 1 12c.93-2.21 2.37-4.07 4.07-5.44"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c5 0 9.27 3.61 11 8a10.09 10.09 0 01-2.17 3.37"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12C2.73 7.61 7 4 12 4s9.27 3.61 11 8c-1.73 4.39-6 8-11 8S2.73 16.39 1 12z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirm: "",
  });
  const [errors,   setErrors]   = useState({});
  const [success,  setSuccess]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const strength      = passwordStrength(form.password);
  const strengthLabel = STRENGTH_LABEL[strength];
  const strengthColor = STRENGTH_COLOR[strength];

  const validate = () => {
    const errs = {};
    if (!form.name.trim())                               errs.name = "Full name is required.";
    else if (form.name.trim().length < 2)                errs.name = "Name must be at least 2 characters.";
    else if (!/^[a-zA-Z\s'-]+$/.test(form.name.trim())) errs.name = "Letters, spaces, hyphens or apostrophes only.";

    if (!form.email.trim())                              errs.email = "Email address is required.";
    else if (!EMAIL_REGEX.test(form.email.trim()))       errs.email = "Please enter a valid email address.";

    if (form.phone.trim()) {
      const stripped = form.phone.trim().replace(/\s|-/g, "");
      if (!PHONE_REGEX.test(stripped))                   errs.phone = "Enter a valid 10-digit Indian mobile number (starts with 6–9).";
    }

    if (!form.password)                                  errs.password = "Password is required.";
    else if (form.password.length < 8)                   errs.password = "At least 8 characters required.";
    else if (!/[A-Z]/.test(form.password))               errs.password = "Add at least one uppercase letter.";
    else if (!/[0-9]/.test(form.password))               errs.password = "Add at least one number.";
    else if (!/[^A-Za-z0-9]/.test(form.password))       errs.password = "Add at least one special character.";

    if (!form.confirm)                                   errs.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password)             errs.confirm = "Passwords do not match.";

    return errs;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  setErrors(errs);
  if (Object.keys(errs).length > 0) return;

  try {
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ important for cookies
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ email: data.message || "Something went wrong" });
      setLoading(false);
      return;
    }

    setSuccess(true);

  } catch (error) {
    console.error("Signup error:", error);
    setErrors({ email: "Server error. Please try again." });
  } finally {
    setLoading(false);
  }
};

  // ── Success screen ───────────────────────────────────────────
  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.bg}>
          <div className={styles.circle1} /><div className={styles.circle2} />
          <div className={styles.leaf1}>🌿</div><div className={styles.leaf2}>🍃</div>
        </div>
        <div className={styles.successCard}>
          <div className={styles.successRing}><span className={styles.successEmoji}>🎉</span></div>
          <h2 className={styles.successTitle}>Welcome to the GAAV family!</h2>
          <p className={styles.successSub}>
            Your account has been created.<br />
            Log in to start enjoying farm-fresh goodness.
          </p>
          <button className={styles.primaryBtn} onClick={() => router.push("/loggin")}>
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.circle1} /><div className={styles.circle2} />
        <div className={styles.leaf1}>🌿</div><div className={styles.leaf2}>🍃</div>
      </div>

      <div className={styles.card}>

        {/* Brand — identical to login */}
        <a href="/" className={styles.brand} aria-label="Back to home">
          <div className={styles.brandIcon}>🐄</div>
          <div>
            <div className={styles.brandName}>GAAV</div>
            <div className={styles.brandSub}>by Yashoda Dairy Farm</div>
          </div>
        </a>

        <div className={styles.formHead}>
          <h1 className={styles.title}>Join the family</h1>
          <p className={styles.sub}>Create your account and get farm-fresh dairy at your door.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>

          {/* Full Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <input
              id="name" type="text" autoFocus
              className={`${styles.input} ${errors.name ? styles.inputErr : ""}`}
              placeholder="Ravi Kumar"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              autoComplete="name"
            />
            {errors.name && <p className={styles.fieldErr} role="alert">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input
              id="email" type="email"
              className={`${styles.input} ${errors.email ? styles.inputErr : ""}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              autoComplete="email"
            />
            {errors.email && <p className={styles.fieldErr} role="alert">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">
              Mobile Number <span className={styles.optional}>(optional)</span>
            </label>
            <div className={`${styles.phoneWrap} ${errors.phone ? styles.phoneErr : ""}`}>
              <span className={styles.countryCode}>+91</span>
              <input
                id="phone" type="tel" inputMode="numeric"
                className={styles.phoneInput}
                placeholder="98765 43210"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                autoComplete="tel"
              />
            </div>
            {errors.phone && <p className={styles.fieldErr} role="alert">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.inputWrap}>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                className={`${styles.input} ${errors.password ? styles.inputErr : ""}`}
                placeholder="Min 8 chars, uppercase, number, symbol"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                autoComplete="new-password"
              />
              <button type="button" className={styles.eyeBtn}
                onClick={() => setShowPass((p) => !p)}
                aria-label={showPass ? "Hide password" : "Show password"}>
                <EyeIcon open={showPass} />
              </button>
            </div>
            {form.password && (
              <div className={styles.strengthWrap}>
                <div className={styles.strengthBar}>
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={styles.strengthSeg}
                      style={{ background: i <= strength ? strengthColor : "#c8e6c9" }} />
                  ))}
                </div>
                <span className={styles.strengthLbl} style={{ color: strengthColor }}>{strengthLabel}</span>
              </div>
            )}
            {errors.password && <p className={styles.fieldErr} role="alert">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirm">Confirm Password</label>
            <div className={styles.inputWrap}>
              <input
                id="confirm"
                type={showConf ? "text" : "password"}
                className={`${styles.input} ${errors.confirm ? styles.inputErr : ""}`}
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
                autoComplete="new-password"
              />
              <button type="button" className={styles.eyeBtn}
                onClick={() => setShowConf((p) => !p)}
                aria-label={showConf ? "Hide password" : "Show password"}>
                <EyeIcon open={showConf} />
              </button>
            </div>
            {form.confirm && !errors.confirm && form.confirm === form.password && (
              <p className={styles.matchOk}>✓ Passwords match</p>
            )}
            {errors.confirm && <p className={styles.fieldErr} role="alert">{errors.confirm}</p>}
          </div>

          <button type="submit" className={styles.primaryBtn} disabled={loading}>
            {loading
              ? <span className={styles.spinner} aria-label="Creating account…" />
              : "Create Account →"}
          </button>
        </form>

        <div className={styles.divider}><span>Already have an account?</span></div>
        <a href="/loggin" className={styles.switchLink}>← Back to Login</a>
      </div>
    </div>
  );
}