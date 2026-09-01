import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "InterviewPath AI",
      trim: true,
    },

    siteDescription: {
      type: String,
      default: "AI-powered interview preparation platform",
      trim: true,
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    notifications: {
      newUser: {
        type: Boolean,
        default: true,
      },

      newReport: {
        type: Boolean,
        default: true,
      },

      newExperience: {
        type: Boolean,
        default: true,
      },
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const AdminSettings = mongoose.model(
  "AdminSettings",
  adminSettingsSchema
);

export default AdminSettings;