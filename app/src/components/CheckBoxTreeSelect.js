import React, {Component} from "react";
import '../css/newEvent.css';
import {userModel} from "../models/UserModel";
import {selectModel} from "../models/SelectModel";
import {eventModel} from "../models/EventModel";
import {observer} from "mobx-react";
import {loadUsers} from "../actions/loadUsers";

@observer
class CheckBoxTreeSelect extends Component {
    constructor(props) {
        super(props);
        loadUsers();
        this.initializeOptions();
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

        /*const options = eventModel.filters !== null ? this.props.options.filter(item => {
            const value = item.value.toUpperCase();
            let isOption = false;
            eventModel.filters.forEach(filter => {
                if (value === filter) {
                    isOption = true;
                }
            });
            return isOption;
        }) : this.props.options;*/

        this.state = {
            /*<-------- ПРИМЕР ПОЛЕЙ В ЧЕКБОКСЕ -------->
            * ДЛЯ ПРОСМОТРА ПРИМЕРА НУЖНО ЗАКОММЕНТИТЬ OPTIONS ВЫШЕ*/
            //options: this.initializeOptions(),
            options: [
                {
                    id: 1,
                    name: "DEVELOPER",
                    items: [
                        { name: "item 1"},
                        { name: "item 2"}
                    ]
                },
                {
                    id: 2,
                    name: "DESIGNER",
                    items: [
                        { name: "item 3"},
                        { name: "item 4"}
                    ]
                },
                {
                    id: 3,
                    name: "EVENT_MANAGER",
                    items: [{ name: "item 5"}]
                },
                {
                    id: 4,
                    name: "MANAGER",
                    items: [{ name: "item 6"}]
                }
            ], /*<-------- ПРИМЕР ПОЛЕЙ В ЧЕКБОКСЕ -------->*/
            checkedListAll: [],
            clickAtInput: false,
            ItemsChecked: false
        };
    }

    initializeOptions() {
        const positions = [
            {name: "DEVELOPER"},
            {name: "DESIGNER"},
            {name: "EVENT_MANAGER"},
            {name: "MANAGER"}
        ];

        let newOptions = [];

        newOptions = [
            {
                name: positions[0],
                items: [
                    userModel.users.map(user => {
                        if (user.position === positions[0])
                            return {name: user.toString()}
                    })
                ]
            },
            {
                name: positions[1],
                items: [
                    userModel.users.map(user => {
                        if (user.position === positions[1])
                            return {name: user.toString()}
                    })
                ]
            },
            {
                name: positions[2],
                items: [
                    userModel.users.map(user => {
                        if (user.position === positions[2])
                            return {name: user.toString()}
                    })
                ]
            },
            {
                name: positions[3],
                items: [
                    userModel.users.map(user => {
                        if (user.position === positions[3])
                            return {name: user.toString()}
                    })
                ]
            },
        ];

        console.log(newOptions)

        /*this.setState({
            options: newOptions
        })*/
    }

    selectedItems(e) {
        const { value, checked } = e.target;
        let { checkedListAll } = this.state;

        if (checked) {
            checkedListAll = [...checkedListAll, value];
        } else {
            checkedListAll = checkedListAll.filter(el => el !== value);
            if (this.state.ItemsChecked) {
                this.setState({
                    ItemsChecked: !this.state.ItemsChecked
                });
            }
        }
        this.setState({ checkedListAll });
    }

    selectItem(e) {
        if (this.state.options != null) {
            const { checked } = e.target;
            const { options } = this.state;
            const collection = [];

            if (checked) {
                for (const opt of options) {
                    for (const item of opt.items) {
                        collection.push(item.name);
                    }
                }
            }

            this.setState({
                checkedListAll: collection,
                ItemsChecked: checked
            });

            console.log(this.state.checkedListAll);

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    getAllItems = () => {
        const { options } = this.state;
        const collection = [];
        for (const opt of options) {
            for (const item of opt.items) {
                collection.push(item.name);
            }
        }

        return collection;
    };

    handleCheckboxClick(e) {
        const { value, checked } = e.target;
        const { checkedListAll } = this.state;

        if (checked) {
            const collection = this.getAllItems();
            this.setState(prevState => ({
                checkedListAll: [...prevState.checkedListAll, value],
                ItemsChecked: collection.length === prevState.checkedListAll.length + 1
            }));
        } else {
            this.setState(prevState => ({
                checkedListAll: prevState.checkedListAll.filter(item => item != value),
                ItemsChecked: false
            }));
        }

        this.loadToStorage(value);
        console.log(userModel.selectedUsers);
    }

    loadToStorage(value) {
        selectModel.isMoreDetailsClicked = false;
        this.setState({ value });
        if (this.props.isNewEvent) {
            userModel.selectedUsers = value;
        }
        if (this.props.isViewSelect) {
            selectModel.currentView = value;
            localStorage.setItem("currentView",JSON.stringify(selectModel.currentView));
            eventModel.isPresent = false;
            selectModel.isMoreDetailsClicked = false;
        }
        if (this.props.isFilter) {
            if (value !== null) {
                eventModel.filters = value.map(item => item.value.toUpperCase());
            } else {
                eventModel.filters = [];
            }
            localStorage.setItem("filters",JSON.stringify(eventModel.filters));
            eventModel.isPresent = false;
        }
    }

    changeClickAtInput() {
        this.setState({
            clickAtInput: !this.state.clickAtInput
        });
    }

    render() {
        const { options, checkedListAll, ItemsChecked } = this.state;

        let content = this.state.clickAtInput
            ? <div className="dropdownList">
                <header>
                    <label className="selectAllLabel">
                        <input
                            type="checkbox"
                            checked={ItemsChecked}
                            onClick={this.selectItem.bind(this)}
                        />Select all
                    </label>
                </header>
                {options.map(opt => { /*ВСТАВКА ПОЛЕЙ В ЧЕКБОКС*/
                    return (
                        <ItemCategory
                            {...opt}
                            ItemsChecked={ItemsChecked}
                            checkedListAll={checkedListAll}
                            handleCheckboxClick={this.handleCheckboxClick}
                        />
                    );
                })}
            </div>
            : null;

        return (
            <div className="checkboxTree">
                <input
                    className="textCheckboxGroups"
                    id="textCheckboxGroups"
                    value={checkedListAll}
                    type="text"
                    placeholder="Выберите группу"
                    readOnly={true}
                    onClick={() => this.changeClickAtInput()}
                    style={{borderColor: this.state.isDateRequired
                          ? 'rgba(201, 6, 52, 1)'
                          : 'rgba(0, 0, 0, 0.25)'}}
                />
                {content}
            </div>
        );
    }
}

class ItemCategory extends Component {
    render() {
        const {
            items,
            name,
            ItemsChecked,
            checkedListAll
        } = this.props;

        const getItems = items.map(item => {
            return item;
        });

        return (
            <div>
                <div className="categoryName">-{name}</div>
                <ul className="childrenItem">
                    {getItems.map(item => {
                        return (
                            <li className="childrenItemCheckbox">
                                <Checkbox
                                    item={item}
                                    isChecked={checkedListAll.includes(item.name)}
                                    handleCheckboxClick={this.props.handleCheckboxClick}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

class Checkbox extends Component {
    render() {
        const { item, isChecked } = this.props;

        return (
            <label>
                <input
                    type="checkbox"
                    value={item.name}
                    checked={isChecked}
                    onChange={this.props.handleCheckboxClick}
                />
                {item.name}
            </label>
        );
    }
}

export default CheckBoxTreeSelect;