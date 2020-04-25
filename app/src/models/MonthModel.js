import { observable, computed, action } from 'mobx'
import moment from "moment";
import Week from "../components/calendar_week/Week"

export class MonthModel{

    @observable
    arrayWeek = []

    @observable
    monthStartWeekDay = -1;

    @observable
    monthEndWeekDay = -1;

    @observable
    monthDaysAmount = -1;

    @observable
    monthWeekAmount = -1;

    @observable
    currentDay = -1;

    @observable
    currentMonth = -1;

    @observable
    currentYear = -1;

    @observable
    monthToDisplay = -1;

    @observable
    relativeToCurrentMonthShift = 0;

    @observable
    isCurrent = false;

    @action
    isCurrentDay(day) {
        this.isCurrent = ((this.currentMonth === this.monthToDisplay) && (day === this.currentDay));
    }

    @action
    updateMonthInfo() {

        this.currentDay = parseInt(moment().date().toString());
        this.currentMonth = moment().toDate().getMonth();
        this.currentYear = moment().toDate().getFullYear();

        this.monthStartWeekDay = moment()
            .subtract(this.relativeToCurrentMonthShift,'month')
            .startOf('month')
            .days();

        this.monthEndWeekDay = moment()
            .subtract(this.relativeToCurrentMonthShift,'month')
            .endOf('month')
            .days();

        this.monthDaysAmount = moment()
            .subtract(this.relativeToCurrentMonthShift,'month')
            .startOf('month')
            .daysInMonth();



        let endWeek = moment()
            .subtract(this.relativeToCurrentMonthShift, 'month')
            .endOf('month').week();

        const startWeek = moment().subtract(this.relativeToCurrentMonthShift, 'month')
            .startOf('month').week();

        if (endWeek === 1) {

            console.log(moment().subtract(this.relativeToCurrentMonthShift, 'month')
                .endOf('month').week());

            console.log(moment().subtract(this.relativeToCurrentMonthShift, 'month')
                .endOf('month').subtract(7,'days').week());

            endWeek = moment().subtract(this.relativeToCurrentMonthShift, 'month')
                .endOf('month').subtract(7,'days').week() + 1;

        }
        this.monthWeekAmount = endWeek - startWeek + 1;


        if (this.monthStartWeekDay === 0) {
            this.monthStartWeekDay = 7;
            //because week in moment library start on Sunday, so if it's a last day we will get less weeks in month
            this.monthWeekAmount++;
        }
        if (this.monthEndWeekDay === 0) {
            this.monthEndWeekDay = 7;
            //because week in moment library start on Sunday, so if it's a last day we will get more weeks in month
            this.monthWeekAmount--;
        }
    }

    @action
    incrementRelative() {
        this.relativeToCurrentMonthShift--;
        monthModel.updateMonthInfo();
    }

    @action
    doubleIncrementRelative() {
        this.relativeToCurrentMonthShift = this.relativeToCurrentMonthShift - 2;
        monthModel.updateMonthInfo();
    }

    @action
    decrementRelative() {
        this.relativeToCurrentMonthShift++;
        monthModel.updateMonthInfo();
    }

}

export const monthModel = new MonthModel();
