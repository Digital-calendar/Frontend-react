import {eventModel} from "../models/EventModel";
import {userModel} from "../models/UserModel";

export async function deleteEvent(id) {

    const response = await fetch('/api/events/delete/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        return true
    } else {
        return false
    }

}
