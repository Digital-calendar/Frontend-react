import {observable} from 'mobx'


export class SelectModel {
    @observable
    currentView = "month";

    @observable
    dateToShowInDay = null;

    @observable
    isMoreDetailsClicked = false;
}

export const selectModel = new SelectModel();
