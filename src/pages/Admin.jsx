import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  LogOut,
} from "lucide-react";

import { auth, db } from "../pages/firebase";

export default function Admin() {

  const navigate = useNavigate();

  /* =========================
     STATES
  ========================= */

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");

  const [category, setCategory] = useState("");

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH PRODUCTS
  ========================= */

  const fetchProducts = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "products")
      );

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = async () => {

    await signOut(auth);

    navigate("/login");

  };

  /* =========================
     UPLOAD IMAGE CLOUDINARY
  ========================= */

  const handleImageUpload = async (file) => {

    if (!file) return;

    try {

      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "upload_preset",
        "ksports_upload"
      );

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpyhp3o66/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setImage(data.secure_url);

    } catch (error) {

      console.log(error);

      alert("Upload gambar gagal");

    } finally {

      setUploading(false);

    }

  };

  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {

    setName("");

    setPrice("");

    setImage("");

    setCategory("");

    setEditingId(null);

  };

  /* =========================
     ADD PRODUCT
  ========================= */

  const handleAddProduct = async () => {

    if (!name || !price || !image || !category) {

      alert("Isi semua data");

      return;

    }

    try {

      setLoading(true);

      await addDoc(
        collection(db, "products"),
        {
          name,
          price,
          image,
          category,
        }
      );

      alert("Produk berhasil ditambahkan");

      resetForm();

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Gagal menambahkan produk");

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     DELETE PRODUCT
  ========================= */

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Yakin ingin menghapus produk ini?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, "products", id)
      );

      alert("Produk berhasil dihapus");

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
     EDIT PRODUCT
  ========================= */

  const handleEdit = (product) => {

    setName(product.name);

    setPrice(product.price);

    setImage(product.image);

    setCategory(product.category);

    setEditingId(product.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  /* =========================
     UPDATE PRODUCT
  ========================= */

  const handleUpdate = async () => {

    if (!name || !price || !image || !category) {

      alert("Isi semua data");

      return;

    }

    try {

      setLoading(true);

      await updateDoc(
        doc(db, "products", editingId),
        {
          name,
          price,
          image,
          category,
        }
      );

      alert("Produk berhasil diupdate");

      resetForm();

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Gagal update produk");

    } finally {

      setLoading(false);

    }

  };

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

          <h1 className="text-5xl font-black">
            Dashboard Admin
          </h1>

          <p className="text-zinc-400 mt-2">
            Kelola produk website KSPORTS
          </p>

        </div>

        {/* LOGOUT */}
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
      <div
        className="
        bg-zinc-900
        border
        border-zinc-800

        rounded-3xl

        p-8
        mb-10
        "
      >

        <h2 className="text-3xl font-bold mb-6">

          {editingId
            ? "Edit Produk"
            : "Tambah Produk"}

        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Nama Produk"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
            bg-black
            border
            border-zinc-700

            rounded-2xl

            px-5
            py-4
            "
          />

          {/* PRICE */}
          <input
            type="text"
            placeholder="Harga Produk"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="
            bg-black
            border
            border-zinc-700

            rounded-2xl

            px-5
            py-4
            "
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
            bg-black
            border
            border-zinc-700

            rounded-2xl

            px-5
            py-4
            "
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

          {/* IMAGE */}
          <div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(
                  e.target.files[0]
                )
              }
              className="
              w-full

              bg-black
              border
              border-zinc-700

              rounded-2xl

              px-5
              py-4
              "
            />

            {uploading && (

              <p className="text-yellow-400 mt-3">
                Uploading image...
              </p>

            )}

          </div>

        </div>

        {/* PREVIEW */}
        {image && (

          <img
            src={image}
            alt="Preview"
            className="
            mt-6

            h-52
            w-full

            object-cover

            rounded-3xl
            "
          />

        )}

        {/* BUTTON */}
        <button
          onClick={
            editingId
              ? handleUpdate
              : handleAddProduct
          }
          disabled={loading || uploading}
          className="
          mt-6

          bg-red-600
          hover:bg-red-700

          px-8
          py-4

          rounded-2xl

          font-bold

          transition

          disabled:opacity-50
          "
        >

          {loading
            ? "Loading..."
            : editingId
            ? "Update Produk"
            : "Tambah Produk"}

        </button>

      </div>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-8">

        {products.map((product) => (

          <div
            key={product.id}
            className="
            bg-zinc-900
            border
            border-zinc-800

            rounded-3xl
            overflow-hidden
            "
          >

            <img
              src={product.image}
              alt={product.name}
              className="
              h-64
              w-full

              object-cover
              "
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="text-zinc-400 mt-2">
                {product.category}
              </p>

              <p className="text-red-500 text-xl mt-2">
                {product.price}
              </p>

              {/* EDIT */}
              <button
                onClick={() =>
                  handleEdit(product)
                }
                className="
                mt-5

                w-full

                bg-blue-600
                hover:bg-blue-700

                py-3

                rounded-2xl

                font-bold

                transition
                "
              >
                Edit Produk
              </button>

              {/* DELETE */}
              <button
                onClick={() =>
                  handleDelete(product.id)
                }
                className="
                mt-4

                w-full

                bg-red-600
                hover:bg-red-700

                py-3

                rounded-2xl

                font-bold

                transition
                "
              >
                Delete Produk
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}