import React from 'react';

type TimeProps = {
    position: string,
    onShiftEntry: CallableFunction
}

type TimeState = {
    hours: undefined | number,
    minutes: undefined | number,
    hoursEntered: boolean,
    minutesEntered: boolean,
    calculated: boolean
}

export default class Time extends React.Component<TimeProps, TimeState> {
    constructor(props: TimeProps) {
        super(props);
        this.state = {
            hours: undefined,
            minutes: undefined,
            hoursEntered: false,
            minutesEntered: false,
            calculated: false
        };

        //Remember to manually bind the functions to the class
        this.autoDetectHours = this.autoDetectHours.bind(this);
        this.autoDetectMinutes = this.autoDetectMinutes.bind(this);
    }


    //FIXME did I hose this with typescript?
    //Thanks typescript but the event typing isn't all that damn serious right now
    //FIXME See article about using a React Event type
    autoDetectHours(e: any) {
        const elem: HTMLInputElement = e.target;
        const numString: string = elem.value;
        const num: number = Number.parseInt(elem.value)

        if (numString.length == 2 || num > 1 || e.type == 'blur') {
            (elem.nextElementSibling! as HTMLInputElement).focus();
            this.setState({ hours: num, hoursEntered: true });
        }
        else {
            this.setState({ hoursEntered: false, calculated: false });
        }
    }


    autoDetectMinutes(e: any) {
        if (e.target.value.length == 2) {
            try {
                e.target.parentElement.nextElementSibling.firstChild.focus();
            }
            finally {
                this.setState({ minutes: e.target.value, minutesEntered: true });
            }
        }
        else {
            this.setState({ minutesEntered: false, calculated: false });
        }
    }

    componentDidUpdate() {
        if (this.state.minutesEntered == true && this.state.hoursEntered == true && this.state.calculated == false) {
            this.props.onShiftEntry(this.state.hours, this.state.minutes, this.props.position);
            this.setState({ calculated: true });
        }
    }

    render() {
        return (
            <td>
                <input
                    type={"tel"}
                    onInput={(e) => this.autoDetectHours(e)}
                    onBlur={(e) => this.autoDetectHours(e)}
                />
          :
                <input
                    type={"tel"}
                    onInput={(e) => this.autoDetectMinutes(e)}
                />
            </td>
        );
    }
}

