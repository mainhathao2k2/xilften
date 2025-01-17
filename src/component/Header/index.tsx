import './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import React, { useRef, useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.svg';
import { DefaultLayoutContext } from '../providers/DefaultLayoutProvider';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
    const context = useContext(DefaultLayoutContext);

    const menuToggle = useRef<HTMLLIElement>(null);

    return (
        <header className={cx('header', { transparent: context?.isTransparent })}>
            <ul className={cx('header-list')}>
                <li
                    ref={menuToggle}
                    onClick={context?.handleToggle}
                    className={cx('header-item', 'header-icon__wrapper')}
                >
                    <FontAwesomeIcon className={cx('header-icon')} icon={faBars} />
                </li>
                <li className={cx('header-item', 'header-logo__wrapper')}>
                    <img className={cx('header-logo')} src={logo} alt="logo" />
                </li>
            </ul>
        </header>
    );
};

export default Header;
