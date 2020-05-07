import React, {Component} from "react";
import "../../css/dayView.css";

class DayView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="window" style={{height: window.innerHeight - 80}}>

                <div className="window__empty"/>

                <div className="window__main">
                    <div className="window__mainWindow__BgTop">
                        <p className="window__mainWindow__BgTop__textTime">13:00</p>
                    </div>

                    <div className="window__mainWindow__content">
                        <div className="window__mainWindow__content__headline">
                            The quick brown fox jumped over the lazy green dog
                        </div>
                        <div className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </div>
                        <div className="window__mainWindow__content__eventMark_container">
                            <div className="window__mainWindow__content__eventMark privateEvent_border_color">Private event</div>
                            <div className="window__mainWindow__content__eventMark externalEvent_border_color">External event</div>
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
                        <div className="window__mainWindow__content__headline">
                            The quick brown fox jumped over the lazy green dog
                        </div>
                        <div className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </div>
                        <div className="window__mainWindow__content__eventMark_container">
                            <div className="window__mainWindow__content__eventMark privateEvent_border_color">Private event</div>
                            <div className="window__mainWindow__content__eventMark externalEvent_border_color">External event</div>
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
                        <div className="window__mainWindow__content__headline">
                            Very very very very very very very very very very very very very very
                            very very very very very very very very very very very very very very
                            long headline
                        </div>
                        <div className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </div>
                        <div className="window__mainWindow__content__eventMark_container">
                            <div className="window__mainWindow__content__eventMark privateEvent_border_color">Private event</div>
                            <div className="window__mainWindow__content__eventMark externalEvent_border_color">External event</div>
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
                        <div className="window__mainWindow__content__headline">
                            The quick brown fox jumped over the lazy green dog
                        </div>
                        <div className="window__mainWindow__content__description">
                            Far far away, behind the word
                            mountains, far
                            from the countries Vokalia and Consonantia, there live the blind texts. Separated they
                            live in
                            Bookmarksgrove right. A small river named Duden flows by their place and supplies it
                            with the
                            necessary
                            regelialia
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/timePin.svg")} alt="timePin" className="timePin"/> 27.02.2020 , 13:00
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/locationPin.svg")}  alt="locationPin" className="locationPin"/> St.
                            Petersburg,
                            Nevsky Prospect, 28.
                        </div>
                        <div className="window__mainWindow__content__info">
                            <img src={require("../../css/images/emailPin.svg")}  alt="emailPin"
                                 className="emailPin"/> exampleMail@mail.com ,
                            Your name.
                        </div>
                        <div className="window__mainWindow__content__eventMark_container">
                            <div className="window__mainWindow__content__eventMark privateEvent_border_color">Private event</div>
                            <div className="window__mainWindow__content__eventMark externalEvent_border_color">External event</div>
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

                <div className="window__empty"/>

            </div>

        );
    }
}

export default DayView;