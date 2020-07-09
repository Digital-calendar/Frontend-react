export async function deleteEvent(id) {

    await fetch('/api/events/delete/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
