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
    linkedin:"",
    teamMembers: "",
    idea: "",
    startuptype: "",
    TargetIndustry: "",
    revenue: "",
    financialstatus: "",
    burnrate: "",
    approval: "",
    specify: "",
    funding: "",
    mentorship: "",
    ppt: "",
    
    
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
      <div className="flex flex-col justify-center mt-40">
        {maxReached ? (
          <div className="w-full max-w-2xl p-6 bg-yellow-100 text-yellow-700 rounded-lg shadow-md">
            Maximum Registrations Reached
          </div>
        ) : (
          <>
          <div className="container">
            <h1 className="heading">BHARAT 2.0 Registration Process</h1>
            <div className=" flex flex-row justify-between w-full gap-20 mt-4">
              <div className=" flex flex-col gap-4">
                <h2 className="title">Round 1:</h2>
                <ul className="title2">
                  <li>Initial idea submission and concept screening.</li>
                  
                </ul>
                <h2 className="title">Round 2:</h2>
                <ul className="title2">
                  <li>Detailed pitch presentations in front of expert judges.</li>
                </ul>
                <h2 className="title1">REGISTRATION FEES: RS. 500 PER TEAM</h2>

              </div>
            </div>

          </div>
        <form onSubmit={handleSubmit} className="w-full mt-4  pt-4 max-lg:pr-10 pl-4 space-y-4">
          {/* Participant Information */}
          <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Participant Information:</h2>
          <div className="grid grid-cols-2 w-full gap-10 max-lg:grid-cols-1">
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Company Name/Startup Name:</label>
              <input 
                className="text-xl bg-slate-100 t-2 w-5/6 max-lg:w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                className="text-xl bg-slate-100 t-2 w-5/6 max-lg:w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                className="text-xl bg-slate-100 t-2 w-5/6 max-lg:w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                className="text-xl bg-slate-100 t-2 w-5/6 max-lg:w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
                type="text" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Founder(s), their roles, and LinkedIn Profile of Founder(s):</label>
              <input 
                className="text-xl bg-slate-100 t-2 w-5/6 max-lg:w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
                type="text" 
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn Id" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Number of People in the Team :</label>
              <input 
                className="text-xl bg-slate-100 t-2 w-5/6 max-lg:w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
                type="text" 
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleChange}
                placeholder="No. of people" 
                required
              />
            </div>
          </div>

          {/* Team Information */}
          {/* <hr className=" bg-slate-200 w-full h-0.5 px-2"></hr>
          <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Team Information (if applicable):</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col col-span-2 mb-4">
              <label className="text-xl font-serif tracking-tight mb-3">Name & contact of Team members:</label>
              <label className=" my-2">
                Ex: Aryan Joge: 9999999999, 
                 Shruti Naik: 8888888888
              </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleChange}
                placeholder="Name & contact of Team members" 
              ></textarea>
            </div>
          </div> */}

          {/* Idea/Project Details */}
          <hr className=" bg-slate-200 w-full h-0.5 px-2"></hr>

          <h2 className="text-5xl font-inter font-semibold tracking-tight text-center mb-8">Startup Details:</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">Name and what is your startup? (Describe in less than 150 words, include social media links):   
              </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                placeholder="Explain the ideation behind your Startup/Business:" 
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">What type of startup is it? (eg, LLP, LLC, etc) :</label>
              <textarea
                className="text-xl bg-slate-100 t-2 w-5/6 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="startuptype"
                value={formData.startuptype}
                onChange={handleChange}
                required>
              </textarea>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">What is your target industry? : </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="TargetIndustry"
                value={formData.TargetIndustry}
                onChange={handleChange}
                placeholder="TargetIndustry" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">What is the revenue of the current financial year? : </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-5/6 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                placeholder="" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">What is the current financial status of the startup? (Profit, loss, breakeven, etc.): </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="financialstatus"
                value={formData.financialstatus}
                onChange={handleChange}
                placeholder=" " 
                required
              ></textarea>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">What is the profit and loss status for the current financial year, and what is your current burn rate? : </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="burnrate"
                value={formData.burnrate}
                onChange={handleChange}
                placeholder="" 
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Does your startup require approval from government bodies? (eg, FDA for food startups) :  </label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="approval"
                value={formData.approval}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xl font-serif tracking-tight mb-3">If yes, specify : </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-11/12 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="specify"
                value={formData.specify}
                onChange={handleChange}
                placeholder="specify" 
                
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">How much funding are you seeking, and how do you plan to use it? (Please provide a breakdown) : </label>
              <textarea 
                className="text-xl bg-slate-100 t-2 w-5/6 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="funding"
                value={formData.funding}
                onChange={handleChange}
                required
              >
                
              </textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">Do you require mentorship?  </label>
              <select 
                className="text-xl bg-slate-100 t-2 w-5/6 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="mentorship"
                value={formData.mentorship}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-serif tracking-tight mb-3">What is your startup model? (eg, product-based, service-based, process-based, marketplace startup, business innovation): </label>
              <textarea
              className="text-xl bg-slate-100 t-2 w-5/6 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="hasPilot"
                value={formData.hasPilot}
                onChange={handleChange}
                required
              >
                </textarea>
            </div>
            <div className="flex flex-col col-span-2">
  <label className="text-xl font-serif tracking-tight mb-3">Upload a PPT of 4 slides describing your startup which includes cover and Thank you page(Upload 1 supported file. Max 1 MB):</label>
  <input 
    className="text-xl bg-slate-100 t-2 w-11/12 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
    type="file" 
    name="ppt"
    accept=".ppt, .pptx"
    onChange={handleFileChange}
    placeholder=""  
  />
</div>

            <div className="flex flex-col col-span-2">

<div class="flex justify-center items-center mt-2 mb-7 mt-7 gap-0.5">
  

  <a
    href="pdf/Bharat brochure.pdf"
    target="_blank"
    class=" link button px-8 py-3    mt-2 flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-black bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-2 overflow-hidden  rounded-full group hover:bg-blue-600"
 style={{margin:'1px'}}
 >
    Guidelines
    <svg
      class=" border-gray-500 w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-800 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-1 rotate-45"
      viewBox="0 0 16 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
        class="fill-black group-hover:fill-gray-800"
      ></path>
    </svg>
  </a>

    <button
      type="submit"
      class=" mt-2 px-8 py-3  flex justify-center gap-2 items-center mx-auto shadow-xl text-5xl text-black   lg:font-semibold isolation-auto  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group hover:bg-blue-600"
      style={{margin:'1px'}}
    >
    Submit
      
    </button>
</div>

</div>
</div>



          

          {/* <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 mb-4 text-white px-6 py-3 rounded-full text-xl shadow-md"
            >
              Submit
            </button>
          </div> */}

        </form>
        </>
        )}
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Bharat;