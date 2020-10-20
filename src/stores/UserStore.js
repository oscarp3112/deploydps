import { extendObservable } from 'mobx';

class UserStore{
    constructor(){
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: '',
            role: ''
        })
    }
}

export default new UserStore();