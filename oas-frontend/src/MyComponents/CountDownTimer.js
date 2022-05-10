import React from 'react'

const CountDownTimer = (props) => {

    const [[ds, hrs, mins, secs], setTime] = React.useState([0, 0, 0, 0]);


    const tick = () => {
        const endingDate = new Date(props.endingDate.toLocaleString());
        const timeDifference = Math.abs(endingDate - Date.now());
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) - 1;
        const hoursDifference = (Math.ceil(timeDifference / (1000 * 60 * 60)) - (24 * daysDifference)) - 1;
        const minsDifference = ((Math.ceil(timeDifference / (1000 * 60)) - (60 * daysDifference * 24)) - (hoursDifference * 60)) - 1;
        const secsDifference = ((((Math.ceil(timeDifference / (1000)) - (60 * 60 * daysDifference * 24)) - (hoursDifference * 60 * 60))) - (60 * minsDifference)) - 1;
        setTime([daysDifference, hoursDifference, minsDifference, secsDifference])

    };


    React.useEffect(() => {
        tick()
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });


    return (
        <div>
            <p style={{ fontSize: "20px" }}><i className="fa fa-clock-o" ></i> &nbsp; {`${ds.toString().padStart(1, '0')} Days ${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
        </div>
    );
}

export default CountDownTimer