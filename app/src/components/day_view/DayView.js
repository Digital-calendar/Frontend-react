import React, {Component} from "react";
import "../../css/dayView.css";

class DayView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="window">

                <div className="window__main">
                    <div className="window__mainWindow__BgTop">
                        <p className="window__mainWindow__BgTop__textTime">13:00</p>
                    </div>

                    <div className="window__mainWindow__content">
                        <p className="window__mainWindow__content__headline">
                            The quick brown fox jumped over the
                            lazy green
                            dog
                        </p>
                        <p className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </p>
                        <p className="window__mainWindow__content__time">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </p>
                        <p className="window__mainWindow__content__location">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </p>
                        <p className="window__mainWindow__content__email">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </p>
                        <div className="window__mainWindow__content__eventMark">
                            <p className="window__mainWindow__content__eventMark__privateEvent">Private event</p>
                            <p className="window__mainWindow__content__eventMark__externalEvent">External event</p>
                        </div>
                        <div className="window__mainWindow__content__buttons">
                            <button className="window__mainWindow__content__buttons__edit">
                                <img src={require("../../css/images/editButton.svg")}  alt="editButton" className="editButton"/>
                            </button>
                            <button className="window__mainWindow__content__buttons__trash">
                                <img src={require("../../css/images/trashButton.svg")}  alt="trashButton" className="trashButton"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="window__main">
                    <div className="window__mainWindow__BgTop">
                        <p className="window__mainWindow__BgTop__textTime">13:00</p>
                    </div>

                    <div className="window__mainWindow__content">
                        <p className="window__mainWindow__content__headline">
                            The quick brown fox jumped over the
                            lazy green
                            dog
                        </p>
                        <p className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </p>
                        <p className="window__mainWindow__content__time">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </p>
                        <p className="window__mainWindow__content__location">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </p>
                        <p className="window__mainWindow__content__email">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </p>
                        <div className="window__mainWindow__content__eventMark">
                            <p className="window__mainWindow__content__eventMark__privateEvent">Private event</p>
                            <p className="window__mainWindow__content__eventMark__externalEvent">External event</p>
                        </div>
                        <div className="window__mainWindow__content__buttons">
                            <button className="window__mainWindow__content__buttons__edit">
                                <img src={require("../../css/images/editButton.svg")}  alt="editButton" className="editButton"/>
                            </button>
                            <button className="window__mainWindow__content__buttons__trash">
                                <img src={require("../../css/images/trashButton.svg")}  alt="trashButton" className="trashButton"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="window__main">
                    <div className="window__mainWindow__BgTop">
                        <p className="window__mainWindow__BgTop__textTime">13:00</p>
                    </div>

                    <div className="window__mainWindow__content">
                        <p className="window__mainWindow__content__headline">
                            The quick brown fox jumped over the
                            lazy green
                            dog
                        </p>
                        <p className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live inns, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live inns, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live inns, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </p>
                        <p className="window__mainWindow__content__time">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </p>
                        <p className="window__mainWindow__content__location">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </p>
                        <p className="window__mainWindow__content__email">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </p>
                        <div className="window__mainWindow__content__eventMark">
                            <p className="window__mainWindow__content__eventMark__privateEvent">Private event</p>
                            <p className="window__mainWindow__content__eventMark__externalEvent">External event</p>
                        </div>
                        <div className="window__mainWindow__content__buttons">
                            <button className="window__mainWindow__content__buttons__edit">
                                <img src={require("../../css/images/editButton.svg")}  alt="editButton" className="editButton"/>
                            </button>
                            <button className="window__mainWindow__content__buttons__trash">
                                <img src={require("../../css/images/trashButton.svg")}  alt="trashButton" className="trashButton"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="window__main">
                    <div className="window__mainWindow__BgTop">
                        <p className="window__mainWindow__BgTop__textTime">13:00</p>
                    </div>

                    <div className="window__mainWindow__content">
                        <p className="window__mainWindow__content__headline">
                            The quick brown fox jumped over the
                            lazy green
                            dog
                        </p>
                        <p className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </p>
                        <p className="window__mainWindow__content__time">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </p>
                        <p className="window__mainWindow__content__location">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </p>
                        <p className="window__mainWindow__content__email">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </p>
                        <div className="window__mainWindow__content__eventMark">
                            <p className="window__mainWindow__content__eventMark__privateEvent">Private event</p>
                            <p className="window__mainWindow__content__eventMark__externalEvent">External event</p>
                        </div>
                        <div className="window__mainWindow__content__buttons">
                            <button className="window__mainWindow__content__buttons__edit">
                                <img src={require("../../css/images/editButton.svg")}  alt="editButton" className="editButton"/>
                            </button>
                            <button className="window__mainWindow__content__buttons__trash">
                                <img src={require("../../css/images/trashButton.svg")}  alt="trashButton" className="trashButton"/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default DayView;