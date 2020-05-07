import {userModel} from "../models/UserModel";
import {toJS} from "mobx";


export async function editUser(userEdit) {

    console.log(1);
    const response = await fetch('/api/users/edit', {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(userEdit),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    userModel.user = data;
    localStorage.setItem("user", JSON.stringify(data));
    console.log(toJS(data));
    userModel.userEditIsOpen = false;
}
