import {userModel} from "../models/UserModel";


export async function editUser(userEdit) {

    const response = await fetch('/api/users/edit', {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(userEdit),
        headers: {
            "Content-Type": "application/json"
        }
    });

    userModel.user = await response.json();
    localStorage.setItem("user",JSON.stringify(userModel.user));
    console.log(userModel.user);
}
