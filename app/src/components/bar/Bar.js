import React, { Component } from 'react';
import UserBar from './UserBar';
import MenuBar from './MenuBar';
import {monthModel} from "../../models/MonthModel";
import { selectModel } from '../../models/SelectModel';
import Week from "../calendar_week/Week";
import {observer} from "mobx-react";
import Calendar from '../calendar/Calendar';
import Modal from 'react-modal'
import UserEdit from "../UserEdit";
import {userModel} from "../../models/UserModel";


const customStyles = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,

    },
    content: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: '0 auto',
        width: '50%',
        padding: '0'
    }
};

@observer
class Bar extends Component {

    constructor(props) {
        super(props);
    }

    selectView() {
        switch (selectModel.currentView) {
            case 'month':
                return <Calendar/>;
            case 'week':
                return <Week/>;
            case 'day':
                //todo
            default:
                break;
        }
    }

    closeModal() {
        userModel.userEditIsOpen = false;
    }

    render() {
        monthModel.updateMonthInfo();

        return (
            <div>
              <Modal
                  style={customStyles}
                  isOpen={userModel.userEditIsOpen}
                  onRequestClose={this.closeModal}
              >
                  <UserEdit/>
              </Modal>
              <UserBar />
              <MenuBar />
              {this.selectView()}
          </div>
        );
    }
}

export default Bar;
