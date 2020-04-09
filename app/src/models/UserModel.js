import { observable } from 'mobx'

export interface UserInterface {
    id: number,
    email: string,
    pass: string,
    events: []
}

export class UserModel {

    @observable
    user: UserInterface = null;

    @observable
    isPresent: boolean = false;

}

export const userModel = new UserModel();
