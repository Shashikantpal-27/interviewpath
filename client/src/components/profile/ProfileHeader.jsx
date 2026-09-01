import { useRef } from "react";
import { FaCamera } from "react-icons/fa";

function ProfileHeader({
  profile,
  setProfile,
}) {
  const fileInputRef = useRef(null);

  const fullName =
    profile?.fullName || "Student";

  const email =
    profile?.email || "";

  const headline =
    profile?.headline ||
    "Aspiring Software Developer";

  // =========================
  // PROFILE IMAGE
  // =========================

  const profileImage =
    profile?.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=670D2F&color=fff&size=256`;

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Only image files
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      profileImage: imageUrl,
      profileImageFile: file,
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* ================= PROFILE INFO ================= */}

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">

          {/* PROFILE IMAGE */}

          <div className="relative">

            <img
              src={profileImage}
              alt={fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-[var(--primary)] shadow-md"
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center border-4 border-white hover:bg-[var(--accent)] transition"
              title="Change profile photo"
            >
              <FaCamera />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

          </div>


          {/* USER DETAILS */}

          <div className="text-center sm:text-left">

            <h1 className="text-3xl font-bold text-[var(--text)]">
              {fullName}
            </h1>

            <p className="text-gray-500 mt-1">
              {headline}
            </p>

            {email && (
              <p className="text-gray-500 mt-1">
                {email}
              </p>
            )}

          </div>

        </div>


        {/* CHANGE PHOTO BUTTON */}

        <button
          type="button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          <FaCamera />
          Change Photo
        </button>

      </div>

    </div>
  );
}

export default ProfileHeader;