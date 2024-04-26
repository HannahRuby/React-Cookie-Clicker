import { useState, useEffect, useRef } from "react";

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
    if (cookies >= 20) {
      setCps(cps + 3);
      setCookies(cookies - 20);
    } else {
      alert(" We are just warming up,upgrade please!");
    }
  }
  function buySilver() {
    if (cookies >= 100) {
      setCps(cps + 20);
      setCookies(cookies - 100);
    } else {
      alert("Wow, you smashed it!Time to upgrade!");
    }
  }

  function buyGold() {
    if (cookies >= 250) {
      setCps(cps + 50);
      setCookies(cookies - 250);
    } else {
      alert("Time to upgrade!");
    }
  }

  function buyPlatinum() {
    if (cookies >= 1000) {
      setCps(cps + 50);
      setCookies(cookies - 1000);
    } else {
      alert("Time to upgrade again!");
    }
  }

  function buyIsland() {
    if (cookies >= 10000) {
      setCps(cps + 100);
      setCookies(cookies - 10000);
    } else {
      alert("Time to upgrade!");
    }
  }

  function upGrades() {
    setShowInfo(!showInfo);
  }
  function resetCookies() {
    setCookies(0);
    setCps(0);
  }
  return (
    <div class="wrapper">
      <div>
        <p class="cookie">
          <img
            onClick={addCookie}
            src="public/Cookie-Download-PNG.png"
            alt="giant cookie"
          ></img>
        </p>
        <p class="text">Cookies {displayTotal}</p>
        <p className="text"> {cps} cookies per second</p>
      </div>
      <div id="upGrades">
        {showInfo ? (
          <>
            <button onClick={buyBronze}>Bronze Experience</button>
            <button onClick={buySilver}>Silver Experience </button>
            <button onClick={buyGold}>Gold Experience</button>
            <button onClick={buyPlatinum}>Platinum Experience</button>
            <button onClick={buyIsland}>Island </button>
            <button onClick={resetCookies}>Reset</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
