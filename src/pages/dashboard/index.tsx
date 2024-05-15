import React from 'react';
import Navbar from '../../layout/dashboard/navbar';
import LiveGames from '../livegames';
//import TrendingNews from '';

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col h-screen">
      <Navbar />
        <div className="flex flex-grow">
          <div className="h-1/4 bg-light-blue-50 w-full">
            <div className='px-4'>
            <LiveGames />
            </div>
          </div>
        { /*
        <div className="w-3/4">
          <TrendingNews />
        </div>
        */ }
      </div> 
    </div>
  );
};

export default Dashboard;
