import {eventModel} from "../models/EventModel";
import {userModel} from "../models/UserModel";

export async function loadEvents() {

    const response = await fetch('/api/users/' + userModel.user.id +'/events', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    eventModel.events = await response.json();

    eventModel.isPresent = true;
    eventModel.filter();
}
