import { observable } from 'mobx'


export class SelectModel{
    @observable
    currentView = "month";

}

export const selectModel = new SelectModel();
