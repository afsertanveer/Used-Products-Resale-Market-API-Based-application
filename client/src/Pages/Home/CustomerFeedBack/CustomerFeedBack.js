import React from 'react';
import people1 from '../../../assets/people/1.jpg';
import people2 from '../../../assets/people/2.jpg';
import people3 from '../../../assets/people/3.jpg';
import Review from './Review';
const CustomerFeedBack = () => {
        const reviews = [
          {
            _id: 1,
            name: "Khaled Mahmud Sujon",
            img: people1,
            review:
              "Wow What an authentic site it becomes. When I wanted to buy I was in doubt but wow I am pleased.",
            location: "Banani",
          },
          {
            _id: 2,
            name: "Shakib Al Hasan",
            img: people2,
            review:
              "Came here randomly and ends up buying a phone. Seller behavior is very good.",
            location: "Shatkhira",
          },
          {
            _id: 3,
            name: "Shakib Khan",
            img: people3,
            review:
              "I was looking for an IPhone to evaluate the performance. Came here randomly and bought one. Impressive",
            location: "Gulshan",
          },
        ];


    return (
      <section className="my-16">
        <div className='mb-8'>
          <h4 className="text-4xl text-secondary font-bold text-center mb-4">
            Top Feedback
          </h4>
        </div>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
          {reviews.map((review) => (
            <Review key={review._id} review={review}></Review>
          ))}
        </div>
      </section>
    );
};

export default CustomerFeedBack;