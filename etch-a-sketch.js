const SCREEN = document.querySelector(".etchContainer");
const SIZE_BTN = document.querySelector(".sideLengthBtn");
const RESET_BTN = document.querySelector(".resetBtn");
const RAINBOW_BTN = document.querySelector(".rainbowBtn");
const BLACK_BTN = document.querySelector(".blackBtn");
let currentPen = "black";

fillScreen(16);

SIZE_BTN.addEventListener("click", () => {
    fillScreen(getSideLength());
});

RESET_BTN.addEventListener("click", () => {
    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = "rgb(255,255,255)";
        pixel.style.border = "1px solid black";
    });
});

RAINBOW_BTN.addEventListener("click", () => {
    currentPen = "rainbow";
    addMouseEnterBehavior();
});

BLACK_BTN.addEventListener("click", () => {
    currentPen = "black";
    addMouseEnterBehavior();
});

function fillScreen(sideLength) {
    const pixelCount = sideLength ** 2;
    const pixelSize = (1 / sideLength) * 100;

    if (!sideLength) {
        return;
    }
    while (SCREEN.firstChild) {
        SCREEN.removeChild(SCREEN.firstChild);
    }

    for (i = 0; i < pixelCount; i++) {
        const PIXEL = document.createElement("div");
        
        PIXEL.setAttribute("style", 
            `height: ${pixelSize}%;
            flex: 1 1 ${pixelSize}%;
            background-color: rgb(255,255,255);
            border: 1px solid black;`
        );
        PIXEL.classList.add('pixel');

        SCREEN.appendChild(PIXEL);
    }
    addMouseEnterBehavior();
}

function addMouseEnterBehavior() {
    const pixels = document.querySelectorAll(".pixel");
    
    pixels.forEach((pixel) =>{
        pixel.replaceWith(pixel.cloneNode());
    });

    switch (currentPen) {
        case "black":
            addBlackMouseEnter();
            break;
        case "rainbow":
            addRandomMouseEnter()
            break;
        case "gradient":
    }
}

function addBlackMouseEnter() {
    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            pixel.style.backgroundColor = "rgb(0,0,0)";
            pixel.style.border = "";
        });
    });
}

function addRandomMouseEnter() {
    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            pixel.style.backgroundColor = `rgb(${getrandomColor()},${getrandomColor()},${getrandomColor()})`;
            pixel.style.border = "";
        });
    });
}

function getSideLength() {
    const userInput = Math.floor(Number(prompt("Enter number of pixels per side")));

    if (userInput && userInput <= 100) {
        return userInput;
    } else alert("You must enter a number between 1 and 100");
}

function getrandomColor() {
    return Math.floor(Math.random() * 255);
}