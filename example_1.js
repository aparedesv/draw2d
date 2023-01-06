
document.addEventListener("DOMContentLoaded",function () {
    
    let mainWorkspace = document.getElementById('workspace');
    let figWrapper = document.createElement("div");
    figWrapper.setAttribute("id","my-figures");
    figWrapper.setAttribute("onselectstart","javascript:/*IE8 hack*/return false");
    figWrapper.setAttribute("style","width: 3000px;height: 3000px;");
    mainWorkspace.appendChild(figWrapper);
    let canvas = new draw2d.Canvas("my-figures");

    let square = document.getElementById('square');
    square.addEventListener('click', (emmiter, event) => {
        let figSquare = new MySquare({
            width: square.style.width, 
            height: square.style.height,
            bgColor: square.style.backgroundColor,
            stroke: 0,
        });
        
        figSquare.createPort("output", outputLocator);
        figSquare.createPort("input", inputLocator);

        canvas.add(figSquare, 10, 10);
    });

    // var start = new draw2d.shape.node.Hub();

    let circle = document.getElementById('circle');
    circle.addEventListener('click', (emmiter, event) => {        
        let figCircle = new MyCircle({
            width: circle.style.width, 
            height: circle.style.height,
            bgColor: circle.style.backgroundColor,
            stroke: 0,
        });

        figCircle.createPort("output", outputLocator);
        figCircle.createPort("input", inputLocator);

        canvas.add(figCircle, 50, 50);
    });

    
    

});