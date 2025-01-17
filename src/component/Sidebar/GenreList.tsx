import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

// interface Genre {
//     _id: string;
//     name: string;
//     slug: string;
// }

const GenreList: React.FC<{ name: string; index: number }> = ({ name, index }) => {
    // const [genres, setGenres] = useState<Genre[]>([]);

    // useEffect(() => {
    //     const getGenres = async () => {
    //         const res = await axios.get('https://ophim1.com//v1/api/the-loai');
    //         const genreList = res.data.data.items.map((item: Genre) => ({
    //             id: item._id,
    //             name: item.name,
    //         }));
    //         setGenres(genreList);
    //     };
    //     getGenres();
    // }, []);
    return (
        <>
            <li className={cx('item-genre')} key={index}>
                {name}
            </li>
        </>
    );
};

export default GenreList;
