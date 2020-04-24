import { observable, computed } from 'mobx'


export class EventModel{
    @observable
    events = [];

    @observable
    filters = [];

    @observable
    isPresent;

    @computed
    get filteredEvents() {
        return this.events
            .filter(event => {
                let isFilteredEvent = false;
                this.filters.forEach(filter => {
                    isFilteredEvent = filter === event.eventType;
                });
                return isFilteredEvent;
            });
    };

}

export const eventModel = new EventModel();

