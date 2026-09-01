import api from "../api/axios";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCompanies = async (params = {}) => {
  const res = await api.get("/companies", {
    ...authHeader(),
    params,
  });
  return res.data.data;
};

export const getCompanyById = async (id) => {
  const res = await api.get(`/companies/${id}`, authHeader());
  return res.data.data;
};

export const getCompanyFilters = async () => {
  const res = await api.get("/companies/meta/filters", authHeader());
  return res.data.data;
};