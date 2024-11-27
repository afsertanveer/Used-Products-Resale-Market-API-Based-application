import React from 'react';
import useTitle from './../../../hooks/useTitle';

const Dashboard = () => {
  useTitle('Dashboard')
    return (
      <div className="h-full flex justify-center items-center">
        <div>
          <h2 className="text-6xl text-center font-extrabold text-blue-800">
            Welcome to Dashboard
          </h2>
          <p className='m-10 text-center text-2xl text-secondary'>Please Select a category to proceed</p>
        </div>
      </div>
    );
};

export default Dashboard;