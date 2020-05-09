import {observable} from 'mobx'


export class SelectModel{
    @observable
    currentView = "week";

    @observable
    dateToShowInDay = null;

}

export const selectModel = new SelectModel();
