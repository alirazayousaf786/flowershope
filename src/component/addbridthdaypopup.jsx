"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

export default function AddBirthdayPopup({
  isOpen,
  onClose,
  birthdayToEdit,
  onSuccess,
}) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [birthdayTitle, setBirthdayTitle] = useState("");
  const [birthdayPrice, setBirthdayPrice] = useState("");
  const [promotionPercentage, setPromotionPercentage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ========== Prefill on Edit ========== */
  useEffect(() => {
    if (birthdayToEdit) {
      setBirthdayTitle(birthdayToEdit.birthdayTitle || "");
      setBirthdayPrice(birthdayToEdit.birthdayPrice || "");
      setPromotionPercentage(birthdayToEdit.promotionPercentage || "");
      setFile(null);
    } else {
      setBirthdayTitle("");
      setBirthdayPrice("");
      setPromotionPercentage("");
      setFile(null);
    }
  }, [birthdayToEdit]);

  /* ========== Drag & Drop ========== */
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    } else {
      toast.warn("Please upload a valid image file");
    }
  }, []);

  /* ========== Submit ========== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!birthdayTitle.trim() || !birthdayPrice) {
      toast.warn("Title and price are required!");
      return;
    }

    // ADD ke liye image zaroori
    if (!birthdayToEdit && !file) {
      toast.warn("Please upload an image for new birthday product!");
      return;
    }

    const formData = new FormData();
    formData.append("birthdayTitle", birthdayTitle.trim());
    formData.append("birthdayPrice", birthdayPrice);

    if (promotionPercentage) {
      formData.append("promotionPercentage", promotionPercentage);
    }
    if (file) {
      formData.append("imageBirthday", file);
    }
    if (birthdayToEdit) {
      formData.append("id", birthdayToEdit._id);
    }

    try {
      setLoading(true);

      let res;
      if (birthdayToEdit) {
        res = await axios.put("/api/birthday", formData);
        toast.success("🎉 Birthday product updated successfully!");
      } else {
        res = await axios.post("/api/birthday", formData);
        toast.success("🎂 Birthday product added successfully!");
      }

      onSuccess(res.data.birthday);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      const msg =
        err.response?.data?.message || "Upload failed! Please try again.";
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl relative w-full max-w-md mx-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 z-10 transition"
        >
          <FaTimes size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-rose-800">
            {birthdayToEdit ? "Edit Birthday Product" : "Add New Birthday Product"}
          </h2>

          {/* Image Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-4 border-dashed rounded-xl p-8 text-center transition mb-6 ${
              dragOver
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            {file ? (
              <p className="text-green-700 font-semibold text-lg">
                {file.name}
              </p>
            ) : birthdayToEdit?.imageBirthdayURL ? (
              <div>
                <div className="relative mx-auto w-32 h-32 mb-3">
                  <Image
                    src={birthdayToEdit.imageBirthdayURL}
                    alt="Current"
                    fill
                    className="object-cover rounded-xl shadow-md"
                    sizes="128px"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Current image (upload new to change)
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 text-lg">
                  Drag & Drop Image Here
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  or click to browse
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) setFile(e.target.files[0]);
              }}
              className="mt-4 block mx-auto text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700 cursor-pointer"
            />
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Birthday Product Title"
              value={birthdayTitle}
              onChange={(e) => setBirthdayTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
              required
            />

            <input
              type="number"
              placeholder="Price (Rs)"
              value={birthdayPrice}
              onChange={(e) => setBirthdayPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
              min="0"
              required
            />

            <input
              type="number"
              placeholder="Promotion % (optional)"
              value={promotionPercentage}
              onChange={(e) => setPromotionPercentage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
              min="0"
              max="100"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-lg hover:from-rose-700 hover:to-pink-700 disabled:opacity-70 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading
                ? "Processing..."
                : birthdayToEdit
                ? "Update Birthday Product"
                : "Add Birthday Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
