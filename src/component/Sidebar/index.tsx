import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faHeart, faHistory, faHouse, faStream } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext, useRef, Suspense, lazy } from 'react';
import axios from 'axios';

import styles from './Sidebar.module.scss';
import { DefaultLayoutContext } from '../providers/DefaultLayoutProvider';
import { Link } from 'react-router';
const GenreList = lazy(() => import('./GenreList'));

const cx = classNames.bind(styles);

interface MenuSidebar {
    id: string;
    icon: JSX.Element;
    name: string;
    slug: string;
}

interface Genre {
    _id: string;
    name: string;
    slug: string;
}

const listNavigation: Array<MenuSidebar> = [
    {
        id: 'home',
        icon: <FontAwesomeIcon icon={faHouse} />,
        name: 'Trang chủ',
        slug: '/',
    },
    {
        id: 'detail',
        icon: <FontAwesomeIcon icon={faHouse} />,
        name: 'Trang chủ',
        slug: '/detail',
    },
    {
        id: 'watchlist',
        icon: <FontAwesomeIcon icon={faHeart} />,
        name: 'Yêu thích',
        slug: '/watchlist',
    },
    {
        id: 'history',
        icon: <FontAwesomeIcon icon={faHistory} />,
        name: 'Lịch sử',
        slug: '/history',
    },
    {
        id: 'genres',
        icon: <FontAwesomeIcon icon={faStream} />,
        name: 'Thể loại',
        slug: '',
    },
];

const Sidebar: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const context = useContext(DefaultLayoutContext);
    const navRef = useRef<HTMLUListElement>(null);

    //handling scroll to top when width resizing
    useEffect(() => {
        const element = navRef.current;
        if (element) {
            const resizeObserver = new ResizeObserver(() => {
                navRef.current?.scroll({ top: 0 });
            });

            resizeObserver.observe(element);

            return () => resizeObserver.disconnect();
        }
    }, []);

    const getGenres = async () => {
        const res = await axios.get('https://ophim1.com//v1/api/the-loai');
        const genreList = res.data.data.items.map((item: Genre) => ({
            id: item._id,
            name: item.name,
        }));
        setGenres(genreList);
    };

    //fetch API get genres
    useEffect(() => {
        getGenres();
    }, []);

    return (
        <aside className={cx('sidebar', { collapsed: context?.isCollapsed })}>
            <nav className={cx('nav')}>
                <ul ref={navRef} className={cx('nav-list')}>
                    {listNavigation.map((menu) => (
                        <Link key={menu.id} to={menu.slug}>
                            <li
                                className={cx(
                                    'nav-item',
                                    { 'nav-item--yellow': menu.id === 'home' },
                                    { 'border-top': menu.id === 'genres' },
                                )}
                            >
                                <span className={cx('nav-item__icon')}>{menu.icon}</span>
                                <span className={cx('nav-item__name')}>{menu.name}</span>
                            </li>
                        </Link>
                    ))}

                    {genres.map((genre, index) => (
                        // <li key={index} className={cx('item-genre')}>
                        //     {genre.name}
                        // </li>
                        <Suspense key={index} fallback={<li className={cx('genre-item--loading')}></li>}>
                            <GenreList name={genre.name} index={index} />
                        </Suspense>
                    ))}
                </ul>
                <ul className={cx('account')}>
                    <li className={cx('account-setting')}>Account setting</li>
                    <li className={cx('account-name')}>id</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
