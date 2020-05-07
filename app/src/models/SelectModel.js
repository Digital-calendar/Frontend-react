import {observable} from 'mobx'


export class SelectModel{
    @observable
    currentView = "week";

}

export const selectModel = new SelectModel();
