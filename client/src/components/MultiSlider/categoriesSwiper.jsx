
import { Navigation, Pagination, Scrollbar, A11y, Virtual } from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSelector } from 'react-redux';
import LandingPageCard from '../../reusables/landingPageCard';

const CategoriesSwiper = () => {
  const { allCategoriesAndSubcategories } = useSelector((state) => state.products);
  const swiper = useSwiper();


  return (
    <div className=' w-4/5 md:w-4/5 flex'>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y ,Virtual]}
        spaceBetween={0}
        slidesPerView={5}
        navigation={false}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        virtual
        updateOnWindowResize
        breakpoints={{
          200: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        className=' w-full my-5 '
        >
        {
            allCategoriesAndSubcategories?.map((item , index) => 
                <SwiperSlide key={item.categoryName} virtualIndex={index}>
                    <LandingPageCard name={item.categoryName}/>
                </SwiperSlide>)
        }
        </Swiper>
    </div>
  );
};

export default CategoriesSwiper;
