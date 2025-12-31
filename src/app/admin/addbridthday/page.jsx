"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AddBirthdayPopup from "@/component/addbridthdaypopup.jsx";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Image from "next/image";

export default function AddBirthday() {
  const [open, setOpen] = useState(false);
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBirthday, setEditBirthday] = useState(null);

  /* ================= FETCH BIRTHDAYS ================= */
  const fetchBirthdays = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/birthday");
      if (res.data.success) {
        setBirthdays(res.data.birthdays || []);
      }
    } catch (error) {
      console.error("Failed to fetch birthdays:", error);
      alert("Failed to load birthday products. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this birthday product?"))
      return;

    try {
      await axios.delete(`/api/birthday?id=${id}`);
      setBirthdays(birthdays.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete birthday product.");
    }
  };

  /* ================= SUCCESS HANDLER ================= */
  const handleSuccess = () => {
    setOpen(false);
    setEditBirthday(null);
    fetchBirthdays();
  };

  return (
    <section className="p-4 md:p-8 space-y-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Card */}
        <div className="bg-rose-100 rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold text-center mb-3">
            Birthday Products Management
          </h1>
          <p className="text-rose-900">
            You can add, edit, or delete birthday products from here.
          </p>
        </div>

        {/* Add Button */}
        <div className="bg-rose-100 rounded-xl p-6 flex flex-col items-center justify-center shadow">
          <span className="text-3xl font-bold text-black">+</span>
          <button
            onClick={() => {
              setOpen(true);
              setEditBirthday(null);
            }}
            className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xl font-semibold transition"
          >
            + Add New Birthday Product
          </button>
        </div>
      </div>

      {/* Popup */}
      <AddBirthdayPopup
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditBirthday(null);
        }}
        birthdayToEdit={editBirthday}
        onSuccess={handleSuccess}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-xl font-bold">
            All Birthday Products ({birthdays.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading birthday products...
            </div>
          ) : birthdays.length > 0 ? (
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
                {birthdays.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 border font-medium">
                      {item.birthdayTitle}
                    </td>
                    <td className="p-4 border">
                      Rs {item.birthdayPrice}
                    </td>
                    <td className="p-4 border text-center">
                      <div className="relative w-20 h-20 mx-auto">
                        <Image
                          src={item.imageBirthdayURL}
                          alt={item.birthdayTitle}
                          fill
                          className="object-cover rounded-lg shadow"
                          sizes="80px"
                        />
                      </div>
                    </td>
                    <td className="p-4 border text-center">
                      <button
                        onClick={() => {
                          setEditBirthday(item);
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
                        onClick={() => handleDelete(item._id)}
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
              No birthday products found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
