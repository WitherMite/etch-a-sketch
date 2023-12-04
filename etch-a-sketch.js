const SCREEN = document.querySelector(".etchContainer");
const SIZEBTN = document.querySelector(".sideLengthBtn");

fillScreen(16);

SIZEBTN.addEventListener("click", () => {
    fillScreen(getSideLength());
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
            border: 1px solid black;`
        );
        PIXEL.classList.add('pixel');

        SCREEN.appendChild(PIXEL);
    }
    const pixels = document.querySelectorAll(".pixel");

    addMouseEnterBehavior(pixels);
}

function addMouseEnterBehavior(pixels) {
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            pixel.style.backgroundColor = "black";
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