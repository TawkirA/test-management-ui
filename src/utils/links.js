import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
    {
        id: 1,
        text: 'all tests',
        path: '/',
        icon: <IoBarChartSharp />
    },
    {
        id: 2,
        text: 'add test',
        path: '/add-test',
        icon: <MdQueryStats />
    },
    {
        id: 3,
        text: 'add post',
        path: '/add-post',
        icon: <FaWpforms />
    },
    {
        id: 4,
        text: 'posts',
        path: '/posts',
        icon: <ImProfile />
    }
];

export default links

