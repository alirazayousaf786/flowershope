"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AddStagePopup from "@/component/addstagepopup.jsx";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Image from "next/image";

export default function AddStage() {
  const [open, setOpen] = useState(false);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStage, setEditStage] = useState(null);

  /* ================= FETCH STAGES ================= */
  const fetchStages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stage");

      if (res.data.success) {
        // API response mein key "stage" hai (singular), "stages" nahi
        setStages(res.data.stage || []);
      } else {
        console.error("API success false:", res.data);
        alert("Failed to load stages.");
      }
    } catch (error) {
      console.error("Failed to fetch stages:", error);
      alert("Failed to load stages. Check console or server.");
      setStages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this stage? This action cannot be undone.")) return;

    try {
      await axios.delete(`/api/stage?id=${id}`);
      // Remove from UI instantly
      setStages(stages.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete stage. Please try again.");
    }
  };

  /* ================= SUCCESS HANDLER (after add/edit) ================= */
  const handleSuccess = () => {
    setOpen(false);
    setEditStage(null);
    fetchStages(); // Refresh list
  };

  /* ================= PRICE FORMATTER ================= */
  const formatPrice = (price) => {
    return Number(price).toLocaleString("en-US");
  };

  return (
    <section className="p-4 md:p-8 space-y-10 min-h-screen bg-gray-50">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Card */}
        <div className="bg-rose-100 rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-rose-800 mb-4 text-center">
            Stage Management
          </h1>
          <p className="text-rose-900 text-center text-lg">
            Add, edit, or remove stage designs. Changes reflect instantly on the website.
          </p>
        </div>

        {/* Add Button */}
        <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl p-8 flex flex-col items-center justify-center shadow-lg text-white">
          <span className="text-5xl font-bold mb-4">+</span>
          <button
            onClick={() => {
              setEditStage(null);
              setOpen(true);
            }}
            className="px-8 py-4 bg-white text-rose-700 hover:bg-gray-100 rounded-xl text-xl font-bold transition transform hover:scale-105 shadow-md"
          >
            + Add New Stage
          </button>
        </div>
      </div>

      {/* Popup for Add/Edit */}
      <AddStagePopup
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditStage(null);
        }}
        stageToEdit={editStage}
        onSuccess={handleSuccess}
      />

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-rose-600 text-white p-6">
          <h2 className="text-2xl font-bold">
            All Stages ({stages.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-rose-600"></div>
              <p className="mt-4 text-gray-600 text-lg">Loading stages...</p>
            </div>
          ) : stages.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-xl">No stages found.</p>
              <p className="mt-2">Click </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 uppercase tracking-wider">
                    Promotion
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-rose-900 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-rose-900 uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-rose-900 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stages.map((item) => (
                  <tr key={item._id} className="hover:bg-rose-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {item.stageTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      Rs {formatPrice(item.stagePrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.promotionPercentage > 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          {item.promotionPercentage}% OFF
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">No discount</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={item.imageStageURL || "/placeholder.jpg"}
                          alt={item.stageTitle}
                          fill
                          className="object-cover hover:scale-110 transition duration-300"
                          sizes="96px"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setEditStage(item);
                          setOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition shadow"
                        title="Edit Stage"
                      >
                        <MdEdit size={22} />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition shadow"
                        title="Delete Stage"
                      >
                        <AiFillDelete size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}