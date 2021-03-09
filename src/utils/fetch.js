import axios from 'axios'
import qs from "qs"
import {Toast} from 'vant'
import router from '@/router'
// import {Notify} from 'vant'
import {Dialog} from 'vant';
import 'vant/lib/index.css'
let loadingCount = 0;

export const showLoading = () => {
    if (loadingCount <= 0) {
        Toast.loading({
            // mask: true,
            duration: 20000
        })
    }
    loadingCount++
};

export const hideLoading = () => {
    loadingCount--;
    if (loadingCount <= 0) {
        Toast.clear()
        loadingCount = 0
    }
};

let ssid = localStorage.getItem('ssid');

export default async (url, data, opt, isLoad = true) => {
	// return;
    if (isLoad) {
        showLoading();
    }
    
	if (url.indexOf("http") != -1 ) {
	}else{
		url = "https://demo.bcn5ln.cn/api"+url;
	}
    // url = "/api"+url;
	

	
    const set = {method: 'post', ...opt};
    /**const nowTime = Date.parse(new Date()) / 1000;
    var expireTime = parseInt(localStorage.getItem('expire_time'));
    const resetTime = parseInt(localStorage.getItem('reset_time'));

    if (!ssid || !expireTime || !resetTime || resetTime < nowTime) {
        await fetch('/api/api/config').then(res => {
            return res.json();
        }).then(res => {

            ssid = res.data.ssid;
            localStorage.setItem('ssid', ssid);
            localStorage.setItem('expire_time', parseInt(res.data.ssid_expire_time));
            expireTime = parseInt(res.data.ssid_expire_time);

        }).catch(() => {
            Dialog.alert({
                title: '提示',
                message: '网络错误，请重新打开APP'
            });
        });
    }
    localStorage.setItem('reset_time', nowTime + expireTime);**/
    var token = localStorage.getItem('token');
    return (set.method === 'post' ? axios.post(url, {...data, token}) : axios.get(url + '?' + qs.stringify({
        ...data,
        token
    }))).then(r => {

        if (isLoad) {
            hideLoading();
        }

        if (r.status === 200 && r.data.code) {
            return r.data;
        }

        if (r.data.code === 0) {
            return r.data;
        }

        throw {msg: '网络错误，请稍后重试'};

    }).then(r => {

        if (r.code === 1) {
            return r
        } else {
            if (r.code === 0) {
                throw {msg: r.info}
            }

            if (!r.code) {
                throw {msg: '网络错误，请稍后重试！'}
            }

            if (r.code === 406) {
                router.push('/firstsetpaypwd');
            }

            if (r.code === 405) {
                const current = {...router.currentRoute};
                router.push('/auth?redirect=' + current.path);
            }

            if (r.code === 403 || r.code === 401) {

                if (r.code === 401) {
                    localStorage.removeItem('token');
                }

                const current = {...router.currentRoute};
                if (current && current.path !== '/' && !(['/', '/reg', '/forgetpwd'].includes(current.path))) {
                    if (current.path !== '/login' && current.path !== '/tree') {
                        router.replace('/login??redirect=' + current.path)
                    }
                }
            }
        }

        throw r;

    }).catch(r => {
        if (isLoad) {
            hideLoading();
        }

        var message = '网络错误，请稍后或更换网络重试！';
        if (r.info) {
            message = r.info;
        }
		
		if (r.msg) {
		    message = r.msg;
		}

        if(r.msg == '还未添加收货地址'){
            Dialog.alert({
                title: '提示',
                message: message,
                showCancelButton: true,
                confirmButtonText: "去添加",
            }).then(() => {
                location.href = '#address';
                location.reload();
            }).catch(() => {
                
            })
            throw '';
            return;
        }

        if(isLoad){
            Dialog.alert({
                title: '提示',
                message: message
            });
        }
        //Notify(message);

        throw '';
    })
}