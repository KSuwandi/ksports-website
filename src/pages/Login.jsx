import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

import {
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* =========================
     LOGIN FUNCTION
  ========================= */
  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/admin");

    } catch (err) {

      if (err.code === "auth/user-not-found") {
        setError("Admin tidak ditemukan");
      }

      else if (err.code === "auth/wrong-password") {
        setError("Password salah");
      }

      else if (err.code === "auth/invalid-email") {
        setError("Format email tidak valid");
      }

      else {
        setError("Gagal login");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
      min-h-screen
      bg-black
      text-white

      flex
      items-center
      justify-center

      px-6

      overflow-hidden
      relative
      "
    >

      {/* =========================
          BACKGROUND EFFECT
      ========================= */}
      <div className="absolute inset-0 overflow-hidden">

        <div
          className="
          absolute
          top-[10%]
          left-[10%]

          w-[350px]
          h-[350px]

          rounded-full

          bg-red-500/20

          blur-[140px]
          "
        />

        <div
          className="
          absolute
          bottom-[10%]
          right-[10%]

          w-[300px]
          h-[300px]

          rounded-full

          bg-red-600/10

          blur-[120px]
          "
        />

      </div>

      {/* =========================
          LOGIN CARD
      ========================= */}
      <div
        className="
        relative
        z-10

        w-full
        max-w-md

        rounded-[36px]

        border
        border-red-500/20

        bg-gradient-to-b
        from-zinc-900
        to-black

        p-10

        shadow-[0_0_60px_rgba(239,68,68,0.15)]

        backdrop-blur-xl
        "
      >

        {/* ICON */}
        <div
          className="
          w-20
          h-20

          rounded-3xl

          bg-gradient-to-br
          from-red-600
          to-red-500

          flex
          items-center
          justify-center

          mx-auto

          shadow-[0_0_40px_rgba(239,68,68,0.45)]
          "
        >

          <ShieldCheck size={40} />

        </div>

        {/* TITLE */}
        <div className="text-center mt-8">

          <h1
            className="
            text-5xl
            font-black
            tracking-tight
            "
          >
            ADMIN
          </h1>

          <p className="text-zinc-400 mt-3">
            Login Dashboard KSPORTS
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="text-sm text-zinc-400 mb-2 block">
              Email Admin
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="
              w-full

              bg-black/70

              border
              border-zinc-700

              rounded-2xl

              px-5
              py-4

              outline-none

              focus:border-red-500

              transition-all
              duration-300
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm text-zinc-400 mb-2 block">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Masukkan password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="
                w-full

                bg-black/70

                border
                border-zinc-700

                rounded-2xl

                px-5
                py-4
                pr-14

                outline-none

                focus:border-red-500

                transition-all
                duration-300
                "
              />

              {/* SHOW PASSWORD */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2

                text-zinc-400
                hover:text-white

                transition
                "
              >

                {showPassword
                  ? <EyeOff size={22} />
                  : <Eye size={22} />
                }

              </button>

            </div>

          </div>

          {/* ERROR */}
          {error && (

            <div
              className="
              bg-red-500/10
              border
              border-red-500/20

              rounded-2xl

              px-4
              py-3

              text-red-400
              text-sm
              "
            >
              {error}
            </div>

          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
            w-full

            py-4

            rounded-2xl

            font-bold
            text-lg

            bg-gradient-to-r
            from-red-600
            to-red-500

            hover:scale-[1.02]

            active:scale-[0.98]

            transition-all
            duration-300

            shadow-[0_0_30px_rgba(239,68,68,0.4)]

            disabled:opacity-50
            disabled:cursor-not-allowed
            "
          >

            {loading
              ? "Loading..."
              : "Login Admin"
            }

          </button>

        </form>

      </div>

    </div>

  );

}