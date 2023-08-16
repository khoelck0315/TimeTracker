import React from 'react'
import Shift from './Shift'
import { Day, Total } from './TableComponents'

type RowProps = {
    day: string,
    dayTotal: string | number,
    onComplete: CallableFunction
}

type RowState = {
    firstShift: string,
    secondShift: string,
}

export default class Row extends React.Component<RowProps, RowState> {
    constructor(props: RowProps) {
        super(props);
        this.state = {
            firstShift: '0',
            secondShift: '0',
        }
        this.updateDayTotal = this.updateDayTotal.bind(this);
        this.timeConversion = this.timeConversion.bind(this);
    }

    timeConversion(ms: number): string {
        let seconds = ms / 1000;
        return (seconds / 3600).toFixed(2);
    }

    updateDayTotal(shift: number, position: string): void {
        let output = this.timeConversion(shift);
        let total;
        if (position == "firstShift") {
            total = Number.parseFloat(output) + Number.parseFloat(this.state.secondShift);
            this.setState({ secondShift: Number.parseFloat(output).toFixed(2) })
        }
        else {
            total = Number.parseFloat(output) + Number.parseFloat(this.state.firstShift);
            this.setState({ firstShift: Number.parseFloat(output).toFixed(2) })
        }

        this.props.onComplete(total, this.props.day);
        //State used to be set here before moving to if else statements above....puck?
    }

    render() {
        return (
            <tr>
                <Day day={this.props.day} />
                <Shift position={"firstShift"} onShiftEntry={this.updateDayTotal} />
                <Shift position={"secondShift"} onShiftEntry={this.updateDayTotal} />
                <Total value={this.props.dayTotal} />
            </tr>
        );
    }
}