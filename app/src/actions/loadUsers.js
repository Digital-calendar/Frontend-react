import {userModel} from "../models/UserModel";


export async function loadUsers() {

    const response = await fetch('/api/users/', {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(data);
    userModel.users = data;
    // data.map(item => {
    //     userModel.users.push(item);
    //     // userModel.users.push({
    //     //     id         : item.id,
    //     //     first_name : item.first_name,
    //     //     last_name  : item.last_name
    //     // });
    // });

    userModel.isNewUsersLoaded = true;
}
