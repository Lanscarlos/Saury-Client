
/* 设置 cookie */
export function setCookie(key, val, exdays) {
    console.log('setCookie: ' + key + ' -> '+ val)
    let date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = key + "=" + val + "; " + expires;
}

/* 获取 Cookie */
export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++)
    {
        let c = ca[i].trim();
        if (c.indexOf(name)===0) return c.substring(name.length, c.length);
    }
    return null;
}

export function removeCookie(cname) {
    setCookie(cname, '', -1);
}
