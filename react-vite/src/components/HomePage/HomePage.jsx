import "./HomePage.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

export default HomePage;
