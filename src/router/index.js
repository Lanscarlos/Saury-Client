import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage';
import Recommendation from "@/components/RecommendationPage";
import Profile from '../components/ProfilePage';
import Login from "@/components/LoginPage";
import Note from "@/components/NotePage";
import NotePublish from "@/components/NotePublishPage";
import Search from "@/components/SearchPage";
import Admin from "@/components/AdminPage";
import Orders from "@/components/OrdersPage";
import Follow from "@/components/FollowPage";
import Stars from "@/components/StarsPage";
import User from "@/components/UserPage";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/recommendation',
            name: 'recommendation',
            component: Recommendation
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/note/:id',
            name: 'note',
            component: Note
        },
        {
            path: '/search/:keyword',
            name: 'search',
            component: Search
        },
        {
            path: '/publish',
            name: 'publish',
            component: NotePublish
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders
        },
        {
            path: '/follow',
            name: 'follow',
            component: Follow
        },
        {
            path: '/stars',
            name: 'stars',
            component: Stars
        },
        {
            path: '/user/:id',
            name: 'user',
            component: User
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        }
    ]
});

export default router;