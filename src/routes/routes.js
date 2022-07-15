import WithBarLayout from '@/layout/WithBarLayout';
import Details from '@/pages/Details/Details';
import Explore from '@/pages/Explore/Explore';
import History from '@/pages/History/History';
import MainLayout from '../layout/MainLayout';
import FullLayout from '../layout/FullLayout';

import Home from '../pages/Home/Home';
import Watch from '@/pages/Watch/Watch';
import WatchLayout from '@/layout/WatchLayout';

export const publicRoutes = [
    { path: '/', page: Home, layout: MainLayout },
    {
        path: '/explore',
        page: Explore,
        layout: WithBarLayout,
    },
    {
        path: '/history',
        page: History,
        layout: WithBarLayout,
    },
    {
        path: '/:mediaType/:id',
        page: Details,
        layout: FullLayout,
    },
    {
        path: '/watch/:mediaType/:id',
        page: Watch,
        layout: WatchLayout,
    },
];
