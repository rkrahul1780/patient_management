import React, { useState } from 'react';
import './Home.css';
import { useDispatch } from 'react-redux';
import Testimonials from './testimonials';
import { createcontact } from '../actions';

const Home = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or data handling logic here
    dispatch(createcontact(formData));
    // Reset the form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  return (
    <div>
      {/* <AboutUs />
      <Service />
      <ContactUs /> */}
      <div className="about-us">
        <h2 className="title">About Us</h2>
        <div className="content">
          <p>
            Welcome to our Patient Management System! We are dedicated to
            providing a comprehensive and efficient solution for managing
            patient information in healthcare organizations.
          </p>
          <p>
            Our mission is to streamline the patient management process, enhance
            communication between healthcare providers, and ultimately improve
            the quality of patient care. With our system, healthcare
            professionals can easily access and update patient records, track
            medical history, schedule appointments, and collaborate seamlessly.
          </p>
          <p>
            Our team consists of highly skilled software developers and
            healthcare experts who understand the unique challenges faced by
            medical institutions. We have leveraged the latest web technologies,
            including React, to create a user-friendly and efficient platform.
          </p>
          <p>
            The Patient Management System is designed to be customizable and
            scalable, allowing it to adapt to the specific needs of any
            healthcare facility, whether it's a small clinic or a large
            hospital.
          </p>
          <p>
            We are committed to ongoing improvement and value feedback from our
            users. By continuously refining our system based on user suggestions
            and industry best practices, we strive to provide an exceptional
            experience for healthcare professionals and, ultimately, better
            patient outcomes.
          </p>
          <p>
            Thank you for choosing our Patient Management System. We are excited
            to be a part of your journey towards more efficient and effective
            patient care.
          </p>
        </div>
      </div>
      <div className="service">
        <h2 className="title">Our Services</h2>
        <div className="service-items">
          <div className="service-item">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4190/4190876.png"
              alt="Vaccination"
            />
            <h3>Vaccination</h3>
            <p>
              Stay up-to-date with immunizations. Our Patient Management System
              offers vaccination services to protect you and your loved ones
              from preventable diseases.
            </p>
          </div>
          <div className="service-item">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10299/10299472.png"
              alt="Consultation"
            />
            <h3>Consultation</h3>
            <p>
              Need medical advice? Our system provides convenient and secure
              online consultation services. Connect with healthcare
              professionals for expert guidance and support.
            </p>
          </div>
          <div className="service-item">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2350/2350520.png"
              alt="Cryptocurrency"
            />
            <h3>Billing with Cryptocurrency</h3>
            <p>
              Experience the future of healthcare payments. Our system supports
              billing and payment options through cryptocurrency, ensuring fast,
              secure, and decentralized transactions.
            </p>
          </div>
        </div>
      </div>
      <Testimonials />
      <div className="contact-us">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
