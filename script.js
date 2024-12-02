// document.querySelector('.tab-list').addEventListener('click', (Event) => {
//     if (Event.target.tagName === 'LI') {
//         removeActive('tab-title');
//         removeActive('panel');
//         document.querySelector(`#panel-${Event.target.value}`).classList.add('active');
//         Event.target.classList.add('active');
//         // document.querySelector('em').textContent = Event.target.innerText;
//         document.querySelectorAll('.continue-option-2').forEach(option => option.classList.remove('c-active'));
//         document.querySelectorAll('.continue-option-1').forEach(option => option.classList.remove('c-active'));
//         document.querySelectorAll('.rec-till').forEach(select => select.value = 'forever');
//     }
// })
document.querySelector("#from-date").addEventListener('change', () => {
    // console.log("changedd");
    const toDate = document.querySelector("#to-date");
    const fromDate = new Date(document.querySelector("#from-date").value);
    const year = fromDate.getFullYear();
    const month = String(fromDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(fromDate.getDate()).padStart(2, '0');

    // Set the min value for the to-date input
    toDate.min = `${year}-${month}-${day}`;
    toDate.value = `${year}-${month}-${day}`;
    document.querySelector('#start-date').value = `${year}-${month}-${day}`;

    document.querySelector('#to-date-div').style.display = 'block'
})

document.querySelector('#start-date').addEventListener('change', () => {
    const fromDate = document.querySelector("#to-date");
    const startDate = new Date(document.querySelector("#start-date").value);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(startDate.getDate()).padStart(2, '0');

    // Set the min value for the to-date input
    document.querySelector('#from-date').value = `${year}-${month}-${day}`;
})

document.querySelector('#Done').addEventListener('click', () => {
    const dayMonth = document.querySelector('#day-month').value ?? null;
    const onThe = document.querySelector('#on-the').checked;
    let lastDay;
    if (!onThe) {
        if (dayMonth == '31') {

        }
    }
})

document.querySelector('#time-interval').addEventListener('click', (e) => {
    switch (e.target.value) {
        case 'day':
            {
                displayNone();
                break;
            }
        case 'week':
            {
                displayWeek(); break;
            }
        case 'month':
            {
                displayMonth(); break;
            }
        case 'year':
            displayYear(); break;

    }
})

function displayNone() {
    document.querySelector('#Weekly').style.display = 'none';
    document.querySelector('#Monthly').style.display = 'none';
    document.querySelector('#months').style.display = 'none';
    document.querySelector('#months-on-the').style.display = 'none';
}

function displayWeek() {
    displayNone();
    document.querySelector('#Weekly').style.display = 'block';
}

function displayMonth() {
    displayNone();
    document.querySelector('#Monthly').style.display = 'block';

}

function displayYear() {
    displayMonth();
    document.querySelector('#Monthly #months').style.display = 'inline-block';
    document.querySelector('#months-on-the').style.display = 'inline-block';
}

document.querySelector('#Repeat').addEventListener('click', (e) => {
    if (e.target.checked) {
        togglePanel(this);
    }
})

document.querySelector('#from-date').addEventListener('change', () => {
    const fromDate = new Date(document.querySelector('#from-date').value || '');
    document.querySelectorAll('.f-date').forEach(f => f.innerText = fromDate.toDateString());
})

document.querySelector('#clear').addEventListener('click', () => {
    output.innerHTML = '';
    output.style.display = 'none'
})


const aaa = document.querySelectorAll('.rec-till');
aaa.forEach(a => {

    a.addEventListener('change', (e) => {
        // console.log(e.target.value)
        if (e.target.value === 'count') {
            document.querySelectorAll('.continue-option-1').forEach(option => option.classList.add('c-active'));
            document.querySelectorAll('.continue-option-2').forEach(option => option.classList.remove('c-active'));
        }
        else if (e.target.value === 'until') {
            document.querySelectorAll('.continue-option-2').forEach(option => option.classList.add('c-active'));
            document.querySelectorAll('.continue-option-1').forEach(option => option.classList.remove('c-active'));
        }
        else {
            document.querySelectorAll('.continue-option-2').forEach(option => option.classList.remove('c-active'));
            document.querySelectorAll('.continue-option-1').forEach(option => option.classList.remove('c-active'));
        }
    })
});

function removeActive(cls) {
    document.querySelectorAll(`.${cls}`).forEach(tag => tag.classList.remove('active'));
}

function toggle(element) {
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(time => { time.style.display = time.style.display === 'none' ? 'inline-block' : 'none'; });
}
function togglePanel(element) {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
    const panel = document.querySelector('#all-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';

}
document.querySelector('#Monthly').addEventListener('click', () => {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {

        const parentDiv = radio.parentElement;
        parentDiv.querySelectorAll('input[type="number"],select').forEach(element => {
            if (radio.checked) { element.removeAttribute('disabled') }
            else element.setAttribute('disabled', 'true')
        })
    }
    )
})


const output = document.querySelector('#output');

document.getElementById('Event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('aaassa');
    const eventTitle = document.querySelector('#Event-name').value;

    // const allDay = document.querySelector('#All-Day');
    const repeat = document.querySelector('#Repeat');

    const fromDate = new Date(document.querySelector('#from-date').value);
    // const startDate = new Date(document.querySelector('#start-date').value);
    const toDate = new Date(document.querySelector('#to-date').value);
    settingTime(fromDate, 0); settingTime(toDate, 1);


    if (!repeat.checked) {
        // console.log(fromDate)

        output.innerHTML += `<div class="mt-2">
                <h5>Event: ${eventTitle} occurs at: </h5>
                <div class="ms-3">
                    <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                </div>
            </div>`;

    }
    // }
    else {
        const timeInterval = document.querySelector('#time-interval');
        // console.log(timeInterval.value);
        switch (timeInterval.value) {
            case 'day':
                {
                    daily(eventTitle, fromDate, toDate);
                    break;
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
                displayYear(); break;

        }
    }
    output.style.display = 'block';

})


// < div > 12 / 25 / 2015 12:00:00 AM - 12 / 25 / 2015 02:00:00 AM: MONDAY</div >

// output.style.display = output.style.display === 'none' ? 'block' : 'none';

function settingTime(date, flag) {
    const allDay = document.querySelector('#All-Day');
    if (allDay.checked) {
        date.setHours('0', '0', '0');
        // date.setMinutes(0);
        // date.setSeconds(0);
    }
    else {
        const fromTime = document.querySelector('#from-time').value;
        const toTime = document.querySelector('#to-time').value;
        if (!fromTime || !toTime) {
            console.log("From time or To time is NOT_SET")
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

function daily(eventTitle, fromDate, toDate) {
    // console.log("daily called");
    const allDay = document.querySelector('#All-Day');
    const repeat1 = document.querySelector('#repeat-every-1').value;
    let toPrint = parseInt(document.querySelector('#count-number-1').value);
    const recTill = document.querySelector("#panel-1 .rec-till").value;
    if (recTill !== 'count') { toPrint = 100; }

    var diff = toDate - fromDate;
    if (diff < 0) {
        alert("Invalid Start time and End time")
        return
    }
    let innerText = '';
    let prevDate = toDate;
    for (let i = 1; i <= toPrint; i++) {
        toDate.setTime(fromDate.getTime() + diff);
        prevDate = toDate;

        // console.log(`prevDate-->${prevDate} |  fromdate-->${fromDate}  |  toDate-->${toDate}`)



        if (recTill === 'until') {
            const tillDate = new Date(document.querySelector('#until-date-1').value);
            if (!allDay.checked)
                tillDate.setDate(tillDate.getDate() + 1)
            if (tillDate < fromDate)
                break;
        }
        innerText += `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`;
        fromDate.setDate(fromDate.getDate() + parseInt(repeat1));
        if (fromDate - prevDate <= 0) { alert("Event Overlapping"); return; }


    }
    output.innerHTML += `<div class="mt-2">
                <h5>Event: ${eventTitle} occurs at: </h5>
                ${innerText}                
            </div>`;

}
// }

function weekly(eventTitle, fromDate, toDate) {
    const repeat1 = document.querySelector('#repeat-every-1').value;
    let toPrint = parseInt(document.querySelector('#count-number-1').value);
    const recTill = document.querySelector("#panel-1 .rec-till").value;
    if (recTill !== 'count') { toPrint = 10; }
    // settingTime(fromDate, 0); settingTime(toDate, 1);

    var diff = toDate - fromDate;
    if (diff < 0) {
        alert("Invalid Start time and End time")
        return
    }
    let innerText = '';
    let prevDate = toDate;

    let first_time = 1;
    const week = document.querySelectorAll('#Weekly input');
    let selected = [];
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
            innerText += `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`;
            toPrint--;
            first_time = 0;

        }

        fromDate.setDate(fromDate.getDate() + 1);
        if (parseInt(fromDate.getDay()) > 5)
            fromDate.setDate(fromDate.getDate() + (parseInt(repeat1) - 1) * 7);


    }
    output.innerHTML += `<div class="mt-2">
                <h5>Event: ${eventTitle} occurs at: </h5>
                ${innerText}                
            </div>`;
}

function monthly(eventTitle, fromDate, toDate) {
    const repeat1 = document.querySelector('#repeat-every-1').value;
    let toPrint = parseInt(document.querySelector('#count-number-1').value);
    const recTill = document.querySelector("#panel-1 .rec-till").value;
    if (recTill !== 'count') { toPrint = 10; }
    // settingTime(fromDate, 0); settingTime(toDate, 1);

    var diff = toDate - fromDate;
    if (diff < 0) {
        alert("Invalid Start time and End time")
        return
    }
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
                            if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }

                            toDate.setTime(fromDate.getTime() + diff);
                            prevDate = toDate;

                            innerText += `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`;
                            toPrint--;
                            first_time = 0;
                        }
                    }
                    else if (parseInt(onDay) === 31) {
                        if (cnfm) {
                            lastDay = confirm("Want to set every last date of the each Month?");
                            cnfm = false;
                        }
                        if (lastDay) {
                            console.log(lastDay)

                            //  fromDate = document.querySelector('#from-date');
                            // Event.preventDefault();
                            const year = fromDate.getFullYear();
                            const month = fromDate.getMonth();
                            const hours = fromDate.getHours();
                            const minutes = fromDate.getMinutes();
                            fromDate = new Date(year, month + 1, 1, hours, minutes);
                            fromDate.setDate(fromDate.getDate() - 1);
                            toDate.setTime(fromDate.getTime() + diff);
                            prevDate = toDate;

                            innerText += `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`;
                            toPrint--;;
                        }
                        else {
                            // console.log("mudiyalaaa")
                            if (fromDate.getDate() == parseInt(onDay)) {
                                if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }

                                toDate.setTime(fromDate.getTime() + diff);
                                prevDate = toDate;

                                innerText += `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`;
                                toPrint--;
                                first_time = 0;
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
            <h5>Event: ${eventTitle} occurs at: </h5>
            ${innerText}                
         </div>`;
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
                console.log(toPrint)
                let actualDate = fromDate;
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


                            if (order == 1 && fromDate > actualDate) {
                                if (fromDate - prevDate <= 0 && !first_time) { alert(`Event Overlapping| from date is ${fromDate.toDateString()} and prev date is ${prevDate.toDateString()}`); return; }


                                toDate.setTime(fromDate.getTime() + diff);
                                prevDate = toDate;
                                innerText += `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`;
                                printCount++
                                // toPrint--;
                                const year = fromDate.getFullYear();
                                const month = fromDate.getMonth();
                                const hours = fromDate.getHours();
                                const minutes = fromDate.getMinutes();
                                fromDate = new Date(year, month + 1, 1, hours, minutes);
                                order = parseInt(document.querySelector('#order').value);
                                first_time = 0;
                            }
                            else order--;
                        }
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


                        if (dayArray[fromDate.getDay()] == onTheMon && fromDate > actualDate) {
                            toDate.setTime(fromDate.getTime() + diff);


                            innerText += `<div class="ms-3">
                     <div>${fromDate.toString().split(' GMT')[0]}  - ${toDate.toString().split(' GMT')[0]}</div>
                 </div>`;
                            const year = fromDate.getFullYear();
                            const month = fromDate.getMonth();
                            const hours = fromDate.getHours();
                            const minutes = fromDate.getMinutes();
                            fromDate = new Date(year, month + 1, 1, hours, minutes);
                            fromDate.setDate(fromDate.getDate() - 1);
                            f = 1;
                            printCount++;
                        }


                    }
                    fromDate.setDate(fromDate.getDate() + 1);

                    // toPrint--;
                    runCount++;
                }



                console.log(runCount)
                console.log(printCount)

                output.innerHTML += `<div class="mt-2">
            <h5>Event: ${eventTitle} occurs at: </h5>
            ${innerText}                
        </div>`;
            }
        }
    }
    )
}


// const week = document.querySelectorAll('#Weekly input');
// let selected = [];
// for (let i = 0; i < week.length; i++)
//     selected[i] = week[i].checked;



// }



function yearly() { }
