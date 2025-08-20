import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
const dayName = dateTime.toLocaleString('en-IN', { weekday: 'long' }); // e.g., Wednesday
const formattedDateTime = `${dayName} ${dateTime.toLocaleString('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'medium',
})}`;

  return (
    <div className="  navbar  d-flex justify-content-between px-4 py-2" style={{backgroundColor: "#343a40",height: "60px"}}>
      <h3 className="text-primary m-0 " style={{fontFamily:'monospace'}}>Aoun Soap Factory</h3>
      <div className="text-light">{formattedDateTime}</div>
    </div>
  );
};

export default Navbar;