import { useState } from "react";
import { mockRegisterResident } from "../../services/residentService";
import Toast from "../ui/Toast";

function RegisterResidents({ addResident, user }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    phoneNumber: "",
    emailAddress: "",
    maritalStatus: "",
    branch: "",
    dob: "",
    genotype: "",
    stateOfOrigin: "",
    religion: "",
    bloodGroup: "",
    sex: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const nigerianStates = [
    "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
    "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
    "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
    "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe",
    "Zamfara","FCT Abuja"
  ];
  const genotypes = ["AA", "AS", "SS", "AC"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const religions = ["Christian", "Islam", "Traditional", "Other"];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessData(null);

    try {
      const response = await mockRegisterResident(formData);
      addResident(response.resident);
      setSuccessData({
        title: "Resident Registered Successfully",
        residentNumber: response.residentNumber,
        firstName: response.resident.firstName,
        lastName: response.resident.lastName
      });
      setFormData({
        firstName: "",
        lastName: "",
        otherName: "",
        phoneNumber: "",
        emailAddress: "",
        maritalStatus: "",
        branch: "",
        dob: "",
        genotype: "",
        stateOfOrigin: "",
        religion: "",
        bloodGroup: "",
        sex: ""
      });
    } catch (err) {
      console.error("Error registering resident:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg" data-aos="fade-up">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register Resident</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Other Name</label>
            <input
              type="text"
              name="otherName"
              value={formData.otherName}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/*Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select status</option>
              {maritalStatuses.map(status => (
                <option key={status} value={status.toLowerCase()}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select branch</option>
              <option value="hq">Paradise Estate</option>
              <option value="north">Godab Estate</option>
              <option value="south">Cosgrove Estate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* More Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Genotype</label>
            <select
              name="genotype"
              value={formData.genotype}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select genotype</option>
              {genotypes.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">State of Origin</label>
            <select
              name="stateOfOrigin"
              value={formData.stateOfOrigin}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select state</option>
              {nigerianStates.map(state => (
                <option key={state} value={state.toLowerCase().replace(/\s+/g,"_")}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Religion</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select religion</option>
              {religions.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
            </select>
          </div>
        </div>

        {/* Blood Group + Sex */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select blood group</option>
              {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Registering..." : "Register Resident"}
        </button>
      </form>

      <Toast
        data={successData}
        onClose={() => setSuccessData(null)}
        duration={3000}
      />

    </div>
  );
}

export default RegisterResidents;
