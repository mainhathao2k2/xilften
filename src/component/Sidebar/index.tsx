import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faBars, faHeart, faHistory, faHouse, faStream } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Sidebar.module.scss';
import logo from '../../assets/logo.svg';

const cx = classNames.bind(styles);

interface MenuSidebar {
    id: string;
    icon: JSX.Element;
    name: string;
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
    },
    {
        id: 'wishlist',
        icon: <FontAwesomeIcon icon={faHeart} />,
        name: 'Yêu thích',
    },
    {
        id: 'history',
        icon: <FontAwesomeIcon icon={faHistory} />,
        name: 'Lịch sử',
    },
    {
        id: 'genres',
        icon: <FontAwesomeIcon icon={faStream} />,
        name: 'Thể loại',
    },
];

const Sidebar: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false); // Trạng thái thu gọn sidebar

    useEffect(() => {
        const getGenres = async () => {
            const res = await axios.get('https://ophim1.com//v1/api/the-loai');
            const genreList = res.data.data.items.map((item: Genre) => ({
                id: item._id,
                name: item.name,
            }));
            setGenres(genreList);
        };
        getGenres();
    }, []);

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <aside className={cx('sidebar', { collapsed: isCollapsed })}>
            <header className={cx('header')}>
                <ul className={cx('header-list')}>
                    <li onClick={handleToggle} className={cx('header-item', 'header-icon__wrapper')}>
                        <FontAwesomeIcon className={cx('header-icon')} icon={faBars} />
                    </li>
                    <li className={cx('header-item', 'header-logo__wrapper')}>
                        <img className={cx('header-logo')} src={logo} alt="logo" />
                    </li>
                </ul>
            </header>
            <nav className={cx('nav')}>
                <ul className={cx('nav-list')}>
                    {listNavigation.map((menu) => (
                        <li
                            className={cx(
                                'nav-item',
                                { 'nav-item--yellow': menu.id === 'home' },
                                { 'border-top': menu.id === 'genres' },
                            )}
                            key={menu.id}
                        >
                            <span className={cx('nav-item__icon')}>{menu.icon}</span>
                            <span className={cx('nav-item__name')}>{menu.name}</span>
                        </li>
                    ))}

                    {genres.map((genre, index) => (
                        <li className={cx('item-genre')} key={index}>
                            {genre.name}
                        </li>
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
