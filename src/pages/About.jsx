import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import {
  Dumbbell,
  ShieldCheck,
  Truck,
  Star,
  Users,
  Award,
  Flame,
  Phone,
  Instagram,
  Music2,
  MessageCircle,
} from 'lucide-react'

export default function About() {

  return (

    <div className="bg-black text-white min-h-screen overflow-hidden">
    <Navbar />

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">

        {/* BG EFFECT */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/20 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[160px]" />

        <div className="relative z-10 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >

            <div
              className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              font-bold
              tracking-[3px]
              uppercase
              mb-8
              "
            >
              🔥 About KSPORTS
            </div>

            <h1
            className="
            text-5xl
            md:text-7xl
            font-black
            leading-none
            tracking-[-3px]
            flex
            flex-col md:flex-row
            items-center
            justify-center
            gap-4
            "
            >

            <span className="text-white">
                PREMIUM
            </span>

            <span
                className="
                bg-gradient-to-r
                from-red-500
                via-red-400
                to-red-600
                bg-clip-text
                text-transparent
                "
            >
                FITNESS STORE
            </span>

            </h1>

            <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="
            mt-10
            max-w-5xl
            mx-auto

            text-[20px]
            md:text-[26px]

            font-light
            leading-[2.1]

            text-zinc-300

            tracking-wide

            text-center

            drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]
            "
            >

            <span className="font-black text-white tracking-[2px]">
                KSPORTS
            </span>

            <span className="text-zinc-400">
                {' '}adalah toko alat fitness premium dengan{' '}
            </span>

            <span className="
                text-red-400
                font-semibold
                drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
            ">
                HARGA TERBAIK{' '}
            </span>

            <span className="text-zinc-400">
                dan menyediakan berbagai kebutuhan
            </span>

            <span className="text-white font-medium">
                {' '}GYM RUMAHAN
            </span>

            <span className="text-zinc-400">
                {' '}hingga{' '}
            </span>

            <span className="
                text-red-400
                font-semibold
                drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
            ">
                COMMERCIAL GYM
            </span>

            <span className="text-zinc-400">
                {' '}dengan kualitas terpercaya dan pelayanan profesional.
            </span>

            </motion.p>

          </motion.div>

        </div>

      </section>

      {/* =========================
          ABOUT CONTENT
      ========================= */}
      <section className="relative py-28 px-6 overflow-hidden">

        {/* BG EFFECT */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/10 blur-[140px]" />

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE / LOGO */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >

              {/* GLOW */}
              <div
                className="
                absolute inset-0
                bg-red-500/20
                blur-[120px]
                rounded-full
                "
              />

              {/* IMAGE BOX */}
              <div
                className="
                relative
                bg-gradient-to-br
                from-zinc-900
                to-black
                border border-red-500/20
                rounded-[40px]
                p-10
                shadow-[0_0_60px_rgba(255,0,0,0.15)]
                "
              >

                <img
                src="../public/products/logo.png"
                alt="KSPORTS"
                className="
                w-full
                max-w-[700px]
                mx-auto
                object-contain
                scale-125
                md:scale-150
                drop-shadow-[0_0_55px_rgba(255,0,0,0.55)]
                transition-all
                duration-500
                hover:scale-[1.6]
                "
                />

              </div>

            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >

              <p className="text-red-400 font-bold tracking-[3px] uppercase">
                Why Choose Us
              </p>

              <h2
                className="
                text-5xl
                font-black
                leading-tight
                mt-6
                "
              >
                TENTANG
                <span className="block text-red-500">
                  KSPORTS
                </span>
              </h2>

              <p
                className="
                mt-8
                text-zinc-400
                leading-relaxed
                text-lg
                "
              >
                KSPORTS adalah toko alat fitness premium dengan harga terbaik,
                menyediakan berbagai kebutuhan gym rumahan hingga commercial gym
                dengan kualitas terpercaya dan pelayanan profesional.
              </p>

              <p
                className="
                mt-6
                text-zinc-400
                leading-relaxed
                text-lg
                "
              >
                Berlokasi di Glodok Plaza dan sudah berdiri sejak 2019,
                KSPORTS telah dipercaya oleh banyak customer, personal trainer,
                hingga pemilik gym di seluruh Indonesia.
              </p>

              {/* FEATURES */}
              <div className="grid grid-cols-2 gap-6 mt-12">

                {[
                  {
                    icon: <Dumbbell size={32} />,
                    title: 'Free Biaya Instalasi',
                  },
                  {
                    icon: <Truck size={32} />,
                    title: 'Free Ongkir',
                  },
                  {
                    icon: <ShieldCheck size={32} />,
                    title: 'Garansi Resmi',
                  },
                  {
                    icon: <Star size={32} />,
                    title: 'Best Quality',
                  },
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                    bg-zinc-900
                    border
                    border-zinc-800
                    rounded-3xl
                    p-6
                    hover:border-red-500/40
                    transition-all
                    duration-300
                    "
                  >

                    <div className="text-red-500 mb-4">
                      {item.icon}
                    </div>

                    <h3 className="font-bold text-lg">
                      {item.title}
                    </h3>

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* =========================
          STATS
      ========================= */}
      <section className="px-6 py-24">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                icon: <Users size={40} />,
                number: '400+',
                label: 'Happy Clients',
              },
              {
                icon: <Award size={40} />,
                number: '2019',
                label: 'Established',
              },
              {
                icon: <Dumbbell size={40} />,
                number: '100+',
                label: 'Fitness Products',
              },
              {
                icon: <Star size={40} />,
                number: '4.9',
                label: 'Customer Rating',
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="
                bg-zinc-900/70
                border
                border-zinc-800
                rounded-[32px]
                p-10
                text-center
                backdrop-blur-xl
                hover:border-red-500/30
                transition-all
                duration-300
                "
              >

                <div className="flex justify-center text-red-500 mb-6">
                  {item.icon}
                </div>

                <h3 className="text-5xl font-black">
                  {item.number}
                </h3>

                <p className="text-zinc-400 mt-3">
                  {item.label}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="px-6 py-24">

        <div
          className="
          max-w-6xl
          mx-auto
          rounded-[40px]
          bg-gradient-to-r
          from-red-700
          to-red-500
          p-16
          text-center
          shadow-[0_0_60px_rgba(255,0,0,0.25)]
          "
        >

          <h2 className="text-5xl font-black">
            READY TO START?
          </h2>

          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Hubungi KSPORTS sekarang dan bangun gym impian Anda
            dengan alat fitness premium terbaik.
          </p>

          <a
            href="https://wa.me/6285174285688"
            target="_blank"
            rel="noreferrer"
            className="
            mt-10
            inline-flex
            items-center
            justify-center
            bg-black
            hover:bg-zinc-900
            px-10
            py-5
            rounded-2xl
            font-bold
            text-lg
            transition-all
            duration-300
            hover:scale-105
            "
          >
            Chat WhatsApp
          </a>

        </div>

      </section>
    <Footer />
    </div>

  )

}