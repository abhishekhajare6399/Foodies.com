import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const HeroSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const banners: BannerSlide[] = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
      title: 'Delicious Burgers',
      description: 'Juicy and flavorful burgers made with premium ingredients.'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      title: 'Authentic Italian Pizza',
      description: 'Hand-tossed pizzas with the finest toppings and cheese.'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      title: 'Asian Noodles',
      description: 'Savor the authentic taste of Asia with our noodle specialties.'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      title: 'Spicy Indian Curries',
      description: 'Aromatic curries prepared with traditional spices and recipes.'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      title: 'Fresh & Healthy Salads',
      description: 'Nutritious salads made with locally sourced seasonal ingredients.'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  const scrollToRestaurants = () => {
    const section = document.getElementById('restaurants-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative mt-16 h-[400px] md:h-[500px] overflow-hidden">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {banners.map((banner) => (
          <div key={banner.id} className="h-full">
            <div className="relative h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
<div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white px-6 text-center">
               <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="max-w-2xl w-full"
>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6">
                    {banner.description}
                  </p>
                  <button
                    onClick={scrollToRestaurants}
                    className="btn btn-primary text-lg px-8 py-3"
                  >
                    Order Now
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Arrows */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-colors rounded-full p-2 backdrop-blur-sm text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-colors rounded-full p-2 backdrop-blur-sm text-white"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HeroSection;
