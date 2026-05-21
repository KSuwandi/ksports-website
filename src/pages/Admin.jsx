import { useEffect, useState } from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../pages/firebase";
import { useNavigate } from "react-router-dom";

import {
  LogOut,
} from "lucide-react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../pages/firebase'

export default function Admin() {

const navigate = useNavigate();

const handleLogout = async () => {

  await signOut(auth);

  navigate("/login");

};


  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])

  const [editingId, setEditingId] = useState(null)

  // GET PRODUCTS
  const fetchProducts = async () => {

    const querySnapshot = await getDocs(
      collection(db, 'products')
    )

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // ADD PRODUCT
  const handleAddProduct = async () => {

    if (!name || !price || !image) {
      alert('Isi semua data')
      return
    }

    try {

      await addDoc(
        collection(db, 'products'),
        {
          name,
          price,
          image: `/products/${image}`,
          category,
        }
      )

      alert('Produk berhasil ditambahkan')

      setName('')
      setPrice('')
      setImage('')

      fetchProducts()

    } catch (error) {

      console.log(error)

    }
  }

  
  // DELETE PRODUCT
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Yakin ingin menghapus produk ini?'
    )

    if (!confirmDelete) return

    try {

      await deleteDoc(
        doc(db, 'products', id)
      )

      alert('Produk berhasil dihapus')

      fetchProducts()

    } catch (error) {

      console.log(error)

    }
  }

  // EDIT PRODUCT
  const handleEdit = (product) => {

    setName(product.name)

    setPrice(product.price)

    const imageName = product.image.replace(
      '/products/',
      ''
    )

    setImage(imageName)

    setEditingId(product.id)
  }

  // UPDATE PRODUCT
  const handleUpdate = async () => {

    try {

      await updateDoc(
        doc(db, 'products', editingId),
        {
          name,
          price,
          image: `/products/${image}`,
          category,
        }
      )

      alert('Produk berhasil diupdate')

      setName('')
      setPrice('')
      setImage('')
      setCategory('')
      setEditingId(null)
      fetchProducts()

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}
<div
  className="
  flex
  flex-col
  md:flex-row

  md:items-center
  md:justify-between

  gap-5

  mb-10
  "
>

  <div>

    <h1
      className="
      text-5xl
      font-black
      "
    >
      Dashboard Admin
    </h1>

    <p className="text-zinc-400 mt-2">
      Kelola produk website KSPORTS
    </p>

  </div>

  {/* LOGOUT BUTTON */}
  <button
    onClick={handleLogout}
    className="
    flex
    items-center
    gap-3

    px-6
    py-4

    rounded-2xl

    bg-gradient-to-r
    from-red-600
    to-red-500

    hover:scale-105

    transition-all
    duration-300

    font-bold

    shadow-[0_0_30px_rgba(239,68,68,0.35)]
    "
  >

    <LogOut size={20} />

    Logout

  </button>

</div>

      {/* FORM */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-6">
          {editingId
            ? 'Edit Produk'
            : 'Tambah Produk'}
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="text"
            placeholder="Nama Produk"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Harga Produk"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Nama gambar contoh: treadmill.webp"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <select
            value={category}
            onChange={(e) =>
                setCategory(e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
            >

            <option value="">
                Pilih Category
            </option>

            <option value="Cardio">
                Cardio
            </option>

            <option value="Strength">
                Strength
            </option>

            <option value="Commercial">
                Commercial
            </option>

            </select>

        </div>

        <button
          onClick={
            editingId
              ? handleUpdate
              : handleAddProduct
          }
          className="mt-6 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold"
        >
          {editingId
            ? 'Update Produk'
            : 'Tambah Produk'}
        </button>

      </div>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-8">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
          >

            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="text-red-500 text-xl mt-2">
                {product.price}
              </p>

              <button
                onClick={() => handleEdit(product)}
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl font-bold transition"
              >
                Edit Produk
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 py-3 rounded-2xl font-bold transition"
              >
                Delete Produk
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}