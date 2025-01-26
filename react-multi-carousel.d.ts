declare module 'react-multi-carousel' {
    import { ReactNode } from 'react';
  
    interface CarouselProps {
      responsive: any;
      children?: ReactNode;
      infinite?: boolean
      autoPlay?: boolean,
      responsive?:object
    }
 
  
    const Carousel: React.FC<CarouselProps>;
    export default Carousel;
  }
  