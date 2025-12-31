"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddFlowerPopup({
  isOpen,
  onClose,
  flowerToEdit,
  onSuccess,
}) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [flowerTitle, setFlowerTitle] = useState("");
  const [flowerPrice, setFlowerPrice] = useState("");
  const [promotionPercentage, setPromotionPercentage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ========== Prefill on Edit ========== */
  useEffect(() => {
    if (flowerToEdit) {
      setFlowerTitle(flowerToEdit.flowerTitle || "");
      setFlowerPrice(flowerToEdit.flowerPrice || "");
      setPromotionPercentage(flowerToEdit.promotionPercentage || "");
      setFile(null); // New file not required for edit
    } else {
      // Add mode - reset all
      setFlowerTitle("");
      setFlowerPrice("");
      setPromotionPercentage("");
      setFile(null);
    }
  }, [flowerToEdit]);

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

    // Validation
    if (!flowerTitle.trim() || !flowerPrice) {
      toast.warn("Title and price are required!");
      return;
    }

    // For ADD: image is mandatory
    // For EDIT: image optional (keep old if no new)
    if (!flowerToEdit && !file) {
      toast.warn("Please upload an image for new flower!");
      return;
    }

    const formData = new FormData();
    formData.append("flowerTitle", flowerTitle.trim());
    formData.append("flowerPrice", flowerPrice);
    if (promotionPercentage) {
      formData.append("promotionPercentage", promotionPercentage);
    }
    if (file) {
      formData.append("imageFlower", file);
    }
    if (flowerToEdit) {
      formData.append("id", flowerToEdit._id);
    }

    try {
      setLoading(true);

      let res;
      if (flowerToEdit) {
        // UPDATE - PUT
        res = await axios.put("/api/flower", formData);
        toast.success("🌸 Flower updated successfully!");
      } else {
        // CREATE - POST
        res = await axios.post("/api/flower", formData);
        toast.success("🌸 Flower added successfully!");
      }

      // Pass updated/new flower to parent for list update
      onSuccess(res.data.flower);

      // Reset form & close
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      const msg = err.response?.data?.message || "Upload failed! Please try again.";
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
            {flowerToEdit ? "Edit Flower" : "Add New Flower"}
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
              <div>
                <p className="text-green-700 font-semibold text-lg">{file.name}</p>
              </div>
            ) : flowerToEdit?.imageFlowerURL ? (
              <div>
                <img
                  src={flowerToEdit.imageFlowerURL}
                  alt="Current"
                  className="mx-auto w-32 h-32 object-cover rounded-xl shadow-md mb-3"
                />
                <p className="text-sm text-gray-600">Current image (upload new to change)</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 text-lg">
                  Drag & Drop Image Here
                </p>
                <p className="text-sm text-gray-500 mt-2">or click to browse</p>
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
              placeholder="Flower Title (e.g. Red Rose Bouquet)"
              value={flowerTitle}
              onChange={(e) => setFlowerTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
              required
            />

            <input
              type="number"
              placeholder="Price (Rs)"
              value={flowerPrice}
              onChange={(e) => setFlowerPrice(e.target.value)}
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
              {loading ? (
                <span>Processing...</span>
              ) : flowerToEdit ? (
                "Update Flower"
              ) : (
                "Add Flower"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}