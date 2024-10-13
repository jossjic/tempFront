import { SetStateAction, useState } from "react";
import Bunnies from "./bunnies";
import BunniesStatic from "./bunnies-static";
import { useAuth } from "@lib/hooks/session/auth-context";

const BasicDashboard = () => {
  
  const { user, } = useAuth();
  
  return (
    <div className='min-h-screen flex flex-col'>
      <h1>Basic Dashboard</h1>
      <h2> Welcome {user?.email}</h2>
    </div>
  );
};

export default BasicDashboard;
