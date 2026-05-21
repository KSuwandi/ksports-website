import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../src/context/CartContext";

import {
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";

export default function Navbar() {

  /* =========================
     CART
  ========================= */
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* =========================
     MOBILE MENU
  ========================= */
  const [mobileMenu, setMobileMenu] = useState(false);

  /* =========================
     MENU STYLE
  ========================= */
  const menuClass = `
    text-[17px]
    font-bold
    tracking-wide
    text-zinc-200
    hover:text-red-400
    transition-all
    duration-300
    relative
    uppercase

    after:absolute
    after:left-0
    after:-bottom-3
    after:w-0
    after:h-[2px]
    after:bg-red-500
    after:rounded-full

    hover:after:w-full

    after:transition-all

    hover:drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]
  `;

  return (

    <nav
      className="
      fixed
      top-0
      left-0
      w-full
      z-50

      bg-black/40
      backdrop-blur-3xl

      border-b
      border-red-500/10

      shadow-[0_0_40px_rgba(255,0,0,0.08)]
      "
    >

      {/* CONTAINER */}
      <div
        className="
        max-w-7xl
        mx-auto

        px-6
        lg:px-10

        h-[105px]

        flex
        items-center
        justify-between
        "
      >

        {/* =========================
            LOGO
        ========================= */}
        <Link
          to="/"
          className="
          flex
          items-center
          cursor-pointer
          group
          "
        >

          <img
            src="/products/logo.png"
            alt="KSPORTS Logo"

            className="
            h-[120px]
            md:h-[140px]

            w-auto
            object-contain

            scale-[2.2]

            transition-all
            duration-300

            group-hover:scale-[2.3]

            drop-shadow-[0_0_25px_rgba(255,0,0,0.45)]
            "
          />

        </Link>

        {/* =========================
            DESKTOP MENU
        ========================= */}
        <div className="hidden md:flex items-center gap-11">

          <Link to="/" className={menuClass}>
            Home
          </Link>

          <Link to="/products" className={menuClass}>
            Produk
          </Link>

          <Link to="/about" className={menuClass}>
            Tentang
          </Link>

          <Link to="/contact" className={menuClass}>
            Kontak
          </Link>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}
        <div className="hidden md:flex items-center gap-4">

          {/* CART */}
          <Link
            to="/cart"
            className="relative"
          >

            <div
              className="
              w-12
              h-12

              flex
              items-center
              justify-center

              rounded-2xl

              bg-zinc-900
              border
              border-zinc-800

              hover:border-red-500/40
              hover:bg-zinc-800

              transition-all
              duration-300
              "
            >
              <ShoppingBag size={20} />
            </div>

            {/* BADGE */}
            {totalItems > 0 && (

              <span
                className="
                absolute
                -top-2
                -right-2

                min-w-[22px]
                h-[22px]

                px-1

                rounded-full

                bg-red-500
                text-white

                text-xs
                font-bold

                flex
                items-center
                justify-center

                shadow-lg
                "
              >
                {totalItems}
              </span>

            )}

          </Link>

          {/* BUTTON */}
          <a
            href="https://wa.me/6285174285688"
            target="_blank"
            rel="noreferrer"

            className="
            bg-gradient-to-r
            from-red-600
            to-red-500

            hover:from-red-500
            hover:to-red-400

            transition-all
            duration-300

            hover:scale-105

            px-6
            py-3

            rounded-2xl

            font-bold

            shadow-lg
            shadow-red-500/20
            "
          >
            Hubungi Kami
          </a>

        </div>

        {/* =========================
            MOBILE BUTTON
        ========================= */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}

          className="
          md:hidden

          w-12
          h-12

          rounded-2xl

          bg-zinc-900
          border
          border-zinc-800

          flex
          items-center
          justify-center
          "
        >

          {
            mobileMenu
              ? <X size={28} />
              : <Menu size={28} />
          }

        </button>

      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}
      {
        mobileMenu && (

          <div
            className="
            md:hidden

            bg-zinc-950/95
            backdrop-blur-xl

            border-t
            border-zinc-800

            px-6
            py-8

            space-y-6
            "
          >

            <Link
              to="/"
              className="block text-zinc-300 hover:text-red-500 transition"
              onClick={() => setMobileMenu(false)}
            >
              Home
            </Link>

            <Link
              to="/products"
              className="block text-zinc-300 hover:text-red-500 transition"
              onClick={() => setMobileMenu(false)}
            >
              Produk
            </Link>

            <Link
              to="/about"
              className="block text-zinc-300 hover:text-red-500 transition"
              onClick={() => setMobileMenu(false)}
            >
              Tentang
            </Link>

            <Link
              to="/contact"
              className="block text-zinc-300 hover:text-red-500 transition"
              onClick={() => setMobileMenu(false)}
            >
              Kontak
            </Link>

            {/* MOBILE CART */}
            <Link
              to="/cart"

              className="
              flex
              items-center
              justify-between

              bg-zinc-900

              border
              border-zinc-800

              rounded-2xl

              px-5
              py-4
              "

              onClick={() => setMobileMenu(false)}
            >

              <div className="flex items-center gap-3">

                <ShoppingBag size={20} />

                <span className="font-semibold">
                  Shopping Cart
                </span>

              </div>

              {totalItems > 0 && (

                <span
                  className="
                  min-w-[24px]
                  h-[24px]

                  px-2

                  rounded-full

                  bg-red-500
                  text-white

                  text-xs
                  font-bold

                  flex
                  items-center
                  justify-center
                  "
                >
                  {totalItems}
                </span>

              )}

            </Link>

            {/* WHATSAPP BUTTON */}
            <a
              href="https://wa.me/6285174285688"
              target="_blank"
              rel="noreferrer"

              className="
              relative
              overflow-hidden
              group

              block

              px-7
              py-3.5

              rounded-2xl

              bg-gradient-to-r
              from-red-600
              via-red-500
              to-red-600

              text-white
              font-bold

              tracking-wide
              uppercase

              text-[15px]

              shadow-[0_0_30px_rgba(255,0,0,0.35)]

              transition-all
              duration-500

              hover:scale-105
              hover:shadow-[0_0_45px_rgba(255,0,0,0.6)]
              "
            >

              {/* GLOW */}
              <span
                className="
                absolute
                inset-0

                bg-white/10

                opacity-0
                group-hover:opacity-100

                transition
                duration-500
                "
              />

              {/* SHINE */}
              <span
                className="
                absolute
                top-0
                left-[-120%]

                w-[120%]
                h-full

                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent

                skew-x-12

                group-hover:left-[120%]

                transition-all
                duration-1000
                "
              />

              <span className="relative z-10">
                Hubungi Kami
              </span>

            </a>

          </div>

        )
      }

    </nav>

  );

}