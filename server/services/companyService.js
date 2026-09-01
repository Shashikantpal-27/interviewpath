import Company from "../models/Company.js";


// ===============================
// CREATE COMPANY
// ===============================

const createCompany = async (companyData) => {

  const company = await Company.create(
    companyData
  );

  return company;
};


// ===============================
// GET ALL COMPANIES
// ===============================

const getAllCompanies = async () => {

  const companies = await Company.find()
    .sort({ createdAt: -1 });

  return companies;
};


// ===============================
// GET COMPANY BY ID
// ===============================

const getCompanyById = async (id) => {

  const company = await Company.findById(id);

  return company;
};


// ===============================
// UPDATE COMPANY
// ===============================

const updateCompany = async (
  id,
  companyData
) => {

  const company = await Company.findByIdAndUpdate(
    id,
    companyData,
    {
      new: true,
      runValidators: true,
    }
  );

  return company;
};


// ===============================
// DELETE COMPANY
// ===============================

const deleteCompany = async (id) => {

  const company = await Company.findByIdAndDelete(id);

  return company;
};


export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};