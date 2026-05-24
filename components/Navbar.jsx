import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../src/context/CartContext";

import {
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";

export default function Navbar() {

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [mobileMenu, setMobileMenu] = useState(false);

  const menuClass = `
    text-[16px]
    font-bold
    tracking-wide
    text-zinc-200
    hover:text-red-400
    transition-all
    duration-300
    uppercase
  `;

  return (

    <nav
      className="
      fixed
      top-0
      left-0
      w-full
      z-50
      bg-black/70
      backdrop-blur-2xl
      border-b
      border-red-500/10
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-10
        h-[80px]
        flex
        items-center
        justify-between
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center"
        >

          <img
            src="/products/logo.png"
            alt="KSPORTS Logo"

            className="
            h-[70px]
            sm:h-[85px]
            md:h-[95px]
            w-auto
            object-contain
            transition-all
            duration-300
            hover:scale-105
            "
          />

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 lg:gap-11">

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

        {/* RIGHT SIDE DESKTOP */}
        <div className="hidden md:flex items-center gap-4">

          <Link
            to="/cart"
            className="relative"
          >

            <div
              className="
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-2xl
              bg-zinc-900
              border
              border-zinc-800
              hover:border-red-500/40
              transition-all
              duration-300
              "
            >
              <ShoppingBag size={20} />
            </div>

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
                "
              >
                {totalItems}
              </span>

            )}

          </Link>

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
            px-5
            py-3
            rounded-2xl
            font-bold
            text-sm
            "
          >
            Hubungi Kami
          </a>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}

          className="
          md:hidden
          w-11
          h-11
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
              ? <X size={26} />
              : <Menu size={26} />
          }

        </button>

      </div>

      {/* MOBILE MENU */}
      {
        mobileMenu && (

          <div
            className="
            md:hidden
            bg-zinc-950/95
            backdrop-blur-xl
            border-t
            border-zinc-800
            px-5
            py-6
            space-y-5
            "
          >

            <Link
              to="/"
              className="block text-zinc-300 hover:text-red-500 transition text-lg"
              onClick={() => setMobileMenu(false)}
            >
              Home
            </Link>

            <Link
              to="/products"
              className="block text-zinc-300 hover:text-red-500 transition text-lg"
              onClick={() => setMobileMenu(false)}
            >
              Produk
            </Link>

            <Link
              to="/about"
              className="block text-zinc-300 hover:text-red-500 transition text-lg"
              onClick={() => setMobileMenu(false)}
            >
              Tentang
            </Link>

            <Link
              to="/contact"
              className="block text-zinc-300 hover:text-red-500 transition text-lg"
              onClick={() => setMobileMenu(false)}
            >
              Kontak
            </Link>

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

            <a
              href="https://wa.me/6285174285688"
              target="_blank"
              rel="noreferrer"

              className="
              block
              text-center
              px-6
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-red-600
              to-red-500
              text-white
              font-bold
              "
            >
              Hubungi Kami
            </a>

          </div>

        )
      }

    </nav>

  );

}
