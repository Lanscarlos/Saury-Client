import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            // user: null,
            user: sessionStorage.getItem('user'),
            // user: {
            //     email: 'lanscarlos@hotmail.com',
            //     password: '123456'
            // },
            // profile: {
            //     username: '卡洛',
            //     signature: '这个人很懒什么也没留下',
            //     avatar: 'https://avatars.githubusercontent.com/u/32390930?v=4',
            //     gender: -1,
            //     birthday: -1
            // },
        }
    },
    mutations: {
        updateUser(state, user) {
            console.log('updateUser', user)
            if (user != null) {
                state.user = user
            }
        },
        updateProfile(state, profile) {
            if (profile != null) {
                state.user.profile = profile
            }
        }
    }
})