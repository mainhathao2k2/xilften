import Home from '../pages/Home';
import Detail from '../pages/Detail';
import History from '../pages/History';
import MoviePlayer from '../pages/MoviePlayer';
import Search from '../pages/Search';
import WatchList from '../pages/WatchList';

import HomeLayout from '../component/layouts/HomeLayout';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/detail', component: Detail, layout: null },
    { path: '/history', component: History, layout: null },
    { path: '/movieplayer', component: MoviePlayer, layout: null },
    { path: '/search', component: Search, layout: null },
    { path: '/watchlist', component: WatchList, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
