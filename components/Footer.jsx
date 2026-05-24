import {
  Instagram,
  Music2,
  MessageCircle,
} from "lucide-react";

export default function Footer() {

  /* =========================
     SOCIAL LINKS
  ========================= */
  const socialLinks = [
    {
      icon: <Music2 size={22} />,
      href: "https://www.tiktok.com/@ksports.id",
      label: "TikTok",
    },

    {
      icon: <Instagram size={22} />,
      href: "https://www.instagram.com/ksports_id/",
      label: "Instagram",
    },

    {
      icon: <MessageCircle size={22} />,
      href: "https://wa.me/6285174285688",
      label: "WhatsApp",
    },
  ];

  return (

    <footer
      className="
      relative
      mt-32
      border-t
      border-red-500/10
      overflow-hidden
      "
    >

      {/* BG GLOW */}
      <div
        className="
        absolute
        top-0
        left-0
        w-[400px]
        h-[400px]
        bg-red-600/10
        blur-[140px]
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[400px]
        h-[400px]
        bg-red-500/10
        blur-[140px]
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
        py-20
        "
      >

        <div className="grid lg:grid-cols-4 gap-14">

          {/* =========================
              BRAND
          ========================= */}
          <div>

            <h2
              className="
              text-4xl
              font-black
              tracking-[6px]
              "
            >
              KSPORTS
            </h2>

            <p
              className="
              mt-6
              text-zinc-400
              leading-relaxed
              "
            >
              Premium fitness equipment store dengan harga terbaik,
              kualitas premium, dan pelayanan profesional.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-8">

              {socialLinks.map((item, index) => (

                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}

                  className="
                  group

                  w-14
                  h-14

                  rounded-2xl

                  bg-zinc-900
                  border
                  border-zinc-800

                  hover:border-red-500/40
                  hover:bg-red-500/10

                  flex
                  items-center
                  justify-center

                  transition-all
                  duration-300

                  hover:scale-110
                  hover:-translate-y-1
                  "
                >

                  <span
                    className="
                    text-zinc-300
                    group-hover:text-red-400

                    transition-colors
                    duration-300
                    "
                  >
                    {item.icon}
                  </span>

                </a>

              ))}

            </div>

          </div>

          {/* =========================
              NAVIGATION
          ========================= */}
          <div>

            <h3 className="text-2xl font-black mb-8">
              Navigation
            </h3>

            <div className="flex flex-col gap-5">

              <a
                href="/"
                className="
                text-zinc-400
                hover:text-red-400
                transition
                "
              >
                Home
              </a>

              <a
                href="/#produk"
                className="
                text-zinc-400
                hover:text-red-400
                transition
                "
              >
                Produk
              </a>

              <a
                href="/about"
                className="
                text-zinc-400
                hover:text-red-400
                transition
                "
              >
                Tentang
              </a>

              <a
                href="/contact"
                className="
                text-zinc-400
                hover:text-red-400
                transition
                "
              >
                Kontak
              </a>

            </div>

          </div>

          {/* =========================
              CONTACT
          ========================= */}
          <div>

            <h3 className="text-2xl font-black mb-8">
              Contact
            </h3>

            <div className="space-y-5 text-zinc-400">

              <p>📍 Glodok Plaza, Jakarta</p>

              <p>📞 +62 851-7428-5688</p>

              <p>✉️ kevinsports05@gmail.com</p>

              <p>🚚 Free Ongkir JABODETABEK</p>

            </div>

          </div>

          {/* =========================
              CTA
          ========================= */}
          <div>

            <div
              className="
              relative
              overflow-hidden

              bg-gradient-to-br
              from-red-600
              to-red-500

              rounded-[32px]

              p-8
              "
            >

              {/* LIGHT */}
              <div
                className="
                absolute
                top-0
                left-0

                w-full
                h-[2px]

                bg-gradient-to-r
                from-transparent
                via-white/60
                to-transparent
                "
              />

              <p
                className="
                text-sm
                font-bold
                tracking-[3px]
                uppercase
                "
              >
                Start Your Fitness Journey
              </p>

              <h3
                className="
                text-4xl
                font-black
                leading-tight
                mt-4
                "
              >
                BUILD YOUR DREAM GYM
              </h3>

              <a
                href="https://wa.me/6285174285688"
                target="_blank"
                rel="noreferrer"

                className="
                mt-8

                inline-flex
                items-center
                justify-center

                w-full

                bg-black

                py-4

                rounded-2xl

                font-bold

                transition-all
                duration-300

                hover:scale-105
                hover:bg-zinc-900
                "
              >
                Chat Sekarang
              </a>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-zinc-800 my-12" />

        {/* BOTTOM */}
        <div
          className="
          flex
          flex-col
          md:flex-row

          items-center
          justify-between

          gap-6
          "
        >

          <p className="text-zinc-500 text-sm">
            © 2026 KSPORTS. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-zinc-500">

            <a
              href="#"
              className="
              hover:text-red-400
              transition
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
              hover:text-red-400
              transition
              "
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>

  );

}