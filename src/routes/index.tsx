import Home from '../pages/Home';
import Detail from '../pages/Detail';
import History from '../pages/History';
import MoviePlayer from '../pages/MoviePlayer';
import Search from '../pages/Search';
import WatchList from '../pages/WatchList';

import DefaultLayout from '../component/layouts/DefaultLayout';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/detail', component: Detail, layout: DefaultLayout },
    { path: '/history', component: History, layout: DefaultLayout },
    { path: '/movieplayer', component: MoviePlayer, layout: DefaultLayout },
    { path: '/search', component: Search, layout: DefaultLayout },
    { path: '/watchlist', component: WatchList, layout: DefaultLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
