import React, { ClassAttributes, LegacyRef } from 'react'
import Row from './Row'
import { TotalRow } from './TableComponents'

type TBProps = {}
interface TBState {
    Sunday: number,
    Monday: number,
    Tuesday: number,
    Wednesday: number,
    Thursday: number,
    Friday: number,
    Saturday: number,
    weekTotal: number
    [key: string]: number
}
interface ITableBody {
    [key: string]: any
}


export default class TableBody extends React.Component<TBProps, TBState> implements ITableBody {
    constructor(props: TBProps) {
        super(props);
        this.state = {
            Sunday: 0,
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            weekTotal: 0
        }
        this.updateWeekTotal = this.updateWeekTotal.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.row1 = React.createRef<Row>();
        this.row2 = React.createRef<Row>();
        this.row3 = React.createRef<Row>();
        this.row4 = React.createRef<Row>();
        this.row5 = React.createRef<Row>();
        this.row6 = React.createRef<Row>();
        this.row7 = React.createRef<Row>();
    }

    //Christ just create the ref already
    public row1: any
    public row2: any
    public row3: any
    public row4: any
    public row5: any
    public row6: any
    public row7: any
    days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    updateWeekTotal(hours: number, day: string) {
        let total = 0;
        for (let i = 0; i < this.days.length; i++) {
            if (this.days[i] == day) {
                total += hours;
            }
            else {
                total += this.state[this.days[i]];
            }
        }
        this.setState({
            [day]: hours,
            weekTotal: total
        });
    }

    resetAll() {
        const times = Array.from(document.getElementsByTagName('input'));
        this.setState({
            Sunday: 0,
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            weekTotal: 0
        });
        times.forEach((input) => {
            input.value = '';
        });
        this.row1.current.setState({ firstShift: 0, secondShift: 0 })
        this.row2.current.setState({ firstShift: 0, secondShift: 0 })
        this.row3.current.setState({ firstShift: 0, secondShift: 0 })
        this.row4.current.setState({ firstShift: 0, secondShift: 0 })
        this.row5.current.setState({ firstShift: 0, secondShift: 0 })
        this.row6.current.setState({ firstShift: 0, secondShift: 0 })
        this.row7.current.setState({ firstShift: 0, secondShift: 0 })
    }

    render() {
        return (
            <tbody>
                <Row ref={this.row1} day={this.days[0]} onComplete={this.updateWeekTotal} dayTotal={this.state.Sunday} />
                <Row ref={this.row2} day={this.days[1]} onComplete={this.updateWeekTotal} dayTotal={this.state.Monday} />
                <Row ref={this.row3} day={this.days[2]} onComplete={this.updateWeekTotal} dayTotal={this.state.Tuesday} />
                <Row ref={this.row4} day={this.days[3]} onComplete={this.updateWeekTotal} dayTotal={this.state.Wednesday} />
                <Row ref={this.row5} day={this.days[4]} onComplete={this.updateWeekTotal} dayTotal={this.state.Thursday} />
                <Row ref={this.row6} day={this.days[5]} onComplete={this.updateWeekTotal} dayTotal={this.state.Friday} />
                <Row ref={this.row7} day={this.days[6]} onComplete={this.updateWeekTotal} dayTotal={this.state.Saturday} />
                <tr></tr>
                <TotalRow handleClick={this.resetAll} totalWeekHours={this.state.weekTotal} />
            </tbody>
        );
    }
}