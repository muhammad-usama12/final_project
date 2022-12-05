// import React from "react";
// import { Link } from "react-router-dom";

// export default function Actions(props) {

//   return (
//     <>
//       <div className="guest-actions">
//         {!document.cookie && <Link key={1} to="/login">
//         <button className="pill-container">login</button>
//         </Link>}
//         {!document.cookie && <Link key={2} to="/signup">
//         <button className="pill-container">sign up</button>
//         </Link>}
//         {document.cookie && <Link key={3} to="/profile">
//           <button className="pill-container">
//             profile
//           </button>
//         </Link>}
//         {document.cookie && <Link key={4} to="/login">
//           <button className="pill-container" onClick={props.logout}>log out</button>
//         </Link>}

//       </div>
//     </>
//   );
// }
