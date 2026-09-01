import React, { useEffect, useState } from "react";

import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getAllCompanies,
} from "../api/adminApi.js";

function RoleManagement() {
  const [companies, setCompanies] = useState([]);

  const [roles, setRoles] = useState([]);


  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [skills, setSkills] = useState("");
  const [editingRole, setEditingRole] = useState(null);

  // ================================
  // FETCH ROLES
  // ================================

  const fetchCompanies = async () => {
    try {

      const data = await getAllCompanies();

      setCompanies(data.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch companies:",
        error
      );

    }
  };

  const fetchRoles = async () => {

    try {

      setLoading(true);

      const data = await getAllRoles();

      setRoles(data.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch roles:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // ================================
  // LOAD ROLES
  // ================================

  useEffect(() => {

    fetchRoles();
    fetchCompanies();

  }, []);


  // ================================
  // CREATE ROLE
  // ================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const roleData = {
        title,
        description,
        companyId,

        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };


      // =========================
      // UPDATE
      // =========================

      if (editingRole) {

        await updateRole(
          editingRole._id,
          roleData
        );

        alert("Role updated successfully");

      }

      // =========================
      // CREATE
      // =========================

      else {

        await createRole(roleData);

        alert("Role created successfully");

      }


      // Reset form

      setTitle("");
      setDescription("");
      setCompanyId("");
      setSkills("");

      setEditingRole(null);

      // Refresh roles

      fetchRoles();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };
  const handleEdit = (role) => {

    setEditingRole(role);

    setTitle(role.title || "");

    setDescription(role.description || "");

    setCompanyId(
      role.companyId?._id || role.companyId || ""
    );

    setSkills(
      role.skills?.join(", ") || ""
    );

  };


  // ================================
  // DELETE ROLE
  // ================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmDelete) return;

    try {

      await deleteRole(id);

      alert("Role deleted successfully");

      fetchRoles();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  };


  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Role Management
      </h1>


      {/* CREATE ROLE */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm mb-8"
      >

        <h2 className="text-xl font-semibold mb-4">
          {editingRole ? "Edit Role" : "Create Role"}
        </h2>


        <input
          type="text"
          placeholder="Role title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />


        <select
          value={companyId}
          onChange={(e) =>
            setCompanyId(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        >
          <option value="">
            Select Company
          </option>

          {companies.map((company) => (

            <option
              key={company._id}
              value={company._id}
            >
              {company.name}
            </option>

          ))}

        </select>


        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />


        <input
          type="text"
          placeholder="Skills: Java, React, Node"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />


     <button
  type="submit"
  className="bg-red-800 text-white px-5 py-3 rounded-lg"
>
  {editingRole ? "Update Role" : "Create Role"}
</button>


{editingRole && (
  <button
    type="button"
    onClick={() => {

      setEditingRole(null);
      setTitle("");
      setDescription("");
      setCompanyId("");
      setSkills("");

    }}
    className="ml-3 border border-gray-300 px-5 py-3 rounded-lg"
  >
    Cancel
  </button>
)}

      </form>


      {/* ROLES */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        {loading ? (

          <p className="p-6">
            Loading roles...
          </p>

        ) : roles.length === 0 ? (

          <p className="p-6 text-gray-500">
            No roles found.
          </p>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">
                  Title
                </th>

                <th className="text-left p-4">
                  Company
                </th>

                <th className="text-left p-4">
                  Skills
                </th>

                <th className="text-center p-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {roles.map((role) => (

                <tr
                  key={role._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {role.title}
                  </td>


                  <td className="p-4">
                    {role.companyId?.name || "N/A"}
                  </td>


                  <td className="p-4">

                    {role.skills?.join(", ")}

                  </td>


                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleEdit(role)}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(role._id)
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

        )}

      </div>

    </div>
  );
}

export default RoleManagement;