const output = document.querySelector('#output');

document.getElementById('Event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const allDay = document.querySelector('#All-Day');
    if (!allDay.checked) {  //Checking if time is selected and if not displaying error message.
        let f = 1;
        const fromTime = document.querySelector('#from-time');
        const toTime = document.querySelector('#to-time');
        if (fromTime.value === '') {
            document.querySelector('#from-error').style.color = 'red';
            f = 0;
        }
        else
            document.querySelector('#from-error').style.color = '#282c34';
        if (toTime.value === '') {
            document.querySelector('#to-error').style.color = 'red';
            f = 0;
        }
        else
            document.querySelector('#to-error').style.color = '#282c34';

        if (!f)
            return
    }
    const eventTitle = document.querySelector('#Event-name').value;

    const repeat = document.querySelector('#Repeat');

    const fromDate = new Date(document.querySelector('#from-date').value);
    const toDate = new Date(document.querySelector('#to-date').value);
    settingTime(fromDate, 0); settingTime(toDate, 1);
    var diff = toDate - fromDate;
    if (diff < 0) {
        alert("Invalid Start time and End time")
        return
    }


    if (!repeat.checked) {
        output.innerHTML += addDate(fromDate, toDate);
        output.style.display = 'block';
    }
    else {
        const timeInterval = document.querySelector('#time-interval'); //
        switch (timeInterval.value) {
            case 'day':
                {
                    daily(eventTitle, fromDate, toDate); break;
                }
            case 'week':
                {
                    weekly(eventTitle, fromDate, toDate); break;
                }
            case 'month':
                {
                    monthly(eventTitle, fromDate, toDate); break;
                }
            case 'year':
                { yearly(eventTitle, fromDate, toDate); break; }

        }
    }
    if (output.offsetHeight >= 300) {
        output.classList.add('scroll-div')
    }

})

function settingTime(date, flag) {
    const allDay = document.querySelector('#All-Day');
    if (allDay.checked) {
        if (!flag)
            date.setHours('0', '0', '0');
        else
            date.setHours('23', '59', '59')
    }
    else {
        const fromTime = document.querySelector('#from-time').value;
        const toTime = document.querySelector('#to-time').value;
        if (!fromTime || !toTime) {
        }
        else {
            if (!flag) {
                const [hours, minutes] = fromTime.split(':');
                date.setHours(hours, minutes, '0');
            }
            else {
                const [hours, minutes] = toTime.split(':');
                date.setHours(hours, minutes, '0');
            }
        }
    }
}

function addDate(fromDate, toDate) {
    return `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`
}

function thatDay(fromDate, prevDate, first_time, toDate, repeat1, diff, toPrint) {
    if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }

    toDate.setTime(fromDate.getTime() + diff);
    prevDate = toDate;

    fromDate.setMonth(fromDate.getMonth() + parseInt(repeat1) - 1);

    toPrint--;
    // toPrint = this.toPrint;
    first_time = 0;
    return [addDate(fromDate, toDate), toPrint];

}

function daily(eventTitle, fromDate, toDate) {
    const allDay = document.querySelector('#All-Day');
    const repeat1 = document.querySelector('#repeat-every-1').value;
    let toPrint = parseInt(document.querySelector('#count-number-1').value);
    const recTill = document.querySelector("#panel-1 .rec-till").value;
    if (recTill !== 'count') { toPrint = 100; }

    var diff = toDate - fromDate;
    if (diff < 0) { alert("Invalid Start time and End time"); return }
    let innerText = '';
    let prevDate = toDate;
    for (let i = 1; i <= toPrint; i++) {
        toDate.setTime(fromDate.getTime() + diff);
        prevDate = toDate;

        if (recTill === 'until') {
            const tillDate = new Date(document.querySelector('#until-date-1').value);
            if (!allDay.checked)
                tillDate.setDate(tillDate.getDate() + 1)
            if (tillDate < fromDate)
                break;
        }
        innerText += addDate(fromDate, toDate);
        fromDate.setDate(fromDate.getDate() + parseInt(repeat1));
        if (fromDate - prevDate <= 0) { alert("Event Overlapping"); return; }


    }
    output.innerHTML += `<div class="mt-2">
                <h5>Event: <em>${eventTitle}</em> occurs at: </h5>
                ${innerText}                
            </div>`;
    output.style.display = 'block';


}


function weekly(eventTitle, fromDate, toDate) {
    const repeat1 = document.querySelector('#repeat-every-1').value;
    let toPrint = parseInt(document.querySelector('#count-number-1').value);
    const recTill = document.querySelector("#panel-1 .rec-till").value;
    if (recTill !== 'count') { toPrint = 10; }
    // settingTime(fromDate, 0); settingTime(toDate, 1);

    var diff = toDate - fromDate;
    if (diff < 0) { alert("Invalid Start time and End time"); return }

    let innerText = '';
    let prevDate = toDate;

    let first_time = 1;
    const week = document.querySelectorAll('#Weekly input');
    let selected = [];
    let ischecked = false;
    week.forEach(day => {
        if (day.checked)
            ischecked = true;
    })
    if (!ischecked) {
        alert('Atleast a Day should be selected!')
        return
    }
    for (let i = 0; i < week.length; i++)
        selected[i] = week[i].checked;

    const tillDate = new Date(document.querySelector('#until-date-1').value ?? '');

    if (recTill === 'until') {
        toPrint = Math.abs((tillDate.getTime() - fromDate.getTime()) / 1000 * 60 * 60 * 24);
    }
    while (toPrint > 0) {



        // console.log(`prevDate-->${prevDate} |  fromdate-->${fromDate}  |  toDate-->${toDate}`)
        if (recTill === 'until') {
            // toPrint += 10;
            if (tillDate < fromDate)
                break;
        }

        if (selected[parseInt(fromDate.getDay())]) {
            if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }
            toDate.setTime(fromDate.getTime() + diff);
            prevDate = toDate;
            innerText += addDate(fromDate, toDate);
            toPrint--;
            first_time = 0;

        }

        fromDate.setDate(fromDate.getDate() + 1);
        if (parseInt(fromDate.getDay()) > 5)
            fromDate.setDate(fromDate.getDate() + (parseInt(repeat1) - 1) * 7);


    }
    output.innerHTML += `<div class="mt-2">
               <h5>Event: <em>${eventTitle}</em> occurs at: </h5>
                ${innerText}                
            </div>`;
    output.style.display = 'block';

}



function monthly(eventTitle, fromDate, toDate) {
    const repeat1 = document.querySelector('#repeat-every-1').value;
    let toPrint = parseInt(document.querySelector('#count-number-1').value);
    const recTill = document.querySelector("#panel-1 .rec-till").value;
    if (recTill !== 'count') { toPrint = 10; }
    // document.querySelector('#day-month').value = fromDate.getDate();
    // settingTime(fromDate, 0); settingTime(toDate, 1);

    var diff = toDate - fromDate;
    if (diff < 0) { alert("Invalid Start time and End time"); return }

    let innerText = '';
    let prevDate = toDate;
    let first_time = 1;

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        if (radio.checked) {
            if (radio.value == 'on-day') {
                const tillDate = new Date(document.querySelector('#until-date-1').value);

                if (recTill === 'until') {
                    toPrint = Math.abs((tillDate.getTime() - fromDate.getTime()) / 1000 * 60 * 60 * 24);
                }
                let cnfm = true;
                while (toPrint > 0) {

                    // console.log(`prevDate-->${prevDate} |  fromdate-->${fromDate}  |  toDate-->${toDate}`)
                    if (recTill === 'until') {
                        const tillDate = new Date(document.querySelector('#until-date-1').value ?? '');
                        if (tillDate < fromDate)
                            break;
                    }
                    const onDay = document.querySelector('#day-month').value;
                    // console.log(`${fromDate.toString()}-->${parseInt(onDay)} ${fromDate.toString() == parseInt(onDay)}`)

                    if (parseInt(onDay) !== 31) {
                        if (fromDate.getDate() == parseInt(onDay)) {
                            let returnVal = thatDay(fromDate, prevDate, first_time, toDate, repeat1, diff, toPrint);
                            innerText += returnVal[0];
                            toPrint = returnVal[1];
                        }
                    }
                    else if (parseInt(onDay) === 31) {
                        if (cnfm) {
                            lastDay = confirm("Want to set every last date of the each Month?");
                            cnfm = false;
                        }
                        if (lastDay) {
                            console.log(lastDay)

                            const year = fromDate.getFullYear();
                            const month = fromDate.getMonth();
                            const hours = fromDate.getHours();
                            const minutes = fromDate.getMinutes();
                            fromDate = new Date(year, month + 1, 1, hours, minutes);
                            fromDate.setDate(fromDate.getDate() - 1);
                            toDate.setTime(fromDate.getTime() + diff);
                            prevDate = toDate;

                            innerText += addDate(fromDate, toDate);
                            fromDate.setDate(27)
                            fromDate.setMonth(fromDate.getMonth() + parseInt(repeat1));


                            toPrint--;;
                        }
                        else {
                            if (fromDate.getDate() == parseInt(onDay)) {
                                let returnVal = thatDay(fromDate, prevDate, first_time, toDate, repeat1, diff, toPrint);
                                innerText += returnVal[0];
                                toPrint = returnVal[1];
                            }

                        }

                    }
                    else {
                        alert("INVALID Day!")
                    }
                    fromDate.setDate(fromDate.getDate() + 1);
                    if (fromDate.getDate() > parseInt(onDay)) {
                        const year = fromDate.getFullYear();
                        const month = fromDate.getMonth();
                        const hours = fromDate.getHours();
                        const minutes = fromDate.getMinutes();
                        fromDate = new Date(year, month + 1, 1, hours, minutes);
                    }

                    // if (fromDate - prevDate <= 0) { alert("Event Overlapping"); return; }

                }
                output.innerHTML += `<div class="mt-2">
            <h5>Event: <em>${eventTitle}</em> occurs at: </h5>
            ${innerText}                
         </div>`;
                output.style.display = 'block';

            }
            else {
                console.log("ON The")
                const tillDate = new Date(document.querySelector('#until-date-1').value);

                if (recTill === 'until') {
                    toPrint = Math.ceil(Math.abs((tillDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24 * 25)));
                }
                let order = parseInt(document.querySelector('#order').value);
                const onTheMon = document.querySelector('#on-the-mon').value;
                const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                let runCount = 0;
                let printCount = 0;
                let f = 1;
                //  = 400;
                // console.log(toPrint)
                let actualDate = fromDate;
                // console.log(actualDate)
                // let refDate = fromDate;

                fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1, fromDate.getHours(), fromDate.getMinutes());
                while (printCount < toPrint) {


                    // console.log(`prevDate-->${prevDate} |  fromdate-->${fromDate}  |  toDate-->${toDate}`)
                    if (recTill === 'until') {
                        const tillDate = new Date(document.querySelector('#until-date-1').value ?? '');
                        if (tillDate < fromDate)
                            break;
                    }

                    if (order < 5) {
                        if (dayArray[fromDate.getDay()] == onTheMon) {

                            if (order == 1) {

                                if (fromDate >= actualDate) {
                                    console.log('1')

                                    if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }


                                    toDate.setTime(fromDate.getTime() + diff);
                                    prevDate = toDate;
                                    innerText += addDate(fromDate, toDate);

                                    printCount++;
                                    // toPrint--;
                                    const year = fromDate.getFullYear();
                                    const month = fromDate.getMonth();
                                    const hours = fromDate.getHours();
                                    const minutes = fromDate.getMinutes();
                                    fromDate = new Date(year, month + 1, 1, hours, minutes);

                                    fromDate.setMonth(fromDate.getMonth() + parseInt(repeat1) - 1);
                                    fromDate.setDate(fromDate.getDate() - 3);


                                    order = parseInt(document.querySelector('#order').value);
                                    first_time = 0;
                                }

                                else {
                                    fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1, fromDate.getHours(), fromDate.getMinutes());
                                    order = parseInt(document.querySelector('#order').value);
                                }
                            }
                            else {
                                order--;
                                fromDate.setDate(fromDate.getDate() + 6);

                            }
                        }
                        // else {
                        //     fromDate.setDate(fromDate.getDate() + 1);

                        // }
                    }

                    else {

                        if (f) {
                            const year = fromDate.getFullYear();
                            const month = fromDate.getMonth();
                            const hours = fromDate.getHours();
                            const minutes = fromDate.getMinutes();
                            fromDate = new Date(year, month + 1, 1, hours, minutes);

                            fromDate.setDate(fromDate.getDate() - 6);
                            if (dayArray[fromDate.getDay() - 1] == onTheMon)
                                fromDate.setDate(fromDate.getDate() - 3)
                            f = 0;
                        }


                        if (dayArray[fromDate.getDay()] == onTheMon && fromDate >= actualDate) {
                            toDate.setTime(fromDate.getTime() + diff);


                            innerText += addDate(fromDate, toDate);
                            const year = fromDate.getFullYear();
                            const month = fromDate.getMonth();
                            const hours = fromDate.getHours();
                            const minutes = fromDate.getMinutes();
                            fromDate = new Date(year, month + 1, 1, hours, minutes);
                            fromDate.setMonth(fromDate.getMonth() + parseInt(repeat1) - 1);

                            fromDate.setDate(fromDate.getDate() - 1);

                            f = 1;
                            printCount++;
                        }


                    }
                    fromDate.setDate(fromDate.getDate() + 1);

                    // toPrint--;
                    runCount++;
                }



                // console.log(runCount)
                // console.log(printCount)

                output.innerHTML += `<div class="mt-2">
            <h5>Event: <em>${eventTitle}</em> occurs at: </h5>
            ${innerText}                
        </div>`;
                output.style.display = 'block';

            }
        }
    }
    )
}

function yearly(eventTitle, fromDate, toDate) {
    const repeat1 = document.querySelector('#repeat-every-1').value;
    let toPrint = parseInt(document.querySelector('#count-number-1').value);
    const recTill = document.querySelector("#panel-1 .rec-till").value;
    if (recTill !== 'count') { toPrint = 10; }
    var diff = toDate - fromDate;
    if (diff < 0) { alert("Invalid Start time and End time"); return }

    let innerText = '';
    let prevDate = toDate;
    let first_time = 1;

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        if (radio.checked) {
            if (radio.value == 'on-day') {
                const tillDate = new Date(document.querySelector('#until-date-1').value);

                if (recTill === 'until') {
                    toPrint = Math.abs((tillDate.getTime() - fromDate.getTime()) / 1000 * 60 * 60 * 24);
                }
                const month = document.querySelector('#months').value;
                const onDay = document.querySelector('#day-month').value;


                if (month === 'february' && parseInt(onDay) > 29) {
                    alert(`February does not have ${onDay} `);
                    return
                }
                if ((month === 'april' || month === 'june' || month === 'september' || month === 'november') && parseInt(onDay) > 30) {
                    alert(`${month} does not have ${onDay} `);
                    return
                }
                while (toPrint > 0) {

                    // console.log(`prevDate-->${prevDate} |  fromdate-->${fromDate}  |  toDate-->${toDate}`)
                    if (recTill === 'until') {
                        const tillDate = new Date(document.querySelector('#until-date-1').value ?? '');
                        if (tillDate < fromDate)
                            break;
                    }
                    const onDay = document.querySelector('#day-month').value;
                    const month = document.querySelector('#months').value;
                    const monthArray = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                    // console.log(`${fromDate.toString()}-->${parseInt(onDay)} ${fromDate.toString() == parseInt(onDay)}`)

                    if (parseInt(onDay) <= 31) {

                        if (fromDate.getDate() == parseInt(onDay) && monthArray[fromDate.getMonth()] == month) {
                            if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }

                            toDate.setTime(fromDate.getTime() + diff);
                            prevDate = toDate;

                            innerText += addDate(fromDate, toDate);
                            toPrint--;
                            first_time = 0;
                            // fromDate.setYear(fromDate.getYear() + 1);
                            // fromDate.setDate(fromDate.getDate() - 1);
                            fromDate = new Date(fromDate.getFullYear() + 1 + (parseInt(repeat1) - 1), fromDate.getMonth(), fromDate.getDate() - 1, fromDate.getHours(), fromDate.getMinutes());
                        }
                    }
                    else {
                        alert("INVALID Day!")
                    }
                    fromDate.setDate(fromDate.getDate() + 1);
                    if (monthArray.indexOf(month) < fromDate.getMonth()) {
                        const year = fromDate.getFullYear();
                        // const month = fromDate.getMonth();
                        const hours = fromDate.getHours();
                        const minutes = fromDate.getMinutes();
                        fromDate = new Date(year + 1, monthArray.indexOf(month), 1, hours, minutes);
                    }
                }
                output.innerHTML += `<div class="mt-2">
            <h5>Event: <em>${eventTitle}</em> occurs at: </h5>
            ${innerText}                
         </div>`;
                output.style.display = 'block';

            }
            else {
                console.log("ON The")
                const tillDate = new Date(document.querySelector('#until-date-1').value);

                if (recTill === 'until') {
                    toPrint = Math.ceil(Math.abs((tillDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24 * 25)));
                }
                let order = parseInt(document.querySelector('#order').value);
                const onTheMon = document.querySelector('#on-the-mon').value;
                const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                let runCount = 0;
                let printCount = 0;
                let f = 1;
                console.log(toPrint)
                let actualDate = fromDate;

                fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1, fromDate.getHours(), fromDate.getMinutes());
                while (printCount < toPrint) {
                    if (recTill === 'until') {
                        const tillDate = new Date(document.querySelector('#until-date-1').value ?? '');
                        if (tillDate < fromDate)
                            break;
                    }
                    const month = document.querySelector('#on-the-months').value;
                    const monthArray = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

                    if (order < 5) {
                        if (dayArray[fromDate.getDay()] == onTheMon && monthArray[fromDate.getMonth()] == month) {

                            if (order == 1) {
                                if (fromDate >= actualDate) {

                                    if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }


                                    toDate.setTime(fromDate.getTime() + diff);
                                    prevDate = toDate;
                                    innerText += addDate(fromDate, toDate);
                                    fromDate = new Date(fromDate.getFullYear() + 1 + (parseInt(repeat1) - 1), fromDate.getMonth(), 1, fromDate.getHours(), fromDate.getMinutes());
                                    fromDate.setDate(fromDate.getDate() - 3);



                                    printCount++

                                    order = parseInt(document.querySelector('#order').value);
                                    first_time = 0;
                                }
                                else {
                                    fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1, fromDate.getHours(), fromDate.getMinutes());
                                    order = parseInt(document.querySelector('#order').value);

                                }
                            }
                            else {
                                order--;
                                fromDate.setDate(fromDate.getDate() + 6);
                            }
                        }
                    }

                    else {
                        if (f) {

                            fromDate = new Date(fromDate.getFullYear() + 1, monthArray.indexOf(document.querySelector('#on-the-months').value), 1, fromDate.getHours(), fromDate.getMinutes());

                            const year = fromDate.getFullYear();
                            const month = fromDate.getMonth();
                            const hours = fromDate.getHours();
                            const minutes = fromDate.getMinutes();
                            fromDate = new Date(year, month + 1, 1, hours, minutes);

                            fromDate.setDate(fromDate.getDate() - 6);
                            if (dayArray[fromDate.getDay() - 1] == onTheMon)
                                fromDate.setDate(fromDate.getDate() - 3)
                            f = 0;
                        }

                        if (dayArray[fromDate.getDay()] == onTheMon && fromDate > actualDate) {
                            toDate.setTime(fromDate.getTime() + diff);
                            innerText += addDate(fromDate, toDate);
                            const year = fromDate.getFullYear();
                            const month = fromDate.getMonth();
                            const hours = fromDate.getHours();
                            const minutes = fromDate.getMinutes();
                            fromDate = new Date(year, month + 1, 1, hours, minutes);
                            // fromDate.setMonth(fromDate.getMonth() + parseInt(repeat1) - 1);
                            fromDate = new Date(fromDate.getFullYear() + (parseInt(repeat1) - 1), fromDate.getMonth(), 1, fromDate.getHours(), fromDate.getMinutes());
                            fromDate.setDate(fromDate.getDate() - 1);
                            f = 1;
                            printCount++;
                        }
                    }
                    fromDate.setDate(fromDate.getDate() + 1);
                    runCount++;
                }
                output.innerHTML += `<div class="mt-2">
            <h5>Event: <em>${eventTitle}</em> occurs at: </h5>
            ${innerText}                
        </div>`;
                output.style.display = 'block';

            }
        }
    }
    )
}
