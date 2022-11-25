import React from "react";
import "./Header.css"

export default function Header() {
  return (
    <header>
      <img
        class="settings"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTR2LTRoLTMuMjNjLS4yMjktMS4wMDMtLjYyNC0xLjk0LTEuMTU2LTIuNzg1bDIuMjg2LTIuMjg2LTIuODMtMi44MjktMi4yODYgMi4yODZjLS44NDUtLjUzMi0xLjc4MS0uOTI4LTIuNzg0LTEuMTU2di0zLjIzaC00djMuMjNjLTEuMDAzLjIyOC0xLjk0LjYyNS0yLjc4NSAxLjE1N2wtMi4yODYtMi4yODYtMi44MjkgMi44MjggMi4yODcgMi4yODdjLS41MzMuODQ1LS45MjggMS43ODEtMS4xNTcgMi43ODRoLTMuMjN2NGgzLjIzYy4yMjkgMS4wMDMuNjI0IDEuOTM5IDEuMTU2IDIuNzg0bC0yLjI4NiAyLjI4NyAyLjgyOSAyLjgyOSAyLjI4Ni0yLjI4NmMuODQ1LjUzMSAxLjc4Mi45MjggMi43ODUgMS4xNTZ2My4yM2g0di0zLjIzYzEuMDAzLS4yMjggMS45MzktLjYyNCAyLjc4NC0xLjE1NmwyLjI4NiAyLjI4NiAyLjgyOC0yLjgyOS0yLjI4NS0yLjI4NmMuNTMyLS44NDUuOTI4LTEuNzgyIDEuMTU2LTIuNzg1aDMuMjMxem0tMTIgMmMtMi4yMDkgMC00LTEuNzkxLTQtNHMxLjc5MS00IDQtNCA0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNHoiLz48L3N2Zz4="
        alt="settings"
      >
      </img>

      <div class="logo-name">
        <img
          class="logo-image"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMuMTEyIDZsMi44ODgtMy4zNzUtLjc4MS0uNjI1LTMuMjE5IDMuNzUtMy4yMTktMy43NS0uNzgxLjYyNSAyLjg4OCAzLjM3NWgtMTAuODg4djE2aDI0di0xNmgtMTAuODg4em03Ljg4OCAxNGgtMTh2LTEyaDE4djEyem0tMi0xaC0xNHYtMTBoMTR2MTB6Ii8+PC9zdmc+"
          alt="logo"
        >
        </img>
        teeboo
      </div>

      <img 
        class="profile-icon"
        src="https://i.pinimg.com/474x/ce/9c/ab/ce9cab218f2849c81f230e4296fd120c.jpg"
        alt="profile"
      >
      </img>
    </header>
  );
}