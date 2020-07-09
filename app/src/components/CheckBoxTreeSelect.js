import React, {Component} from "react";
import '../css/newEvent.css';
import {userModel} from "../models/UserModel";
import {selectModel} from "../models/SelectModel";
import {eventModel} from "../models/EventModel";
import {observer} from "mobx-react";
import {loadUsers} from "../actions/loadUsers";

const positions = [
    {name: "Разработчик", label: "DEVELOPER"},
    {name: "Дизайнер", label: "DESIGNER"},
    {name: "Ивент менеджер", label: "EVENT_MANAGER"},
    {name: "Менеджер", label: "MANAGER"}
];

@observer
class CheckBoxTreeSelect extends Component {
    constructor(props) {
        super(props);
        loadUsers();
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

        this.state = {
            options: [],
            checkedListAll: [],
            checkedListAllNames: [],
            checkedAll: 0,
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
            isCheckedMan: false,
        };
    }

    initializeOptions() {
        const newOptions = [];
        const items1 = [];
        const items2 = [];
        const items3 = [];
        const items4 = [];

        this.props.users.forEach(item => {
            if (item.position === positions[0].label) {
                items1.push({name: item.name, id: item.id, position: item.position, valueCheck: false});
            }
            else if (item.position === positions[1].label) {
                items2.push({name: item.name, id: item.id, position: item.position, valueCheck: false});
            }
            else if (item.position === positions[2].label) {
                items3.push({name: item.name, id: item.id, position: item.position, valueCheck: false});
            }
            else if (item.position === positions[3].label) {
                items4.push({name: item.name, id: item.id, position: item.position, valueCheck: false});
            }
        });
        newOptions.push({name: positions[0].name, items: items1});
        newOptions.push({name: positions[1].name, items: items2});
        newOptions.push({name: positions[2].name, items: items3});
        newOptions.push({name: positions[3].name, items: items4});

        this.setState({
            options: newOptions
        });
    }

    selectItem(e) {
        if (this.props.users != null) {
            const {checked} = e.target;
            const {users} = this.props;
            const {options} = this.state;
            const collection = [];
            let prevCheckedAll = this.state.checkedAll;
            let prevCheckedListAllNames = this.state.checkedListAllNames;

            if (checked) {
                for (const user of users) {
                    for (let opt of options) {
                        for (const item of opt.items) {
                            if (item.name === user.name) {
                                item.valueCheck = true;
                                ++prevCheckedAll;
                                collection.push({name: user.name, id: user.id, position: user.position});
                                prevCheckedListAllNames.push(user.name);
                            }
                        }
                    }
                }
            }

            console.log(prevCheckedListAllNames)

            this.setState({
                checkedAll: prevCheckedAll,
                checkedListAll: collection,
                checkedListAllNames: prevCheckedListAllNames,
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
                                --prevCheckedAll;
                                item.valueCheck = false;
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedListAllNames: [],
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
        console.log(userModel.selectedUsers)
    }

    selectDev(e) {
        if (this.props.users != null) {
            let prevCheckedListAllNames = this.state.checkedListAllNames;
            let prevCheckedAll = this.state.checkedAll;
            const collectionAll = this.getAllItems();
            let newCheckList = this.state.checkedListAll;
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            let prevCheckedDev = this.state.checkedDev;

            if (checked) {
                for (const user of users) {
                    if (user.position === positions[0].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedAll;
                                    ++prevCheckedDev;
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    prevCheckedListAllNames.push(user.name);
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedDev: prevCheckedDev
                })
            } else {
                for (const user of users) {
                    if (user.position === positions[0].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    prevCheckedListAllNames.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedDev;
                                    --prevCheckedAll;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedDev: prevCheckedDev
                })
            }

            this.setState({
                ItemsChecked: prevCheckedAll === collectionAll.length,
                checkedListAll: newCheckList,
                isCheckedDev: checked,
                checkedListAllNames: prevCheckedListAllNames
            });

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    selectDes(e) {
        if (this.props.users != null) {
            let prevCheckedListAllNames = this.state.checkedListAllNames;
            let prevCheckedAll = this.state.checkedAll;
            const collectionAll = this.getAllItems();
            let newCheckList = this.state.checkedListAll;
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            let prevCheckedDes = this.state.checkedDes;

            if (checked) {
                for (const user of users) {
                    if (user.position === positions[1].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedDes;
                                    ++prevCheckedAll;
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    prevCheckedListAllNames.push(user.name);
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedDes: prevCheckedDes
                })
            } else {
                for (const user of users) {
                    if (user.position === positions[1].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    prevCheckedListAllNames.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedDes;
                                    --prevCheckedAll;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedDes: prevCheckedDes
                })
            }

            this.setState({
                ItemsChecked: prevCheckedAll === collectionAll.length,
                checkedListAll: newCheckList,
                isCheckedDes: checked,
                checkedListAllNames: prevCheckedListAllNames
            });

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    selectEvMan(e) {
        if (this.props.users != null) {
            let prevCheckedListAllNames = this.state.checkedListAllNames;
            let prevCheckedAll = this.state.checkedAll;
            const collectionAll = this.getAllItems();
            let newCheckList = this.state.checkedListAll;
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            let prevCheckedEvMan = this.state.checkedEvMan;

            if (checked) {
                for (const user of users) {
                    if (user.position === positions[2].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedEvMan;
                                    ++prevCheckedAll;
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    prevCheckedListAllNames.push(user.name);
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedEvMan: prevCheckedEvMan
                })
            } else {
                for (const user of users) {
                    if (user.position === positions[2].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    prevCheckedListAllNames.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedEvMan;
                                    --prevCheckedAll;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedEvMan: prevCheckedEvMan
                })
            }

            this.setState({
                ItemsChecked: prevCheckedAll === collectionAll.length,
                checkedListAll: newCheckList,
                isCheckedEvMan: checked,
                checkedListAllNames: prevCheckedListAllNames
            });

            this.state.checkedListAll.forEach(item => {
                this.loadToStorage(item);
            });
        }
    }

    selectMan(e) {
        let prevCheckedListAllNames = this.state.checkedListAllNames;
        if (this.props.users != null) {
            let prevCheckedAll = this.state.checkedAll;
            const collectionAll = this.getAllItems();
            let newCheckList = this.state.checkedListAll;
            const { checked } = e.target;
            const { users } = this.props;
            const { options } = this.state;
            let prevCheckedMan = this.state.checkedMan;

            if (checked) {
                for (const user of users) {
                    if (user.position === positions[3].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = true;
                                    ++prevCheckedAll;
                                    ++prevCheckedMan;
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    prevCheckedListAllNames.push(user.name);
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedMan: prevCheckedMan
                })
            } else {
                for (const user of users) {
                    if (user.position === positions[3].label) {
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === user.name) {
                                    item.valueCheck = false;
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    prevCheckedListAllNames.splice(newCheckList.indexOf(user.name), 1);
                                    --prevCheckedMan;
                                    --prevCheckedAll;
                                }
                            }
                        }
                    }
                }
                this.setState({
                    checkedAll: prevCheckedAll,
                    checkedMan: prevCheckedMan
                })
            }


            this.setState({
                ItemsChecked: prevCheckedAll === collectionAll.length,
                checkedListAll: newCheckList,
                isCheckedMan: checked,
                checkedListAllNames: prevCheckedListAllNames
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

    getAllDev = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === positions[0].label) {
                collection.push(user.name);
            }
        }

        return collection;
    };

    getAllDes = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === positions[1].label) {
                collection.push(user.name);
            }
        }

        return collection;
    };

    getAllEvMan = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === positions[2].label) {
                collection.push(user.name);
            }
        }

        return collection;
    };

    getAllMan = () => {
        const { users } = this.props;
        const collection = [];
        for (const user of users) {
            if (user.position === positions[3].label) {
                collection.push(user.name);
            }
        }

        return collection;
    };

    handleCheckboxClick(e) {
        let prevCheckedListAllNames = this.state.checkedListAllNames;
        let prevCheckedAll = this.state.checkedAll;
        let newCheckList = this.state.checkedListAll;
        const { value, checked } = e.target;
        const { users } = this.props;
        const { options } = this.state;
        const collection = this.getAllItems();
        const collectionDev = this.getAllDev();
        const collectionDes = this.getAllDes();
        const collectionEvMan = this.getAllEvMan();
        const collectionMan = this.getAllMan();

        if (checked) {
            for (const user of users) {
                switch (user.position) {
                    case positions[0].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedDev;
                                    ++prevCountChecked;
                                    ++prevCheckedAll;
                                    prevCheckedListAllNames.push(value);
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedDev: prevCountChecked,
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedDev: collectionDev.length === this.state.checkedDev + 1,
                                        checkedListAllNames: prevCheckedListAllNames
                                    }));
                                }
                            }
                        }
                        break;
                    case positions[1].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedDes;
                                    ++prevCountChecked;
                                    ++prevCheckedAll;
                                    prevCheckedListAllNames.push(value);
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedDes: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedDes: collectionDes.length === this.state.checkedDes + 1,
                                        checkedListAllNames: prevCheckedListAllNames
                                    }));
                                }
                            }
                        }
                        break;
                    case positions[2].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedEvMan;
                                    ++prevCountChecked;
                                    ++prevCheckedAll;
                                    prevCheckedListAllNames.push(value);
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedEvMan: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedEvMan: collectionEvMan.length === this.state.checkedEvMan + 1,
                                        checkedListAllNames: prevCheckedListAllNames
                                    }));
                                }
                            }
                        }
                        break;
                    case positions[3].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && !item.valueCheck) {
                                    item.valueCheck = true;
                                    let prevCountChecked = this.state.checkedMan;
                                    ++prevCountChecked;
                                    ++prevCheckedAll;
                                    prevCheckedListAllNames.push(value);
                                    newCheckList.push({name: user.name, id: user.id, position: user.position});
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedMan: prevCountChecked
                                    });
                                    this.setState(prevState => ({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: collection.length === prevState.checkedListAll.length + 1,
                                        isCheckedMan: collectionMan.length === this.state.checkedMan + 1,
                                        checkedListAllNames: prevCheckedListAllNames
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
                    case positions[0].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedDev;
                                    --prevCountChecked;
                                    --prevCheckedAll;
                                    prevCheckedListAllNames.splice(prevCheckedListAllNames.indexOf(value), 1);
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedDev: prevCountChecked
                                    });
                                    this.setState({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: false,
                                        isCheckedDev: false,
                                        checkedListAllNames: prevCheckedListAllNames
                                    });
                                }
                            }
                        }
                        break;
                    case positions[1].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedDes;
                                    --prevCountChecked;
                                    --prevCheckedAll;
                                    prevCheckedListAllNames.splice(prevCheckedListAllNames.indexOf(value), 1);
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedDes: prevCountChecked
                                    });
                                    this.setState({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: false,
                                        isCheckedDes: false,
                                        checkedListAllNames: prevCheckedListAllNames
                                    });
                                }
                            }
                        }
                        break;
                    case positions[2].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedEvMan;
                                    --prevCountChecked;
                                    --prevCheckedAll;
                                    prevCheckedListAllNames.splice(prevCheckedListAllNames.indexOf(value), 1);
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedEvMan: prevCountChecked
                                    });
                                    this.setState({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: false,
                                        isCheckedEvMan: false,
                                        checkedListAllNames: prevCheckedListAllNames
                                    });
                                }
                            }
                        }
                        break;
                    case positions[3].label:
                        for (let opt of options) {
                            for (const item of opt.items) {
                                if (item.name === value && item.name === user.name && item.valueCheck) {
                                    item.valueCheck = false;
                                    let prevCountChecked = this.state.checkedMan;
                                    --prevCountChecked;
                                    --prevCheckedAll;
                                    prevCheckedListAllNames.splice(prevCheckedListAllNames.indexOf(value), 1);
                                    newCheckList.splice(newCheckList.indexOf(user.name), 1);
                                    this.setState({
                                        checkedAll: prevCheckedAll,
                                        checkedMan: prevCountChecked
                                    });
                                    this.setState({
                                        checkedListAll: newCheckList,
                                        ItemsChecked: false,
                                        isCheckedMan: false,
                                        checkedListAllNames: prevCheckedListAllNames
                                    });
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        this.loadToStorage(value);
        console.log(userModel.selectedUsers);
    }

    loadToStorage(value) {
        this.setState({ value });
        userModel.selectedUsers = this.state.checkedListAll;
    }

    selectInputByName(name, selectDev, selectDes, selectEvMan, selectMan) {
        const { isCheckedDev, isCheckedDes, isCheckedEvMan, isCheckedMan } = this.state;
        if (name === positions[0].name) {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedDev}
                    onChange={selectDev}
                />Разработчик
            </div>
        }
        else if (name === positions[1].name) {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedDes}
                    onChange={selectDes}
                />Дизайнер
            </div>
        }
        else if (name === positions[2].name) {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedEvMan}
                    onChange={selectEvMan}
                />Ивент менеджер
            </div>
        }
        else if (name === positions[3].name) {
            return <div>
                <input
                    type="checkbox"
                    checked={isCheckedMan}
                    onChange={selectMan}
                />Менеджер
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
        let selectedOption = this.state.selectedOption;
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
                    value={this.state.checkedListAllNames}
                    type="text"
                    placeholder="Выберите группу"
                    readOnly={true}
                    onClick={() => this.changeClickAtInput()}
                    style={{borderColor: this.state.isDateRequired
                          ? 'rgb(201,6,52)'
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
                                    isChecked={item.valueCheck}
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