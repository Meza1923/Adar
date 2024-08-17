// Configuration
let childGender = "boy";  // Change to "girl" for a girl
let canvas, ctx;
let isDrawing = false;

// Initialize the scratch card
window.onload = function () {
    const scratchContainer = document.getElementById('scratch-container');
    const childImage = document.getElementById('childImage');
    
    // Set the child image and background color based on the gender
    if (childGender === "boy") {
        childImage.src = "boy.png";  // Replace with the path to your boy image
        scratchContainer.style.backgroundColor = "blue";
    } else {
        childImage.src = "girl.png";  // Replace with the path to your girl image
        scratchContainer.style.backgroundColor = "pink";
    }
    
    childImage.style.display = "block";
    
    // Setup canvas
    canvas = document.getElementById('scratchCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = scratchContainer.clientWidth;
    canvas.height = scratchContainer.clientHeight;
    
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("?", canvas.width / 2, canvas.height / 2 + 20);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);
};

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    e.preventDefault();
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}
