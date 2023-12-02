const SCREEN = document.querySelector(".etchContainer");

fillScreen(16);

function fillScreen(sideLength) {
    const pixelCount = sideLength ** 2;
    const pixelSize = (1 / sideLength) * 100;

    for (i = 0; i < pixelCount; i++) {
        const PIXEL = document.createElement("div");
        
        PIXEL.setAttribute("style", 
            `height: ${pixelSize}%;
            width: ${pixelSize}%;
            flex: 1, 1, ${pixelSize}%;
            border: 1px solid black;`
        );

        SCREEN.appendChild(PIXEL);
    }
}