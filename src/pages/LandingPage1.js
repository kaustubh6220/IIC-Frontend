import { useCallback, useState } from "react";
import styles from './LandingPage1.module.css'
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Footer from '../Components/Footer';
import NavBar from "../Components/NavBar";

const LandingPage1 = () => {
  const navigate = useNavigate();
  const isSmallScreen = () => {
    return window.matchMedia("(max-width: 380px)").matches;
  };
  const onHomeTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onTeamTextClick = useCallback(() => {
    navigate("/Team");
  }, [navigate]);

  const onAboutTextClick = useCallback(() => {
    navigate("/About");
  }, [navigate]);

  const onEventsTextClick = useCallback(() => {
    navigate("/Events");
  }, []);

  const onContactTextClick = useCallback(() => {
    navigate("/Contactus");
  }, [navigate]);

  const [showIntro, setShowIntro] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [showRocket, setShowRocket] = useState(false);
  const [showText, setShowText] = useState(false);

  const onLetsStartTextClick = useCallback(() => {
    console.log("Let's start button clicked!")
    setShowIntro(false);  // hide the INNOVATE text and button
    // show the rocket and asteroids after INNOVATE disappears
    setTimeout(() => {
      setShowRocket(true);
    }, 300);

    setTimeout(() => {
      setShowText(true);
    }, 2300); // 300ms for INNOVATE + 2 seconds for rocket

    setTimeout(() => {
      navigate("/LandingPage2");
    }, 5800); // 2300ms for above + 2 seconds for text
  }, [navigate]);


  return (
    
    <div className="min-h-screen bg-white text-center font-source-sans-pro">

      <NavBar />

      {/* Main Section */}
      <section className="my-20">
        <h1 className=" font-bold text-blue-800">
          <span
            className="text-bue-800 text-[15vw] lg:text-[7vw]"
            style={{
              fontWeight: 'bold',
              fontFamily: 'Barlow Semi Condensed',
              // fontSize: "8vw"
            }}
          >
            BHARAT 2.0
          </span>
        </h1>
        <h2 className="text-2xl my-4 text-wrap">
        <span className="text-blue-500" style={{
      fontSize: '3.5vw',
      fontWeight: 'bold',
      fontFamily: 'Barlow Semi Condensed',
      textShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
    }}>
      <span className="text-blue-800" style={{ fontSize: '4vw' }}>B</span>
      <span style={{ color: '#000' }}>usiness</span>
      &nbsp;
      <span className="text-blue-800" style={{ fontSize: '4vw' }}>H</span>
      <span style={{ color: '#000' }}>eroes</span>
      &nbsp;
      <span className="text-blue-800" style={{ fontSize: '4vw' }}>A</span>
      <span style={{ color: '#000' }}>spiring</span>
      &nbsp;
      <span style={{ color: '#000' }}>to</span>
      &nbsp;
      <span className="text-blue-800" style={{ fontSize: '4vw' }}>R</span>
      <span style={{ color: '#000' }}>ise</span>
      &nbsp;
      <span style={{ color: '#000' }}>&</span>
      &nbsp;
      <span className="text-blue-800" style={{ fontSize: '4vw' }}>A</span>
      <span style={{ color: '#000' }}>chieve</span>
      &nbsp;
      <span className="text-blue-800" style={{ fontSize: '4vw' }}>T</span>
      <span style={{ color: '#000' }}>ogether</span>
    </span>

        </h2>


        <p className="mt-6 text-lg max-w-3xl mx-auto">
          This is a fantastic opportunity for young innovators to showcase their ideas and take the first steps towards building successful ventures. Are you planning to participate or know someone who is?
        </p>

        <div className="mt-10" style={{ textShadow: '6px 1px 10px rgba(0, 0, 0, 0.5)' }}>
          <a href="/bharat" className="bg-blue-800 text-white px-6 py-3 text-xl font-bold rounded-full inline-block transition-transform transform hover:scale-105">
            <span style={{ fontFamily: 'Sen', fontSize: '30px', textShadow: '2px 4px 10px rgba(0, 0, 0, 0.5)' }}>Register Here</span>
          </a>

          {/* Cursor Image */}
          {/* <img
          src="/Frame 5759.png" // path to your cursor image
          alt="Cursor" 
          className="fixed"
          style={{
            
          top: "46vh",  // Adjust according to where you want the cursor image
            left: "58wh",  // Adjust according to where you want the cursor image
            transform: "translate(-140%, -50%)", // Center the image
            width: "59px",  // Adjust the size of the cursor image
            height: "40px",
            zIndex: 1000  // Ensure it's above other elements
            }}
            /> */}
        </div>
      </section>


      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-16 px-4 w-[60%] mx-auto">
        <div className="text-center border-2 border-purple-300 p-4 rounded-lg">
          <h3 className="text-4xl font-bold" style={{ fontSize: '60px', color: 'purple' }}>45+</h3>
          <p className="text-lg" style={{ fontSize: '20px' }}>Startups Participated</p>
        </div>
        <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
          <h3 className="text-4xl font-bold" style={{ fontSize: '60px', color: 'darkblue' }}>1K</h3>
          <p className="text-lg" style={{ fontSize: '20px' }}>Participants</p>
        </div>
        <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
          <h3 className="text-4xl font-bold" style={{ fontSize: '60px', color: 'purple' }}>1 Lac</h3>
          <p className="text-lg" style={{ fontSize: '20px' }}>Prize Pool</p>
        </div>
        <div className="text-center border-2 border-gray-300 p-4 rounded-lg">
          <h3 className="text-4xl font-bold" style={{ fontSize: '60px', color: 'darkblue' }}>10+</h3>
          <p className="text-lg" style={{ fontSize: '20px' }}>Startups Received Investment</p>
        </div>
      </section>



      <section className="py-20 bg-purple">
        <h3 className="text-70xl font-bold mb-10 text-blue-900" style={{
          fontSize: '56px',
          fontWeight: 'bold',
          fontFamily: 'Sen',
        }}>Why BHARAT?</h3>
        <div className="grid p-12 grid-cols-1 md:grid-cols-3 gap-16 ">
          <div className="p-6 bg-blue-900 rounded-lg shadow-lg ">
            <img
              src="/image 26.svg" 
              alt="Purpose Image"
              className="h-40 w-50 object-cover rounded-t-lg"
            />
            <h4 className="text-2xl text-white font-bold mt-8 " style={{ fontSize: '30px' }}>Purpose</h4>
            <p className="mt-2 text-white" style={{ fontSize: '20px' }}>Platform for students to pitch ideas & get funded.</p>
          </div>
          <div className="p-6 bg-blue-900 rounded-lg shadow-lg">
            <img
              src="/Group.svg" 
              alt="Opportunities Image"
              className="h-40 w-50 object-cover rounded-t-lg"
            />
            <h4 className="text-2xl font-bold mt-4 text-white" style={{ fontSize: '30px' }}>Opportunities</h4>
            <p className="mt-2 text-white" style={{ fontSize: '20px' }}  >Networking, mentorship, exposure, funding.</p>
          </div>
          <div className="p-6 bg-blue-900  rounded-lg shadow-lg">
            <img
              src="/Group 39206.svg" 
              alt="Funding Image"
              className="h-40 w-50 object-cover rounded-t-lg"
            />
            <h4 className="text-2xl font-bold mt-5   text-white" style={{ fontSize: '30px' }}>Funding</h4>
            <p className="mt-3 text-white " style={{ fontSize: '20px' }}>Selected ideas can receive funding to bring them closer to reality.</p>
          </div>
          <div className="p-6 bg-blue-900 rounded-lg shadow-lg">
            <img
              src="/OBJECTS.svg"
              alt="Participants Image"
              className="h-40 w-50 object-cover rounded-t-lg"
            />
            <h4 className="text-2xl font-bold mt-12 text-white" style={{ fontSize: '30px' }}>Participants</h4>
            <p className="mt-2 text-white" style={{ fontSize: '20px' }}>Students, startups, industry leaders.</p>
          </div>
          <div className="p-16 bg-blue-900  rounded-lg shadow-lg">
            <img
              src="/Group 39207.svg" 
              alt="Growth Image"
              className="h-40 w-50 object-cover rounded-t-lg"
            />
            <h4 className="text-2xl font-bold mt-4 text-white " style={{ fontSize: '30px' }}>Growth</h4>
            <p className="mt-2 text-white" style={{ fontSize: '20px' }}>Helps startups connect with investors and resources.</p>
          </div>
          <div className="p-6 bg-blue-900  rounded-lg shadow-lg">
            <img
              src="/OBJECTS2.svg" 
              alt="Visibility Image"
              className="h-40 w-50 object-cover rounded-t-lg"
            />
            <h4 className="text-2xl font-bold mt-8   text-white " style={{ fontSize: '30px' }}>Visibility</h4>
            <p className="mt-8 text-white" style={{ fontSize: '20px' }}>High-market exposure for ideas.</p>
          </div>
        </div>
      </section>

      {/* Glimpses Section */}
      <div>
        {/* <img src="rocket.svg" ></img>    */}
        <section className="relative py-12">
          {/* Background strip */}

          <div className="absolute inset-0 top-30 flex items-center justify-center">
            {/* Left half of the strip */}
            <div className="h-9 bg-blue-800 w-1/2"></div>

            {/* Gap for the title */}
            <div className="text-center">
              {/* Empty space for the title */}
              {/* Glimpses Title at the center */}
              <div className="relative z-10 flex justify-center">
                <h3 className="text-[26px] sm:text-[40px] font-bold text-blue-800 bg-transparent px-4 z-10" style={{ fontFamily: 'Sen' }}>
                  Glimpses of BHARAT 1.0
                </h3>
              </div>
            </div>


            {/* Right half of the strip */}
            <div className="h-9 bg-blue-800 w-1/2"></div>
          </div>


          {/* Rocket Icon on the left of the strip */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <img
              src="/rocket1.svg"
              alt="Rocket Icon"
              className="h-44 w-44 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-62 lg:w-109"
            />
          </div>




          {/*         
        <h3 className="text-3xl font-bold my-8 text-purple-500" style={{  
   fontSize: '24px',  
   fontWeight: 'bold',  
   fontFamily: 'Sen',  
   textShadow: '0 0 10px rgba(0, 0, 0, 0.2)',  
   color:"purple",
  }}> Glimpses of BHARAT 1.0</h3> */}
        </section>
        &nbsp;
        &nbsp;
        &nbsp;
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            <img
              src="/glimpse1.jpg"
              alt="Glimpse 1"
              className="w-full sm:h-48 md:h-56 lg:h-64  rounded-lg shadow-md"
            />
            <img
              src="/glimpse2.jpg"
              alt="Glimpse 2"
              className="w-full sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md"
            />
            <img
              src="/glimpse3.jpg"
              alt="Glimpse 3"
              className="w-full sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md"
            />
            <img
              src="/glimpse4.jpg"
              alt="Glimpse 4"
              className="w-full sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </section>



        &nbsp;
        &nbsp;
      </div>
      {/* <div className="container">
      <Footer/>
      </div> */}
    </div>

  );
};

export default LandingPage1;
