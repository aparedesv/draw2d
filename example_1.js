/**
 * Creates ports to connect figures
 * 
 * @param {object} fig The figure to apply Port
 */
function figCreatePort(fig) {    
    fig.createPort("output", outputLocator);
    fig.createPort("input", inputLocator);
}

/**
 * Shows file list to choose
 * 
 * @param {object} files 
 */
function showFiles(files) {
  // const modal = document.getElementById("myModal");
  modal.style.display = "block";
  const fileList = document.getElementById("file-list");
  for (let file of files) {
    if (file != '.' && file != '..') {      
      const listItem = document.createElement("li");
      listItem.classList.add("file-path");
      listItem.textContent = file;
      fileList.appendChild(listItem);
    }
  }
}

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

        figCreatePort(figSquare);
        canvas.add(figSquare, 10, 10);
    });

    let circle = document.getElementById('circle');
    circle.addEventListener('click', (emmiter, event) => {        
        let figCircle = new MyCircle({
            width: circle.style.width, 
            height: circle.style.height,
            bgColor: circle.style.backgroundColor,
            stroke: 0,
        });
        
        figCreatePort(figCircle);
        canvas.add(figCircle, 50, 50);
    });
    
    let save = document.getElementById('save');
    save.addEventListener('click', (emmiter, event) => {        
        
        var writer = new draw2d.io.json.Writer();
        writer.marshal(canvas, function(json){
            // convert the json object into string representation
            var jsonTxt = JSON.stringify(json,null,2);
            window.localStorage.setItem('draw_saved', jsonTxt);

            // insert the json string into a DIV for preview or post
            // it via ajax to the server....
            // $("#json").text(jsonTxt);
            // console.log(jsonTxt);
            // download(jsonTxt, 'jsonTxt.json', 'text/plain');
        });
    });
    
    let load = document.getElementById('load');
    load.addEventListener('click', (emmiter, event) => {
        // getFiles();
        
        let jsonDraw = window.localStorage.getItem('draw_saved');

        // unmarshal the JSON document into the canvas
        // (load)
        canvas.clear();
        let reader = new draw2d.io.json.Reader();
        reader.unmarshal(canvas, jsonDraw);
    });

    
    // var writer = new draw2d.io.json.Writer();
    // writer.marshal(canvas, function(json){
    //     // convert the json object into string representation
    //     var jsonTxt = JSON.stringify(json,null,2);

    //     // insert the json string into a DIV for preview or post
    //     // it via ajax to the server....
    //     $("#json").text(jsonTxt);
    // });

});