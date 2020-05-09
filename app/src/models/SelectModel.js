import {observable} from 'mobx'


export class SelectModel{
    @observable
    currentView = "month";

    @observable
    dateToShowInDay = null;

}

export const selectModel = new SelectModel();
