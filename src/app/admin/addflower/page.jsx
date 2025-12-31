"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AddFlowerPopup from "@/component/addfloerpopup.jsx";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function AddFlower() {
  const [open, setOpen] = useState(false);
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [editFlower, setEditFlower] = useState(null);

  /* ================= FETCH FLOWERS ================= */
  const fetchFlowers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/flower");
      if (res.data.success) {
        setFlowers(res.data.flowers || []);
      }
    } catch (error) {
      console.error("Failed to fetch flowers:", error);
      alert("Failed to load flowers. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this flower?")) return;

    try {
      // Correct way: send ID as query parameter
      await axios.delete(`/api/flower?id=${id}`);
      
      // Optimistic update
      setFlowers(flowers.filter((f) => f._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete flower.");
      // Optional: refetch on error
      // fetchFlowers();
    }
  };

  /* ================= SUCCESS HANDLER (Add/Edit) ================= */
  const handleSuccess = () => {
    setOpen(false);
    setEditFlower(null);
    fetchFlowers(); // Always refetch fresh data from server
  };

  return (
    <section className="p-4 md:p-8 space-y-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Card */}
        <div className="bg-rose-100 rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold text-center mb-3">
            Flower Management
          </h1>
          <p className="text-rose-900">
            You can add, edit or delete flowers from here.
          </p>
        </div>

        {/* Add Flower Button */}
        <div className="bg-rose-100 rounded-xl p-6 flex flex-col items-center justify-center shadow">
         <span className="text-3xl font-bold text-black">+</span>
          <button
            onClick={() => {
              setOpen(true);
              setEditFlower(null);
            }}
            className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xl font-semibold transition"
          >
            + Add New Flower
          </button>
        </div>
      </div>

      {/* Popup */}
      <AddFlowerPopup
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditFlower(null);
        }}
        flowerToEdit={editFlower}
        onSuccess={handleSuccess} // Refetch after add/edit
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-xl font-bold">All Flowers ({flowers.length})</h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading flowers...</div>
          ) : flowers.length > 0 ? (
            <table className="min-w-full">
              <thead className="bg-rose-100">
                <tr>
                  <th className="p-4 text-left border">Title</th>
                  <th className="p-4 text-left border">Price</th>
                  <th className="p-4 text-center border">Image</th>
                  <th className="p-4 text-center border">Edit</th>
                  <th className="p-4 text-center border">Delete</th>
                </tr>
              </thead>
              <tbody>
                {flowers.map((flower) => (
                  <tr key={flower._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 border font-medium">{flower.flowerTitle}</td>
                    <td className="p-4 border">Rs {flower.flowerPrice}</td>
                    <td className="p-4 border text-center">
                      <img
                        src={flower.imageFlowerURL}
                        alt={flower.flowerTitle}
                        className="w-20 h-20 object-cover rounded-lg mx-auto shadow"
                      />
                    </td>
                    <td className="p-4 border text-center">
                      <button
                        onClick={() => {
                          setEditFlower(flower);
                          setOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                        title="Edit"
                      >
                        <MdEdit size={20} />
                      </button>
                    </td>
                    <td className="p-4 border text-center">
                      <button
                        onClick={() => handleDelete(flower._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                        title="Delete"
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No flowers found. Click
            </div>
          )}
        </div>
      </div>
    </section>
  );
}