import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../src/pages/firebase";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HeroSection() {

  /* =========================
     STATES
  ========================= */
  const [products, setProducts] =
    useState([]);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  /* =========================
     ANIMATION
  ========================= */
  const fadeUp = {

    hidden: {
      opacity: 0,
      y: 60,
    },

    show: {

      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
      },

    },

  };

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

      }
    );

    return () => unsubscribe();

  }, []);

  /* =========================
     AUTO SLIDE
  ========================= */
  useEffect(() => {

    if (products.length === 0) return;

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === products.length - 1
          ? 0
          : prev + 1
      );

    }, 3500);

    return () => clearInterval(interval);

  }, [products]);

  /* =========================
     NEXT SLIDE
  ========================= */
  const nextSlide = () => {

    setCurrentSlide((prev) =>
      prev === products.length - 1
        ? 0
        : prev + 1
    );

  };

  /* =========================
     PREV SLIDE
  ========================= */
  const prevSlide = () => {

    setCurrentSlide((prev) =>
      prev === 0
        ? products.length - 1
        : prev - 1
    );

  };

  return (

    <section className="relative bg-black text-white overflow-hidden">

      {/* BG GLOW */}
      <div
        className="
        absolute
        top-0
        left-0
        w-[500px]
        h-[500px]
        bg-red-600/20
        blur-[120px]
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
        blur-[120px]
        "
      />

      {/* CONTAINER */}
      <div
        className="
        relative
        z-10

        max-w-7xl
        mx-auto

        px-6
        pt-[180px]
        pb-24

        grid
        lg:grid-cols-2

        gap-20
        items-center
        "
      >

        {/* =========================
            LEFT CONTENT
        ========================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >

          {/* BADGE */}
          <div
            className="
            inline-flex
            items-center
            gap-2

            bg-zinc-900/80

            border
            border-red-500/30

            px-4
            py-2

            rounded-full

            text-sm
            text-red-400

            mb-6
            "
          >
            🔥 PROMO GRATIS ONGKIR JABODETABEK
          </div>

          {/* TITLE */}
          <h1
            className="
            text-5xl
            md:text-7xl

            font-black
            leading-none
            tracking-tight
            "
          >

            ALAT FITNESS

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
              PREMIUM
            </span>

            HARGA TERBAIK

          </h1>

          {/* DESCRIPTION */}
          <p
            className="
            mt-10

            max-w-2xl

            text-[18px]
            md:text-[22px]

            font-light
            leading-[2]

            text-zinc-300
            "
          >

            <span className="font-black text-white">
              KSPORTS
            </span>

            <span className="text-zinc-400">
              {" "}menyediakan berbagai alat fitness premium dengan{" "}
            </span>

            <span className="text-red-400 font-semibold">
              HARGA TERBAIK{" "}
            </span>

            <span className="text-zinc-400">
              untuk kebutuhan
            </span>

            <span className="text-white font-medium">
              {" "}GYM RUMAHAN
            </span>

            <span className="text-zinc-400">
              {" "}hingga{" "}
            </span>

            <span className="text-red-400 font-semibold">
              COMMERCIAL GYM
            </span>

            <span className="text-zinc-400">
              {" "}dengan kualitas terpercaya dan pelayanan profesional.
            </span>

          </p>

          {/* BUTTONS */}
          <div
            className="
            flex
            flex-wrap
            gap-4

            mt-10
            "
          >

            <a
              href="#produk"
              className="
              bg-gradient-to-r
              from-red-600
              to-red-500

              hover:from-red-500
              hover:to-red-400

              px-8
              py-4

              rounded-2xl

              font-bold

              transition-all
              duration-300

              hover:scale-105
              "
            >
              Lihat Produk
            </a>

            <a
              href="https://wa.me/6285174285688"
              target="_blank"
              rel="noreferrer"
              className="
              bg-zinc-900/80
              hover:bg-zinc-800

              border
              border-zinc-700

              px-8
              py-4

              rounded-2xl

              font-bold

              transition-all
              duration-300

              hover:scale-105
              "
            >
              WhatsApp Kami
            </a>

          </div>

          {/* STATS */}
          <div
            className="
            grid
            grid-cols-3

            gap-6

            mt-14
            "
          >

            <div>

              <h2
                className="
                text-3xl
                font-black
                text-red-500
                "
              >
                500+
              </h2>

              <p className="text-zinc-500 mt-2">
                Produk Terjual
              </p>

            </div>

            <div>

              <h2
                className="
                text-3xl
                font-black
                text-red-500
                "
              >
                100%
              </h2>

              <p className="text-zinc-500 mt-2">
                Original
              </p>

            </div>

            <div>

              <h2
                className="
                text-3xl
                font-black
                text-red-500
                "
              >
                24/7
              </h2>

              <p className="text-zinc-500 mt-2">
                Support
              </p>

            </div>

          </div>

        </motion.div>

        {/* =========================
            RIGHT SLIDER
        ========================= */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 1,
          }}

          viewport={{
            once: true,
          }}

          className="
          relative
          flex
          justify-center
          "
        >

          {/* GLOW */}
          <div
            className="
            absolute
            inset-0

            bg-red-500/20

            blur-3xl
            rounded-full
            "
          />

          {/* SLIDER */}
          {products.length > 0 && (

            <div
              className="
              relative
              z-10

              w-full
              max-w-[560px]

              h-[560px]

              rounded-[40px]

              overflow-hidden

              bg-gradient-to-br
              from-zinc-900
              to-black

              border
              border-red-500/20

              shadow-[0_0_50px_rgba(255,0,0,0.15)]
              "
            >

              {/* IMAGE */}
              <motion.img
                key={currentSlide}
                src={products[currentSlide]?.image}
                alt={products[currentSlide]?.name}

                initial={{
                  opacity: 0,
                  scale: 1.08,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 0.7,
                }}

                className="
                w-full
                h-full

                object-cover
                "
              />

              {/* PRODUCT NAME */}
              <div
                className="
                absolute
                bottom-0
                left-0
                right-0

                p-8

                bg-gradient-to-t
                from-black
                to-transparent
                "
              >

                <h3
                  className="
                  text-3xl
                  font-black
                  "
                >
                  {products[currentSlide]?.name}
                </h3>

              </div>

              {/* PREV */}
              <button
                onClick={prevSlide}
                className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2

                w-12
                h-12

                rounded-full

                bg-black/50
                hover:bg-red-600

                flex
                items-center
                justify-center

                transition-all
                "
              >
                <ChevronLeft />
              </button>

              {/* NEXT */}
              <button
                onClick={nextSlide}
                className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2

                w-12
                h-12

                rounded-full

                bg-black/50
                hover:bg-red-600

                flex
                items-center
                justify-center

                transition-all
                "
              >
                <ChevronRight />
              </button>

            </div>

          )}

          {/* DOTS */}
          <div
            className="
            absolute
            -bottom-10
            left-1/2
            -translate-x-1/2

            flex
            gap-3
            "
          >

            {products.map((_, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentSlide(index)
                }

                className={`
                  h-3
                  rounded-full

                  transition-all
                  duration-300

                  ${
                    currentSlide === index
                      ? "bg-red-500 w-10"
                      : "bg-zinc-500 w-3"
                  }
                `}
              />

            ))}

          </div>

        </motion.div>

      </div>

    </section>

  );

}