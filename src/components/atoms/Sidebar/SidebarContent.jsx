import React from "react";

const SidebarContent = () => {
  const matches = [
    { name: "Match 1", image: "image1.jpg" },
    { name: "Match 2", image: "image2.jpg" },
    // Ajoutez d'autres matchs ici
  ];

  return (
    <div className="sidebar-content">
      {matches.map((match, index) => (
        <div key={index} className="match-preview">
          <img src={match.image}  />
          <p>{match.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SidebarContent;
