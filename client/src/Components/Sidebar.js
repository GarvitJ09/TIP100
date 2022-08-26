// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// //import react pro sidebar components
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
// } from "react-pro-sidebar";
// //import icons from react icons
// import {
//   FaList,
//   FaUserSecret,
//   FaBullhorn,
//   FaArrowLeft,
//   FaArrowRight,
//   FaPowerOff,
// } from "react-icons/fa";
// import { FiHome } from "react-icons/fi";

// import { RiPencilLine } from "react-icons/ri";

// //import sidebar css from react-pro-sidebar module and our custom css
// import "react-pro-sidebar/dist/css/styles.css";
// // import "./sidebar.css";
// // import AddOperator from "./AddOperator";
// import { useDispatch } from "react-redux";
// import { authActions } from "./store";
// const Sidebar = () => {
// const dispatch = useDispatch();
// //create initial menuCollapse state using useState hook
// const [menuCollapse, setMenuCollapse] = useState(false);
// const [hide, setHide] = useState(FaArrowLeft);
// //create a custom function that will change menucollapse state from false to true and true to false
// const menuIconClick = () => {
//   //condition checking to change state from true to false and vice versa
//   if (menuCollapse) {
//     setMenuCollapse(false);
//     setHide(FaArrowLeft);
//   } else {
//     setMenuCollapse(true);
//     setHide(FaArrowRight);
//   }
// };

// const adminLogout = () => {
//   dispatch(authActions.logout());
// };

//   return (
//     <>
//       <div id="header" style={{ height: "100vh", position: "fixed" }}>
//         {/* collapsed props to change menu size using menucollapse state */}
//         <ProSidebar collapsed={menuCollapse}>
//           <SidebarHeader style={{ textAlign: "center", margin: "30px" }}>
//             <div className="logotext">
//               {/* small and big change using menucollapse state */}
//               <h3>{menuCollapse ? "Tip 100" : "Tip 100"}</h3>
//             </div>{" "}
//           </SidebarHeader>
//           <SidebarContent>
//             <Menu iconShape="square">
//               <MenuItem active={true} icon={<FiHome size={20} />}>
//                 <span>
//                   <Link to="/">Dashboard</Link>
//                 </span>
//               </MenuItem>
//               <MenuItem active={true} icon={<FaList size={20} />}>
//                 <span>
//                   <Link to="/tips">Tips</Link>
//                 </span>
//               </MenuItem>
//               <MenuItem active={true} icon={<RiPencilLine size={20} />}>
//                 <span>
//                   <Link to="/createalert">Create Alert</Link>
//                 </span>
//               </MenuItem>
//               <MenuItem active={true} icon={<FaUserSecret size={20} />}>
//                 <span>
//                   <Link to="/tippers">Tippers</Link>
//                 </span>
//               </MenuItem>
//               <MenuItem active={true} icon={<FaBullhorn size={20} />}>
//                 <span>
//                   <Link to="/alerts">Alerts</Link>
//                 </span>
//               </MenuItem>
//               <MenuItem active={true} icon={<FaPowerOff size={20} />}>
//                 <span>
//                   <Link to="/auth" onClick={adminLogout}>
//                     Logout
//                   </Link>
//                 </span>
//               </MenuItem>
//             </Menu>
//           </SidebarContent>

//           <SidebarFooter className="d-flex flex-row align-items-center justify-content-center">
//             <Menu>
//               <button onClick={menuIconClick}>{hide}</button>
//             </Menu>
//           </SidebarFooter>
//         </ProSidebar>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React from "react";
import {
  RiDashboardLine,
  RiShoppingCart2Line,
  RiUser3Line,
  RiAddFill,
  RiFileList3Line,
  RiPencilLine,
} from "react-icons/ri";
import {
  FaList,
  FaUserSecret,
  FaBullhorn,
  FaArrowLeft,
  FaArrowRight,
  FaPowerOff,
} from "react-icons/fa";
import { IoIosLaptop } from "react-icons/io";
import logo from "../Assets/logo.jpeg";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

function Sidebar() {
  const dispatch = useDispatch();
  const adminLogout = () => {
    dispatch(authActions.logout());
  };

  const history = useLocation();

  const isActive = (history, path) => {
    if (history.pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="sidebar-parent-div">
      <div className="sidebar-content-div">
        <div className="sidebar-logo-div">
          <img src={logo} alt="LOGO" />
        </div>
        <div className="sidebar-links-div">
          <Link to="/" className="sidebar-link">
            <div
              className={`sidebar-item ${isActive(history, "/") && "active"}`}
            >
              <RiDashboardLine className="sidebar-icon " />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/tips" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/tips") && "active"
              }`}
            >
              <FaList className="sidebar-icon" />
              <p>Tips</p>
            </div>
          </Link>
          <Link to="/alerts" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/alerts") && "active"
              }`}
            >
              <FaBullhorn className="sidebar-icon" />
              <p>Alerts</p>
            </div>
          </Link>
          {/* <Link to="/createalert" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/createalert") && "active"
              }`}
            >
              <RiPencilLine className="sidebar-icon" />
              <p>Create Alert</p>
            </div>
          </Link> */}
          <Link to="/tippers" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/tippers") && "active"
              }`}
            >
              <FaUserSecret className="sidebar-icon" />
              <p>Tippers</p>
            </div>
          </Link>
          <Link to="/auth" className="sidebar-link">
            <div onClick={adminLogout} className={`sidebar-item `}>
              <FaPowerOff className="sidebar-icon" />
              <p>Logout</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
