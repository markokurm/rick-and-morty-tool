import React from "react";
import SceneList from "../components/SceneList";
import Navbar from "../components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container p-4">
        <SceneList />
      </div>
    </>
  );
}

export default App;
