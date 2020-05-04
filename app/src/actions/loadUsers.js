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
    userModel.users = data;
    userModel.isNewUsersLoaded = true;
}
