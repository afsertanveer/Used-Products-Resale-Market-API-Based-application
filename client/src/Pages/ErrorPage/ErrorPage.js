import React from 'react';
import { Link } from 'react-router-dom';
import erImg from '../../assets/404-Page/404_page_cover.jpg';
const ErrorPage = () => {
    return (
      <div>
        <h1 className="text-6xl p-24 text-center font-extrabold text-error">
          Go Back to <Link to='/' className='underline'>Home</Link>
        </h1>
        <img src={erImg} className="w-full" alt="" />
      </div>
    );
};

export default ErrorPage;