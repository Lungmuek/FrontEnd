import React from "react";
import { useLocation } from "react-router-dom";
import All_navbar from "../components/All_navbar";

function TestComponent() {
  const location = useLocation();
  const title = new URLSearchParams(location.search).get("title");

  return (
    <div>
      <All_navbar />
      <h2>Test Component</h2>
      <p>Event Title: {title}</p>
    </div>
  );
}

export default TestComponent;
