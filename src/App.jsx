import { useState, useEffect, useRef } from "react";
import Header from "./Header.jsx";
import "./App.css";

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [displayTotal, setDisplayTotal] = useState(0);
  const refCPS = useRef(0);
  const refTotal = useRef(0);
  const refOldTotal = useRef(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    refCPS.current = cps;
  }, [cps]);

  useEffect(() => {
    refTotal.current = cookies;
  }, [cookies]);

  useEffect(() => {
    // a timer to be created when the page loads to increase cookies by cps every second
    const myInterval = setInterval(() => {
      addCookie();
    }, 1000);

    const displayInterval = setInterval(() => {
      const diff = (refTotal.current - refOldTotal.current) / 10;
      refOldTotal.current += diff;
      setDisplayTotal(Math.floor(refOldTotal.current));
    }, 100);

    // to clean up my timer when I rerun the useEffect to i don't end up with a billion timers
    return () => {
      clearInterval(myInterval);
      clearInterval(displayInterval);
    };
  }, []);

  function addCookie() {
    // because this runs in a timer, we need to be more explicit about the previous value of the state variable
    setCookies((currentCookies) => {
      // local storage
      return currentCookies + refCPS.current;
    });
  }

  function buyBronze() {
    const bronzeCost = 20;

    if (cookies >= bronzeCost) {
      setCps(cps + 3);
      setCookies(cookies - bronzeCost);
    } else {
      alert("Insufficient cookies to buy Bronze Experience!");
    }
  }
  function buySilver() {
    const silverCost = 100;
    if (cookies >= silverCost) {
      setCps(cps + 20);
      setCookies(cookies - silverCost);
    } else {
      alert("Wow, you are smashed this!Time to upgrade!");
    }
  }

  function buyGold() {
    const goldCost = 500;
    if (cookies >= goldCost) {
      setCps(cps + 50);
      setCookies(cookies - goldCost);
    } else {
      alert("Don't stop,upgrade again!");
    }
  }

  function buyPlatinum() {
    const platinumCost = 1000;
    if (cookies >= platinumCost) {
      setCps(cps + 50);
      setCookies(cookies - platinumCost);
    } else {
      alert("OMG,you are on fire!Upgrade now!");
    }
  }

  function buyIsland() {
    const islandCost = 10000;
    if (cookies >= islandCost) {
      setCps(cps + 100);
      setCookies(cookies - islandCost);
    } else {
      alert("You are in Heaven!");
    }
  }

  function upGrades() {
    setShowInfo(!showInfo);
  }
  function resetCookies() {
    setCookies(setCookies - setCookies);
    setCps(0);
  }
  return (
    <div class="wrapper">
      <>
        <Header />
      </>
      <div>
        <p class="cookie">
          <img
            onClick={addCookie}
            src="/Cookie-Download-PNG.png"
            alt="giant cookie"
          ></img>
        </p>
        <p class="text">Cookies {displayTotal}</p>
        <p className="text"> {cps} cookies per second</p>
      </div>

      <div>
        <button onClick={upGrades} id="shop">
          Shop
        </button>
        {showInfo && (
          <div id="upGrades">
            {cookies >= 20 && (
              <button onClick={buyBronze}>Bronze Experience</button>
            )}
            {cookies >= 100 && (
              <button onClick={buySilver}>Silver Experience </button>
            )}
            {cookies >= 500 && (
              <button onClick={buyGold}>Gold Experience</button>
            )}
            {cookies >= 1000 && (
              <button onClick={buyPlatinum}>Platinum Experience</button>
            )}
            {cookies >= 10000 && (
              <button onClick={buyIsland}>Island Experience</button>
            )}
          </div>
        )}
        <button onClick={resetCookies} id="reset">
          Reset
        </button>
      </div>
    </div>
  );
}
