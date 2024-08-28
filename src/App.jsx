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

        // Set visit count from JSONBin
        setVisitCount(visits);

        if (!existingIPs.has(currentIP)) {
          const newCount = visits + 1;

          // Get cookies data
          const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            acc[name] = value;
            return acc;
          }, {});

          const browserInfo = {
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            hardwareConcurrency: navigator.hardwareConcurrency,
          };

          const screenInfo = {
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth,
          };

          const deviceMemory = navigator.deviceMemory || 'Unknown';

          const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          const networkInfo = connection ? {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
          } : 'No network information';

          const localStorageData = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            localStorageData[key] = localStorage.getItem(key);
          }

          const sessionStorageData = {};
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            sessionStorageData[key] = sessionStorage.getItem(key);
          }

          // Using FingerprintJS for browser fingerprinting
          const fingerprint = await new Promise((resolve) => {
            import('https://cdn.jsdelivr.net/npm/fingerprintjs@3/dist/fingerprint.min.js')
              .then(({ default: FingerprintJS }) => FingerprintJS.load())
              .then(fp => fp.get())
              .then(result => resolve(result.visitorId))
              .catch(() => resolve('Fingerprint not available'));
          });

          // Update the visit count and visitor details in JSONBin
          await axios.put(
            `https://api.jsonbin.io/v3/b/${BIN_ID}`,
            {
              visits: newCount,
              visitorDetails: [
                ...visitorDetails,
                {
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
                  browser: navigator.appName,
                  platform: navigator.platform,
                  userAgent: navigator.userAgent,
                  cookies: JSON.stringify(cookies), // Store cookies data as JSON string
                  browserInfo,
                  screenInfo,
                  deviceMemory,
                  networkInfo,
                  localStorageData,
                  sessionStorageData,
                  fingerprint,
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
        } else {
          // Update visitor details if they have changed
          const updatedVisitorDetails = visitorDetails.map(detail => {
            if (detail.ip === currentIP) {
              return {
                ...detail,
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
              };
            }
            return detail;
          });

          await axios.put(
            `https://api.jsonbin.io/v3/b/${BIN_ID}`,
            {
              visits,
              visitorDetails: updatedVisitorDetails,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY,
              },
            }
          );
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
