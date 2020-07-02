import {action, observable, toJS} from 'mobx'
import {monthModel} from "./MonthModel";


export class EventModel {

    @observable
    dayToCreate = '';

    @observable
    events = [];

    @observable
    filters = [];

    @observable
    isPresent = false;

    @observable
    filteredEvents = [];

    @observable
    dayEvents = [];

    @observable
    eventForEdit = null;

    @observable
    isNewEventModalOpen = false;

    @action
    filter() {
        if (this.filters === null) {
            this.filters = [];
        }
        this.filteredEvents = this.events
            .filter(event => {
                let isFilteredEvent = false;
                this.filters.forEach(filter => {
                    if (filter === 'OWN') {
                        isFilteredEvent = event.privateEvent || isFilteredEvent;
                    } else if (!event.privateEvent) {
                        isFilteredEvent = filter === event.eventType || isFilteredEvent;
                    }
                });
                return isFilteredEvent;
            });
        this.filteredEvents = this.filteredEvents.sort((a, b) =>
            (new Date(a.timestamp) > new Date(b.timestamp)) ? 1
                : ((new Date(b.timestamp) > new Date(a.timestamp)) ? -1 : 0));
    };
      
    @action
    makeDayEvents(date) {
        let dayString = date.getDate();
        if ((date.getDate() - 10) < 0) {
            dayString = '0' + dayString;
        }
        let monthString = date.getMonth() + 1;
        if ((date.getMonth() - 9) < 0) {
            monthString = '0' + monthString;
        }
        const formatDay = date.getFullYear() + '-' + monthString + '-' + dayString;
        this.dayEvents = this.filteredEvents
            .filter(event => {
                return event.timestamp_begin.startsWith(formatDay);
            })
    }

    @action
    formDayEvents(day) {
        let dayString = day;
        if ((day - 10) < 0) {
            dayString = '0' + dayString;
        }
        let monthString = monthModel.monthToDisplay + 1;
        if ((monthModel.monthToDisplay - 9) < 0) {
            monthString = '0' + monthString;
        }
        const formatDay = monthModel.yearToDisplay + '-' + monthString + '-' + dayString;
        this.dayEvents = this.filteredEvents
            .filter(event => {
                return event.timestamp_begin.startsWith(formatDay);
            })
    }
}

export const eventModel = new EventModel();

