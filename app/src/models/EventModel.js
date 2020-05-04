import {observable, action} from 'mobx'


export class EventModel{
    @observable
    events = [];

    @observable
    filters = ['OWN'];

    @observable
    isPresent = false;

    @observable
    filteredEvents = [];

    @action
    filter() {
        this.filteredEvents = this.events
            .filter(event => {
                let isFilteredEvent = false;
                this.filters.forEach(filter => {
                    if (filter === 'OWN') {
                        isFilteredEvent = event.privateEvent || isFilteredEvent;
                    } else {
                        isFilteredEvent = filter === event.eventType || isFilteredEvent;
                    }
                });
                return isFilteredEvent;
            });
    };

    @action
    periodFiltered(start, end) {
        this.filteredEvents = this.filteredEvents
            .filter(event => {
                return event.timestamp > start && event.timestamp < end;
            })
    }

}

export const eventModel = new EventModel();

