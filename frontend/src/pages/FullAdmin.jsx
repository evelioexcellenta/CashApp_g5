import React from "react";
import Admin from "./Admin";
import Category from "./Category";

export default function Dashboard() {
  return (
    <div className="flex">
      <div className="p-4">
        <Admin />
      </div>
      <div className="p-4">
        <Category />
      </div>
    </div>
  );
}
