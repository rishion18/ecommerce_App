import { Navigation, Pagination, Scrollbar, A11y, Virtual } from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MainCarousal = () => {

    const arr = [
        'https://media.istockphoto.com/id/1353419432/vector/12-12-shopping-day-banner-template-design-special-offer-discount.jpg?s=2048x2048&w=is&k=20&c=75ghwsbxi3jJaVH-gbDdr0bwtUPw9AsksGxRuubw5eU=',
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-poster-banner-template-design-1eedaa3e7b539967b4ac1329f09f1f7b_screen.jpg?ts=1708383635',
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/black-friday-sale-ad-banner-design-template-ea5f34b3e34e3af63d4e072789d73af0_screen.jpg?ts=1637066335',
        'https://i.pinimg.com/originals/e4/a4/5c/e4a45cb6f4902f67710f69e57f38b847.png'
      ];

    return(
        <div className=' w-4/5  flex'>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y ,Virtual]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        virtual
        infinite
        loop={true}
        autoplay={{ delay: 1000 }}        
        className=' w-full my-10 mx-5'
        >
        {
            arr?.map((item , index) => 
                <SwiperSlide key={item} virtualIndex={index}>
                    <img key={index} src={arr[index]} alt="img" className="object-cover w-full h-full rounded-xl" />
                </SwiperSlide>)
        }
        </Swiper>
    </div>
    )
}

export default MainCarousal