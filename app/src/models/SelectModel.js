import { observable } from 'mobx'


export class SelectModel{
    @observable
    currentView = "day";

    @observable
    filterState = [];

}

export const selectModel = new SelectModel();
