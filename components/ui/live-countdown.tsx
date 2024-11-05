"use client";

import { useEffect, useState } from "react";

interface ILiveCountdown {
  endDate: number; // Assuming endDate is a timestamp
  showSeconds?: boolean;
}

export const LiveCountdown = ({
  endDate,
  showSeconds = true,
}: ILiveCountdown) => {
  const currentTime = new Date().getTime() / 1000; // in seconds
  const hasEnded = currentTime >= endDate;

  const calculateTimeLeft = () => {
    const difference = endDate - currentTime; // Both endDate and now are in seconds

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (60 * 60 * 24)),
        hours: Math.floor((difference / (60 * 60)) % 24),
        minutes: Math.floor((difference / 60) % 60),
        seconds: Math.floor(difference % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const padded = (unit: number) => unit.toString().padStart(2, "0");
    return `${padded(timeLeft.days)}d ${padded(timeLeft.hours)}h ${padded(
      timeLeft.minutes
    )}m ${showSeconds ? padded(timeLeft.seconds) + "s" : ""}`;
  };

  if (hasEnded) {
    return <div>Ended</div>;
  }

  return (
    <div className="flex flex-row space-x-1">
      <span className="text-muted-foreground uppercase text-sm">Ends in</span>
      <span className="text-foreground uppercase text-sm">
        {formatTimeLeft()}
      </span>
    </div>
  );
};
