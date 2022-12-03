// import React from "react";
// import { Link } from "react-router-dom";
// import "./Header.scss";

// export default function Actions(props) {
//   return (
//     <nav>
//       <div className="guest-actions">
//         {!document.cookie && (
//           <Link to="/login">
//             <div>login</div>
//           </Link>
//         )}
//         {!document.cookie && (
//           <Link to="/signup">
//             <div>signup</div>
//           </Link>
//         )}
//         {document.cookie && <div onClick={props.toggleProfile}>profile</div>}
//         <Link to="/login">
//           {document.cookie && <div onClick={props.logOut}>logout</div>}
//         </Link>
//       </div>
//     </nav>
//   );
// }

// {
//   /* <div className="App">
//   <nav className="Navbar">
//     <Link to="/" onClick={props.toggleDashboard}>
//       <h2>teebo</h2>
//     </Link>
//     <ul>
//       <li>
//         <Link to="/login">login</Link>
//       </li>
//       <li>
//         <Link to="/projects">signup</Link>
//       </li>
//     </ul>
//   </nav>
//   // <div className="header-buttons"></div>
// </div>; */
// }
