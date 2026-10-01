// Get elements from HTML

const billingToggle = document.getElementById("billingToggle");

const monthlyText = document.getElementById("monthlyText");
const yearlyText = document.getElementById("yearlyText");

const prices = document.querySelectorAll(".amount");
const periods = document.querySelectorAll(".period");


// Listen for toggle change

billingToggle.addEventListener("change", function () {

    // Check whether Yearly is selected

    if (billingToggle.checked) {

        // YEARLY

        monthlyText.classList.remove("active");
        yearlyText.classList.add("active");

        prices.forEach(function (price) {

            price.style.opacity = "0";

            setTimeout(function () {

                price.textContent = price.dataset.yearly;

                price.style.opacity = "1";

            }, 150);

        });

        periods.forEach(function (period) {
            period.textContent = "/month, billed yearly";
        });

    } else {

        // MONTHLY

        yearlyText.classList.remove("active");
        monthlyText.classList.add("active");

        prices.forEach(function (price) {

            price.style.opacity = "0";

            setTimeout(function () {

                price.textContent = price.dataset.monthly;

                price.style.opacity = "1";

            }, 150);

        });

        periods.forEach(function (period) {
            period.textContent = "/month";
        });

    }

});
