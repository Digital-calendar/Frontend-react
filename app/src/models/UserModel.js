import { observable, decorate, action } from 'mobx'


export const userModel = observable({

    user: null,

    isPresent: false,


    // signIn = (userAuthData) => {
    //
    //     fetch('/api/users/sign_in', {
    //         method: "POST",
    //         body: JSON.stringify(userAuthData),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(response => {
    //         return response.json();
    //     }).then(data => {
    //         userModel.user = data;
    //         // console.log(userModel.user);
    //         // console.log(data);
    //     })
    // }
});

// export const userModel = new UserModel();
//
//
// decorate(UserModel, {
//     user: observable,
//     isPresent: observable,
// });
