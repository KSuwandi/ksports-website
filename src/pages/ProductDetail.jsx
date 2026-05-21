import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

import { motion } from "framer-motion";

import { useCart } from "../context/CartContext";

export default function ProductDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");

  /* =========================
     FETCH PRODUCT
  ========================= */
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const docRef = doc(db, "products", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          const currentProduct = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          setProduct(currentProduct);

          setSelectedImage(currentProduct.image);

          /* =========================
             FETCH RELATED PRODUCTS
          ========================= */
          const querySnapshot = await getDocs(
            collection(db, "products")
          );

          const allProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const filtered = allProducts.filter(
            (item) =>
              item.category === currentProduct.category &&
              item.id !== currentProduct.id
          );

          setRelatedProducts(filtered.slice(0, 4));

        } else {

          setProduct(null);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  /* =========================
     LOADING
  ========================= */
  if (loading) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold">
          Loading...
        </h1>

      </div>

    );

  }

  /* =========================
     PRODUCT NOT FOUND
  ========================= */
  if (!product) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center">

        <h1 className="text-red-500 text-3xl font-bold">
          Produk Tidak Ditemukan
        </h1>

      </div>

    );

  }

  const whatsappMessage =
    `Halo KSPORTS, saya tertarik dengan produk ${product.name}`;

  return (

    <div className="bg-black min-h-screen text-white px-6 md:px-10 py-24">

      {/* =========================
          TOP BAR
      ========================= */}
      <div className="flex items-center justify-between mb-14">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate("/products")}
          className="
          group

          w-14
          h-14

          rounded-2xl

          bg-zinc-900
          border border-zinc-800

          hover:border-red-500/40
          hover:bg-zinc-800

          transition-all duration-300
          "
        >

          <span
            className="
            text-2xl
            font-bold

            group-hover:scale-110

            transition
            "
          >
            ×
          </span>

        </button>

        {/* TITLE */}
        <div className="text-right">

          <p className="text-zinc-500 text-xs tracking-[4px] uppercase">
            KSPORTS
          </p>

          <h2 className="text-lg font-bold">
            Product Detail
          </h2>

        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        max-w-7xl
        mx-auto

        grid
        md:grid-cols-2

        gap-14
        items-start
        "
      >

        {/* =========================
            IMAGE GALLERY
        ========================= */}
        <div>

          {/* MAIN IMAGE */}
          <div
            className="
            bg-white
            rounded-[32px]
            overflow-hidden
            shadow-2xl
            "
          >

            <img
              src={selectedImage}
              alt={product.name}
              className="
              w-full
              h-[650px]

              object-cover

              hover:scale-105
              transition-all
              duration-500
              "
            />

          </div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-4 gap-4 mt-5">

            {[
              product.image,
              product.image2,
              product.image3,
              product.image4,
            ]

              .filter(Boolean)

              .map((img, index) => (

                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`
                    overflow-hidden

                    rounded-2xl

                    border-2

                    transition-all
                    duration-300

                    ${
                      selectedImage === img
                        ? "border-red-500 scale-105"
                        : "border-zinc-800 hover:border-zinc-600"
                    }
                  `}
                >

                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="
                    w-full
                    h-24

                    object-cover
                    "
                  />

                </button>

              ))}

          </div>

        </div>

        {/* INFO */}
        <div>

          {/* CATEGORY */}
          <span
            className="
            inline-block

            bg-red-600

            text-sm
            font-semibold

            px-4 py-2

            rounded-full
            "
          >
            {product.category}
          </span>

          {/* PRODUCT NAME */}
          <h1
            className="
            text-4xl
            md:text-5xl

            font-black

            mt-6
            leading-tight
            "
          >
            {product.name}
          </h1>

          {/* BADGES */}
          <div className="flex flex-wrap gap-3 mt-6">

            <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold">
              Best Seller
            </span>

            <span className="bg-green-500 px-4 py-2 rounded-full text-sm font-bold">
              Gratis Ongkir
            </span>

            <span className="bg-zinc-800 px-4 py-2 rounded-full text-sm font-bold">
              Garansi Resmi
            </span>

          </div>

          {/* PRICE */}
          <p
            className="
            text-red-500
            text-4xl
            font-black

            mt-8
            "
          >
            {product.price}
          </p>

          {/* DESCRIPTION */}
          <p
            className="
            text-zinc-400

            mt-8
            leading-relaxed
            text-lg
            "
          >
            {product.description ||
              "Produk fitness premium berkualitas tinggi cocok untuk kebutuhan gym rumahan maupun commercial gym."}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            {/* ADD TO CART */}
            <button
              onClick={() => {

                addToCart(product);

                toast.success(
                  `${product.name} ditambahkan ke cart`
                );

              }}
              className="
              flex-1

              bg-gradient-to-r
              from-red-600
              to-red-500

              hover:from-red-500
              hover:to-red-400

              px-8
              py-5

              rounded-2xl

              font-black
              text-lg

              transition-all
              duration-300

              hover:scale-[1.02]

              shadow-lg
              shadow-red-500/20
              "
            >
              Add To Cart
            </button>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/6285174285688?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="
              flex-1

              bg-gradient-to-r
              from-green-500
              to-green-400

              hover:from-green-400
              hover:to-green-300

              px-8
              py-5

              rounded-2xl

              font-black
              text-lg

              transition-all
              duration-300

              hover:scale-[1.02]

              shadow-lg
              shadow-green-500/20

              flex
              items-center
              justify-center
              gap-3
              "
            >
              💬 Tanya via WhatsApp
            </a>

          </div>

          {/* SPECIFICATION */}
          <div className="mt-14 border-t border-zinc-800 pt-8">

            <h3 className="text-2xl font-bold mb-6">
              Spesifikasi
            </h3>

            <ul className="space-y-3 text-zinc-400">

              <li>✔ Produk Berkualitas Premium</li>

              <li>✔ Cocok Untuk Gym & Rumahan</li>

              <li>✔ Garansi Resmi</li>

              <li>✔ Gratis Ongkir Jabodetabek</li>

              <li>✔ Free Instalasi</li>

            </ul>

          </div>

        </div>

      </motion.div>

      {/* =========================
          RELATED PRODUCTS
      ========================= */}
      {relatedProducts.length > 0 && (

        <section className="max-w-7xl mx-auto mt-32">

          {/* TITLE */}
          <div className="mb-14">

            <p className="text-red-500 font-bold tracking-[4px] uppercase text-sm">
              KSPORTS
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              Related Products
            </h2>

          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {relatedProducts.map((item) => (

              <motion.div
                key={item.id}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="
                overflow-hidden

                rounded-[30px]

                bg-gradient-to-b
                from-zinc-900
                to-black

                border border-zinc-800

                hover:border-red-500/40

                transition-all
                duration-500
                "
              >

                {/* IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                    w-full
                    h-[280px]

                    object-cover

                    hover:scale-110

                    transition-all
                    duration-700
                    "
                  />

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3
                    className="
                    text-2xl
                    font-black
                    leading-tight
                    "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                    text-red-500
                    text-2xl
                    font-black

                    mt-4
                    "
                  >
                    {item.price}
                  </p>

                  {/* BUTTON */}
                  <Link
                    to={`/product/${item.id}`}
                    className="
                    mt-6

                    w-full

                    bg-red-600
                    hover:bg-red-500

                    transition-all
                    duration-300

                    py-4

                    rounded-2xl

                    font-bold

                    flex
                    items-center
                    justify-center
                    "
                  >
                    Lihat Produk
                  </Link>

                </div>

              </motion.div>

            ))}

          </div>

        </section>

      )}

      {/* =========================
          STICKY MOBILE CTA
      ========================= */}
      <div
        className="
        fixed
        bottom-0
        left-0
        right-0

        z-50

        md:hidden

        px-4
        pb-4
        "
      >

        <div
          className="
          backdrop-blur-2xl

          bg-black/70

          border
          border-white/10

          rounded-[28px]

          p-4

          shadow-[0_0_40px_rgba(255,0,0,0.15)]
          "
        >

          {/* TOP */}
          <div className="flex items-center justify-between mb-4">

            <div>

              <p className="text-zinc-400 text-xs">
                Harga Produk
              </p>

              <h3 className="text-2xl font-black text-red-500">
                {product.price}
              </h3>

            </div>

            <div
              className="
              px-3
              py-1

              rounded-full

              bg-red-500/10

              text-red-400

              text-xs
              font-bold
              "
            >
              Best Seller
            </div>

          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-3">

            {/* CART */}
            <button
              onClick={() => {

                addToCart(product);

                toast.success(
                  `${product.name} ditambahkan ke cart`
                );

              }}
              className="
              bg-gradient-to-r
              from-red-600
              to-red-500

              py-4

              rounded-2xl

              font-black
              text-sm

              transition-all
              duration-300

              active:scale-95
              "
            >
              Add To Cart
            </button>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/6285174285688?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="
              bg-gradient-to-r
              from-green-500
              to-green-400

              py-4

              rounded-2xl

              font-black
              text-sm

              flex
              items-center
              justify-center

              transition-all
              duration-300

              active:scale-95
              "
            >
              WhatsApp
            </a>

          </div>

        </div>

      </div>

    </div>

  );

}