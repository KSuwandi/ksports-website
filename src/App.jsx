import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./pages/firebase";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";

import {
  Flame,
  MessageCircle,
  Star,
  Quote,
} from "lucide-react";

export default function App() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  /* =========================
     TESTIMONIAL DATA
  ========================= */
  const testimonials = [
    {
      id: 1,
      name: "Andi Pratama",
      city: "Jakarta",
      text: "Kualitas alat fitness sangat premium dan harga jauh lebih murah dibanding toko lain.",
    },
    {
      id: 2,
      name: "Michael Tan",
      city: "Bekasi",
      text: "Pelayanan cepat, instalasi rapih, dan admin sangat responsif di WhatsApp.",
    },
    {
      id: 3,
      name: "Rizky Saputra",
      city: "Bogor",
      text: "Sudah order treadmill dan home gym. Barang original dan sangat recommended.",
    },
    {
      id: 4,
      name: "Kevin Wijaya",
      city: "Tangerang",
      text: "Showroom offline keren dan pilihan produknya lengkap banget.",
    },
  ];

  /* =========================
     AOS INIT
  ========================= */
  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });

  }, []);

  /* =========================
     FIREBASE
  ========================= */
  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(data);

        setTimeout(() => {
          setLoading(false);
        }, 1500);

      }
    );

    return () => unsubscribe();

  }, []);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return <LoadingScreen />;
  }

  return (

    <div className="relative bg-black text-white min-h-screen overflow-hidden">

      {/* =========================
          BACKGROUND EFFECT
      ========================= */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

        <div
          className="
          absolute
          top-[10%]
          left-[5%]
          w-[400px]
          h-[400px]
          rounded-full
          bg-red-500/20
          blur-[140px]
          animate-float1
          "
        />

        <div
          className="
          absolute
          top-[50%]
          right-[10%]
          w-[300px]
          h-[300px]
          rounded-full
          bg-red-600/10
          blur-[120px]
          animate-float2
          "
        />

      </div>

      {/* =========================
          STYLE
      ========================= */}
      <style>{`

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes float1 {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-30px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float2 {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(30px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes testimonialScroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }

        .testimonial-scroll {
          animation: testimonialScroll 28s linear infinite;
        }

      `}</style>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <Navbar />

       {/* HERO */}
      <HeroSection />

      {/* PROMO BANNER */}
        {/* =========================
    PREMIUM PROMO BANNER
========================= */}
<section className="relative px-6 pt-10 pb-16">

  <div
    data-aos="zoom-in"
    className="
    max-w-7xl
    mx-auto

    relative
    overflow-hidden

    rounded-[40px]

    bg-gradient-to-r
    from-red-700
    via-red-600
    to-red-500

    p-[1px]

    shadow-[0_0_80px_rgba(239,68,68,0.35)]
    "
  >

    {/* INNER */}
    <div
      className="
      relative

      rounded-[40px]

      bg-black

      px-8
      md:px-16

      py-14

      overflow-hidden
      "
    >

      {/* GLOW */}
      <div
        className="
        absolute
        -top-20
        -right-20

        w-[300px]
        h-[300px]

        rounded-full

        bg-red-500/20

        blur-[120px]
        "
      />

      {/* CONTENT */}
      <div
        className="
        relative
        z-10

        flex
        flex-col
        lg:flex-row

        items-center
        justify-between

        gap-10
        "
      >

        {/* LEFT */}
        <div className="max-w-2xl">

          <div
            className="
            inline-flex
            items-center
            gap-2

            px-5
            py-2

            rounded-full

            bg-red-500/10
            border
            border-red-500/30

            text-red-400
            text-sm
            font-bold
            tracking-[3px]
            uppercase
            "
          >
            🔥 Promo Terbatas
          </div>

          <h2
            className="
            text-4xl
            md:text-6xl

            font-black

            leading-tight

            mt-7
            "
          >
            GRATIS ONGKIR

            <span
              className="
              block

              bg-gradient-to-r
              from-red-500
              via-red-300
              to-red-600

              bg-clip-text
              text-transparent
              "
            >
              + FREE INSTALASI
            </span>

          </h2>

          <p
            className="
            text-zinc-400

            text-lg
            leading-relaxed

            mt-6
            "
          >
            Khusus area Jabodetabek. 
            Dapatkan alat fitness premium dengan harga terbaik,
            pengiriman cepat, dan pemasangan GRATIS dari tim KSPORTS.
          </p>

        </div>

        {/* RIGHT */}
        <div
          className="
          flex
          flex-col
          sm:flex-row

          gap-4
          "
        >

          {/* BUTTON */}
          <a
            href="https://wa.me/6285174285688"
            target="_blank"
            rel="noreferrer"
            className="
            px-8
            py-5

            rounded-2xl

            bg-gradient-to-r
            from-red-600
            to-red-500

            hover:from-red-500
            hover:to-red-400

            text-white
            font-black

            transition-all
            duration-300

            hover:scale-105

            shadow-[0_0_40px_rgba(239,68,68,0.4)]
            "
          >
            Chat Sekarang
          </a>

          {/* BUTTON */}
          <a
            href="#produk"
            className="
            px-8
            py-5

            rounded-2xl

            bg-zinc-900
            hover:bg-zinc-800

            border
            border-white/10

            text-white
            font-black

            transition-all
            duration-300

            hover:scale-105
            "
          >
            Lihat Produk
          </a>

        </div>

      </div>

    </div>

  </div>

</section>


        {/* =========================
            RUNNING TEXT
        ========================= */}
        <div className="bg-red-600 py-3 overflow-hidden border-b border-red-400">

          <div className="whitespace-nowrap animate-[marquee_18s_linear_infinite] text-lg font-bold uppercase flex gap-16">

            <span>🔥 Treadmill Elektrik Murah</span>
            <span>🚴 Sepeda Statis Murah</span>
            <span>🏋️ Home Gym Murah</span>
            <span>🔥 Gratis Ongkir Jabodetabek</span>
            <span>🛠 Gratis Instalasi</span>

          </div>

        </div>

        {/* =========================
            PRODUCTS SECTION
        ========================= */}
        <section
          id="produk"
          className="relative py-24 px-6 overflow-hidden"
        >

          <div className="absolute top-0 right-0 opacity-10">
            <Flame size={300} className="text-red-500" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">

            {/* TITLE */}
            <div
              className="text-center mb-20"
              data-aos="fade-up"
            >

              <div
                className="
                inline-flex items-center gap-2
                px-5 py-2
                rounded-full
                bg-red-500/10
                border border-red-500/20
                text-red-400
                text-sm
                font-bold
                tracking-[3px]
                uppercase
                mb-6
                "
              >
                🔥 Best Seller Products
              </div>

              <h2
                className="
                text-5xl
                md:text-7xl
                font-black
                tracking-tight
                leading-none
                "
              >
                PRODUCT

                <span
                  className="
                  block
                  bg-gradient-to-r
                  from-red-500
                  via-red-400
                  to-red-600
                  bg-clip-text
                  text-transparent
                  "
                >
                  COLLECTION
                </span>

              </h2>

            </div>

            {/* FILTER */}
            <div
              className="max-w-xl mx-auto mb-16"
              data-aos="fade-up"
            >

              <div className="flex justify-center gap-4 mb-10 flex-wrap">

                {[
                  "All",
                  "Cardio",
                  "Strength",
                  "Commercial",
                ].map((category) => (

                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-6 py-3 rounded-2xl font-bold transition-all duration-300

                      ${
                        selectedCategory === category
                          ? "bg-red-600 shadow-lg shadow-red-500/30"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }
                    `}
                  >
                    {category}
                  </button>

                ))}

              </div>

              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                w-full
                bg-black/70
                border border-zinc-700
                rounded-2xl
                px-6 py-4
                text-white
                outline-none
                focus:border-red-500
                "
              />

            </div>

            {/* PRODUCT GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {products
                .filter((product) => {

                  const matchSearch =
                    product.name
                      .toLowerCase()
                      .includes(search.toLowerCase());

                  const matchCategory =
                    selectedCategory === "All"
                      ? true
                      : product.category === selectedCategory;

                  return matchSearch && matchCategory;

                })

                .map((product, index) => (

                  <motion.div
                    key={product.id}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.35 }}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    bg-gradient-to-b
                    from-zinc-900
                    to-black
                    border border-white/5
                    hover:border-red-500/40
                    transition-all duration-500
                    "
                  >

                    {/* IMAGE */}
                    <div className="relative overflow-hidden">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                        h-[320px]
                        w-full
                        object-cover
                        scale-105
                        hover:scale-125
                        transition-all duration-700
                        "
                      />

                    </div>

                    {/* CONTENT */}
                    <div className="p-7">

                      <h3
                        className="
                        text-[24px]
                        leading-tight
                        font-black
                        tracking-tight
                        text-white
                        min-h-[70px]
                        "
                      >
                        {product.name}
                      </h3>

                      <p
                        className="
                        mt-5
                        text-3xl
                        font-black
                        bg-gradient-to-r
                        from-red-500
                        to-red-300
                        bg-clip-text
                        text-transparent
                        "
                      >
                        {product.price}
                      </p>

                      {/* BUTTON */}
                      <div className="mt-7 flex gap-3">

                        <Link
                          to={`/product/${product.id}`}
                          className="
                          flex-1
                          text-center
                          bg-zinc-800
                          hover:bg-zinc-700
                          px-5 py-3
                          rounded-2xl
                          text-sm
                          font-bold
                          transition-all duration-300
                          "
                        >
                          Detail Produk
                        </Link>

                        <a
                          href={`https://wa.me/6285174285688?text=Halo KSPORTS, saya tertarik dengan produk ${product.name}`}
                          target="_blank"
                          rel="noreferrer"
                          className="
                          flex-1
                          text-center
                          bg-gradient-to-r
                          from-red-600
                          to-red-500
                          hover:from-red-500
                          hover:to-red-400
                          px-5 py-3
                          rounded-2xl
                          text-sm
                          font-bold
                          transition-all duration-300
                          "
                        >
                          Tanya Produk
                        </a>

                      </div>

                    </div>

                  </motion.div>

                ))}

            </div>

          </div>

        </section>

        {/* =========================
            PREMIUM TESTIMONIAL
        ========================= */}
        <section className="relative py-28 overflow-hidden">

          {/* BG */}
          <div className="absolute inset-0 opacity-20">

            <div
              className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2

              w-[500px]
              h-[500px]

              rounded-full

              bg-red-500/20

              blur-[160px]
              "
            />

          </div>

          <div className="relative z-10">

            {/* TITLE */}
            <div
              className="text-center mb-20 px-6"
              data-aos="fade-up"
            >

              <div
                className="
                inline-flex
                items-center
                gap-2

                px-5
                py-2

                rounded-full

                bg-red-500/10
                border border-red-500/20

                text-red-400
                text-sm
                font-bold
                tracking-[4px]
                uppercase
                "
              >
                ⭐ Testimonials
              </div>

              <h2
                className="
                text-5xl
                md:text-7xl

                font-black

                mt-8
                leading-none
                "
              >
                WHAT CLIENTS

                <span
                  className="
                  block

                  bg-gradient-to-r
                  from-red-500
                  via-red-300
                  to-red-600

                  bg-clip-text
                  text-transparent
                  "
                >
                  SAY ABOUT US
                </span>

              </h2>

            </div>

            {/* SLIDER */}
            <div className="overflow-hidden">

              <div
                className="
                flex
                gap-8
                w-max

                testimonial-scroll
                "
              >

                {[...testimonials, ...testimonials].map((item, index) => (

                  <div
                    key={index}
                    className="
                    relative

                    w-[380px]

                    rounded-[36px]

                    bg-gradient-to-b
                    from-zinc-900
                    to-black

                    border
                    border-white/5

                    p-8

                    overflow-hidden

                    hover:border-red-500/40

                    transition-all
                    duration-500
                    "
                  >

                    {/* QUOTE ICON */}
                    <div
                      className="
                      absolute
                      top-5
                      right-5

                      opacity-10
                      "
                    >
                      <Quote size={90} />
                    </div>

                    {/* STARS */}
                    <div className="flex gap-1 mb-6">

                      {[1, 2, 3, 4, 5].map((star) => (

                        <Star
                          key={star}
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />

                      ))}

                    </div>

                    {/* TEXT */}
                    <p
                      className="
                      text-zinc-300
                      leading-relaxed
                      text-lg
                      "
                    >
                      “{item.text}”
                    </p>

                    {/* USER */}
                    <div className="mt-8 flex items-center gap-4">

                      {/* AVATAR */}
                      <div
                        className="
                        w-14
                        h-14

                        rounded-full

                        bg-gradient-to-br
                        from-red-500
                        to-red-700

                        flex
                        items-center
                        justify-center

                        text-xl
                        font-black
                        "
                      >
                        {item.name.charAt(0)}
                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.name}
                        </h3>

                        <p className="text-zinc-500 text-sm">
                          {item.city}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>

        {/* =========================
    BEFORE AFTER CUSTOMER
========================= */}
<section className="relative py-32 px-6 overflow-hidden">

  {/* BG EFFECT */}
  <div className="absolute inset-0 opacity-20">

    <div
      className="
      absolute
      bottom-0
      left-1/2
      -translate-x-1/2

      w-[600px]
      h-[600px]

      rounded-full

      bg-red-500/10

      blur-[180px]
      "
    />

  </div>

  <div className="max-w-7xl mx-auto relative z-10">

    {/* TITLE */}
    <div
      className="text-center mb-24"
      data-aos="fade-up"
    >

      <div
        className="
        inline-flex
        items-center
        gap-2

        px-5
        py-2

        rounded-full

        bg-red-500/10
        border border-red-500/20

        text-red-400
        text-sm
        font-bold
        tracking-[4px]
        uppercase
        "
      >
        🔥 Customer Transformation
      </div>

      <h2
        className="
        text-5xl
        md:text-7xl

        font-black

        mt-8
        leading-none
        "
      >
        BEFORE & AFTER

        <span
          className="
          block

          bg-gradient-to-r
          from-red-500
          via-red-300
          to-red-600

          bg-clip-text
          text-transparent
          "
        >
          KSPORTS
        </span>

      </h2>

      <p
        className="
        text-zinc-400
        max-w-2xl
        mx-auto
        mt-8
        text-lg
        leading-relaxed
        "
      >
        Ribuan customer telah membangun home gym impian bersama KSPORTS dengan harga terbaik dan kualitas premium.
      </p>

    </div>

    {/* GRID */}
    <div className="grid lg:grid-cols-3 gap-10">

      {/* ITEM */}
      {[
        {
          before:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
          after:
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
          title: "Home Gym Setup",
        },

        {
          before:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
          after:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
          title: "Commercial Gym",
        },

        {
          before:
            "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop",
          after:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
          title: "Fitness Corner",
        },
      ].map((item, index) => (

        <motion.div
          key={index}
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          transition={{ duration: 0.4 }}
          data-aos="fade-up"
          data-aos-delay={index * 150}
          className="
          relative

          overflow-hidden

          rounded-[36px]

          bg-gradient-to-b
          from-zinc-900
          to-black

          border
          border-white/5

          hover:border-red-500/30

          transition-all
          duration-500
          "
        >

          {/* BEFORE */}
          <div className="relative overflow-hidden">

            <img
              src={item.before}
              alt="Before"
              className="
              w-full
              h-[260px]

              object-cover

              hover:scale-110

              transition-all
              duration-700
              "
            />

            <div
              className="
              absolute
              top-5
              left-5

              px-4
              py-2

              rounded-full

              bg-black/70
              backdrop-blur-md

              text-white
              text-sm
              font-bold
              "
            >
              BEFORE
            </div>

          </div>

          {/* AFTER */}
          <div className="relative overflow-hidden">

            <img
              src={item.after}
              alt="After"
              className="
              w-full
              h-[260px]

              object-cover

              hover:scale-110

              transition-all
              duration-700
              "
            />

            <div
              className="
              absolute
              top-5
              left-5

              px-4
              py-2

              rounded-full

              bg-red-600

              text-white
              text-sm
              font-bold
              "
            >
              AFTER
            </div>

          </div>

          {/* CONTENT */}
          <div className="p-8">

            <h3
              className="
              text-3xl
              font-black
              "
            >
              {item.title}
            </h3>

            <p
              className="
              text-zinc-400
              mt-4
              leading-relaxed
              "
            >
              Upgrade gym setup customer menjadi lebih premium, modern, dan profesional menggunakan produk KSPORTS.
            </p>

          </div>

        </motion.div>

      ))}

    </div>

  </div>

</section>

        {/* FOOTER */}
        <Footer />

      </div>

      {/* =========================
          PREMIUM WHATSAPP POPUP
      ========================= */}
      <a
        href="https://wa.me/6285174285688"
        target="_blank"
        rel="noreferrer"
        className="
        fixed
        bottom-6
        right-6
        z-50

        group
        "
      >

        <div
          className="
          relative

          flex
          items-center
          gap-4

          px-5
          py-4

          rounded-3xl

          bg-gradient-to-br
          from-zinc-900
          to-black

          border
          border-green-500/30

          shadow-[0_0_40px_rgba(34,197,94,0.25)]

          backdrop-blur-xl

          hover:scale-105
          hover:border-green-400/60
          hover:shadow-[0_0_60px_rgba(34,197,94,0.45)]

          transition-all
          duration-500
          "
        >

          {/* ONLINE DOT */}
          <div
            className="
            absolute
            top-3
            right-3

            w-3
            h-3

            rounded-full
            bg-green-400

            animate-pulse
            "
          />

          {/* ICON */}
          <div
            className="
            w-14
            h-14

            rounded-2xl

            bg-green-500

            flex
            items-center
            justify-center

            shadow-[0_0_30px_rgba(34,197,94,0.6)]
            "
          >

            <MessageCircle
              size={30}
              className="text-white"
            />

          </div>

          {/* TEXT */}
          <div>

            <p className="text-zinc-400 text-sm">
              Customer Service
            </p>

            <h3 className="text-white font-bold text-lg leading-none mt-1">
              Chat WhatsApp
            </h3>

            <p className="text-green-400 text-sm mt-1">
              Online • Fast Response
            </p>

          </div>

          {/* SHINE EFFECT */}
          <div
            className="
            absolute
            inset-0

            rounded-3xl

            opacity-0
            group-hover:opacity-100

            transition-all
            duration-700

            bg-gradient-to-r
            from-transparent
            via-white/5
            to-transparent
            "
          />

        </div>

      </a>

    </div>

  );

}