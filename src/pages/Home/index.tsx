import React, { useEffect, useRef, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { DefaultLayoutContext } from '../../component/providers/DefaultLayoutProvider';
import axios from 'axios';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
    const contentRef = useRef<HTMLLIElement>(null);
    const context = useContext(DefaultLayoutContext);
    const [sliderImages, setSliderImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);

    const itemsToShow = 7; // Số lượng phần tử hiển thị trong carousel

    // Handle background header while web is scrolling
    useEffect(() => {
        const element = contentRef.current;

        const handleScroll = () => {
            if (element?.scrollTop === 0) {
                context?.setIsTransparent(true);
            } else {
                context?.setIsTransparent(false);
            }
        };

        element?.addEventListener('scroll', handleScroll);

        return () => {
            element?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Fetch slider images
    useEffect(() => {
        const moviesHomePage = async () => {
            const res = await axios.get('https://ophim1.com/v1/api/home');
            const items = res.data.data.items;

            // Lấy danh sách ảnh từ API
            const images = items.map((item: string) => `https://img.ophim.live/uploads/movies/${item.thumb_url}`);
            setSliderImages(images);
        };

        moviesHomePage();
    }, []);

    // Hàm xử lý bấm nút next
    const nextSlide = () => {
        if (currentIndex + itemsToShow < sliderImages.length) {
            setCurrentIndex((prevIndex) => prevIndex + itemsToShow - 2);
        }
    };

    // Hàm xử lý bấm nút prev
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - itemsToShow + 2);
        }
    };

    // Khi bấm vào một item trong carousel, thay đổi ảnh hiện tại trong slider
    const handleSelectMovie = (index: number) => {
        setSelectedImage(index);
    };

    return (
        <main ref={contentRef} className={cx('wrapper')}>
            <div
                style={{
                    backgroundImage: `url(${sliderImages[selectedImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className={cx('slider')}
            >
                {/* Carousel */}
                <div
                    className={cx('carousel')}
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
                        transition: 'transform 0.5s ease',
                    }}
                >
                    {sliderImages.map((image, index) => (
                        <div
                            onClick={() => handleSelectMovie(index)}
                            className={cx('carousel-item')}
                            key={index}
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                flex: '0 0 auto',
                                width: `${100 / itemsToShow}%`,
                            }}
                        ></div>
                    ))}
                </div>
                <button onClick={prevSlide} className={cx('slider-button', 'prev')} disabled={currentIndex === 0}>
                    &#10094;
                </button>
                <button
                    onClick={nextSlide}
                    className={cx('slider-button', 'next')}
                    disabled={currentIndex + itemsToShow >= sliderImages.length}
                >
                    &#10095;
                </button>
            </div>
        </main>
    );
};

export default Home;
