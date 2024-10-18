import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { utils, writeFile } from 'xlsx'; // Import from 'xlsx'
import ProtectedRoute from '../Components/ProtectedRoute';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const BharatTeams = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_AWS_PUBLIC_LINK}/api/startups`);
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter(registration =>
    registration.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to export data to Excel
  const exportToExcel = () => {
    const tableData = filteredRegistrations.map(registration => ({
      'Company Name': registration.companyName,
      'Representative Name': registration.representativeName,
      'Phone Number': registration.phoneNumber,
      'Email': registration.email,
      'LinkedIn': registration.linkedin,
      'Team Members': registration.teamMembers,
      'Idea': registration.idea,
      'Startup Type': registration.startuptype,
      'Target Industry': registration.TargetIndustry,
      'Revenue': registration.revenue,
      'Financial Status': registration.financialstatus,
      'Burn Rate': registration.burnrate,
      'Approval': registration.approval,
      'Specify': registration.specify,
      'Funding': registration.funding,
      'Mentorship': registration.mentorship,
      'Payment': registration.paymentStatus ? 'Paid' : 'Unpaid',
      'PPT': registration.ppt ? 'Available' : 'No PPT',
    }));

    const worksheet = utils.json_to_sheet(tableData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Registrations');

    writeFile(workbook, 'Startup_Registrations.xlsx');
  };

  return (
    <>
      <NavBar />

      <ProtectedRoute correctCode="123456"> {/* Replace "123456" with your actual code */}
        <input
            type="text"
            placeholder="Search by company name"
            className="mb-4 mt-52 ml-4 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="w-11/12 p-4 overflow-x-scroll">

          <h1 className="text-2xl font-bold mb-6">Startup Registrations</h1>

          {/* Button to download table as Excel */}
          <button
            onClick={exportToExcel}
            className="mb-4 p-2 bg-green-500 text-white rounded"
          >
            Download Excel
          </button>

          <table style={{
            borderCollapse: 'collapse',
            width: '100%',
            border: '1px solid black ',
            radius:'5px',
          }} className=' text-center'>
            <thead>
              <tr>
                {/* Updated table headers based on the new schema */}
                <th>Company Name</th>
                <th>Representative Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>LinkedIn</th>
                <th>Team Members</th>
                <th>Idea</th>
                <th>Startup Type</th>
                <th>Target Industry</th>
                <th>Revenue</th>
                <th>Financial Status</th>
                <th>Burn Rate</th>
                <th>Approval</th>
                <th>Specify</th>
                <th>Funding</th>
                <th>Mentorship</th>
                <th>Payment</th>
                <th>PPT</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((registration, index) => (
                <tr key={index}>
                  <td>{registration.companyName}</td>
                  <td>{registration.representativeName}</td>
                  <td>{registration.phoneNumber}</td>
                  <td>{registration.email}</td>
                  <td>{registration.linkedin}</td>
                  <td>{registration.teamMembers}</td>
                  <td>{registration.idea}</td>
                  <td>{registration.startuptype}</td>
                  <td>{registration.TargetIndustry}</td>
                  <td>{registration.revenue}</td>
                  <td>{registration.financialstatus}</td>
                  <td>{registration.burnrate}</td>
                  <td>{registration.approval}</td>
                  <td>{registration.specify}</td>
                  <td>{registration.funding}</td>
                  <td>{registration.mentorship}</td>
                  <td>{registration.paymentStatus ? 'Paid' : 'Unpaid'}</td>
                  <td>
                    {registration.ppt ? (
                      <a
                        href={`${process.env.REACT_APP_AWS_PUBLIC_LINK}/${registration.ppt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'blue',
                          textDecoration: 'underline'
                        }}
                      >
                        View PPT
                      </a>
                    ) : (
                      'No PPT'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ProtectedRoute>
      <Footer />
    </>
  );
};

export default BharatTeams;
