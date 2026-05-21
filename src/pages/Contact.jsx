import { motion } from "framer-motion";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
  Instagram,
} from "lucide-react";

export default function Contact() {

  return (

    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[140px]" />

      </div>

      <div className="relative z-10">

        <Navbar />

        {/* HERO */}
        <section className="pt-[180px] pb-24 px-6">

          <div className="max-w-7xl mx-auto">

            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >

              <div
                className="
                inline-flex
                items-center
                gap-2

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
                📞 Contact KSPORTS
              </div>

              <div
  className="
  flex
  flex-col
  lg:flex-row

  items-center
  justify-center

  gap-8
  "
>

  {/* LOGO */}
  <motion.img
    initial={{
      opacity: 0,
      scale: 0.8,
      rotate: -8,
    }}

    whileInView={{
      opacity: 1,
      scale: 1,
      rotate: 0,
    }}

    transition={{
      duration: 1,
    }}

    viewport={{ once: true }}

    src="/products/logo.png"
    alt="KSPORTS Logo"

    className="
    w-[220px]
    md:w-[300px]

    object-contain

    drop-shadow-[0_0_40px_rgba(255,0,0,0.35)]
    "
  />

  {/* TEXT */}
  <h1
    className="
    text-5xl
    md:text-7xl

    font-black
    tracking-tight
    leading-none

    text-center
    lg:text-left
    "
  >

    HUBUNGI

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
      KSPORTS
    </span>

  </h1>

</div>

              <p
                className="
                mt-8
                text-zinc-400
                text-lg

                max-w-3xl
                mx-auto

                leading-relaxed
                "
              >
                Kami siap membantu kebutuhan alat fitness untuk
                gym rumahan hingga commercial gym dengan pelayanan profesional.
              </p>

            </motion.div>

            {/* CONTACT GRID */}
            <div className="grid lg:grid-cols-2 gap-10">

              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="
                bg-zinc-900/60
                backdrop-blur-xl

                border
                border-zinc-800

                rounded-[40px]

                p-10
                "
              >

                <h2 className="text-4xl font-black mb-10">
                  Informasi Kontak
                </h2>

                <div className="space-y-8">

                  {/* ITEM */}
                  <div className="flex gap-5">

                    <div
                      className="
                      w-16 h-16

                      rounded-2xl

                      bg-red-500/10

                      flex
                      items-center
                      justify-center

                      text-red-500
                      "
                    >
                      <Phone size={28} />
                    </div>

                    <div>

                      <h3 className="font-bold text-xl">
                        WhatsApp
                      </h3>

                      <p className="text-zinc-400 mt-2">
                        +62 851-7428-5688
                      </p>

                    </div>

                  </div>

                  {/* ITEM */}
                  <div className="flex gap-5">

                    <div
                      className="
                      w-16 h-16

                      rounded-2xl

                      bg-red-500/10

                      flex
                      items-center
                      justify-center

                      text-red-500
                      "
                    >
                      <Mail size={28} />
                    </div>

                    <div>

                      <h3 className="font-bold text-xl">
                        Email
                      </h3>

                      <p className="text-zinc-400 mt-2">
                        kevinsports05@gmail.com
                      </p>

                    </div>

                  </div>

                  {/* ITEM */}
                  <div className="flex gap-5">

                    <div
                      className="
                      w-16 h-16

                      rounded-2xl

                      bg-red-500/10

                      flex
                      items-center
                      justify-center

                      text-red-500
                      "
                    >
                      <MapPin size={28} />
                    </div>

                    <div>

                      <h3 className="font-bold text-xl">
                        Store Location
                      </h3>

                      <p className="text-zinc-400 mt-2">
                        Glodok Plaza, Jakarta
                      </p>

                    </div>

                  </div>

                  {/* ITEM */}
                  <div className="flex gap-5">

                    <div
                      className="
                      w-16 h-16

                      rounded-2xl

                      bg-red-500/10

                      flex
                      items-center
                      justify-center

                      text-red-500
                      "
                    >
                      <Clock3 size={28} />
                    </div>

                    <div>

                      <h3 className="font-bold text-xl">
                        Jam Operasional
                      </h3>

                      <p className="text-zinc-400 mt-2">
                        Senin - Minggu • 09:00 - 17:00
                      </p>

                    </div>

                  </div>

                </div>

                {/* SOCIAL */}
                <div className="flex gap-4 mt-12">

                  <a
                    href="https://wa.me/6285174285688"
                    target="_blank"
                    rel="noreferrer"

                    className="
                    w-14 h-14

                    rounded-2xl

                    bg-zinc-800

                    border border-zinc-700

                    hover:border-red-500/40

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-300

                    hover:scale-110
                    "
                  >
                    <MessageCircle />
                  </a>

                  <a
                    href="#"

                    className="
                    w-14 h-14

                    rounded-2xl

                    bg-zinc-800

                    border border-zinc-700

                    hover:border-red-500/40

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-300

                    hover:scale-110
                    "
                  >
                    <Instagram />
                  </a>

                </div>

              </motion.div>

              {/* RIGHT FORM */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="
                bg-zinc-900/60
                backdrop-blur-xl

                border
                border-zinc-800

                rounded-[40px]

                p-10
                "
              >

                <h2 className="text-4xl font-black mb-10">
                  Kirim Pesan
                </h2>

                <form className="space-y-6">

                  <input
                    type="text"
                    placeholder="Nama Lengkap"

                    className="
                    w-full

                    bg-black/50

                    border
                    border-zinc-700

                    rounded-2xl

                    px-6
                    py-5

                    outline-none

                    focus:border-red-500

                    transition-all
                    "
                  />

                  <input
                    type="email"
                    placeholder="Email"

                    className="
                    w-full

                    bg-black/50

                    border
                    border-zinc-700

                    rounded-2xl

                    px-6
                    py-5

                    outline-none

                    focus:border-red-500

                    transition-all
                    "
                  />

                  <input
                    type="text"
                    placeholder="Nomor WhatsApp"

                    className="
                    w-full

                    bg-black/50

                    border
                    border-zinc-700

                    rounded-2xl

                    px-6
                    py-5

                    outline-none

                    focus:border-red-500

                    transition-all
                    "
                  />

                  <textarea
                    rows="6"
                    placeholder="Tulis pesan anda..."

                    className="
                    w-full

                    bg-black/50

                    border
                    border-zinc-700

                    rounded-2xl

                    px-6
                    py-5

                    outline-none

                    focus:border-red-500

                    transition-all

                    resize-none
                    "
                  />

                  <button
                    type="submit"

                    className="
                    w-full

                    bg-gradient-to-r
                    from-red-600
                    to-red-500

                    hover:from-red-500
                    hover:to-red-400

                    py-5

                    rounded-2xl

                    font-bold
                    text-lg

                    transition-all
                    duration-300

                    hover:scale-[1.02]

                    shadow-lg
                    shadow-red-500/20
                    "
                  >
                    Kirim Pesan
                  </button>

                </form>

              </motion.div>

            </div>

         </div>
<br></br><br></br><br></br>
{/* =========================
    GOOGLE MAPS
========================= */}
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}

  className="
  max-w-7xl
  mx-auto

  px-6
  pb-24
  "
>

  <div
    className="
    bg-zinc-900/60
    backdrop-blur-xl

    border
    border-zinc-800

    rounded-[40px]

    overflow-hidden
    "
  >

    {/* TITLE */}
    <div className="p-10 border-b border-zinc-800">

      <div
        className="
        inline-flex
        items-center
        gap-2

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
        📍 Store Location
      </div>

      <h2 className="text-4xl font-black">
        KSPORTS GLODOK PLAZA
      </h2>

      <p
        className="
        mt-4
        text-zinc-400
        text-lg
        "
      >
        Kunjungi showroom kami di Glodok Plaza Jakarta
        untuk melihat langsung produk fitness premium KSPORTS.
      </p>

    </div>

    {/* MAP */}
    <div className="w-full h-[500px]">

      <iframe
        title="Glodok Plaza"

        src="https://www.google.com/maps?q=Glodok+Plaza+Jakarta&output=embed"

        width="100%"
        height="100%"

        style={{ border: 0 }}

        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

    </div>

  </div>

</motion.div>

</section>

<Footer />

      </div>

    </div>

  );

}