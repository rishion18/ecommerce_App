import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Carousel = ({navBar}) => {
  const arr = [
    'https://media.istockphoto.com/id/1411548867/vector/9-9-shopping-day-flash-sale-banner-template-design-special-offer-discount.jpg?s=2048x2048&w=is&k=20&c=uENdqb9IIvSA4Nh19jF7WxF67OcrL9n1Ed29FRE7d88=',
    'https://media.istockphoto.com/id/1353419432/vector/12-12-shopping-day-banner-template-design-special-offer-discount.jpg?s=2048x2048&w=is&k=20&c=75ghwsbxi3jJaVH-gbDdr0bwtUPw9AsksGxRuubw5eU=',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-poster-banner-template-design-1eedaa3e7b539967b4ac1329f09f1f7b_screen.jpg?ts=1708383635',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/black-friday-sale-ad-banner-design-template-ea5f34b3e34e3af63d4e072789d73af0_screen.jpg?ts=1637066335',
    'https://i.pinimg.com/originals/e4/a4/5c/e4a45cb6f4902f67710f69e57f38b847.png'
  ];

  const [active, setActive] = useState(1);

  const handlePrev = () => {
    setActive((prev) => (prev === 1 ? arr.length : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev % (arr.length)) + 1);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      handleNext()
    } , 5000)

    return () => {clearInterval(timerId)}
  })

  return (
    <div className="w-full flex justify-center">
      <div className={`w-[359px] md:w-[720px] lg:w-[1080px] h-[201px] md:h-[402px] lg:h-[603px] relative m-4 rounded-xl overflow-hidden ${navBar?'opacity-25':''}`}>
        <div className="w-full h-full flex transition ease-out duration-200" style={{ transform: `translateX(-${(active-1) * 100}%)` }}>
          {arr.map((item, idx) => (
            <img key={idx} src={arr[idx]} alt="img" className="object-cover w-full h-full rounded-xl" />
          ))}
        </div>
        <FaAngleLeft onClick={handlePrev} className="absolute top-1/2 transform -translate-y-1/2 mx-2 text-white cursor-pointer w-10 h-auto" />
        <FaAngleRight onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 mx-2 text-white cursor-pointer w-10 h-auto" />
      </div>
    </div>
  );
};

export default Carousel;
