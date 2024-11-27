import React from 'react';
import bannerImg from '../../../assets/banner/banner-img.jpg';
const Banner = () => {
    return (
      <section className="hero  bg-orange-600 mt-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={bannerImg}
            alt=""
            className=" lg:w-1/3 rounded-lg shadow-2xl "
          />
          <div className='lg:p-12'>
            <h1 className="text-3xl  mt-12 text-white">
              Welcome to <br />
              <span className="text-5xl font-extrabold lg:text-7xl text-white">
                BecheFel
              </span>
            </h1>
            <p className="py-6 text-white">
              You want to have new phone? Your budget is short! You are in the perfect place. Feel free to visit the site and buy your phone.
            </p>
          </div>
        </div>
      </section>
    );
};

export default Banner;

