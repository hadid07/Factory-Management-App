import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { House, People, Cart, Cash, BarChartFill, Box, GeoAltFill, BoxFill, CartDashFill, CashStack, CartFill, PeopleFill, HouseFill } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [Sidebarheight, setSidebarHeight] = useState(window.innerHeight);
  // const [active, setActive] = useState("dashboard");
  const Navigate = useNavigate();
  const Location = useLocation();
  const menuItems = [
    { key: "dashboard", icon: <HouseFill/>, label: "Dashboard",path: '/'},
    { key: "customers", icon: <PeopleFill />, label: "Customers" ,path:'/customers'},
    { key: "sales", icon: <CartFill />, label: "Sales", path:'/sales' },
    { key: "expenses", icon: <Cash />, label: "Expenses",path: '/expenses' },
    { key: "items", icon: <BoxFill />, label: "Items",path: '/items' },
    { key: "reports", icon: <BarChartFill />, label: "Reports",path: '/reports' },
    { key: "areas", icon: <GeoAltFill />, label: "Areas",path: '/areas' }
  ];

  return (
    <div className="ms-0" style={styles.sidebar}>
      {/* <h4 className="text-center text-white py-3"> Factory Management</h4> */}
      <Nav className="flex-column mt-3">
        {menuItems.map((item) =>{

          const isActive = Location.pathname === item.path;
          
          return(
            <Nav.Link
            key={item.key}
            onClick={() => {
              // setActive(item.key);
              Navigate(item.path);
              
            }}
            style={{
              ...styles.navItem,
              backgroundColor: isActive ? "#495057" : "transparent",
            }}
            className=" d-flex align-items-center text-white "
            >
            <span className="text-primary" style={{ marginRight: "10px" }}>{item.icon}</span>
            {item.label}
          </Nav.Link>
        )})} 
      </Nav>
    </div>
  );
}

const styles = {
  sidebar: {
    height: 'calc(100vh - 60px)', 
    width: "220px",
    backgroundColor: "#343a40",
    // position: "fixed",
    // top: 0,
    // left: 0,
    padding: "10px 0",
    // marginLeft: "10px",
  },
  navItem: {
    padding: "10px 20px",
    cursor: "pointer",
  },
};
