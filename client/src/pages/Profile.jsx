import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/axios";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import Education from "../components/profile/Education";
import Skills from "../components/profile/Skills";
import Projects from "../components/profile/Projects";
import Experience from "../components/profile/Experience";
import CodingProfiles from "../components/profile/CodingProfiles";
import ResumeSection from "../components/profile/ResumeSection";
import TargetCompanies from "../components/profile/TargetCompanies";

import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

const emptyEducation = {
  degree: "",
  college: "",
  field: "",
  startYear: "",
  endYear: "",
  percentage: "",
};

function Profile() {
  const { updateUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    profileImage: "",
    profileImageFile: null,

    phone: "",
    city: "",
    state: "",
    dateOfBirth: "",
    headline: "",

    education: [{ ...emptyEducation }],

    skills: [],
    projects: [],
    experiences: [],

    codingProfiles: {
      github: "",
      linkedin: "",
      leetcode: "",
      geeksforgeeks: "",
    },

    targetCompanies: "",
  });


  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");

        if (res.data.success) {
          const data = res.data.profile;

          setProfile({
            fullName:
              data.fullName || "",

            email:
              data.email || "",

            profileImage:
              data.profileImage || "",

            profileImageFile:
              null,

            phone:
              data.phone || "",

            city:
              data.city || "",

            state:
              data.state || "",

            dateOfBirth:
              data.dateOfBirth || "",

            headline:
              data.headline || "",

            education:
              data.education?.length > 0
                ? data.education
                : [{ ...emptyEducation }],

            skills:
              data.skills || [],

            projects:
              data.projects || [],

            experiences:
              data.experiences || [],

            codingProfiles: {
              github:
                data.codingProfiles?.github || "",

              linkedin:
                data.codingProfiles?.linkedin || "",

              leetcode:
                data.codingProfiles?.leetcode || "",

              geeksforgeeks:
                data.codingProfiles
                  ?.geeksforgeeks || "",
            },

            targetCompanies:
              data.targetCompanies || "",
          });
        }

      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load profile"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  // =========================
  // UPLOAD PROFILE IMAGE
  // =========================

  const handleImageUpload = async () => {
    if (!profile.profileImageFile) {
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();

      formData.append(
        "profileImage",
        profile.profileImageFile
      );

      const res = await api.post(
        "/profile/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (res.data.success) {

        /*
          Backend returns:
          /uploads/profiles/image.jpg

          Convert it to full URL.
        */

        const imageUrl =
          `${import.meta.env.VITE_API_URL}${res.data.profileImage}`;

        setProfile((prev) => ({
          ...prev,
          profileImage: imageUrl,
          profileImageFile: null,
        }));

        updateUser({
          profileImage: imageUrl,
        });

        toast.success(
          "Profile image updated successfully!"
        );
      }

    } catch (error) {

      console.error(
        "Image upload error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to upload profile image"
      );

    } finally {
      setUploadingImage(false);
    }
  };


  // =========================
  // SAVE PROFILE
  // =========================

  const handleSaveProfile = async () => {
    try {
      setSaving(true);

      /*
        Upload image first
        if user selected a new image
      */

      if (profile.profileImageFile) {
        await handleImageUpload();
      }

      const {
        profileImageFile,
        ...profileData
      } = profile;

      const res = await api.put(
        "/profile",
        profileData
      );

      if (res.data.success) {

        updateUser({
          fullName:
            res.data.profile.fullName,

          email:
            res.data.profile.email,

          profileImage:
            res.data.profile.profileImage,
        });

        setProfile((prev) => ({
          ...prev,
          profileImage:
            res.data.profile.profileImage ||
            prev.profileImage,
          profileImageFile: null,
        }));

        toast.success(
          "Profile saved successfully!"
        );
      }

    } catch (error) {

      console.error(
        "Failed to save profile:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to save profile"
      );

    } finally {
      setSaving(false);
    }
  };


  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your personal information, education, skills, projects and career preferences."
    >

      {loading ? (

        <div className="min-h-[60vh] flex items-center justify-center">
          Loading profile...
        </div>

      ) : (

        <div className="py-4">

          <div className="max-w-7xl mx-auto">

            {/* PROFILE HEADER */}

            <ProfileHeader
              profile={profile}
              setProfile={setProfile}
            />


            {/* IMAGE UPLOAD STATUS */}

            {profile.profileImageFile && (

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <p className="text-sm text-blue-700">
                  New profile photo selected.
                  Click Save Profile to upload it.
                </p>

                {uploadingImage && (
                  <span className="text-sm text-blue-600">
                    Uploading image...
                  </span>
                )}

              </div>
            )}


            <div className="grid lg:grid-cols-2 gap-6 mt-8">

              <PersonalInfo
                profile={profile}
                setProfile={setProfile}
              />

              <Education
                education={profile.education}
                setProfile={setProfile}
              />

              <Skills
                skills={profile.skills}
                setProfile={setProfile}
              />

              <Projects
                projects={profile.projects}
                setProfile={setProfile}
              />

              <Experience
                experiences={profile.experiences}
                setProfile={setProfile}
              />

              <CodingProfiles
                codingProfiles={
                  profile.codingProfiles
                }
                setProfile={setProfile}
              />

              <ResumeSection />

              <TargetCompanies
                targetCompanies={
                  profile.targetCompanies
                }
                setProfile={setProfile}
              />

            </div>


            {/* SAVE BUTTON */}

            <div className="flex justify-end mt-8">

              <button
                onClick={handleSaveProfile}
                disabled={
                  saving || uploadingImage
                }
                className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-8 py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {uploadingImage
                  ? "Uploading Photo..."
                  : saving
                  ? "Saving..."
                  : "Save Profile"}

              </button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default Profile;