import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {

  const [showCheckout, setShowCheckout] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  /* =========================
     TOTAL PRICE
  ========================= */
  const totalPrice = cart.reduce((total, item) => {

    const price =
      Number(
        item.price?.replace(/[^0-9]/g, "")
      ) || 0;

    return total + (price * item.quantity);

  }, 0);

  /* =========================
     CHECKOUT MESSAGE
  ========================= */
  const checkoutMessage = cart
    .map((item) => {

      return `
• ${item.name}
Qty : ${item.quantity}
Harga : ${item.price}
`;

    })
    .join("\n");

  const whatsappUrl =
    `https://wa.me/6285174285688?text=${encodeURIComponent(
      `
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
`
    )}`;

  return (

    <div className="bg-black min-h-screen text-white px-6 py-24">

      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        {/* TOP ACTION */}
        <div className="flex items-center justify-between mb-12">

        <div>

            <h1 className="text-5xl font-black">
            Shopping Cart
            </h1>

            <p className="text-zinc-400 mt-3">
            Produk yang ingin kamu beli
            </p>

        </div>

        {/* BACK BUTTON */}
        <Link
            to="/products"
            className="
            flex
            items-center
            justify-center

            w-14
            h-14

            rounded-2xl

            bg-zinc-900
            border border-zinc-800

            hover:bg-zinc-800
            hover:border-red-500/40

            transition-all
            duration-300

            text-2xl
            font-bold

            shadow-lg
            shadow-black/30
            "
        >
            ×
        </Link>

        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (

          <div
            className="
            bg-zinc-900
            border border-zinc-800
            rounded-3xl
            p-14
            text-center
            "
          >

            <h2 className="text-3xl font-bold">
              Cart Masih Kosong
            </h2>

            <p className="text-zinc-400 mt-4">
              Yuk pilih alat fitness terbaik untuk gym impianmu.
            </p>

            <Link
              to="/products"
              className="
              inline-block
              mt-8
              bg-red-600
              hover:bg-red-500
              transition
              px-8 py-4
              rounded-2xl
              font-bold
              "
            >
              Lihat Produk
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="
                  bg-zinc-900
                  border border-zinc-800
                  rounded-3xl
                  p-5
                  flex flex-col md:flex-row gap-6
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

                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-red-500 text-xl font-bold mt-2">
                      {item.price}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-4 mt-6">

                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="
                        w-10 h-10
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
                        w-10 h-10
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
                          `${item.name} dihapus dari cart`,
                          {
                            duration: 2500,

                            style: {
                              background: "#18181b",
                              color: "#fff",
                              border: "1px solid #27272a",
                              padding: "16px",
                              borderRadius: "18px",
                              fontWeight: "700",
                            },

                            iconTheme: {
                              primary: "#ef4444",
                              secondary: "#fff",
                            },
                          }
                        );

                      }}
                      className="
                      mt-6
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
              rounded-3xl
              p-8
              h-fit
              sticky
              top-28
              "
            >

              <h2 className="text-3xl font-black">
                Ringkasan
              </h2>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between">

                  <span className="text-zinc-400">
                    Total Item
                  </span>

                  <span className="font-bold">
                    {cart.length}
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

              <div className="w-full h-[1px] bg-zinc-800 my-8" />

              <div className="flex justify-between items-center">

                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-3xl font-black text-red-500">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>

              </div>

              {/* BUTTON CHECKOUT */}
              <button
                onClick={() => setShowCheckout(true)}
                className="
                mt-10
                w-full
                bg-green-500
                hover:bg-green-400
                transition
                py-4
                rounded-2xl
                font-bold
                text-lg
                "
              >
                Checkout Sekarang
              </button>

            </div>

          </div>

        )}

      </div>

      {/* =========================
    PREMIUM CHECKOUT POPUP
========================= */}
{showCheckout && (

  <div
    className="
    fixed inset-0 z-[99999]

    bg-black/80
    backdrop-blur-xl

    flex items-center justify-center

    p-6
    animate-fadeIn
    "
  >

    {/* GLOW */}
    <div
      className="
      absolute
      w-[500px]
      h-[500px]
      rounded-full
      bg-green-500/10
      blur-[140px]
      "
    />

    {/* CARD */}
    <div
      className="
      relative

      w-full
      max-w-2xl

      overflow-hidden

      rounded-[38px]

      border border-white/10

      bg-gradient-to-b
      from-zinc-900
      to-black

      shadow-[0_0_80px_rgba(0,0,0,0.7)]

      p-8
      md:p-10
      "
    >

      {/* TOP LIGHT */}
      <div
        className="
        absolute
        top-0
        left-0

        w-full
        h-[2px]

        bg-gradient-to-r
        from-transparent
        via-green-500
        to-transparent
        "
      />

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div>

          <div
            className="
            inline-flex
            items-center
            gap-2

            px-4 py-2
            rounded-full

            bg-green-500/10
            border border-green-500/20

            text-green-400
            text-xs
            font-bold
            tracking-[2px]
            uppercase

            mb-5
            "
          >
            Secure Checkout
          </div>

          <h2
            className="
            text-4xl
            md:text-5xl
            font-black
            tracking-tight
            "
          >
            Checkout
          </h2>

          <p className="text-zinc-400 mt-3">
            Lengkapi data order untuk proses pemesanan.
          </p>

        </div>

        {/* CLOSE */}
        <button
          onClick={() => setShowCheckout(false)}
          className="
          w-12
          h-12

          rounded-2xl

          bg-zinc-800/80
          hover:bg-zinc-700

          transition-all
          duration-300

          text-2xl
          font-bold
          "
        >
          ×
        </button>

      </div>

      {/* FORM */}
      <div className="mt-10 space-y-5">

        <input
          type="text"
          placeholder="Nama Lengkap"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="
          w-full

          bg-black/70
          border border-zinc-700

          rounded-2xl

          px-5 py-4

          outline-none

          focus:border-green-500
          focus:ring-2
          focus:ring-green-500/20

          transition-all
          "
        />

        <input
          type="text"
          placeholder="Nomor WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="
          w-full

          bg-black/70
          border border-zinc-700

          rounded-2xl

          px-5 py-4

          outline-none

          focus:border-green-500
          focus:ring-2
          focus:ring-green-500/20

          transition-all
          "
        />

        <textarea
          placeholder="Alamat Lengkap"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          className="
          w-full

          bg-black/70
          border border-zinc-700

          rounded-2xl

          px-5 py-4

          outline-none

          resize-none

          focus:border-green-500
          focus:ring-2
          focus:ring-green-500/20

          transition-all
          "
        />

        <textarea
          placeholder="Catatan Tambahan"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="
          w-full

          bg-black/70
          border border-zinc-700

          rounded-2xl

          px-5 py-4

          outline-none

          resize-none

          focus:border-green-500
          focus:ring-2
          focus:ring-green-500/20

          transition-all
          "
        />

      </div>

      {/* SUMMARY */}
      <div
        className="
        mt-8

        rounded-3xl

        border border-zinc-800

        bg-black/60

        p-6
        "
      >

        <div className="flex items-center justify-between">

          <span className="text-zinc-400">
            Total Pembayaran
          </span>

          <span
            className="
            text-3xl
            font-black

            bg-gradient-to-r
            from-green-400
            to-green-500

            bg-clip-text
            text-transparent
            "
          >
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>

        </div>

      </div>

      {/* BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="
        relative
        overflow-hidden

        mt-8

        w-full

        flex
        items-center
        justify-center

        py-5

        rounded-2xl

        font-black
        text-lg

        bg-gradient-to-r
        from-green-500
        via-green-400
        to-green-500

        hover:scale-[1.02]

        transition-all
        duration-500

        shadow-[0_0_40px_rgba(34,197,94,0.35)]
        "
      >

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
          via-white/30
          to-transparent

          skew-x-12

          hover:left-[120%]

          transition-all
          duration-1000
          "
        />

        <span className="relative z-10">
          Checkout via WhatsApp
        </span>

      </a>

    </div>

  </div>

)}

    </div>

  );

}