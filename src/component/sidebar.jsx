"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Add Flower", path: "/admin/addflower" },
    { name: "Add Mesairi", path: "/admin/addmesairi" },
    { name: "Add Cake", path: "/admin/addcake" },
    { name: "Add Stage", path: "/admin/addstage" },
    { name: "Add Car", path: "/admin/addcar" },
    { name: "Add Jewelry", path: "/admin/addjewelry" },
    { name: "Add Bridthday", path: "/admin/addbridthday" },
    { name: "Add Discount", path: "/admin/promotion" },
  ];

  const buildProject = async () => {
    if (!confirm("Are you sure you want to build & restart the project?")) return;

    const res = await fetch("/api/admin/build", { method: "POST" });
    const data = await res.json();

    if (data.success) {
      alert("✅ Build completed successfully!");
    } else {
      alert("❌ Build failed. Check server logs.");
    }
  };

  return (
    <aside className="w-64 bg-rose-100 text-black min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-lg ${
              pathname === item.path
                ? "bg-rose-700 text-white"
                : "text-black hover:bg-rose-800 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Build Button */}
      <button
        onClick={buildProject}
        className="mt-10 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        🚀 Build Project
      </button>
    </aside>
  );
}
