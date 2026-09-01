import React, { useEffect, useState } from "react";

import {
  getAllRoadmaps,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
  getAllRoles,
} from "../api/adminApi.js";


function RoadmapManagement() {

  const [roadmaps, setRoadmaps] = useState([]);
  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roleId, setRoleId] = useState("");
  const [level, setLevel] = useState("beginner");
  const [duration, setDuration] = useState("");
  const [topics, setTopics] = useState("");
  const [resources, setResources] = useState("");
  const [status, setStatus] = useState("draft");

  const [editingRoadmap, setEditingRoadmap] =
    useState(null);


  // =================================
  // FETCH ROLES
  // =================================

  const fetchRoles = async () => {

    try {

      const data = await getAllRoles();

      setRoles(data.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch roles:",
        error
      );

    }
  };


  // =================================
  // FETCH ROADMAPS
  // =================================

  const fetchRoadmaps = async () => {

    try {

      setLoading(true);

      const data = await getAllRoadmaps();

      setRoadmaps(data.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch roadmaps:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =================================
  // LOAD DATA
  // =================================

  useEffect(() => {

    fetchRoles();
    fetchRoadmaps();

  }, []);


  // =================================
  // RESET FORM
  // =================================

  const resetForm = () => {

    setTitle("");
    setDescription("");
    setRoleId("");
    setLevel("beginner");
    setDuration("");
    setTopics("");
    setResources("");
    setStatus("draft");

    setEditingRoadmap(null);
  };


  // =================================
  // CREATE / UPDATE
  // =================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const roadmapData = {

        title,

        description,

        roleId,

        level,

        duration,

        topics: topics
          .split(",")
          .map((topic) => topic.trim())
          .filter(Boolean),

        resources: resources
          .split(",")
          .map((resource) => resource.trim())
          .filter(Boolean),

        status,

      };


      // =============================
      // UPDATE
      // =============================

      if (editingRoadmap) {

        await updateRoadmap(
          editingRoadmap._id,
          roadmapData
        );

        alert(
          "Roadmap updated successfully"
        );

      }

      // =============================
      // CREATE
      // =============================

      else {

        await createRoadmap(
          roadmapData
        );

        alert(
          "Roadmap created successfully"
        );

      }


      resetForm();

      fetchRoadmaps();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  // =================================
  // EDIT
  // =================================

  const handleEdit = (roadmap) => {

    setEditingRoadmap(roadmap);

    setTitle(
      roadmap.title || ""
    );

    setDescription(
      roadmap.description || ""
    );

    setRoleId(
      roadmap.roleId?._id ||
      roadmap.roleId ||
      ""
    );

    setLevel(
      roadmap.level || "beginner"
    );

    setDuration(
      roadmap.duration || ""
    );

    setTopics(
      roadmap.topics?.join(", ") || ""
    );

    setResources(
      roadmap.resources?.join(", ") || ""
    );

    setStatus(
      roadmap.status || "draft"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =================================
  // DELETE
  // =================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this roadmap?"
      );

    if (!confirmDelete) return;


    try {

      await deleteRoadmap(id);

      alert(
        "Roadmap deleted successfully"
      );

      fetchRoadmaps();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  return (

    <div>

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Roadmap Management
        </h1>

        <p className="text-gray-500 mt-1">
          Create and manage learning roadmaps.
        </p>

      </div>


      {/* ================================= */}
      {/* CREATE / EDIT FORM */}
      {/* ================================= */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm mb-8"
      >

        <h2 className="text-xl font-semibold mb-6">

          {editingRoadmap
            ? "Edit Roadmap"
            : "Create Roadmap"}

        </h2>


        {/* TITLE */}

        <input
          type="text"
          placeholder="Roadmap title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />


        {/* ROLE */}

        <select
          value={roleId}
          onChange={(e) =>
            setRoleId(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        >

          <option value="">
            Select Role
          </option>

          {roles.map((role) => (

            <option
              key={role._id}
              value={role._id}
            >
              {role.title}
            </option>

          ))}

        </select>


        {/* LEVEL */}

        <select
          value={level}
          onChange={(e) =>
            setLevel(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        >

          <option value="beginner">
            Beginner
          </option>

          <option value="intermediate">
            Intermediate
          </option>

          <option value="advanced">
            Advanced
          </option>

        </select>


        {/* DURATION */}

        <input
          type="text"
          placeholder="Duration e.g. 6 months"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />


        {/* DESCRIPTION */}

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
        />


        {/* TOPICS */}

        <input
          type="text"
          placeholder="Topics: HTML, CSS, JavaScript, React"
          value={topics}
          onChange={(e) =>
            setTopics(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />


        {/* RESOURCES */}

        <input
          type="text"
          placeholder="Resources: MDN, React Docs, YouTube"
          value={resources}
          onChange={(e) =>
            setResources(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />


        {/* STATUS */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-6"
        >

          <option value="draft">
            Draft
          </option>

          <option value="published">
            Published
          </option>

        </select>


        {/* BUTTONS */}

        <button
          type="submit"
          className="bg-red-800 text-white px-5 py-3 rounded-lg"
        >

          {editingRoadmap
            ? "Update Roadmap"
            : "Create Roadmap"}

        </button>


        {editingRoadmap && (

          <button
            type="button"
            onClick={resetForm}
            className="ml-3 border border-gray-300 px-5 py-3 rounded-lg"
          >
            Cancel
          </button>

        )}

      </form>


      {/* ================================= */}
      {/* ROADMAP LIST */}
      {/* ================================= */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        {loading ? (

          <p className="p-6">
            Loading roadmaps...
          </p>

        ) : roadmaps.length === 0 ? (

          <p className="p-6 text-gray-500">
            No roadmaps found.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4">
                    Title
                  </th>

                  <th className="text-left p-4">
                    Role
                  </th>

                  <th className="text-left p-4">
                    Level
                  </th>

                  <th className="text-left p-4">
                    Duration
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-center p-4">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {roadmaps.map((roadmap) => (

                  <tr
                    key={roadmap._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {roadmap.title}
                    </td>


                    <td className="p-4">
                      {roadmap.roleId?.title ||
                        "N/A"}
                    </td>


                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700">

                        {roadmap.level}

                      </span>

                    </td>


                    <td className="p-4">
                      {roadmap.duration ||
                        "N/A"}
                    </td>


                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          roadmap.status ===
                          "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >

                        {roadmap.status}

                      </span>

                    </td>


                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          handleEdit(roadmap)
                        }
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg mr-2"
                      >
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          handleDelete(
                            roadmap._id
                          )
                        }
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}


export default RoadmapManagement;