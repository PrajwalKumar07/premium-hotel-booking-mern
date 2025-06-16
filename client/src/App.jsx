// import React from "react";
// import BookingApp from "./BookingApp";

// function App() {
//   return <BookingApp />;
// }

// export default App;

// App.js
import React, { useState, useEffect } from "react";
import BookingApp from "./BookingApp";
import "./App.css";

const backgrounds = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1350&q=80",
];

const App = () => {
  const [showBookingApp, setShowBookingApp] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!showBookingApp) {
      const interval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % backgrounds.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [showBookingApp]);

  // Update the body background on bgIndex change
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
  }, [bgIndex]);

  const handleGetStarted = () => {
    setShowBookingApp(true);
    // Optionally clear background image when booking app starts
    document.body.style.backgroundImage = "";
  };

  return (
    <div className="app-container">
      {!showBookingApp ? (
        <div className="intro-container">
          <h1 className="intro-title">Flabystaa</h1>
          <p className="intro-subtitle">
            To shape the future of luxury hospitality by crafting transcendent
            experiences that celebrate culture, evoke emotion, and create a
            global legacy of elegance — where every stay becomes a story, and
            every guest, a lifelong ambassador.
          </p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      ) : (
        <BookingApp />
      )}
    </div>
  );
};

export default App;
