import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {

  /* =========================
     STATE
  ========================= */
  const [showCheckout, setShowCheckout] =
    useState(false);

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [note, setNote] =
    useState("");

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  /* =========================
     TOTAL ITEM
  ========================= */
  const totalItems = useMemo(() => {

    return cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

  }, [cart]);

  /* =========================
     TOTAL PRICE
  ========================= */
  const totalPrice = useMemo(() => {

    return cart.reduce((total, item) => {

      const price = Number(item.price) || 0;

      return total + (price * item.quantity);

    }, 0);

  }, [cart]);

  /* =========================
     CHECKOUT MESSAGE
  ========================= */
  const checkoutMessage = cart
    .map((item) => {

      return `
• ${item.name}
Qty : ${item.quantity}
Harga : Rp ${Number(item.price).toLocaleString("id-ID")}
`;

    })
    .join("\n");

  const whatsappUrl =
    `https://wa.me/6285174285688?text=${encodeURIComponent(`
Halo KSPORTS 👋

Saya ingin melakukan order:

${checkoutMessage}

========================
DATA CUSTOMER
========================

Nama : ${customerName}
No HP : ${phone}
Alamat : ${address}
Catatan : ${note}

========================
TOTAL
========================

Rp ${totalPrice.toLocaleString("id-ID")}
`)}`;

  /* =========================
     EMPTY CART
  ========================= */
  if (cart.length === 0) {

    return (

      <div className="bg-black min-h-screen text-white px-6 py-24">

        <div className="max-w-4xl mx-auto">

          <div
            className="
            bg-zinc-900
            border border-zinc-800
            rounded-[40px]
            p-14
            text-center
            "
          >

            <h1 className="text-5xl font-black">
              Cart Kosong
            </h1>

            <p className="text-zinc-400 mt-5 text-lg">
              Belum ada produk di keranjang kamu.
            </p>

            <Link
              to="/"
              className="
              inline-flex
              mt-10

              bg-red-600
              hover:bg-red-500

              transition-all

              px-8 py-4

              rounded-2xl

              font-bold
              "
            >
              Belanja Sekarang
            </Link>

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="bg-black min-h-screen text-white px-6 py-24">

      <div className="max-w-7xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}
        <div className="flex items-center justify-between mb-14">

          <div>

            <h1 className="text-5xl font-black">
              Shopping Cart
            </h1>

            <p className="text-zinc-400 mt-3">
              Review produk pilihan kamu
            </p>

          </div>

          <Link
            to="/"
            className="
            w-14
            h-14

            flex
            items-center
            justify-center

            rounded-2xl

            bg-zinc-900
            border border-zinc-800

            hover:border-red-500/40
            hover:bg-zinc-800

            transition-all

            text-2xl
            "
          >
            ×
          </Link>

        </div>

        {/* =========================
            CONTENT
        ========================= */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item.id}
                className="
                bg-zinc-900
                border border-zinc-800

                rounded-[32px]

                p-5

                flex
                flex-col
                md:flex-row

                gap-6
                "
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                  w-full
                  md:w-[180px]

                  h-[180px]

                  object-cover

                  rounded-2xl
                  "
                />

                {/* INFO */}
                <div className="flex-1">

                  <h2 className="text-2xl font-black">
                    {item.name}
                  </h2>

                  <p
                    className="
                    mt-3

                    text-2xl
                    font-black

                    text-red-500
                    "
                  >
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-4 mt-8">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="
                      w-11
                      h-11

                      rounded-xl

                      bg-zinc-800
                      hover:bg-zinc-700

                      transition
                      "
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="
                      w-11
                      h-11

                      rounded-xl

                      bg-zinc-800
                      hover:bg-zinc-700

                      transition
                      "
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => {

                      removeFromCart(item.id);

                      toast.error(
                        `${item.name} dihapus`,
                        {
                          duration: 2000,
                        }
                      );

                    }}
                    className="
                    mt-8

                    text-red-500
                    hover:text-red-400

                    font-semibold

                    transition
                    "
                  >
                    Hapus Produk
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT */}
          <div
            className="
            bg-zinc-900
            border border-zinc-800

            rounded-[32px]

            p-8

            h-fit
            sticky
            top-24
            "
          >

            <h2 className="text-3xl font-black">
              Ringkasan
            </h2>

            <div className="space-y-5 mt-10">

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Total Produk
                </span>

                <span className="font-bold">
                  {totalItems}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Ongkir
                </span>

                <span className="text-green-500 font-bold">
                  GRATIS
                </span>

              </div>

            </div>

            <div className="h-[1px] bg-zinc-800 my-8" />

            <div className="flex items-center justify-between">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-3xl font-black text-red-500">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>

            </div>

            {/* BUTTON */}
            <button
              onClick={() => setShowCheckout(true)}
              className="
              mt-10

              w-full

              bg-green-500
              hover:bg-green-400

              transition-all

              py-5

              rounded-2xl

              font-bold
              text-lg

              shadow-lg
              shadow-green-500/20
              "
            >
              Checkout Sekarang
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          CHECKOUT MODAL
      ========================= */}
      {showCheckout && (

        <div
          className="
          fixed inset-0 z-50

          bg-black/80
          backdrop-blur-md

          flex
          items-center
          justify-center

          p-6
          "
        >

          <div
            className="
            w-full
            max-w-2xl

            bg-zinc-900

            border border-zinc-800

            rounded-[40px]

            p-8
            "
          >

            {/* HEADER */}
            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-4xl font-black">
                  Checkout
                </h2>

                <p className="text-zinc-400 mt-2">
                  Lengkapi data pemesanan
                </p>

              </div>

              <button
                onClick={() => setShowCheckout(false)}
                className="
                w-12
                h-12

                rounded-2xl

                bg-zinc-800
                hover:bg-zinc-700

                transition

                text-2xl
                "
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <div className="space-y-5 mt-10">

              <input
                type="text"
                placeholder="Nama Lengkap"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                className="
                w-full

                bg-black

                border border-zinc-700

                rounded-2xl

                px-5 py-4

                outline-none

                focus:border-green-500
                "
              />

              <input
                type="text"
                placeholder="Nomor WhatsApp"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                w-full

                bg-black

                border border-zinc-700

                rounded-2xl

                px-5 py-4

                outline-none

                focus:border-green-500
                "
              />

              <textarea
                rows={4}
                placeholder="Alamat Lengkap"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="
                w-full

                bg-black

                border border-zinc-700

                rounded-2xl

                px-5 py-4

                outline-none

                resize-none

                focus:border-green-500
                "
              />

              <textarea
                rows={3}
                placeholder="Catatan Tambahan"
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
                className="
                w-full

                bg-black

                border border-zinc-700

                rounded-2xl

                px-5 py-4

                outline-none

                resize-none

                focus:border-green-500
                "
              />

            </div>

            {/* TOTAL */}
            <div
              className="
              mt-8

              flex
              items-center
              justify-between

              bg-black

              border border-zinc-800

              rounded-2xl

              p-6
              "
            >

              <span className="text-zinc-400">
                Total Pembayaran
              </span>

              <span className="text-3xl font-black text-green-500">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>

            </div>

            {/* BUTTON */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="
              mt-8

              w-full

              flex
              items-center
              justify-center

              bg-green-500
              hover:bg-green-400

              transition-all

              py-5

              rounded-2xl

              font-black
              text-lg
              "
            >
              Checkout via WhatsApp
            </a>

          </div>

        </div>

      )}

    </div>

  );

}