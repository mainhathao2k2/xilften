import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const GenreList: React.FC<{ name: string; index: number }> = ({ name, index }) => {
    return (
        <>
            <li className={cx('item-genre')} key={index}>
                {name}
            </li>
        </>
    );
};

export default GenreList;
