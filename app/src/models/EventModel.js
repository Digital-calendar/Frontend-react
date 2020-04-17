import { observable, decorate, action } from 'mobx'


export const userModel = observable({

    user: null,

    isPresent: false,


});
