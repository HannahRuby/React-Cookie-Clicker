import React from "react";

export default function UpgradeShop({ upgrades, cookies }) {
  if (!upgrades || upgrades.length === 0) {
    return null;
  }
  return (
    <div>
      <h3>Let's go shopping...</h3>
      {upgrades.map((upgrades, index) => {
        // Check if the player has enough cookies to buy this upgrade
        const canBuy = cookies >= upgrades.cost;
        // If the player can buy the upgrade, render the button
        if (canBuy) {
          return (
            <button onClick={upgrades.buyFunction} key={index}>
              Buy {upgrades.name}for{upgrades.cost} cookies
            </button>
          );
        }
        // If the player can't buy the upgrade, render a disabled button
        return (
          <button disabled key={index}>
            Insufficient cookies to buy {upgrades.name} ({upgrades.cost} cookies
            required)
          </button>
        );
      })}
    </div>
  );
}
