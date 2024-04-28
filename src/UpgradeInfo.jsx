import App from "./App";
import UpgradeShop from "./UpgradeShop.1";

export default function ({ cost, name }) {
  if (myArray && myArray.lenght > 0) {
    return (
      <div className="individual-detail-box">
        <p className={name}>{cost}</p>{" "}
        <p className="upgrade-content">{content.length}</p>
      </div>
    );
  } else {
    return (
      <div className="individual-detail-box">
        <p className={name}>{cost}</p>{" "}
        <p className="upgrade-content">
          {content}
          {/* {suffix} */}
        </p>
      </div>
    );
  }
}
