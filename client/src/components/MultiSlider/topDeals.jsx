import { Navigation, Pagination, Scrollbar, A11y, Virtual } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useGetTopDealsQuery } from "../../store/cartAsyncReducers"
import TopDealCard from "./topDealCard";

const TopDealsSlider = () => {

    const {data: topDeals , isLoading , isError} = useGetTopDealsQuery();
    console.log(topDeals)

    return (
        <div className=' w-4/5'>

        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y ,Virtual]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        virtual
        loop={true}
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        className=' w-full my-5'
        >
        {
           topDeals?.map((item , index) => 
            <SwiperSlide key={item.categoryName} virtualIndex={index}>
              <TopDealCard item={item}/>
            </SwiperSlide>
           )
        }
        </Swiper>

    </div>    )
}

export default TopDealsSlider