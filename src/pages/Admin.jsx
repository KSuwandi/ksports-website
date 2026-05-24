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

import { LogOut } from "lucide-react";

import { auth, db } from "../pages/firebase";

export default function Admin() {

  const navigate = useNavigate();

  /* =========================
     STATES
  ========================= */

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [specification, setSpecification] = useState("");

  const [images, setImages] = useState([]);

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =========================
     FORMAT PRICE
  ========================= */

  const formatPrice = (price) => {

    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }
    ).format(price);

  };

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
     IMAGE UPLOAD
  ========================= */

  const handleImageUpload = async (files) => {

    if (!files.length) return;

    if (files.length > 5) {

      alert("Maksimal upload 5 gambar");

      return;

    }

    try {

      setUploading(true);

      const uploadedImages = [];

      for (const file of files) {

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

        uploadedImages.push(data.secure_url);

      }

      setImages(uploadedImages);

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
  setCategory("");
  setSpecification("");
  setDescription("");

  setImages([]);

  setEditingId(null);

};

  /* =========================
     VALIDATE FORM
  ========================= */

  const validateForm = () => {

    if (
      !name ||
      !price ||
      !category ||
      !description ||
      !specification ||
      images.length === 0
    )
    {

      alert("Isi semua data");

      return false;

    }

    return true;

  };

  /* =========================
     ADD PRODUCT
  ========================= */

  const handleAddProduct = async () => {

    if (!validateForm()) return;

    try {

      setLoading(true);

      await addDoc(
      collection(db, "products"),
      {
        name,
        price: Number(price),
        category,
        description,
        specification,

          image: images[0],

          images: images,

          createdAt: new Date(),
        }
      );

      alert("Produk berhasil ditambahkan");

      resetForm();

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Gagal tambah produk");

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     DELETE PRODUCT
  ========================= */

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Yakin ingin menghapus produk?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, "products", id)
      );

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

    setCategory(product.category);

    setSpecification(
      product.specification || ""
    );
    setDescription(
    product.description || ""
    );

    setImages(product.images || []);

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

    if (!validateForm()) return;

    try {

      setLoading(true);

      await updateDoc(
      doc(db, "products", editingId),
      {
        name,
        price: Number(price),
        category,
        description,
        specification,

          image: images[0],

          images: images,

          updatedAt: new Date(),
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
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-black">
            Dashboard Admin
          </h1>

          <p className="text-zinc-400 mt-2">
            Kelola produk website KSPORTS
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="
          flex items-center gap-3
          px-6 py-4
          rounded-2xl
          bg-red-600
          hover:bg-red-700
          font-bold
          "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

      {/* FORM */}
      <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

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
            border border-zinc-700
            rounded-2xl
            px-5 py-4
            "
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Harga Produk"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="
            bg-black
            border border-zinc-700
            rounded-2xl
            px-5 py-4
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
            border border-zinc-700
            rounded-2xl
            px-5 py-4
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

            <option value="Accessories">
              Accessories
            </option>

          </select>

          {/* IMAGE */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(
                Array.from(e.target.files)
              )
            }
            className="
            bg-black
            border border-zinc-700
            rounded-2xl
            px-5 py-4
            "
          />

        </div>

        {/* DESCRIPTION */}
        <textarea
          rows="4"
          placeholder="Deskripsi Produk"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="
          mt-5
          w-full
          bg-black
          border border-zinc-700
          rounded-2xl
          px-5 py-4
          resize-none
          "
        />

        {/* SPECIFICATION */}
        <textarea
          rows="6"
          placeholder="Spesifikasi Produk"
          value={specification}
          onChange={(e) =>
            setSpecification(e.target.value)
          }
          className="
          mt-5
          w-full
          bg-black
          border border-zinc-700
          rounded-2xl
          px-5 py-4
          resize-none
          "
        />


        {/* IMAGE PREVIEW */}
        {images.length > 0 && (

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">

            {images.map((img, index) => (

              <img
                key={index}
                src={img}
                alt="Preview"
                className="
                h-40
                w-full
                object-cover
                rounded-2xl
                "
              />

            ))}

          </div>

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
          px-8 py-4
          rounded-2xl
          font-bold
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
            rounded-3xl
            overflow-hidden
            border border-zinc-800
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
                {formatPrice(product.price)}
              </p>

              <p className="text-zinc-400 mt-4 whitespace-pre-line">
                {product.specification}
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
