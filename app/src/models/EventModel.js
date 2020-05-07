import {observable, action} from 'mobx'
import {monthModel} from "./MonthModel";
import {userModel} from "./UserModel";


export class EventModel{

    @observable
    dayToCreate = '';

    @observable
    events = [];

    @observable
    filters = ['OWN', "EXTERNAL", "CORRESPONDENCE", "INTERNAL"];

    @observable
    isPresent = false;

    @observable
    filteredEvents = [];

    @observable
    dayEvents = [];

    @action
    filter() {
        this.filteredEvents = this.events
            .filter(event => {
                let isFilteredEvent = false;
                this.filters.forEach(filter => {
                    if (filter === 'OWN' && event.id === userModel.user.id) {
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
        // console.log('filtered', day, toJS(this.filteredEvents));
        const formatDay = monthModel.yearToDisplay + '-' + monthString + '-' + dayString;
        this.dayEvents = this.filteredEvents
            .filter(event => {
                return event.timestamp.startsWith(formatDay);
            })
    }

}

export const eventModel = new EventModel();

