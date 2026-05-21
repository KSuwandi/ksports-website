import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {

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
     CAROUSEL
  ========================= */
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/products/treadmill_dhz.webp",
    "/products/treadmill_florence.webp",
    "/products/sepeda_statis.webp",
    "/products/multismith.webp",
    "/products/dumble_set.webp",
  ];

  /* =========================
     AUTO SLIDE
  ========================= */
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === images.length - 1
          ? 0
          : prev + 1
      );

    }, 3500);

    return () => clearInterval(interval);

  }, [images.length]);

  return (

    <section className="relative bg-black text-white overflow-hidden">

      {/* =========================
          BACKGROUND GLOW
      ========================= */}
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

      {/* =========================
          CONTAINER
      ========================= */}
      <div
        className="
        relative z-10
        max-w-7xl
        mx-auto

        px-6
        pt-[180px]
        pb-24

        grid
        md:grid-cols-2
        gap-16

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
          viewport={{ once: true, amount: 0.3 }}
        >

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{ delay: 0.1 }}

            viewport={{ once: true }}

            className="
            inline-flex
            items-center
            gap-2

            bg-zinc-900/80
            backdrop-blur-xl

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
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.2,
              duration: 0.8,
            }}

            viewport={{ once: true }}

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

              drop-shadow-[0_0_25px_rgba(255,0,0,0.35)]
              "
            >
              PREMIUM
            </span>

            HARGA TERBAIK

          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.35,
              duration: 0.8,
            }}

            viewport={{ once: true }}

            className="
            mt-10
            max-w-2xl

            text-[18px]
            md:text-[22px]

            font-light
            leading-[2]

            text-zinc-300

            tracking-wide

            drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]
            "
          >

            <span className="font-black text-white tracking-[2px]">
              KSPORTS
            </span>

            <span className="text-zinc-400">
              {" "}menyediakan berbagai alat fitness premium dengan{" "}
            </span>

            <span
              className="
              text-red-400
              font-semibold

              drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
              "
            >
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

            <span
              className="
              text-red-400
              font-semibold

              drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
              "
            >
              COMMERCIAL GYM
            </span>

            <span className="text-zinc-400">
              {" "}dengan kualitas terpercaya dan pelayanan profesional.
            </span>

          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.5,
              duration: 0.8,
            }}

            viewport={{ once: true }}

            className="
            flex
            flex-wrap
            gap-4

            mt-10
            "
          >

            {/* BUTTON 1 */}
            <a
              href="#produk"

              className="
              group

              relative
              overflow-hidden

              bg-gradient-to-r
              from-red-600
              to-red-500

              hover:from-red-500
              hover:to-red-400

              px-8
              py-4

              rounded-2xl

              font-bold
              tracking-wide

              transition-all
              duration-300

              hover:scale-105

              shadow-lg
              shadow-red-500/20
              "
            >

              <span className="relative z-10">
                Lihat Produk
              </span>

              <span
                className="
                absolute
                top-0
                left-[-120%]

                w-full
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

            </a>

            {/* BUTTON 2 */}
            <a
              href="https://wa.me/6285174285688"

              target="_blank"
              rel="noreferrer"

              className="
              bg-zinc-900/80
              backdrop-blur-xl

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

          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.7,
              duration: 0.8,
            }}

            viewport={{ once: true }}

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

          </motion.div>

        </motion.div>

        {/* =========================
            RIGHT IMAGE CAROUSEL
        ========================= */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
            scale: 0.9,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}

          transition={{
            duration: 1,
          }}

          viewport={{
            once: true,
            amount: 0.3,
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

          {/* CAROUSEL BOX */}
          <div
            className="
            relative
            z-10

            w-full
            max-w-[560px]

            h-[560px]

            rounded-[40px]

            bg-gradient-to-br
            from-zinc-900
            to-black

            border
            border-red-500/20

            overflow-hidden

            shadow-[0_0_50px_rgba(255,0,0,0.15)]

            flex
            items-center
            justify-center
            "
          >

            {/* IMAGE */}
            <motion.img
              key={currentSlide}
              src={images[currentSlide]}
              alt="Fitness Equipment"

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

              transition-all
              duration-700
              "
            />

          </div>

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

            {images.map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrentSlide(index)}

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