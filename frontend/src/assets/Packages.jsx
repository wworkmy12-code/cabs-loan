import { useEffect, useRef, useState } from "react";
import styles from "./Packages.module.css";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    id: 1,
    name: "Basic",
    description: "Basic Starlink Plan",
    price: "ZMW 15.00",
    tag: "Basic",
  },
  {
    id: 2,
    name: "Standard",
    description: "Standard Starlink Plan",
    price: "ZMW 25.00",
    tag: "Standard",
  },
  {
    id: 3,
    name: "Premium Plan",
    description: "Premium Starlink Plan",
    price: "ZMW 45.00",
    tag: "Premium",
  },
  {
    id: 4,
    name: "Unlimited Plan",
    description: "Unlimited Starlink Plan",
    price: "ZMW 95.00",
    tag: "Unlimited",
  },
];

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const handlePackageSelect = (pkg) => {
    setShowPreview(true);
    // Handle package selection logic here (e.g., redirect to payment)
    console.log("Selected package:", pkg);
    setSelectedPackage(pkg);
  };
  return (
    <div className={styles.container}>
      {showPreview && <PackageCard selectedPackage={selectedPackage} />}
      <div className={styles.intro}>
        <h1>Join the Shared Satellite Network</h1>
        <p>
          Experience the future of connectivity with our Shared Satellite
          Network. Using advanced Crowdsharing Technology, we deliver high-speed
          Starlink data directly to your smartphone, anywhere in Zambia. Choose
          your plan and join the network instantly using MTN MoMo.
        </p>
      </div>

      <div className={styles.header}>
        <span className={styles.icon}>🛍️</span>
        <h2>Select Your Plan</h2>
      </div>

      <div className={styles.cards}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={styles.card}
            onClick={() => handlePackageSelect(pkg)}
          >
            <div className={styles.cardTop}>
              <h3>{pkg.name}</h3>
              <span className={styles.tag}>{pkg.tag}</span>
            </div>

            <p className={styles.description}>{pkg.description}</p>

            <div className={styles.price}>
              {pkg.price}
              <span className={styles.month}> /month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackageCard({ selectedPackage }) {
  const { name, description, price, tag } = selectedPackage || {};
  const [count, setCount] = useState(6);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  useEffect(() => {
    if (count === 1) {
      // navigate("/login");
    }
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [count]);
  return (
    <div className={styles.previewCard}>
      <img src="/momo.jpeg" alt="momo" />
      <div className={styles.previewCardTop}>
        <h3>{name}</h3>
        <span className={styles.tag}>{tag}</span>
      </div>

      <p className={styles.description}>{description} </p>

      <div className={styles.price}>
        {price}
        <span className={styles.month}> /month</span>
      </div>
      <div>
        <h1>Processing...</h1>
        <p>Securely redirecting for payments through MTN MoMo</p>
      </div>
    </div>
  );
}
