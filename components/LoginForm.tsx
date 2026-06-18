"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
      } else {
        setError(data.error || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p>Masukkan password untuk akses admin panel</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="button primary"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a1f47 0%, #1e5a96 100%);
          padding: 2rem;
        }

        .login-card {
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .login-card h1 {
          margin-bottom: 0.5rem;
          color: #0a1f47;
        }

        .login-card p {
          color: #64748b;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #0f172a;
        }

        .input-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
        }

        .input-group input:focus {
          outline: none;
          border-color: #1e5a96;
          box-shadow: 0 0 0 3px rgba(30, 90, 150, 0.1);
        }

        .error-message {
          color: #dc2626;
          padding: 0.75rem;
          background: #fee2e2;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
