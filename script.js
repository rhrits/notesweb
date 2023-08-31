// Get necessary DOM elements
const textEditor = document.getElementById("text-editor");
const drawingCanvas = document.getElementById("drawing-canvas");
const downloadButton = document.getElementById("download-btn");

// Set up the drawing context
const ctx = drawingCanvas.getContext("2d");
ctx.lineWidth = 2;
ctx.strokeStyle = "black";

// Add event listeners for color selection, font style, etc.

// Add event listener for drawing on the canvas
let isDrawing = false;
drawingCanvas.addEventListener("mousedown", startDrawing);
drawingCanvas.addEventListener("mousemove", draw);
drawingCanvas.addEventListener("mouseup", endDrawing);
drawingCanvas.addEventListener("mouseout", endDrawing);

// Functions to handle drawing
function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
    ctx.stroke();
}

function endDrawing() {
    isDrawing = false;
}

// Add event listener for download button
downloadButton.addEventListener("click", downloadPDF);

// Function to download notes as PDF
function downloadPDF() {
    const pdf = new jsPDF();
    pdf.text(textEditor.value, 10, 10);
    pdf.addPage();
    pdf.addImage(drawingCanvas.toDataURL(), "PNG", 10, 10, 100, 100);
    pdf.save("notes.pdf");
}

