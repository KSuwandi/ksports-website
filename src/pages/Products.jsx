import { useEffect, useMemo, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { formatPrice } from "../utils/formatPrice";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Products() {

  /* =========================
     STATES
  ========================= */
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 8;

  /* =========================
     FETCH PRODUCTS
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
        }, 800);

      }
    );

    return () => unsubscribe();

  }, []);

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
        filtered.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "highest":
        filtered.sort(
          (a, b) => b.price - a.price
        );
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

  return (

    <div className="bg-black text-white min-h-screen overflow-hidden">

      <Navbar />

      {/* =========================
          HERO
      ========================= */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">

        {/* BG */}
        <div
          className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-red-600/20
          blur-[160px]
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
          blur-[160px]
          "
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">

          {/* BADGE */}
          <div
            className="
            inline-flex
            items-center
            gap-2

            px-6 py-3

            rounded-full

            bg-red-500/10
            border border-red-500/20

            text-red-400
            font-bold
            tracking-[3px]
            uppercase

            mb-8
            "
          >
            🔥 KSPORTS COLLECTION
          </div>

          {/* TITLE */}
          <h1
            className="
            text-5xl
            md:text-7xl

            font-black
            tracking-tight
            "
          >

            ALL

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
              PRODUCTS
            </span>

          </h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1,
            }}

            className="
            mt-10
            max-w-4xl
            mx-auto

            text-lg
            md:text-2xl

            leading-[2]

            text-zinc-300
            "
          >
            KSPORTS menyediakan berbagai alat fitness premium
            untuk kebutuhan gym rumahan hingga commercial gym
            dengan kualitas terbaik dan harga terbaik.
          </motion.p>

        </div>

      </section>

      {/* =========================
          FILTER
      ========================= */}
      <section className="px-6">

        <div className="max-w-7xl mx-auto">

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
                onClick={() =>
                  setSelectedCategory(category)
                }
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

            mb-20
            "
          >

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
              flex-1

              bg-black/70

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
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="
              md:w-[280px]

              bg-black/70

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
                Harga Termurah
              </option>

              <option value="highest">
                Harga Termahal
              </option>

              <option value="az">
                Nama A-Z
              </option>

              <option value="za">
                Nama Z-A
              </option>

            </select>

          </div>

        </div>

      </section>

      {/* =========================
          PRODUCT GRID
      ========================= */}
      <section className="px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          {/* EMPTY */}
          {!loading && currentProducts.length === 0 && (

            <div
              className="
              bg-zinc-900
              border border-zinc-800

              rounded-[40px]

              p-16

              text-center
              "
            >

              <h2 className="text-4xl font-black">
                Produk Tidak Ditemukan
              </h2>

              <p className="text-zinc-400 mt-4">
                Coba gunakan keyword lain.
              </p>

            </div>

          )}

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {currentProducts.map((product) => (

              <motion.div
                key={product.id}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}

                transition={{
                  duration: 0.35,
                }}

                className="group"
              >

                <Link
                  to={`/product/${product.id}`}

                  className="
                  relative
                  block

                  overflow-hidden

                  rounded-[32px]

                  bg-gradient-to-b
                  from-zinc-900
                  to-black

                  border border-white/5

                  hover:border-red-500/40

                  transition-all
                  duration-500
                  "
                >

                  {/* IMAGE */}
                  <div className="overflow-hidden">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                      h-[320px]
                      w-full

                      object-cover

                      group-hover:scale-110

                      transition-all
                      duration-700
                      "
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="p-7">

                    <h3
                      className="
                      text-[24px]
                      font-black
                      leading-tight

                      min-h-[70px]

                      group-hover:text-red-400

                      transition
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
                      {formatPrice(product.price)}
                    </p>

                    {/* BUTTON */}
                    <div className="mt-7">

                      <button
                        className="
                        w-full

                        bg-gradient-to-r
                        from-red-600
                        to-red-500

                        hover:from-red-500
                        hover:to-red-400

                        py-4

                        rounded-2xl

                        font-bold

                        transition-all
                        duration-300

                        hover:scale-105
                        "
                      >
                        Lihat Detail
                      </button>

                    </div>

                  </div>

                </Link>

              </motion.div>

            ))}

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

      <Footer />

    </div>

  );

}