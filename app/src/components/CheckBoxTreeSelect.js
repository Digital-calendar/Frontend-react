import React, {Component} from "react";
import '../css/newEvent.css';
import {userModel} from "../models/UserModel";
import {selectModel} from "../models/SelectModel";
import {eventModel} from "../models/EventModel";
import {observer} from "mobx-react";
import {loadUsers} from "../actions/loadUsers";
<<<<<<< Updated upstream
=======

const positions = [
    {name: "Разработчик"},
    {name: "Дизайнер"},
    {name: "Ивент менеджер"},
    {name: "Менеджер"}
];
>>>>>>> Stashed changes

@observer
class CheckBoxTreeSelect extends Component {
    constructor(props) {
        super(props);
<<<<<<< Updated upstream
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
=======

        loadUsers();
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

        this.state = {
            options: [],
>>>>>>> Stashed changes
            checkedListAll: [],
            checkedDev: 0,
            checkedDes: 0,
            checkedEvMan: 0,
            checkedMan: 0,
            clickAtInput: false,
            ItemsChecked: false,
            firstClick: true,
            isCheckedDev: false,
            isCheckedDes: false,
            isCheckedEvMan: false,
            isCheckedMan: false
        };
    }

<<<<<<< Updated upstream
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
=======

    initializeOptions() {
        const newOptions = [];
        const items1 = [];
        const items2 = [];
        const items3 = [];
        const items4 = [];

        this.props.users.forEach(item => {
            if (item.position === positions[0].name) {
                items1.push({name: item.name, valueCheck: false});
            }
            else if (item.position === positions[1].name) {
                items2.push({name: item.name, valueCheck: false});
            }
            else if (item.position === positions[2].name) {
                items3.push({name: item.name, valueCheck: false});
            }
            else if (item.position === positions[3].name) {
                items4.push({name: item.name, valueCheck: false});
            }
        });
        newOptions.push({name: positions[0].name, items: items1});
        newOptions.push({name: positions[1].name, items: items2});
        newOptions.push({name: positions[2].name, items: items3});
        newOptions.push({name: positions[3].name, items: items4});

        this.setState({
            options: newOptions
        });
>>>>>>> Stashed changes
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
        if (this.props.users != null) {
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            const collection = [];

            if (checked) {
<<<<<<< Updated upstream
                for (const opt of options) {
                    for (const item of opt.items) {
                        collection.push(item.name);
=======
                for (const user of users) {
                    for (let opt of options) {
                        for (const item of opt.items) {
                            if (item.name === user.name) {
                                item.valueCheck = true;
                                collection.push(user.name);
                            }
                        }
>>>>>>> Stashed changes
                    }
                }
            }

            this.setState({
                checkedListAll: collection,
                ItemsChecked: checked,
                isCheckedDev: checked,
                isCheckedDes: checked,
                isCheckedEvMan: checked,
                isCheckedMan: checked
            });

            if (!checked) {
                for (const user of users) {
                    for (let opt of options) {
                        for (const item of opt.items) {
                            if (item.name === user.name) {
                                item.valueCheck = false;
                            }
                        }
                    }
                }
                this.setState({
                    checkedDev: 0,
                    checkedDes: 0,
                    checkedEvMan: 0,
                    checkedMan: 0,
                })
            }

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    selectDev(e) {
        if (this.props.users != null) {
            let newCheckList = this.state.checkedListAll.splice();
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            const collection = [];
            let prevCheckedDev = this.state.checkedDev;

            if (checked) {
                for (const user of users) {
                    if (user.position === "Разработчик") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedDev;
                                    collection.push(user.name);
                                }
                            }
                        }
                    }
                }
                newCheckList = [...this.state.checkedListAll, collection];
                this.setState({
                    checkedDev: prevCheckedDev
                })
            } else {
                for (const user of users) {
                    if (user.position === "Разработчик") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedDev;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedDev: prevCheckedDev
                })
            }


            this.setState({
                checkedListAll: newCheckList,
                isCheckedDev: checked
            });

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    selectDes(e) {
        if (this.props.users != null) {
            let newCheckList = this.state.checkedListAll.splice();
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            const collection = [];
            let prevCheckedDes = this.state.checkedDes;

            if (checked) {
                for (const user of users) {
                    if (user.position === "Дизайнер") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedDes;
                                    collection.push(user.name);
                                }
                            }
                        }
                    }
                }
                newCheckList = [...this.state.checkedListAll, collection];
                this.setState({
                    checkedDes: prevCheckedDes
                })
            } else {
                for (const user of users) {
                    if (user.position === "Дизайнер") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedDes;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedDes: prevCheckedDes
                })
            }

            this.setState({
                checkedListAll: newCheckList,
                isCheckedDes: checked
            });

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    selectEvMan(e) {
        if (this.props.users != null) {
            let newCheckList = this.state.checkedListAll.splice();
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            const collection = [];
            let prevCheckedEvMan = this.state.checkedEvMan;

            if (checked) {
                for (const user of users) {
                    if (user.position === "Ивент менеджер") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedEvMan;
                                    collection.push(user.name);
                                }
                            }
                        }
                    }
                }
                newCheckList = [...this.state.checkedListAll, collection];
                this.setState({
                    checkedEvMan: prevCheckedEvMan
                })
            } else {
                for (const user of users) {
                    if (user.position === "Ивент менеджер") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedEvMan;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedEvMan: prevCheckedEvMan
                })
            }

            this.setState({
                checkedListAll: newCheckList,
                isCheckedEvMan: checked
            });

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    selectMan(e) {
        if (this.props.users != null) {
            let newCheckList = this.state.checkedListAll.splice();
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            const collection = [];
            let prevCheckedMan = this.state.checkedMan;

            if (checked) {
                for (const user of users) {
                    if (user.position === "Менеджер") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedMan;
                                    collection.push(user.name);
                                }
                            }
                        }
                    }
                }
                newCheckList = [...this.state.checkedListAll, collection];
                this.setState({
                    checkedMan: prevCheckedMan
                })
            } else {
                for (const user of users) {
                    if (user.position === "Менеджер") {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedMan;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedMan: prevCheckedMan
                })
            }

            this.setState({
                checkedListAll: newCheckList,
                isCheckedMan: checked
            });

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

<<<<<<< Updated upstream
=======
    getAllDev = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === "Разработчик") {
                collection.push(user.name);
            }
        }

        return collection;
    };

    getAllDes = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === "Дизайнер") {
                collection.push(user.name);
            }
        }

        return collection;
    };

    getAllEvMan = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === "Ивент менеджер") {
                collection.push(user.name);
            }
        }

        return collection;
    };

    getAllMan = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === "Менеджер") {
                collection.push(user.name);
            }
        }

        return collection;
    };

>>>>>>> Stashed changes
    handleCheckboxClick(e) {
        const { value, checked } = e.target;
        const { users } = this.props;
        const { options } = this.state;
        const collection = this.getAllItems();
        const collectionDev = this.getAllDev();
        const collectionDes = this.getAllDes();
        const collectionEvMan = this.getAllEvMan();
        const collectionMan = this.getAllMan();

        if (checked) {
<<<<<<< Updated upstream
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
=======
            for (const user of users) {
                switch (user.position) {
                    case "Разработчик":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedDev;
                                    ++prevCountChecked;
                                    this.setState({
                                        checkedDev: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: [...prevState.checkedListAll, value],
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedDev: collectionDev.length === this.state.checkedDev + 1,
                                    }));
                                }
                            }
                        }
                        break;
                    case "Дизайнер":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedDes;
                                    ++prevCountChecked;
                                    this.setState({
                                        checkedDes: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: [...prevState.checkedListAll, value],
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedDes: collectionDes.length === this.state.checkedDes + 1,
                                    }));
                                }
                            }
                        }
                        break;
                    case "Ивент менеджер":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedEvMan;
                                    ++prevCountChecked;
                                    this.setState({
                                        checkedEvMan: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: [...prevState.checkedListAll, value],
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedEvMan: collectionEvMan.length === this.state.checkedEvMan + 1,
                                    }));
                                }
                            }
                        }
                        break;
                    case "Менеджер":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedMan;
                                    ++prevCountChecked;
                                    this.setState({
                                        checkedMan: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: [...prevState.checkedListAll, value],
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedMan: collectionMan.length === this.state.checkedMan + 1,
                                    }));
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        } else {
            for (const user of users) {
                switch (user.position) {
                    case "Разработчик":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedDev;
                                    --prevCountChecked;
                                    this.setState({
                                        checkedDev: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: prevState.checkedListAll.filter(item => item !== value),
                                        ItemsChecked: false,
                                        isCheckedDev: false,
                                    }));
                                }
                            }
                        }
                        break;
                    case "Дизайнер":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedDes;
                                    --prevCountChecked;
                                    this.setState({
                                        checkedDes: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: prevState.checkedListAll.filter(item => item !== value),
                                        ItemsChecked: false,
                                        isCheckedDes: false,
                                    }));
                                }
                            }
                        }
                        break;
                    case "Ивент менеджер":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedEvMan;
                                    --prevCountChecked;
                                    this.setState({
                                        checkedEvMan: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: prevState.checkedListAll.filter(item => item !== value),
                                        ItemsChecked: false,
                                        isCheckedEvMan: false,
                                    }));
                                }
                            }
                        }
                        break;
                    case "Менеджер":
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedMan;
                                    --prevCountChecked;
                                    this.setState({
                                        checkedMan: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: prevState.checkedListAll.filter(item => item !== value),
                                        ItemsChecked: false,
                                        isCheckedMan: false,
                                    }));
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
>>>>>>> Stashed changes
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

    selectInputByName(name, selectDev, selectDes, selectEvMan, selectMan) {
        const { isCheckedDev, isCheckedDes, isCheckedEvMan, isCheckedMan } = this.state;
        if (name === "Разработчик") {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedDev}
                    onChange={selectDev}
                />{name}
            </div>
        }
        else if (name === "Дизайнер") {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedDes}
                    onChange={selectDes}
                />{name}
            </div>
        }
        else if (name === "Ивент менеджер") {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedEvMan}
                    onChange={selectEvMan}
                />{name}
            </div>
        }
        else if (name === "Менеджер") {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedMan}
                    onChange={selectMan}
                />{name}
            </div>
        }
    }

    changeClickAtInput() {
        if (this.state.firstClick)
        {
            this.initializeOptions();
        }
        this.setState({
            clickAtInput: !this.state.clickAtInput,
            firstClick: !this.state.firstClick
        });
    }

    render() {
        const { options, checkedListAll, ItemsChecked, isCheckedDev, isCheckedDes, isCheckedMan, isCheckedEvMan } = this.state;

        let content = this.state.clickAtInput
            ? <div className="dropdownList">
                <header>
                    <label className="selectAllLabel">
                        <input
                            type="checkbox"
                            checked={ItemsChecked}
                            onChange={this.selectItem.bind(this)}
                        />Выбрать всех
                    </label>
                </header>
                {options.map(opt => {
                    return (
                        <ItemCategory
                            {...opt}
                            ItemsChecked={ItemsChecked}
                            checkedListAll={checkedListAll}
                            isCheckedDev={isCheckedDev}
                            isCheckedDes={isCheckedDes}
                            isCheckedMan={isCheckedMan}
                            isCheckedEvMan={isCheckedEvMan}
                            handleCheckboxClick={this.handleCheckboxClick}
                            selectDev={this.selectDev.bind(this)}
                            selectDes={this.selectDes.bind(this)}
                            selectEvMan={this.selectEvMan.bind(this)}
                            selectMan={this.selectMan.bind(this)}
                            selectInputByName={this.selectInputByName.bind(this)}
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
            checkedListAll,
        } = this.props;

        const getItems = items.map(item => {
            return item;
        });

        return (

            <div className="category">
                <div className="categoryName">
                    <label className="text-style">
                        {this.props.selectInputByName(name, this.props.selectDev, this.props.selectDes, this.props.selectEvMan, this.props.selectMan)}
                    </label>
                </div>
                <ul className="childrenItem">
                    {getItems.map(item => {
                        return (
                            <li className="childrenItemCheckbox">
                                <Checkbox
                                    item={item}
<<<<<<< Updated upstream
                                    isChecked={checkedListAll.includes(item.name)}
=======
                                    isChecked={item.valueCheck}
                                    //isChecked={checkedListAll.includes(item.name)}
>>>>>>> Stashed changes
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
                    id={item.name}
                    className="text-style customCheckbox"
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