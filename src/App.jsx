import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./pages/firebase";

import { motion } from "framer-motion";

import {
  Star,
  Quote,
  MessageCircle,
  Flame,
  ArrowRight,
} from "lucide-react";

import { formatPrice } from "./utils/formatPrice";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";

export default function App() {

  /* =========================
     STATE
  ========================= */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 8;

  /* =========================
     TESTIMONIALS
  ========================= */
  const testimonials = [
    {
      id: 1,
      name: "Andi Pratama",
      city: "Jakarta",
      text: "Kualitas alat fitness sangat premium.",
    },

    {
      id: 2,
      name: "Michael Tan",
      city: "Bekasi",
      text: "Pelayanan cepat dan admin responsif.",
    },

    {
      id: 3,
      name: "Rizky Saputra",
      city: "Bogor",
      text: "Barang original dan recommended.",
    },
  ];

  /* =========================
     AOS
  ========================= */
  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: true,
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
        }, 1200);

      }
    );

    return () => unsubscribe();

  }, []);

  /* =========================
     DISCOUNT PRODUCTS
  ========================= */
  const discountProducts = products.filter(
    (product) => product.discount > 0
  );

  /* =========================
     FILTER + SORT
  ========================= */
  const filteredProducts = useMemo(() => {

    let filtered = [...products];

    /* SEARCH */
    filtered = filtered.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    /* CATEGORY */
    if (selectedCategory !== "All") {

      filtered = filtered.filter(
        (product) =>
          product.category === selectedCategory
      );

    }

    /* SORT */
    switch (sortBy) {

      case "lowest":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "highest":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "az":
        filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "za":
        filtered.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      default:
        break;

    }

    return filtered;

  }, [
    products,
    search,
    selectedCategory,
    sortBy,
  ]);

  /* =========================
     RESET PAGE
  ========================= */
  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    selectedCategory,
    sortBy,
  ]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return <LoadingScreen />;
  }

  return (

    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* =========================
          CUSTOM STYLE
      ========================= */}
      <style>{`

        @keyframes testimonialScroll {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }

        }

        .testimonial-scroll {
          animation: testimonialScroll 28s linear infinite;
        }

        @keyframes whatsappFloat {

          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }

        }

        .whatsapp-float {
          animation: whatsappFloat 3s ease-in-out infinite;
        }

      `}</style>

      <Navbar />

      {/* HERO */}
      <HeroSection />
{/* =========================
    PREMIUM PROMO BANNER
========================= */}
<section className="relative px-6 -mt-10 z-20">

  <motion.div
    initial={{
      opacity: 0,
      y: 40,
    }}

    whileInView={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      duration: 0.8,
    }}

    className="
    relative

    max-w-7xl
    mx-auto

    overflow-hidden

    rounded-[40px]

    border
    border-white/10

    bg-gradient-to-br
    from-red-600
    via-red-700
    to-black

    p-10
    md:p-14

    shadow-[0_20px_100px_rgba(239,68,68,0.35)]
    "
  >

    {/* GLOW EFFECT */}
    <div
      className="
      absolute
      top-0
      left-0

      w-[350px]
      h-[350px]

      bg-white/10

      rounded-full

      blur-[120px]
      "
    />

    <div
      className="
      absolute
      bottom-0
      right-0

      w-[350px]
      h-[350px]

      bg-red-400/20

      rounded-full

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

        {/* BADGE */}
        <div
          className="
          inline-flex
          items-center
          gap-3

          px-6 py-3

          rounded-full

          bg-white/10
          border border-white/20

          text-white
          text-sm
          font-black
          tracking-[3px]
          uppercase

          backdrop-blur-xl

          mb-8
          "
        >

          <Flame
            size={18}
            className="animate-pulse"
          />

          Special Promo KSPORTS

        </div>

        {/* TITLE */}
        <h2
          className="
          text-4xl
          md:text-6xl

          font-black
          leading-tight
          "
        >

          GRATIS ONGKIR

          <span
            className="
            block

            text-white/80
            "
          >
            JABODETABEK
          </span>

        </h2>

        {/* SUBTITLE */}
        <p
          className="
          mt-6

          text-white/80
          text-lg
          md:text-xl

          leading-relaxed
          "
        >
          Nikmati promo spesial pembelian alat fitness premium
          dengan GRATIS ongkos kirim dan GRATIS pemasangan
          untuk seluruh area Jabodetabek.
        </p>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-4 mt-8">

          {[
            "Free Ongkir",
            "Free Instalasi",
            "Garansi Produk",
            "Original Quality",
          ].map((item) => (

            <div
              key={item}
              className="
              px-5 py-3

              rounded-2xl

              bg-white/10
              border border-white/10

              backdrop-blur-xl

              text-sm
              font-bold
              "
            >
              ✅ {item}
            </div>

          ))}

        </div>

      </div>

      {/* RIGHT */}
      <motion.div

        animate={{
          y: [0, -12, 0],
        }}

        transition={{
          duration: 3,
          repeat: Infinity,
        }}

        className="
        flex
        flex-col

        items-center
        justify-center

        text-center
        "
      >

        <div
          className="
          w-[220px]
          h-[220px]

          rounded-full

          bg-white/10

          border
          border-white/20

          backdrop-blur-2xl

          flex
          flex-col
          items-center
          justify-center

          shadow-[0_0_60px_rgba(255,255,255,0.15)]
          "
        >

          <span
            className="
            text-sm
            tracking-[4px]
            uppercase
            text-white/70
            "
          >
            Diskon Hingga
          </span>

          <h1
            className="
            text-7xl

            font-black

            leading-none
            "
          >
            20%
          </h1>

          <p className="text-white/70 mt-2">
            Limited Time
          </p>

        </div>

      </motion.div>

    </div>

  </motion.div>

</section>


      {/* =========================
          DISCOUNT SECTION
      ========================= */}
      {discountProducts.length > 0 && (

        <section className="py-20 px-6">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">

  {/* BADGE */}
  <motion.div
    initial={{
      opacity: 0,
      y: -20,
    }}

    whileInView={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      duration: 0.6,
    }}

    className="
    inline-flex
    items-center
    gap-3

    px-7 py-3

    rounded-full

    bg-gradient-to-r
    from-red-600/20
    via-red-500/10
    to-red-600/20

    border
    border-red-500/30

    shadow-[0_0_40px_rgba(239,68,68,0.25)]

    text-red-400
    text-sm
    font-black
    tracking-[4px]
    uppercase

    mb-8
    "
  >

    <Flame
      size={18}
      className="animate-pulse"
    />

    Limited Time Offer

  </motion.div>

  {/* TITLE */}
  <motion.h2
    initial={{
      opacity: 0,
      y: 30,
    }}

    whileInView={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      duration: 0.8,
    }}

    className="
    text-5xl
    md:text-7xl

    font-black
    leading-none
    "
  >

    MEGA

    <span
      className="
      block

      bg-gradient-to-r
      from-red-500
      via-white
      to-red-500

      bg-clip-text
      text-transparent

      drop-shadow-[0_0_25px_rgba(239,68,68,0.45)]
      "
    >
      DISCOUNT
    </span>

  </motion.h2>

  {/* SUBTITLE */}
  <motion.p
    initial={{
      opacity: 0,
      y: 20,
    }}

    whileInView={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      duration: 1,
    }}

    className="
    mt-6

    text-zinc-400
    text-lg
    md:text-xl

    max-w-2xl
    mx-auto

    leading-relaxed
    "
  >
    Dapatkan harga spesial untuk alat fitness premium
    dengan kualitas terbaik dan promo terbatas hari ini.
  </motion.p>

</div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {discountProducts.map((product) => {

                const originalPrice =
                  product.price /
                  (1 - product.discount / 100);

                return (

                  <motion.div
                    key={product.id}
                    whileHover={{
                      y: -10,
                    }}
                    className="
                    relative

                    overflow-hidden

                    rounded-[30px]

                    bg-zinc-900

                    border
                    border-red-500/20
                    "
                  >

                    {/* DISCOUNT BADGE */}
                    <div
                      className="
                      absolute
                      top-4
                      left-4
                      z-20

                      bg-red-600

                      px-4
                      py-2

                      rounded-full

                      text-sm
                      font-black
                      "
                    >
                      -{product.discount}%
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                      h-[280px]
                      w-full
                      object-cover
                      "
                    />

                    <div className="p-6">

                      <h3 className="text-2xl font-black">
                        {product.name}
                      </h3>

                      <div className="mt-4">

                        <p className="text-zinc-500 line-through text-lg">

                          {formatPrice(
                            Math.round(originalPrice)
                          )}

                        </p>

                       <p className="text-3xl font-black text-red-500">
  {formatPrice(product.price)}
</p>

{/* PREMIUM BUTTON */}
<Link
  to={`/product/${product.id}`}
  className="
  mt-6

  group

  relative
  inline-flex

  items-center
  justify-center

  w-full

  overflow-hidden

  rounded-2xl

  bg-gradient-to-r
  from-red-600
  via-red-500
  to-red-700

  px-6
  py-4

  font-black
  tracking-[2px]
  uppercase
  text-white

  shadow-[0_10px_40px_rgba(239,68,68,0.45)]

  transition-all
  duration-500

  hover:scale-[1.03]
  hover:shadow-[0_15px_60px_rgba(239,68,68,0.65)]
  "
>

  {/* GLOW */}
  <span
    className="
    absolute
    inset-0

    bg-gradient-to-r
    from-white/0
    via-white/20
    to-white/0

    translate-x-[-120%]

    group-hover:translate-x-[120%]

    transition-transform
    duration-1000
    "
  />

<span className="relative z-10 flex items-center gap-2">
  Lihat Detail

  <ArrowRight
    size={18}
    className="
    transition-transform
    duration-300
    group-hover:translate-x-1
    "
  />
</span>

</Link>

                      </div>

                    </div>

                  </motion.div>

                );

              })}

            </div>

          </div>

        </section>

      )}

      {/* =========================
          PRODUCTS
      ========================= */}
      <section
        id="produk"
        className="relative py-24 px-6"
      >

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-20">

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

          {/* CATEGORY */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">

            {[
              "All",
              "Cardio",
              "Strength",
              "Accessories",
            ].map((category) => (

              <button
                key={category}
                onClick={() => {

                  setSelectedCategory(category);
                  setCurrentPage(1);

                }}
                className={`
                  px-6 py-3
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300

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

          {/* SEARCH + SORT */}
          <div
            className="
            flex
            flex-col
            md:flex-row

            gap-4

            mb-16
            "
          >

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => {

                setSearch(e.target.value);
                setCurrentPage(1);

              }}
              className="
              flex-1

              bg-zinc-900

              border border-zinc-700

              rounded-2xl

              px-6 py-4

              text-white

              outline-none

              focus:border-red-500
              "
            />

            {/* SORT */}
            <select
              value={sortBy}
              onChange={(e) => {

                setSortBy(e.target.value);
                setCurrentPage(1);

              }}
              className="
              md:w-[280px]

              bg-zinc-900

              border border-zinc-700

              rounded-2xl

              px-6 py-4

              text-white

              outline-none

              focus:border-red-500
              "
            >

              <option value="default">
                Urutkan Produk
              </option>

              <option value="lowest">
                Harga Terendah
              </option>

              <option value="highest">
                Harga Tertinggi
              </option>

              <option value="az">
                A-Z
              </option>

              <option value="za">
                Z-A
              </option>

            </select>

          </div>

          {/* PRODUCT GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {currentProducts.map((product, index) => {

              const originalPrice =
                product.discount > 0
                  ? product.price /
                    (1 - product.discount / 100)
                  : null;

              return (

                <motion.div
                  key={product.id}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.35 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >

                  <Link
                    to={`/product/${product.id}`}
                    className="
                    block

                    overflow-hidden

                    rounded-[32px]

                    bg-zinc-900

                    border
                    border-white/5
                    "
                  >

                    {/* DISCOUNT BADGE */}
                    {product.discount > 0 && (

                      <div
                        className="
                        absolute
                        m-4

                        bg-red-600

                        px-3
                        py-1

                        rounded-full

                        text-sm
                        font-black
                        z-10
                        "
                      >
                        -{product.discount}%
                      </div>

                    )}

                    {/* IMAGE */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                      h-[320px]
                      w-full

                      object-cover
                      "
                    />

                    {/* CONTENT */}
                    <div className="p-7">

                      <h3 className="text-2xl font-black">
                        {product.name}
                      </h3>

                      {product.discount > 0 ? (

                        <>
                          <p className="line-through text-zinc-500 mt-4 text-lg">

                            {formatPrice(
                              Math.round(originalPrice)
                            )}

                          </p>

                          <p className="text-3xl font-black text-red-500">

                            {formatPrice(product.price)}

                          </p>
                        </>

                      ) : (

                        <p className="text-3xl font-black text-red-500 mt-4">
                          {formatPrice(product.price)}
                        </p>

                      )}

                    </div>

                  </Link>

                </motion.div>

              );

            })}

          </div>

          {/* =========================
              PAGINATION
          ========================= */}
          {totalPages > 1 && (

            <div className="flex justify-center gap-3 mt-20 flex-wrap">

              {/* PREV */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }

                disabled={currentPage === 1}

                className="
                px-5 py-3

                rounded-2xl

                bg-zinc-800
                hover:bg-zinc-700

                disabled:opacity-40

                font-bold
                "
              >
                Prev
              </button>

              {/* PAGE */}
              {[...Array(totalPages)].map((_, index) => {

                const page = index + 1;

                return (

                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(page)
                    }

                    className={`
                      w-12
                      h-12

                      rounded-2xl

                      font-bold

                      transition-all

                      ${
                        currentPage === page
                          ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }
                    `}
                  >
                    {page}
                  </button>

                );

              })}

              {/* NEXT */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }

                disabled={currentPage === totalPages}

                className="
                px-5 py-3

                rounded-2xl

                bg-zinc-800
                hover:bg-zinc-700

                disabled:opacity-40

                font-bold
                "
              >
                Next
              </button>

            </div>

          )}

        </div>

      </section>

      {/* =========================
    PREMIUM TESTIMONIAL
========================= */}
<section className="relative py-32 overflow-hidden">

  {/* BG GLOW */}
  <div
    className="
    absolute
    top-0
    left-0

    w-[500px]
    h-[500px]

    bg-red-600/10

    blur-[180px]
    "
  />

  <div
    className="
    absolute
    bottom-0
    right-0

    w-[500px]
    h-[500px]

    bg-red-500/10

    blur-[180px]
    "
  />

  <div className="relative z-10">

    {/* HEADING */}
    <div className="text-center mb-20 px-6">

      {/* BADGE */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        className="
        inline-flex
        items-center
        gap-3

        px-7 py-3

        rounded-full

        bg-red-500/10
        border border-red-500/20

        text-red-400
        text-sm
        font-black
        tracking-[4px]
        uppercase

        mb-8
        "
      >

        <Star
          size={16}
          className="fill-red-500 text-red-500"
        />

        Customer Reviews

      </motion.div>

      {/* TITLE */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 20,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="
        text-5xl
        md:text-7xl

        font-black
        leading-none
        "
      >

        WHAT OUR

        <span
          className="
          block

          bg-gradient-to-r
          from-red-500
          via-white
          to-red-500

          bg-clip-text
          text-transparent
          "
        >
          CLIENTS SAY
        </span>

      </motion.h2>

      {/* SUBTITLE */}
      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}

        className="
        mt-6

        max-w-3xl
        mx-auto

        text-zinc-400
        text-lg
        md:text-xl

        leading-relaxed
        "
      >
        Ribuan customer mempercayakan kebutuhan fitness mereka
        kepada KSPORTS karena kualitas premium dan pelayanan terbaik.
      </motion.p>

    </div>

    {/* SCROLL AREA */}
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

          <motion.div
            key={index}

            whileHover={{
              y: -12,
              scale: 1.02,
            }}

            transition={{
              duration: 0.35,
            }}

            className="
            relative

            w-[380px]

            overflow-hidden

            rounded-[36px]

            border
            border-white/10

            bg-white/[0.04]

            backdrop-blur-2xl

            p-10

            shadow-[0_20px_80px_rgba(0,0,0,0.45)]

            group
            "
          >

            {/* HOVER GLOW */}
            <div
              className="
              absolute
              inset-0

              opacity-0
              group-hover:opacity-100

              transition-all
              duration-500

              bg-gradient-to-br
              from-red-500/10
              via-transparent
              to-red-500/5
              "
            />

            {/* QUOTE */}
            <div
              className="
              absolute
              top-6
              right-6

              opacity-10
              "
            >
              <Quote size={80} />
            </div>

            {/* AVATAR */}
            <div className="flex items-center gap-4">

              <div
                className="
                w-16
                h-16

                rounded-full

                bg-gradient-to-br
                from-red-500
                to-red-700

                flex
                items-center
                justify-center

                text-2xl
                font-black
                "
              >
                {item.name.charAt(0)}
              </div>

              <div>

                <h3 className="font-black text-xl">
                  {item.name}
                </h3>

                <p className="text-zinc-400 text-sm">
                  {item.city}
                </p>

              </div>

            </div>

            {/* STARS */}
            <div className="flex gap-1 mt-8">

              {[1, 2, 3, 4, 5].map((star) => (

                <Star
                  key={star}
                  size={18}
                  className="
                  fill-yellow-400
                  text-yellow-400
                  "
                />

              ))}

            </div>

            {/* TEXT */}
            <p
              className="
              mt-6

              text-zinc-300
              text-lg

              leading-relaxed
              "
            >
              “{item.text}”
            </p>

            {/* BOTTOM LINE */}
            <div
              className="
              mt-8

              h-[2px]
              w-full

              bg-gradient-to-r
              from-red-500
              via-red-300
              to-transparent
              "
            />

          </motion.div>

        ))}

      </div>

    </div>

  </div>

</section>

      <Footer />

      {/* WHATSAPP */}
      <a
        href="https://wa.me/6285174285688"
        target="_blank"
        rel="noreferrer"
        className="
        whatsapp-float

        fixed
        bottom-6
        right-6
        z-[999]
        "
      >

        <div
          className="
          w-[75px]
          h-[75px]

          rounded-full

          bg-green-500

          flex
          items-center
          justify-center

          shadow-[0_15px_60px_rgba(34,197,94,0.55)]
          "
        >

          <MessageCircle
            size={34}
            className="text-white"
          />

        </div>

      </a>

    </div>

  );

}