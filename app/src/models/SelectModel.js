import { observable } from 'mobx'


export class SelectModel{
    @observable
    currentView = "week";

    @observable
    filterState = [];

}

export const selectModel = new SelectModel();
