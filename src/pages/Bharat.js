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
    <div className="flex flex-col min-h-screen">
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
          <div className="container bg-white p-2 m-0">
            <h1 className="heading text-black">BHARAT 2.0 Registration Process</h1>
            <div className=" flex flex-row justify-between w-[100vw] gap-20 mt-4">
              <div className=" flex flex-col gap-4">
                <h2 className="title text-black">Round 1:</h2>
                <ul className="title2 text-black">
                  <li>Open to all startups.</li>
                  <li>Startups will present to a jury.</li>
                  <li>Winners will be awarded cash prizes.</li>
                </ul>
                <h2 className="title text-black">Round 2:</h2>
                <ul className="title2 text-black">
                  <li>Only selected startups that qualify through the initial sorting process will earn the opportunity to present their ventures to potential investors.</li>
                </ul>
                <h2 className="title1 text-red">REGISTRATION FEES: RS. 350 PER TEAM</h2>

              </div>
            </div>

          </div>
        <form onSubmit={handleSubmit} className="w-[100vw] mt-4 bg-white max-lg: p-2 space-y-4">
          {/* Participant Information */}
          <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Participant Information:</h2>
          <div className="grid grid-cols-2 w-full gap-10 max-lg:grid-cols-1">
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Company Name/Startup Name:</label>
              <input 
                className="text-xl bg-slate-100 t-2 w-4/6 max-lg:w-full px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company/startup name" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Name of the Company/Startup representative:</label>
              <input 
                className="text-xl bg-slate-100 t-2 w-4/6 max-lg:w-full px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="text" 
                name="representativeName"
                value={formData.representativeName}
                onChange={handleChange}
                placeholder="Representative Name" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Phone Number (Company/Startup representative):</label>
              <input 
                className="text-xl bg-slate-100 t-2 w-4/6 max-lg:w-full px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="text" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Email ID (Company/Startup representative):</label>
              <input 
                className="text-xl bg-slate-100 t-2 w-4/6 max-lg:w-full px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
                type="text" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                required
              />
            </div>
          </div>

          {/* Team Information */}
          <hr className=" bg-slate-200 w-full h-0.5 px-2"></hr>
          <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Team Information (if applicable):</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col col-span-2 mb-4">
              <label className="text-xl font-serif tracking-tight mb-3">Name & contact of Team members:</label>
              <label className=" my-2">
                Ex: Aryan Joge: 9999999999, 
                 Shruti Naik: 8888888888
              </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleChange}
                placeholder="Name & contact of Team members" 
              ></textarea>
            </div>
          </div>

          {/* Idea/Project Details */}
          <hr className=" bg-slate-200 w-full h-0.5 px-2"></hr>

          <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Idea/Project Details:</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">Explain the ideation behind your Startup/Business:</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                placeholder="Explain the ideation behind your Startup/Business:" 
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Is your Startup registered with Startup India:</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">Who are the founders, and what are their backgrounds?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="founders"
                value={formData.founders}
                onChange={handleChange}
                placeholder="Founders and their backgrounds" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">How long has your Startup/Company been in operation?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="operationTime"
                value={formData.operationTime}
                onChange={handleChange}
                placeholder="" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">What type of company is your Startup/Business?</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Do you have a full-time, dedicated team?</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">What problem statement is your Startup/Business addressing?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                placeholder="Problem Statement" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">Can you explain what makes your product/services unique compared to your competitor's products?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="uniqueProduct"
                value={formData.uniqueProduct}
                onChange={handleChange}
                placeholder="Unique Product" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">Are there any legal or regulatory requirements specific to your industry?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="legalRequirements"
                value={formData.legalRequirements}
                onChange={handleChange}
                placeholder="Legal Requirements" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">What stage is your Startup currently in?</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Has your Startup received any funding, such as pre-seed, seed, or series funding?</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">If yes, could you please provide details on the investment stages and amounts?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="fundingDetails"
                value={formData.fundingDetails}
                onChange={handleChange}
                placeholder="Funding Details" 
                
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Has your startup received any awards, grants, or recognitions?</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">If yes, please provide details (mention the name of the award/grant, the awarding organization, and the year received):</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-9/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="awardsDetails"
                value={formData.awardsDetails}
                onChange={handleChange}
                placeholder="Awards Details" 
            
              ></textarea>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">Who are your target customers, what are their needs and size of the target market?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="targetCustomers"
                value={formData.targetCustomers}
                onChange={handleChange}
                placeholder="Target Customers" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Do you have a working prototype or minimum viable product (MVP)?</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="hasPrototype"
                value={formData.hasPrototype}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Do you have any pilot projects, case studies, or testimonials from users?</label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="hasPilot"
                value={formData.hasPilot}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex flex-col col-span-2">
  <label className="text-xl font-serif tracking-tight mb-3">If yes, please provide evidence of the same (Upload 1 supported file. Max 1 MB):</label>
  <input 
    className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
    type="file" 
    name="pilotEvidence"
    accept="application/pdf"
    onChange={handleFileChange}
    placeholder="Upload Evidence File" 
  />
</div>


            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">What is your current runway, and what are your funding needs?</label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="runway"
                value={formData.runway}
                onChange={handleChange}
                placeholder="Current Runway and Funding Needs" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col col-span-2">
  <label className="text-xl font-serif tracking-tight mb-3">
    Prepare a short video, around 3 minutes, that provides an overview of your startup, details about your product, and general information about your team and vision:
  </label>
  <input 
    className="text-xl bg-slate-100 t-2 w-11/12 px-1 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
    type="file" 
    name="video"
    accept="video/mp4"  // Accept only MP4 format
    onChange={handleFilesChange}
    placeholder="Upload Video File" 
    required
  />
</div>
</div>


          

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 mb-4 text-white px-6 py-3 rounded-full text-xl shadow-md"
            >
              Submit
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