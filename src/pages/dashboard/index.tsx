import React from 'react';
import Navbar from '../../layout/dashboard/navbar';
//import LiveGames from '';
//import TrendingNews from '';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        { /*<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1">
            <LiveGames />
          </div>
          <div className="col-span-2">
            <TrendingNews />
          </div>
        </div> */ }
      </div>
    </div>
  );
};

export default Dashboard;
