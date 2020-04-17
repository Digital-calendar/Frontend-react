import { observable } from 'mobx'


export class UserModel{
    @observable
    user = null;

    @observable
    isPresent = false;
}

export const userModel = new UserModel();
