import {
  Instagram,
  Music2,
  MessageCircle,
} from 'lucide-react'

export default function Footer() {

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

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-600/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 gap-14">

          {/* BRAND */}
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

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="
                w-14 h-14
                rounded-2xl
                bg-zinc-900
                border border-zinc-800
                hover:border-red-500/40
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                "
              >
                <Instagram />
              </a>

              <a
                href="#"
                className="
                w-14 h-14
                rounded-2xl
                bg-zinc-900
                border border-zinc-800
                hover:border-red-500/40
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                "
              >
                <Music2 />
              </a>

              <a
                href="https://wa.me/6285174285688"
                target="_blank"
                rel="noreferrer"
                className="
                w-14 h-14
                rounded-2xl
                bg-zinc-900
                border border-zinc-800
                hover:border-red-500/40
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                "
              >
                <MessageCircle />
              </a>

            </div>

          </div>

          {/* NAVIGATION */}
          <div>

            <h3 className="text-2xl font-black mb-8">
              Navigation
            </h3>

            <div className="flex flex-col gap-5">

              <a href="/" className="text-zinc-400 hover:text-red-400">
                Home
              </a>

              <a href="/#produk" className="text-zinc-400 hover:text-red-400">
                Products
              </a>

              <a href="/about" className="text-zinc-400 hover:text-red-400">
                About
              </a>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-2xl font-black mb-8">
              Contact
            </h3>

            <div className="space-y-5 text-zinc-400">

              <p>📍 Glodok Plaza, Jakarta</p>
              <p>📞 +62 851-7428-5688</p>
              <p>✉️ ksportsfitness@gmail.com</p>
              <p>🚚 Free Ongkir JABODETABEK</p>

            </div>

          </div>

          {/* CTA */}
          <div>

            <div
              className="
              bg-gradient-to-br
              from-red-600
              to-red-500
              rounded-[32px]
              p-8
              "
            >

              <p className="text-sm font-bold tracking-[3px] uppercase">
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
                transition-all duration-300
                hover:scale-105
                "
              >
                Chat Sekarang
              </a>

            </div>

          </div>

        </div>

        <div className="w-full h-[1px] bg-zinc-800 my-12" />

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
              className="hover:text-red-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-red-400 transition"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>

  )

}