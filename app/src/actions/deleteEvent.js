export async function deleteEvent(id) {

    const response = await fetch('/api/events/delete/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.ok;
}
