import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: String,
    college: String,
    field: String,
    startYear: String,
    endYear: String,
    percentage: String,
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    proficiency: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    projectName: String,
    githubLink: String,
    liveDemoLink: String,
    startDate: String,
    endDate: String,
    techStack: String,
    description: String,
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    companyName: String,
    role: String,
    experienceType: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    paymentStatus: String,
    certificateLink: String,
    description: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // =========================
    // PROFILE
    // =========================

    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: String,
      default: "",
    },

    headline: {
      type: String,
      default: "Student",
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    skills: {
      type: [skillSchema],
      default: [],
    },

    projects: {
      type: [projectSchema],
      default: [],
    },

    experiences: {
      type: [experienceSchema],
      default: [],
    },

    codingProfiles: {
      github: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      leetcode: {
        type: String,
        default: "",
      },

      geeksforgeeks: {
        type: String,
        default: "",
      },
    },

    targetCompanies: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;