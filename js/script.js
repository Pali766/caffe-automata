let state = "IDLE";

const coinBtn = document.getElementById("coinBtn");
const coffeeOptions = document.getElementById("coffeeOptions");
const coffeeBtns = document.querySelectorAll(".coffeeBtn");
const statusText = document.getElementById("status");
const takeBtn = document.getElementById("takeBtn");

coinBtn.addEventListener("click", () => {
    if (state === "IDLE") {
        state = "COIN_INSERTED";
        statusText.textContent = "Érme elfogadva. Válassz kávét!";
        coffeeOptions.classList.remove("hidden");
    }
});

coffeeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (state === "COIN_INSERTED") {
            state = "POURING";
            coffeeOptions.classList.add("hidden");
            statusText.textContent = "Pohár lespawnol... ☕";

            setTimeout(() => {
                statusText.textContent = "Kávé csorog... ⏳";

                setTimeout(() => {
                    state = "READY";
                    statusText.textContent = "Kész! ☕";
                    takeBtn.classList.remove("hidden");
                }, 3000);

            }, 1000);
        }
    });
});

takeBtn.addEventListener("click", () => {
    if (state === "READY") {
        state = "IDLE";
        takeBtn.classList.add("hidden");
        statusText.textContent = "Egészségedre! ☕ Várakozás érmére...";
    }
});

