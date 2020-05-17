import {eventModel} from "../models/EventModel";

export async function editEvent(data, id) {

    console.log(data);

    const response = await fetch('/api/events/' + id + '/edit', {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log(response.status);
    console.log(await response.json());
    if (response.ok) {
        eventModel.isNewEventModalOpen = false;
    }
}
