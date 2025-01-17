import React, { useEffect, useRef, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { DefaultLayoutContext } from '../../component/providers/DefaultLayoutProvider';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
    const contentRef = useRef<HTMLLIElement>(null);
    const context = useContext(DefaultLayoutContext);
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
    return (
        <main ref={contentRef} className={cx('wrapper')}>
            <div className={cx('slider')}>
                <div className={cx('content')}></div>
                <div className={cx('chanel-carousel')}>
                    <div className={cx('carousel')}></div>
                    <div className={cx('channel')}></div>
                </div>
            </div>
        </main>
    );
};

export default Home;
