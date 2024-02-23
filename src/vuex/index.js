import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            user: null,
            profile: null,
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