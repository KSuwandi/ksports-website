import { useEffect, useState } from 'react'

import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'

import { Link } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import { motion } from 'framer-motion'

export default function Products() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setProducts(data)

      }
    )

    return () => unsubscribe()

  }, [])

  return (

    <div className="bg-black text-white min-h-screen overflow-hidden">

      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">

        {/* BG */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/20 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[160px]" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">

          <div
            className="
            inline-flex
            items-center
            gap-2
            px-6
            py-3
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
    ALL
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
    PRODUCTS
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
    {' '}menyediakan berbagai alat fitness premium dengan{' '}
  </span>

  <span
    className="
    text-red-400
    font-semibold
    drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
    "
  >
    KUALITAS TERBAIK{' '}
  </span>

  <span className="text-zinc-400">
    untuk kebutuhan
  </span>

  <span className="text-white font-medium">
    {' '}GYM RUMAHAN
  </span>

  <span className="text-zinc-400">
    {' '}hingga{' '}
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
    {' '}dengan produk terpercaya dan harga terbaik.
  </span>

</motion.p>

        </div>

      </section>

      {/* FILTER */}
      <section className="px-6">

        <div className="max-w-7xl mx-auto">

          <div className="flex justify-center gap-4 mb-10 flex-wrap">

            {[
              'All',
              'Cardio',
              'Strength',
              'Commercial',
            ].map((category) => (

              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-3 rounded-2xl font-bold transition-all duration-300

                  ${
                    selectedCategory === category
                      ? 'bg-red-600 shadow-lg shadow-red-500/30'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }
                `}
              >
                {category}
              </button>

            ))}

          </div>

          <div className="max-w-xl mx-auto">

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

        </div>

      </section>

      {/* PRODUCT GRID */}
      <section className="px-6 py-24">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {products
              .filter((product) => {

                const matchSearch =
                  product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

                const matchCategory =
                  selectedCategory === 'All'
                    ? true
                    : product.category === selectedCategory

                return matchSearch && matchCategory

              })

              .map((product) => (

                <motion.div
                  key={product.id}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.35 }}
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
                    transition-all duration-500
                    "
                  >

                    <div className="relative overflow-hidden">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                        h-[320px]
                        w-full
                        object-cover
                        scale-105
                        group-hover:scale-125
                        transition-all duration-700
                        "
                      />

                    </div>

                    <div className="p-7">

                      <h3
                        className="
                        text-[24px]
                        leading-tight
                        font-black
                        tracking-tight
                        text-white
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
                        {product.price}
                      </p>

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
                          transition-all duration-300
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

        </div>

      </section>

      <Footer />
      
      

    </div>

  )

}
