import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage';
import Recommendation from "@/components/RecommendationPage";
import Profile from '../components/ProfilePage';

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
        }
    ]
});

export default router;