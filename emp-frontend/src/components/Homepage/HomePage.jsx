import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from '@mui/material';
import homepage from '../images/homepage.jpg'


import Footer from './Footer.js';
const HomePage = () => {
  return (
    <div className="homepage">
      <section className='herocontainer'>
        <h1 className="hero-title">
          Welcome to EduManage!
        </h1>
        <div className='hero-img'><img src={homepage} alt='School Management'/></div>
        <h2 className="hero-subtitle">
          Revolutionizing School and College Management
        </h2>
        <Button variant='contained' color='secondary' className='getstartbtn'>Get Started</Button>
      </section>
      <section className="sample-photos">
        <h2>Features</h2>
          <div className="featurescontainer">
            <div className="feature">
              <h2>Admin Access</h2>
              <p>Full control over the platform, including class and department management, user roles, and system settings.</p>
            </div>
            <div className="feature">
              <h2>Teacher Tools</h2>
              <p>Create and manage classes, add and distribute notes, track and update attendance.</p>
            </div>
            <div className="feature">
              <h2>Student Profiles</h2>
              <p>Personalized profiles featuring basic details, attendance percentage, recent activity, grades, and more..</p>
            </div>
            <div className="feature">
              <h2>Class Management</h2>
              <p>Admins and teachers can oversee and manage their respective classes.</p>
            </div>
            <div className="feature">
              <h2>Notes and Materials</h2>
              <p>Students can easily access notes and materials provided by their teachers.</p>
            </div>
            <div className="feature">
              <h2>Future Parent Access</h2>
              <p> In future updates, parents will be able to monitor their children's activities, attendance, and performance.</p>
            </div>
        </div>
      </section>

      <section className="carousel-section">
        <h2>Educational Quotes</h2>
        <Carousel autoPlay interval={5000} transitionTime={1000} infiniteLoop showThumbs={false} showStatus={false}>
          <div>
            <img src="./images/edu1.jpg" alt="Quote 1" className="quote-image" />
            <p className="legend">"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
          </div>
          <div>
            <img src="./images/edu2.jpg" alt="Quote 2" className="quote-image" />
            <p className="legend">"The beautiful thing about learning is that no one can take it away from you." - B.B. King</p>
          </div>
          <div>
            <img src="./images/edu3.jpg" alt="Quote 3" className="quote-image" />
            <p className="legend">"Education is not preparation for life; education is life itself." - John Dewey</p>
          </div>
        </Carousel>
      </section>
      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial">
          <p>"ClassroomApp has revolutionized the way I manage my classes. Highly recommend!"</p>
          <span>- Jane Doe, Teacher</span>
        </div>
        <div className="testimonial">
          <p>"As a student, ClassroomApp helps me keep track of all my assignments and deadlines."</p>
          <span>- John Smith, Student</span>
        </div>
        <div className="testimonial">
          <p>"The best tool for administrators to oversee classroom activities efficiently."</p>
          <span>- Sarah Johnson, Admin</span>
        </div>
      </section>

      <section className="aboutus">
        <h2>About Us</h2>
          <p>
            EduManage is a cutting-edge school and college management platform designed to streamline educational administration. Our mission is to provide an intuitive and comprehensive solution that bridges the gap between students, teachers, administrators, and parents. Join us in revolutionizing education management and experience a seamless and efficient way to handle your educational institution's needs.
          </p>
      </section>
      <Footer />
    </div>
  );
};


export default HomePage;

