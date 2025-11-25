const dobInput = document.getElementById("dob");
const refDateInput = document.getElementById("refDate");
const customBox = document.getElementById("customDateBox");
const errorEl = document.getElementById("error");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const nextBirthdayEl = document.getElementById("nextBirthday");

let interval = null;

// Custom Reference Date , CHANGE VISIBILITY : - CODES START FROM HERE ( ASLAM )
document.querySelectorAll("input[name='ref']").forEach(r => {
    r.addEventListener("change", () => {
        customBox.style.display = r.value === "custom" ? "block" : "none";
    });
});

document.getElementById("calcBtn").addEventListener("click", () => {
    const dobValue = dobInput.value;
    const refMode = document.querySelector("input[name='ref']:checked").value;

    if (!dobValue){
        errorEl.textContent = "Please select your date of birth.";
        return;
    }

    let dob = new Date(dobValue);
    let ref;

    if (refMode === "today"){
        ref = new Date();
    } else {
        if (!refDateInput.value){
            errorEl.textContent = "Select a custom date.";
            return;
        }
        ref = new Date(refDateInput.value);
    }

    if (dob > ref){
        errorEl.textContent = "DOB cannot be later than reference date.";
        return;
    }

    errorEl.textContent = "";

    calculateAll(dob, ref);

    clearInterval(interval);
    if (refMode === "today"){
        interval = setInterval(() => calculateAll(dob, new Date()), 1000);
    }
});

function calculateAll(dob, ref){
    calculateAge(dob, ref);
    calculateNextBirthday(dob, ref);
}

// Age Calculation - - CODES START FROM HERE ( ASLAM )
function calculateAge(dob, ref){
    let years = ref.getFullYear() - dob.getFullYear();
    let months = ref.getMonth() - dob.getMonth();
    let days = ref.getDate() - dob.getDate();

    if (days < 0){
        months--;
        days += new Date(ref.getFullYear(), ref.getMonth(), 0).getDate();
    }

    if (months < 0){
        years--;
        months += 12;
    }

    let diffMs = ref - dob;
    let hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
    let minutes = Math.floor(diffMs / (1000 * 60)) % 60;
    let seconds = Math.floor(diffMs / 1000) % 60;

    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

// Next birthday - - CODES START FROM HERE ( ASLAM )
function calculateNextBirthday(dob, ref){
    let next = new Date(ref.getFullYear(), dob.getMonth(), dob.getDate());

    if (next < ref) {
        next.setFullYear(ref.getFullYear() + 1);
    }

    const diff = next - ref;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    nextBirthdayEl.textContent = `${days} days to go (on ${next.toDateString()})`;
}
