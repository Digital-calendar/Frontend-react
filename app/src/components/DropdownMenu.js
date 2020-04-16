import React from 'react';
import {Link} from 'react-router-dom';
import vectors from '../css/images/3vectors.svg';
import vectorsRed from '../css/images/3vectors-red.svg';
import '../css/dropdown-menu.css';
import {userModel} from "../models/UserModel";
import {observer} from 'mobx-react';

let isRedirect = true;

@observer
class DropdownMenu extends React.Component {

    state = {
        displayMenu: false,
    };


    showDropdownMenu = event => {
        event.preventDefault();
        const image = document.getElementById("vector-image");
        if (image) {
            image.setAttribute("src", vectorsRed);
        }

        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    };

    hideDropdownMenu = event => {
        if (isRedirect) {
            const image = document.getElementById("vector-image");

            if (image) {
                image.setAttribute("src", vectors);
            }

            this.setState({displayMenu: false}, () => {
                document.removeEventListener('click', this.hideDropdownMenu);
            });
        }
    };

    onSignOut = event => {
        isRedirect = false;
    };

    render() {

        console.log(userModel.user);

        return (
            <div  className="dropdown" >
                <div className="cal-wind__auth-bar__employee" onClick={this.showDropdownMenu}>Employee</div>
                <img id="vector-image" className="cal-wind__auth-bar__employee-info-btn" alt="" src={vectors} onClick={this.showDropdownMenu}/>
                { this.state.displayMenu ? (
                        <ul>
                            <li className="cal-wind__auth-bar__employee-name"><Link to="#">{userModel.user.first_name}<br/>{userModel.user.last_name}</Link></li>
                            <li className="cal-wind__auth-bar__employee-position">backend developer</li>
                            <li className="cal-wind__auth-bar__employee-edit"><Link to="/user/edit">edit</Link></li>
                            <li className="cal-wind__auth-bar__employee-sing_out"><Link to="/login" onClick={this.onSignOut} style={{color: "#4F4F4F"}}>sign out</Link></li>
                        </ul>
                    ):
                    (
                        null
                    )
                }

            </div>

        );
    }
}

export default DropdownMenu;
