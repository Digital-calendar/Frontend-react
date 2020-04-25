import { observable, action } from 'mobx'


export class UserModel{
    @observable
    user = null;

    @observable
    users = [];

    @observable
    isNewUsersLoaded = false;

    @observable
    isPresent = false;

    @action
    dropLoadedFlag() {
        this.isNewUsersLoaded = false;
    }
}

export const userModel = new UserModel();
