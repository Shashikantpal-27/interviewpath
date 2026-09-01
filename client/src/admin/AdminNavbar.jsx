import React from "react";

function AdminNavbar() {
  return (
    <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Admin Panel
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button className="text-xl hover:scale-110 transition">
          🔔
        </button>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-red-800 text-white flex items-center justify-center font-semibold">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;