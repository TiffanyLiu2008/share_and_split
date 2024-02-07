import "./IndexPage.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function IndexPage() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

export default IndexPage;
