import React from 'react';
import Navbar from '../../layout/dashboard/navbar';
import LiveGames from '../livegames';
import News from '../news';
import ChangePass from '../changepass';

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col h-screen">
      <Navbar />
        <div className="h-1/3 bg-light-blue-50 w-full">
          <div className='px-4'>
            <br />
            <LiveGames />
          </div>
        </div>
        <div className="h-2/3 bg-light-blue-100 w-full">
          <div className='px-4'>
            <br />
            <News />
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
