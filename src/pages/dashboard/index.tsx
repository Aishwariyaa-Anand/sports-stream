import React from 'react';
import Navbar from '../../layout/dashboard/navbar';
//import LiveGames from '';
//import TrendingNews from '';

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col h-screen">
      <Navbar />
        { /*<div className="flex flex-grow">
        <div className="w-1/4 bg-gray-200">
          <LiveGames />
        </div>
        <div className="w-3/4">
          <TrendingNews />
        </div>
      </div> */ }
    </div>
  );
};

export default Dashboard;
