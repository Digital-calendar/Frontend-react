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

    eventModel.isPresent = true;
    eventModel.filter();
    console.log(toJS(eventModel.events));
}
