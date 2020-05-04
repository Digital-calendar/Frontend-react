import { observable } from 'mobx'


export class SelectModel{
    @observable
    currentView = "month";

    @observable
    filterState = [];

}

export const selectModel = new SelectModel();
