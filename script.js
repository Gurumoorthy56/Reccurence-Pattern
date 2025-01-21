
document.querySelector("#from-date").addEventListener('change', () => {
    // console.log("changedd");
    const toDate = document.querySelector("#to-date");
    const fromDate = new Date(document.querySelector("#from-date").value);
    const year = fromDate.getFullYear();
    const month = String(fromDate.getMonth() + 1).padStart(2, '0');
    const day = String(fromDate.getDate()).padStart(2, '0');

    // Set the min value for the to-date input
    toDate.min = `${year}-${month}-${day}`;
    toDate.value = `${year}-${month}-${day}`;
    document.querySelector('#start-date').value = `${year}-${month}-${day}`;
    document.querySelector('#day-month').value = fromDate.getDate();
    setDiff();
    document.querySelector('#to-date-div').style.display = 'block'
})

document.querySelector('#to-date-div').addEventListener('click', () => {
    setDiff();
})

window.onload = setMinDate();
function setMinDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    // Format: YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById('from-date').setAttribute('min', formattedDate);
    document.getElementById('to-date').setAttribute('min', formattedDate);

    document.getElementById('start-date').setAttribute('min', formattedDate);

    document.getElementById('from-date').setAttribute('value', formattedDate);

}


function setDiff() {
    setTimeout(() => { }, 1000);
    const fromDate = new Date(document.querySelector('#from-date').value);
    const toDate = new Date(document.querySelector('#to-date').value);
    settingTime(fromDate, 0); settingTime(toDate, 1);
    let diff = calculateTimeDifference(fromDate, toDate);
    document.querySelector('#time-diff').textContent = diff;
}

function calculateTimeDifference(startTime, endTime) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const differenceInMillis = endDate - startDate;

    const totalMinutes = Math.floor(differenceInMillis / (1000 * 60));

    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    let result = '';
    if (days > 0) {
        result += `${days}D `;
    }
    if (hours > 0 || days > 0) {
        result += `${hours}H `;
    }
    if (minutes > 0 || (days === 0 && hours === 0)) {
        result += `${minutes}M`;
    }
    if (days > 365)
        return
    if (result == '') {

    }
    return result;

}


document.querySelector('#start-date').addEventListener('change', () => {
    const fromDate = new Date(document.querySelector("#from-date").value);
    const toDate = new Date(document.querySelector("#to-date").value);
    const diff = toDate.getTime() - fromDate.getTime();
    const startDate = new Date(document.querySelector("#start-date").value);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(startDate.getDate()).padStart(2, '0');
    document.querySelector('#day-month').value = startDate.getDate();

    // Set the min value for the to-date input
    document.querySelector('#from-date').value = `${year}-${month}-${day}`;
    const toDatee = document.querySelector("#to-date");

    toDatee.min = `${year}-${month}-${day}`;
    toDatee.value = `${year}-${month}-${day}`;
    toDate.setTime(startDate.getTime() + diff);
    // console.log(toDate)

    document.querySelector('#to-date').value = `${toDate.getFullYear()}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;

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



document.querySelector('#clear').addEventListener('click', () => {
    output.innerHTML = '';
    output.style.display = 'none'
    output.classList.remove('scroll-div')

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
    document.querySelector('#from-error').style.color = '#282c34';
    document.querySelector('#to-error').style.color = '#282c34';
    setDiff()

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



