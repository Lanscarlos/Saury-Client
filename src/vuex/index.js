import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            // user: null,
            // profile: null,
            user: {
                email: 'lanscarlos@hotmail.com',
                password: '123456'
            },
            profile: {
                username: '卡洛',
                signature: '这个人很懒什么也没留下',
                avatar: 'https://avatars.githubusercontent.com/u/32390930?v=4',
                gender: -1,
                birthday: -1
            },
            cart: {
                id: 0,
                items: [],
                totalPrice: 0.0
            },
            /* 搜索结果 */
            search: null,
            orders: [],
            discount: [],
            order_item:[ ],
            order_id: 0,
            order_index: 0
        }
    }
})