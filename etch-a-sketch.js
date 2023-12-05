const SCREEN = document.querySelector(".etchContainer");
const SIZE_BTN = document.querySelector(".sideLengthBtn");
const RESET_BTN = document.querySelector(".resetBtn");
const RAINBOW_BTN = document.querySelector(".rainbowBtn");
const BLACK_BTN = document.querySelector(".blackBtn");
const GRADIENT_BTN = document.querySelector(".gradientBtn");
const pixels = SCREEN.childNodes;
let currentPen = "black";

fillScreen(16);

SIZE_BTN.addEventListener("click", () => {
    fillScreen(getSideLength());
});

RESET_BTN.addEventListener("click", () => {
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

GRADIENT_BTN.addEventListener("click", () => {
    currentPen = "gradient";
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
        const pixel = document.createElement("div");
        
        pixel.setAttribute("style", 
            `height: ${pixelSize}%;
            flex: 1 1 ${pixelSize}%;
            background-color: rgb(255,255,255);
            border: 1px solid black;`
        );
        SCREEN.appendChild(pixel);
    }
    addMouseEnterBehavior();
}

function addMouseEnterBehavior() {
    pixels.forEach((pixel) => {
        pixel.replaceWith(pixel.cloneNode()); //removes old event handlers
    });

    switch (currentPen) {
        case "black":
            addBlackMouseEnter();
            break;
        case "rainbow":
            addRandomMouseEnter();
            break;
        case "gradient":
            addGradientMouseEnter();
            break;
    }
}

function addBlackMouseEnter() {
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            pixel.style.backgroundColor = "rgb(0,0,0)";
        });
    });
}

function addRandomMouseEnter() {
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            pixel.style.backgroundColor = `rgb(${getrandomColor()},${getrandomColor()},${getrandomColor()})`;
            pixel.style.border = "";
        });
    });
}

function addGradientMouseEnter() {
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            const currentColor = pixel.style.backgroundColor;
            const colorValues = currentColor.slice(4,-1).split(",");
            pixel.style.backgroundColor = `rgb(${darkenColorValues(colorValues)})`;
        });
    });
}

function getSideLength() {
    const userInput = Math.floor(Number(prompt("Enter number of pixels per side (1-100)")));

    if (userInput && userInput <= 100) {
        return userInput;
    } else alert("You must enter a number between 1 and 100");
}

function getrandomColor() {
    return Math.floor(Math.random() * 256);
}

function darkenColorValues (colorValues) {
    const darkerColors = colorValues.map((value) => {
        value = Number(value.trim());

        if (value < 25.5) {
            value = 0;
        } else value -= 25.5;
        return value;
    });
    return darkerColors;
}