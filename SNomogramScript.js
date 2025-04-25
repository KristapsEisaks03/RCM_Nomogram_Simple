let img = document.getElementById("NomogramImg");;
let div = document.getElementById('NomogramContainer');
let imagesrc = "LBG-Performance-Data-36.png"; // this can be altered
// the end 36 in the source means the procentage where the jet velocity is located
// this allows to pin point accurately the graph


// Define initial line coordinates
let linex1= 0, liney1=(img.height/2),linex2 = img.width, liney2 = (img.height/2);

function setup(){
    let canvas = createCanvas(img.width, img.height);
    canvas.parent('NomogramContainer');
    frameRate(60);
    strokeWeight(2);
}

function draw(){
    clear();
    stroke("black");
    line(linex1, liney1, linex2, liney2);
    // If the mouse is pressed, update the y-coordinate of the line end based on the mouse position
    if (mouseIsPressed) {
        if(mouseX<=(img.width/2)){
            liney1 = mouseY;
        }else if (mouseX>(img.width/2)){
            liney2 = mouseY;
        }
    }
    var Intersect = new StaticPressure_Line(String(imagesrc)); // creates a class 
    // this is the reason for the variable at beginning so this new class can track
    // what currently is displayed on the screen
    Intersect.DrawInterceptLine(linex1, liney1, linex2, liney2); 
    // I think this is straight forward xD
}

class StaticPressure_Line{
    constructor(sourcename){
        this.sourcename = sourcename; // utilize the variable properly
    }

    calculateIntersection(x1, y1, x2, y2, x3, y3, x4, y4) { // the actual maths function (just for reusability)
        let denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
        if (denominator == 0) return null; // lines are parallel

        let x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
        let y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;

        return {x, y};
    }

    DrawInterceptLine(x3, y3, x4, y4) {
        var temp = imagesrc.split("-");
        temp = temp[temp.length-1].split(".")[0];
        temp = Math.round(img.width*(temp/100));
        // the temp variable is used to grab the actual number in the image source
        // so it does multiple splits to find it
        // could of made it in single line but would be too messy :D

        var x1 = parseInt(temp);
        var y1 = 0;
        var x2 = parseInt(temp);
        var y2 = img.height;
        // again could have made it into one line but would be messy

        let intersection = this.calculateIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
        if (intersection) {
            line(intersection.x, intersection.y, intersection.x+450, intersection.y); // this draws a straight line to right from intersection
        }
    }
}

function windowResized() {
    let div = select('#NomogramContainer');
    resizeCanvas(div.width, div.height);
}

window.onload = function(){
    img.src = imagesrc;
    div.style.width = img.width + 'px';
    div.style.height = img.height + 'px';
};

window.addEventListener('resize', function(event){
    div.style.width = img.width + 'px';
    div.style.height = img.height + 'px';
});

// functions above are made to ensure all the p5.js loads properly and works straight out of box well