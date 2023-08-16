
function Day(props: any) {
    return <td>{props.day}</td>;
}


function Total(props: any) {
    return <td className={"row-total"}>{props.value}</td>;
}


function TotalRow(props: any) {
    return (
        <tr>
            <td>{"Week total:"}</td>
            <td></td>
            <td></td>
            <td colSpan={2}><button onClick={props.handleClick} className={"reset"}>{"Clear All"}</button></td>
            <td>{props.totalWeekHours}</td>
        </tr>
    );
}

function TableHead() {
    return (
        <thead>
            <tr>
                <th>Day</th>
                <th>In</th>
                <th>Out</th>
                <th>In</th>
                <th>Out</th>
                <th>Total</th>
            </tr>
        </thead>
    );
}

export { Day, Total, TotalRow, TableHead }