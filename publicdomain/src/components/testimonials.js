import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Patient',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
      avatar:
        'https://static.vecteezy.com/system/resources/previews/002/002/427/original/man-avatar-character-isolated-icon-free-vector.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Patient',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjv-LlSn3OR47vA5HF_uL2jN2ha-9ZymPMzA&usqp=CAU',
    },
    {
      id: 3,
      name: 'Jane Smith',
      position: 'Patient',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNI3kQLeYMnpy05PhEiuzS1rtRmNVL7VKvwcE4ACmQSQT1rRmUO5mHLyjH-mGHq0ueUQY&usqp=CAU',
    },
    // Add more testimonials here
  ];

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-heading">Testimonials</h2>
      <div className="testimonial-cards">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-avatar">
              <img src={testimonial.avatar} alt={testimonial.name} />
            </div>
            <div className="testimonial-content">
              <h5 className="testimonial-name">{testimonial.name}</h5>
              <p className="testimonial-position">{testimonial.position}</p>
              <p className="testimonial-text">{testimonial.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
