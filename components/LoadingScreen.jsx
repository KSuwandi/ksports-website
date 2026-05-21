import { motion } from "framer-motion";

export default function LoadingScreen() {

  return (

    <div
      className="
      fixed inset-0 z-[9999]

      bg-black

      flex items-center justify-center
      overflow-hidden
      "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute

        w-[700px]
        h-[700px]

        rounded-full

        bg-red-600/20
        blur-[180px]

        animate-pulse
        "
      />

      {/* CONTENT */}
      <div
        className="
        relative z-10

        flex
        flex-col
        items-center
        "
      >

        {/* LOGO */}
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}

          animate={{
            scale: 1,
            opacity: 1,
          }}

          transition={{
            duration: 0.8,
          }}

          className="
          relative

          flex
          items-center
          justify-center
          "
        >

          {/* EXTRA RED GLOW */}
          <div
            className="
            absolute

            w-[500px]
            h-[500px]

            bg-red-600/20

            blur-[150px]
            rounded-full
            "
          />

          {/* LOGO IMAGE */}
          <img
            src="/products/logo.png"
            alt="KSPORTS Logo"

            className="
            relative z-10

            w-[700px]
            md:w-[900px]

            object-contain

            drop-shadow-[0_0_80px_rgba(255,0,0,0.55)]

            animate-pulse
            "
          />

        </motion.div>

        {/* LOADING TEXT */}
        <motion.p
          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 0.5,
            duration: 0.8,
          }}

          className="
          mt-8

          text-zinc-400

          tracking-[12px]
          uppercase

          text-sm
          md:text-base
          "
        >
          Loading...
        </motion.p>

        {/* LOADING BAR */}
        <div
          className="
          mt-8

          w-[280px]
          h-[6px]

          bg-zinc-800/80
          rounded-full

          overflow-hidden

          backdrop-blur-xl
          "
        >

          <motion.div
            initial={{
              width: 0,
            }}

            animate={{
              width: "100%",
            }}

            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}

            className="
            h-full

            bg-gradient-to-r
            from-red-700
            via-red-500
            to-red-400

            shadow-[0_0_25px_rgba(255,0,0,0.8)]
            "
          />

        </div>

      </div>

    </div>

  );

}