import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Projects,
} from './components';

// Replace with your actual Bin ID and API Key
const BIN_ID = '66cdbf7eacd3cb34a87a374b'; // Replace with your Bin ID
const API_KEY = '$2a$10$.ipxYNlMqBW98z5rAdUEzOyxGrtqxLD0/p4/UGn9CjOGz/0L0dl0e'; // Replace with your API Key

const App = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [visitedIPs, setVisitedIPs] = useState(new Set());

  useEffect(() => {
    const updateVisitCount = async () => {
      try {
        // Fetch current data from JSONBin
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
          headers: {
            'X-Master-Key': API_KEY,
          },
        });

        const { visits, visitorDetails } = response.data.record;
        const existingIPs = new Set(visitorDetails.map(detail => detail.ip));
        const currentIP = await (await axios.get('https://ipapi.co/json/')).data.ip;

        // Set visit count from JSONBin
        setVisitCount(visits);

        // Only update visit count and details if the IP is not already recorded
        if (!existingIPs.has(currentIP)) {
          const newCount = visits + 1;

          // Update the visit count and visitor details in JSONBin
          await axios.put(
            `https://api.jsonbin.io/v3/b/${BIN_ID}`,
            {
              visits: newCount,
              visitorDetails: [
                ...visitorDetails,
                {
                  ip: currentIP,
                  city: (await axios.get('https://ipapi.co/json/')).data.city,
                  region: (await axios.get('https://ipapi.co/json/')).data.region,
                  country: (await axios.get('https://ipapi.co/json/')).data.country,
                  location: (await axios.get('https://ipapi.co/json/')).data.loc,
                  browser: navigator.appName,
                  platform: navigator.platform,
                  userAgent: navigator.userAgent,
                },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY,
              },
            }
          );

          setVisitCount(newCount);
        }
      } catch (error) {
        console.error('Error updating visit count and details:', error);
      }
    };

    updateVisitCount();
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0">
        <div>
          <Navbar />
          <Hero />
        </div>

        <div className="bg-about bg-cover bg-center bg-no-repeat">
          <About />
        </div>

        <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
          <Tech />
        </div>

        <Projects />

        <div className="bg-experience bg-cover bg-center bg-no-repeat rounded-tl-[150px] rounded-br-[150px]">
          <div className="bg-experienceLight bg-cover bg-center bg-no-repeat rounded-tl-[150px] rounded-br-[130px]">
            <Experience />
          </div>
        </div>
        <div className="relative z-0">
          <Contact />
        </div>
        <div className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white text-sm rounded-full shadow-lg hidden">
          <p>visits: {visitCount}</p>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
