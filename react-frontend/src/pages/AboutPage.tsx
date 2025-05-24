import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Clock, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Emily Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head Chef',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      name: 'Sarah Williams',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    {
      name: 'David Chen',
      role: 'Marketing Director',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-80 bg-neutral-800">
        <img
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
          alt="Food delivery"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Foodies</h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Connecting food lovers with the best restaurants since 2020
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-neutral-600 mb-4">
              Foodies was founded in 2020 with a simple mission: to connect food lovers with the best local restaurants. 
              What started as a small project in a college dorm room has grown into a platform serving thousands of 
              customers across multiple cities.
            </p>
            <p className="text-neutral-600 mb-4">
              Our founder Emily Johnson, a food enthusiast herself, was frustrated with the limited options and poor 
              user experience of existing food delivery services. She set out to build something better, focusing on 
              high-quality restaurants, reliable delivery, and a seamless user experience.
            </p>
            <p className="text-neutral-600">
              Today, Foodies partners with over 1,000 restaurants across the country, delivering delicious meals to 
              happy customers every day. We're proud of how far we've come, but we're just getting started.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg" 
              alt="Foodies team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-neutral-50 py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-neutral-600">
              At Foodies, we believe that good food brings people together. Our mission is to make 
              food ordering easy, fast and enjoyable, while supporting local businesses and ensuring 
              the highest quality of service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary-100 text-primary-500">
                <Award size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3">Quality First</h3>
              <p className="text-neutral-600">
                We partner with only the best restaurants that meet our strict quality standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary-100 text-primary-500">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
              <p className="text-neutral-600">
                We know time is valuable, so we ensure your food arrives hot and fresh, as quickly as possible.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary-100 text-primary-500">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3">Local Support</h3>
              <p className="text-neutral-600">
                We're proud to support local restaurants and help them reach more customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            The talented people behind Foodies who work tirelessly to bring you the best food ordering experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-500 py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to order delicious food?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who enjoy their favorite meals delivered straight to their door.
          </p>
          <Link 
            to="/"
            className="btn bg-white text-primary-500 hover:bg-neutral-100 px-8 py-3"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;