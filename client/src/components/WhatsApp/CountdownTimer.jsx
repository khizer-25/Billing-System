import { useEffect, useState } from "react";

const CountdownTimer = ({ seconds = 5, onComplete }) => {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count <= 0) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="text-center mt-4">
      <p className="text-gray-600 font-medium">
        Opening Owner WhatsApp in
      </p>

      <h1 className="text-5xl font-bold text-[#3B2A20] mt-2">
        {count}
      </h1>
    </div>
  );
};

export default CountdownTimer;