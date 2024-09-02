import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Projects,
} from './components';


const BIN_ID = '66cdbf7eacd3cb34a87a374b'; 
const API_KEY = '$2a$10$.ipxYNlMqBW98z5rAdUEzOyxGrtqxLD0/p4/UGn9CjOGz/0L0dl0e'; 

const App = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());

  useEffect(() => {
    const updateVisitData = async () => {
      try {
        // Fetch current data from JSONBin
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
          headers: {
            'X-Master-Key': API_KEY,
          },
        });

        const { visits, visitorDetails } = response.data.record;
        const existingIPs = new Set(visitorDetails.map(detail => detail.ip));
        const ipData = await axios.get('https://ipapi.co/json/');
        
        const currentIP = ipData.data.ip;
        const {
          city = 'Unknown',
          region = 'Unknown',
          country = 'Unknown',
          latitude = null,
          longitude = null,
          network = 'Unknown',
          org = 'Unknown',
          postal = 'Unknown',
          timezone = 'Unknown',
          continent_code = 'Unknown',
          country_code = 'Unknown',
          country_name = 'Unknown',
          country_population = 'Unknown',
          country_calling_code = 'Unknown',
          country_capital = 'Unknown',
          currency = 'Unknown',
          currency_name = 'Unknown',
          languages = 'Unknown',
          version = 'Unknown',
        } = ipData.data;

        const currentTime = new Date().toLocaleString();
        setVisitCount(visits);

        let newCount = visits;
        let updatedVisitorDetails = [...visitorDetails];

        if (!existingIPs.has(currentIP)) {
          newCount += 1;
          updatedVisitorDetails.push({
            ip: currentIP,
            city,
            region,
            country,
            longitude,
            latitude,
            network,
            org,
            postal,
            timezone,
            continent_code,
            country_code,
            country_name,
            country_population,
            country_calling_code,
            country_capital,
            currency,
            currency_name,
            languages,
            version,
            visitCount: 1,
            lastVisit: currentTime,
            totalSpentTime: '0 seconds', 
          });
        } else {
          updatedVisitorDetails = updatedVisitorDetails.map(detail => {
            if (detail.ip === currentIP) {
              return {
                ...detail,
                visitCount: detail.visitCount + 1,
                lastVisit: currentTime,
              };
            }
            return detail;
          });
        }

        await axios.put(
          `https://api.jsonbin.io/v3/b/${BIN_ID}`,
          {
            visits: newCount,
            visitorDetails: updatedVisitorDetails,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': API_KEY,
            },
          }
        );

        setVisitCount(newCount);
      } catch (error) {
        console.error('Error updating visit count and details:', error);
      }
    };

    updateVisitData();

    return () => {
      const sessionEndTime = Date.now();
      const timeSpent = Math.round((sessionEndTime - sessionStartTime) / 1000); 

      const updateTimeSpent = async () => {
        try {
          const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            headers: {
              'X-Master-Key': API_KEY,
            },
          });

          const { visitorDetails } = response.data.record;
          const ipData = await axios.get('https://ipapi.co/json/');
          const currentIP = ipData.data.ip;

          const updatedVisitorDetails = visitorDetails.map(detail => {
            if (detail.ip === currentIP) {
              // Convert existing totalSpentTime to seconds if it's not in seconds format
              const currentSpentTime = parseInt(detail.totalSpentTime) || 0;
              return {
                ...detail,
                totalSpentTime: `${currentSpentTime + timeSpent} seconds`, 
              };
            }
            return detail;
          });

          await axios.put(
            `https://api.jsonbin.io/v3/b/${BIN_ID}`,
            {
              visitorDetails: updatedVisitorDetails,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY,
              },
            }
          );
        } catch (error) {
          console.error('Error updating time spent:', error);
        }
      };

      updateTimeSpent();
    };
  }, [sessionStartTime]);

  return (
    <BrowserRouter>
      <div className="relative z-0">
      <Helmet>
          <title>Ujjwal's Personal Website</title>
          <meta name="description" content="Ujjwal's personal website showcasing portfolio, blog, and contact information." />
          <meta property="og:title" content="Ujjwal's Personal Website" />
          <meta property="og:description" content="Welcome to Ujjwal's personal website. Explore my portfolio, blog, and contact information." />
          <meta property="og:image" content="https://ujjwalx0.github.io/ujjwalx0-personal-site/" />
          <meta property="og:url" content="https://ujjwalx0.github.io/ujjwalx0-personal-site/#about" />
          <meta property="og:type" content="website" />
        </Helmet>
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
