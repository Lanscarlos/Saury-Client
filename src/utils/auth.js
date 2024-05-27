// 尝试自动登录
import axios from "axios";

export function autoLogin() {
    const token = sessionStorage.getItem('tokenValue')
    console.log('getCookie: ' + token)
    if (token != null) {
        console.log('自动登录ing')
        axios.post(
            '/profile/get',
            {},
            {
                headers: {
                    'Authorization': token
                }
            }
        ).then((res) => {
            console.log('自动登录请求结果', res)
            if (res.data.code === 200) {
                // vuex.commit('updateUser', res.data.data)
                sessionStorage.setItem('user', res.data.data)
            }
        })
    }
}
