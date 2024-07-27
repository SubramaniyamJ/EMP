import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css';
import Footer from './Footer.js';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="introduction">
        <h1>Welcome to ClassroomApp</h1>
        <p>ClassroomApp is designed to help you manage your classroom efficiently and effectively. Whether you're a teacher, student, or administrator, our app provides the tools you need to succeed.</p>
      </section>
      
      <section className="sample-photos">
        <h2>Features</h2>
        <div className="photo-gallery">
          <img src="./images/edu1.jpg" alt="Feature 1" />
          <img src="./images/edu2.jpg" alt="Feature 2" />
          <img src="./images/edu3.jpg" alt="Feature 3" />
          <img src="./images/edu4.jpg" alt="Feature 4" />
          <img src="./images/edu5.jpg" alt="Feature 5" />
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

      <section className="cta">
        <h2>Get Started Today</h2>
        <p>Sign up now and take the first step towards a more organized classroom experience.</p>
        <button className="cta-button">Sign Up</button>
      </section>

      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>Have any questions? Reach out to us at <a href="mailto:info@classroomapp.com">info@classroomapp.com</a></p>
      </section>
      <Footer/>
    </div>
  );
};

export default HomePage;

