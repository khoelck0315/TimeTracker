import React from 'react'
import Time from './Time';


type ShiftProps = {
    position: string,
    onShiftEntry: CallableFunction
}

type ShiftState = {
    startTime: any,
    endTime: any
}

export default class Shift extends React.Component<ShiftProps, ShiftState> {
    constructor(props: ShiftProps) {
        super(props);
        //FIXME Did initializing with Date instead of number 0 hose it?
        this.state = {
            startTime: undefined,
            endTime: undefined,
        };
        this.calculateShift = this.calculateShift.bind(this);
        this.handleShiftEntry = this.handleShiftEntry.bind(this);
    }

    calculateShift(shift: Date, position: string) {

        switch (position) {
            case "endTime":
                if (shift.getTime() > this.state.startTime.getTime()) {
                    return shift.getTime() - this.state.startTime.getTime();
                }
                else {
                    shift.setHours(shift.getHours() + 12);
                    return shift.getTime() - this.state.startTime.getTime();
                }
                break;
            case "startTime":
                if (shift.getTime() > this.state.endTime.getTime()) {
                    let temp = this.state.endTime;
                    temp.setHours(temp.getHours() + 12);
                    return temp.getTime() - shift.getTime();
                }
                else {
                    return this.state.endTime.getTime() - shift.getTime();
                }
                break;
        }
    }

    handleShiftEntry(hours: number, minutes: number, position: string) {
        const shift = new Date(0, 0, 0, hours, minutes);
        //This used to be more efficient [position]: shift, but TS _hated_ it.
        if (position == 'startTime') {
            this.setState({
                startTime: shift
            })
        }
        else {
            this.setState({
                endTime: shift
            })
        }

        if (position == 'endTime' || typeof this.state.endTime != undefined) {
            let length = this.calculateShift(shift, position);
            this.props.onShiftEntry(length, this.props.position);
        }
    }

    render() {
        return (<>
            <Time position={"startTime"} onShiftEntry={this.handleShiftEntry} />
            <Time position={"endTime"} onShiftEntry={this.handleShiftEntry} />
        </>);
    }
}