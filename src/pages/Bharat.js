import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../Components/Footer';
import NavBar from "../Components/NavBar";
import './bharatCard.css';

const Bharat = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    representativeName: "",
    phoneNumber: "",
    email: "",
    teamMembers: "",
    idea: "",
    isRegistered: "",
    founders: "",
    operationTime: "",
    companyType: "",
    hasTeam: "",
    problemStatement: "",
    uniqueProduct: "",
    legalRequirements: "",
    currentStage: "",
    hasFunding: "",
    fundingDetails: "",
    hasAwards: "",
    awardsDetails: "",
    targetCustomers: "",
    hasPrototype: "",
    hasPilot: "",
    pilotEvidence: "",
    runway: "",
    video: null
  });
  const [maxReached, setMaxReached] = useState(false);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_AWS_PUBLIC_LINK}/api/registration-status`);
        const data = await response.json();
        if (data.count > 45) {
          setMaxReached(true);
        }
      } catch (error) {
        console.error("Error checking registration status:", error);
      }
    };

    checkRegistrationStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleFilesChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes

    if (file) {
      if (file.size > maxSize) {
        alert('File size exceeds 100MB. Please upload a smaller video.');
        e.target.value = ""; // Clear the file input
      } else if (file.type !== 'video/mp4') {
        alert('Invalid file format. Please upload an MP4 video.');
        e.target.value = ""; // Clear the file input
      } else {
        // File is valid, set form data
        setFormData({
          ...formData,
          [name]: file
        });
        console.log('Video is acceptable:', file);
      }
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes

    if (file && file.size > maxSize) {
      alert('File size exceeds 1MB. Please upload a smaller file.');
      e.target.value = ""; // Clear the file input
    } else {
      setFormData({
        ...formData,
        [name]: file
      });
      // Handle the file upload
      console.log('File is acceptable:', file);
      // Further file handling logic
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const submitResponse = await fetch(`${process.env.REACT_APP_AWS_PUBLIC_LINK}/api/startup`, {
        method: "POST",
        body: formDataToSend
      });

      if (submitResponse.ok) {
        navigate("/bharatPayment");
        alert("Form submitted Successfully.");

      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-mono">
      <div className="sticky top-0 z-50 bg-white">
        <NavBar />
      </div>
      <div className="flex flex-col justify-center ">
        {maxReached ? (
          <div className="w-full max-w-2xl bg-yellow-100 text-yellow-700 rounded-lg shadow-md">
            Maximum Registrations Reached
          </div>
        ) : (
          <>
            <div className="bg-[#3d3f86] p-2 m-0 text-white w-[100vw]">
              <div className="w-[85%] lg:w-[75%] mx-auto py-5 lg:px-0 px-8">
                <h1 className="heading ">BHARAT 2.0 Registration Process</h1>
                <div className=" flex flex-row justify-between w-[90%] lg:w-full gap-20 mt-4">
                  <div className=" flex flex-col gap-4">
                    <h2 className="title ">Round 1:</h2>
                    <ul className="title2 ">
                      <li>Initial idea submission and concept screening.
                      </li>
                    </ul>
                    <h2 className="title ">Round 2:</h2>
                    <ul className="title2">
                      <li>Only selected startups that qualify through the initial sorting process will earn the opportunity <br /> to present their ventures to potential investors.</li>
                    </ul>
                    <h2 className="title1 text-orange">REGISTRATION FEES: RS. 500 PER TEAM</h2>

                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-[90vw] mt-4 bg-white max-lg: p-2 space-y-4 mx-auto">
              {/* Participant Information */}
              <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Participant Information:</h2>
              <div className="grid grid-cols-2 w-full gap-2 max-lg:grid-cols-1 font-mono">
                <div className="flex flex-col items-center w-11/12  mx-auto lg:w-full">
                  <div className="flex flex-col w-4/6 max-lg:w-full mb-4">
                    <label className="text-xl font-mono tracking-tight mb-3 self-start">
                      Company Name / Startup Name:
                    </label>
                    <input
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company/startup name"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center  w-11/12 mx-auto lg:w-full">
                  <div className="flex flex-col w-4/6 max-lg:w-full mb-4">
                    <label className="text-xl font-mono tracking-tight mb-3 self-start">
                      Name of the Company/Startup representative:
                    </label>
                    <input
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      type="text"
                      name="representativeName"
                      value={formData.representativeName}
                      onChange={handleChange}
                      placeholder="Representative Name"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center  w-11/12 mx-auto lg:w-full">
                  <div className="flex flex-col w-4/6 max-lg:w-full mb-4">
                    <label className="text-xl font-mono tracking-tight mb-3 self-start">
                      Phone Number (Company/Startup representative):
                    </label>
                    <input
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center w-11/12 mx-auto lg:w-full">
                  <div className="flex flex-col w-4/6 max-lg:w-full mb-4">
                    <label className="text-xl font-mono tracking-tight mb-3 self-start">
                      Email ID (Company/Startup representative):
                    </label>
                    <input
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
              </div>


              {/* Team Information */}
              <hr className=" bg-slate-200 w-full h-0.5 px-2"></hr>
              <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Team Information (if applicable):</h2>
              <div className="grid grid-cols-1 lg:w-[91.4%] w-full mx-auto">
                <div className="flex flex-col items-center col-span-2 mb-4">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 self-start">
                      Name & contact of Team members:
                    </label>
                    <label className="my-2 self-start">
                      Ex: Aryan Joge: 9999999999, Shruti Naik: 8888888888
                    </label>
                    <textarea
                      className="text-xl bg-slate-200 t-2 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleChange}
                      placeholder="Name & contact of Team members"
                      rows={5}
                    ></textarea>
                  </div>
                </div>
              </div>


              {/* Idea/Project Details */}
              <hr className=" bg-slate-200 w-full h-0.5 px-2"></hr>

              <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Idea/Project Details:</h2>
              <div className="grid grid-cols-2 gap-y-8 lg:w-[91.4%] w-full mx-auto">
                <div className="flex flex-col col-span-2 items-center">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">Explain the ideation behind your Startup/Business:</label>
                    <textarea
                      className="text-xl bg-slate-200 t-2 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      name="idea"
                      value={formData.idea}
                      onChange={handleChange}
                      placeholder="Explain the ideation behind your Startup/Business:"
                      rows={5}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <label className="text-xl font-mono tracking-tight mb-3 w-5/6 text-start">Is your Startup registered with Startup India:</label>
                  <select
                    className="text-xl bg-slate-200 w-5/6 px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                    name="isRegistered"
                    value={formData.isRegistered}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="flex flex-col col-span-2 items-center">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">Who are the founders, and what are their backgrounds?</label>
                    <textarea
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                      name="founders"
                      value={formData.founders}
                      onChange={handleChange}
                      placeholder="Founders and their backgrounds"
                      required
                      rows={5}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col items-center w-10/12 mx-auto">
                  <label className="text-xl font-mono tracking-tight mb-3 self-start">How long has your Startup/Company been in operation?</label>
                  <textarea
                    className="text-xl bg-slate-200 w-[95%] px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                    name="operationTime"
                    value={formData.operationTime}
                    onChange={handleChange}
                    required
                    rows={5}
                  ></textarea>
                </div>

                <div className="flex flex-col items-center w-11/12 mx-auto">
                  <label className="text-xl font-mono tracking-tight mb-3 self-start">What type of company is your Startup/Business?</label>
                  <select
                    className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Private Limited Company">Private Limited Company</option>
                    <option value="Partnership firm">Partnership firm</option>
                    <option value="Limited Liability Partnership">Limited Liability Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col items-center">
                  <label className="text-xl font-mono tracking-tight mb-3 w-5/6 text-start">Do you have a full-time, dedicated team?</label>
                  <select
                    className="text-xl bg-slate-200 w-5/6 px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                    name="hasTeam"
                    value={formData.hasTeam}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="flex flex-col col-span-2 items-center">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">What problem statement is your Startup/Business addressing?</label>
                    <textarea
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                      name="problemStatement"
                      value={formData.problemStatement}
                      onChange={handleChange}
                      placeholder="Problem Statement"
                      required
                      rows={5}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col col-span-2 items-center">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">Can you explain what makes your product/services unique compared to your competitor's products?</label>
                    <textarea
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                      name="uniqueProduct"
                      value={formData.uniqueProduct}
                      onChange={handleChange}
                      placeholder="Unique Product"
                      required
                      rows={5}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col col-span-2 items-center">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">Are there any legal or regulatory requirements specific to your industry?</label>
                    <textarea
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                      name="legalRequirements"
                      value={formData.legalRequirements}
                      onChange={handleChange}
                      placeholder="Legal Requirements"
                      required
                      rows={5}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <label className="text-xl font-mono tracking-tight mb-3 w-5/6 text-start">What stage is your Startup currently in?</label>
                  <select
                    className="text-xl bg-slate-200 w-5/6 px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                    name="currentStage"
                    value={formData.currentStage}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Ideation Phase">Ideation Phase (Initial idea)</option>
                    <option value="Development Phase">Development Phase (Making MVP)</option>
                    <option value="Seed Stage">Seed Stage (Securing funding)</option>
                    <option value="Startup Stage">Startup Stage (Launching the MVP)</option>
                    <option value="Growth Stage">Growth Stage (Scaling operations)</option>
                    <option value="Expansion Stage">Expansion Stage (Stable revenue)</option>
                  </select>
                </div>

                <div className="flex flex-col items-center w-11/12 mx-auto">
                  <label className="text-xl font-mono tracking-tight mb-3 self-start">Has your Startup received any funding, such as pre-seed, seed, or series funding?</label>
                  <select
                    className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                    name="hasFunding"
                    value={formData.hasFunding}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="flex flex-col col-span-2 items-center">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">If yes, could you please provide details on the investment stages and amounts?</label>
                    <textarea
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                      name="fundingDetails"
                      value={formData.fundingDetails}
                      onChange={handleChange}
                      placeholder="Funding Details"
                      rows={5}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col items-center">

                  <label className="text-xl font-mono tracking-tight mb-3 w-5/6 text-start">Has your startup received any awards, grants, or recognitions?</label>
                  <select
                    className="text-xl bg-slate-200 w-5/6 px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                    name="hasAwards"
                    value={formData.hasAwards}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="flex flex-col col-span-2 items-center">
                  <div className="flex flex-col w-11/12">
                    <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">If yes, could you please provide details on the awards or recognitions?</label>
                    <textarea
                      className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-start"
                      name="awardsDetails"
                      value={formData.awardsDetails}
                      onChange={handleChange}
                      placeholder="Awards or Recognitions"
                      rows={5}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center w-11/12 mx-auto lg:w-full">
                  <div className="flex flex-col w-[84%] max-lg:w-full mb-4">
                  <label className="text-xl font-mono tracking-tight mb-3 w-11/12 text-start">
                    Prepare a short video, around 3 minutes, that provides an overview of your startup, details about your product, and general information about your team and vision:
                  </label>
                  <input
                    className="text-xl bg-slate-200 w-full px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    type="file"
                    name="video"
                    accept="video/mp4"  // Accept only MP4 format
                    onChange={handleFilesChange}
                    placeholder="Upload Video File"
                    required
                  />
                </div>
              </div>

              <div class="flex justify-center items-center mt-2 mb-7 mt-7 gap-5">
                <a
                  href="pdf/Bharat brochure.pdf"
                  target="_blank"
                  class="link px-7 py-2.5 mt-2 flex justify-center gap-2 items-center mx-auto shadow-xl text-lg lg:font-semibold px-6 py-2 overflow-hidden rounded group bg-blue-600 text-white"
                  style={{ margin: '1px' }}
                >
                  Guidelines
                  <svg
                    class=" border-gray-500 w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-800 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-1 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      class="fill-white"
                    ></path>
                  </svg>
                </a>

                <button
                  type="submit"
                  class="bg-green-500  hover:bg-green-700 mt-2 px-8 py-3  flex justify-center gap-2 items-center mx-auto shadow-xl text-5xl text-white overflow-hidden rounded group cursor-pointer font-mono font-medium"
                  style={{ margin: '1px' }}
                >
                  SUBMIT

                </button>
              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Bharat;