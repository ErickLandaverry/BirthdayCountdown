import React, { Component } from 'react';

class Clock extends Component {

    constructor(props) {
        super(props)
        this.timer=0
        this.birthday = props.birthdayFormState.startDate.toString();
        this.getTimeRemaining = this.getTimeRemaining.bind(this);
        this.noBirthYear = new Date(this.birthday).getFullYear() == new Date().getFullYear()

        this.state = {
            timeRemaining: this.getTimeRemaining(props.birthdayFormState.startDate.toString())
        }
    }

    getTimeRemaining(birthday) {
        var bday = new Date(birthday);
        var today = new Date();

        const currentMonth = today.getMonth();
        const birthMonth = bday.getMonth();

        if(birthMonth > currentMonth){
            //1. month is After the current month
            bday.setFullYear(today.getFullYear());
        }
        else if (birthMonth < currentMonth) {
            //2. month is before the current month
            bday.setFullYear(today.getFullYear() + 1);
        }
        else if (birthMonth == currentMonth) {
            const birthDay = bday.getDate();
            const currentDay = today.getDate();
            if(birthDay > currentDay) {
                //1. day is After the current day
                bday.setFullYear(today.getFullYear());
            }
            else if (birthDay < currentDay) {
                //2.day is before the current day
                bday.setFullYear(today.getFullYear() + 1);
            } else if (birthDay == currentDay) {
                return 0
            }
        
        }
        

        var distance = bday.getTime() - today.getTime();

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        

        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    getAge=function(){
        var bday = new Date(this.birthday);
        let today = new Date();
        var distance = today.getTime() - bday.getTime();
        var daysOld= Math.floor(distance / (1000 * 60 * 60 * 24));
        var yearsOld = Number(Math.ceil(daysOld/365).toFixed(0));
        return yearsOld
    }.bind(this)

    componentDidMount() {
        this.timer = setInterval(() =>{
            const timeRemaining = this.getTimeRemaining(this.birthday)
            this.setState({ timeRemaining: timeRemaining})
        },1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    renderMessage = function() {
        if(this.noBirthYear) {
            return (
                <h4>until your birthday!</h4>
            )
        }
        return (
            <h4> remaining until you are {this.getAge()}</h4>
        )
    }.bind(this)

    render() {
        const data = this.state.timeRemaining
        return (
            <div>
            {
                this.state.timeRemaining == 0 ?
                    <div className="countdown">
                        <div className="message-container">
                            <p className="message-container__title">Countdown Complete</p>
                            <p className="message-container__message">HAPPY BIRTHDAY!</p>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="countdown">
                            <ul className="countdown__clock">
                                <li>DAYS<p>{data.days}</p></li>
                                <li>HRS<p>{data.hours}</p></li>
                                <li>MINS<p>{data.minutes}</p></li>
                                <li>SECS<p>{data.seconds}</p></li>
                            </ul>
                            
                        </div>

                        <div className="until-container">
                            {this.renderMessage()}
                        </div>
                    </div>
                    
            }
            </div>
        )
    }
}


export default Clock;    