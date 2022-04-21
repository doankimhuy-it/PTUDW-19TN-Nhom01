let patientNavBtn = document.getElementById("patient-nav-btn");
let paymentNavBtn = document.getElementById("payment-nav-btn");
let patientStats = document.getElementById("patient-stats");
let paymentStats = document.getElementById("payment-stats");

patientNavBtn.onclick = () => {
    if (paymentNavBtn.classList.contains("active")) {
        paymentNavBtn.classList.remove("active");
    }
    if (!patientNavBtn.classList.contains("active")) {
        patientNavBtn.classList.add("active");
    }
    if (patientStats.hasAttribute("hidden")) {
        patientStats.removeAttribute("hidden");
    }

    if (!paymentStats.hasAttribute("hidden")) {
        paymentStats.setAttribute("hidden", "");
    }
}

paymentNavBtn.onclick = () => {
    if (patientNavBtn.classList.contains("active")) {
        patientNavBtn.classList.remove("active");
    }
    if (!paymentNavBtn.classList.contains("active")) {
        paymentNavBtn.classList.add("active");
    }
    if (paymentStats.hasAttribute("hidden")) {
        paymentStats.removeAttribute("hidden");
    }

    if (!patientStats.hasAttribute("hidden")) {
        patientStats.setAttribute("hidden", "");
    }
}