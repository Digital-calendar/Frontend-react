import {eventModel} from "../models/EventModel";

export async function loadEvents() {

    const response = await fetch('/api/events/', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    // fetch('/api/events')
    //     .then(response => response.json())
    //     .then(data => eventModel.events = data);
    //
    // let newData = [];
    // new Promise((resolve, reject) => {
    //         const request = new XMLHttpRequest();
    //         request.open('GET', '/api/events', false);
    //
    //         request.addEventListener('readystatechange', () => {
    //             if (request.readyState === 4) {
    //                 if (request.status === 200 || request.status === 201) {
    //                     setTimeout(() => {
    //                         const result = request.responseText;
    //                         const parsedResult = JSON.parse(result);
    //                         resolve(parsedResult);
    //                     }, 1000);
    //
    //                 } else {
    //                     reject(new Error('httpService'));
    //                 }
    //             }
    //         });
    //         request.send();
    //     }).then(data => {
    //         data.forEach(item => {
    //             eventModel.events.push(item)
    //         })
    //     });

    // console.log(newData);
    // eventModel.events = newData;
    eventModel.events = await response.json();

    // console.log(toJS(eventModel.events));
    eventModel.filter();
    eventModel.periodFiltered("2020-05-01 00:00", "2020-05-30 09:00");
    console.log(eventModel.events);
    // eventModel.filteredEvents.forEach(event => {
    //     console.log(toJS(event));
    // })

    eventModel.isPresent = true;
}
