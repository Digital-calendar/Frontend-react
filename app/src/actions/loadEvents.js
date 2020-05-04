import {eventModel} from "../models/EventModel";
import {toJS} from "mobx";


export async function loadEvents() {

    const response = await fetch('/api/events/', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    eventModel.events = await response.json();
    console.log(toJS(eventModel.events));
    eventModel.filter();
    eventModel.periodFiltered("2020-05-01 00:00", "2020-05-30 09:00");
    eventModel.filteredEvents.forEach(event => {
        console.log(toJS(event));
    })
}
