import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import "./App.css";
import UpgradeInfo from "./UpgradeInfo.jsx";
import UpgradeShop from "./UpgradeShop.1.jsx";

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  // const (upgrade, setUpgrade) = useState(true);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      setCookies((currentCookies) => currentCookies + cps);
    }, 1000);

    // cleanup function
    return () => {
      clearInterval(myInterval);
      console.log("timer cleared");
    };
  }, []);

  function addCookie() {
    setCookies((currentCookies) => {
      return currentCookies + 1;
    });
  }

  // function toggleUpgradeInfo() {
  //   setShowInfo(!showInfo);
  // }

  // game reset
  function handleReset() {
    setCookies(0);
    setCps(1);
  }

  const upgrades = [
    {
      name: "Bronze",
      cost: 20,
      cpsIncrease: 3,
      buyFunction: () => {
        if (cookies >= 20) {
          setCps(cpc + 3);
          setCookies(cookies - 20);
        } else {
          alert("Insufficient cookies to buy Bronze Experience!");
        }
      },
    },
    {
      name: "Silver",
      cost: 100,
      cpsIncrease: 20,
      buyFunction: () => {
        if (cookies >= 100) {
          setCps(cps + 20);
          setCookies(cookies - 100);
        } else {
          alert("Insufficient cookies! Time to upgrade!");
        }
      },
    },
    {
      name: "Gold",
      cost: 500,
      cpsIncrease: 50,
      buyFunction: () => {
        if (cookies >= 500) {
          setCps(cps + 50);
          setCookies(cookies - 500);
        } else {
          alert("Insufficient cookies, upgrade again!");
        }
      },
    },
    {
      name: "Platinum",
      cost: 1000,
      cpsIncrease: 100,
      buyFunction: () => {
        if (cookies >= 1000) {
          setCps(cps + 100);
          setCookies(cookies - 1000);
        } else {
          alert("Insufficient cookies! Upgrade now!");
        }
      },
    },
    {
      name: "Island",
      cost: 10000,
      cpsIncrease: 200,
      buyFunction: () => {
        if (cookies >= 10000) {
          setCps(cps + 200);
          setCookies(cookies - 10000);
        } else {
          alert("You are a star!");
        }
      },
    },
  ];

  return (
    <div className="wrapper">
      <>
        <Header />
      </>
      <div>
        {/* {!userStats.addCookie ? ( */}
        <p className="cookie">
          <img
            onClick={addCookie}
            src="/Cookie-Download-PNG.png"
            alt="giant cookie"
          ></img>
        </p>
        <div>
          <p className="text">Cookies {cookies}</p>
          <p>
            <span className="text"> {cps}</span>
            {"cps"}
          </p>
        </div>
      </div>
      <div id="store">
        <UpgradeShop upgrades={upgrades} cookies={cookies} />
      </div>
      <button onClick={handleReset} id="reset">
        Reset
      </button>
    </div>
  );
}
