/**
 * Creates ports to connect figures
 * 
 * @param {object} fig The figure to apply Port
 */
function figCreatePort(fig) {    
    fig.createPort("output", outputLocator);
    fig.createPort("input", inputLocator);
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

            // insert the json string into a DIV for preview or post
            // it via ajax to the server....
            // $("#json").text(jsonTxt);
            // console.log(jsonTxt);
            download(jsonTxt, 'jsonTxt.json', 'text/plain');
        });
    });
    
    let load = document.getElementById('load');
    load.addEventListener('click', (emmiter, event) => {        

        let jsonDocument =
        [
            {
              "type": "draw2d.shape.basic.Rectangle",
              "id": "dbbf8c3e-00db-e240-6bd6-1ac12e05286c",
              "x": 233,
              "y": 111,
              "width": 75,
              "height": 75,
              "alpha": 1,
              "selectable": true,
              "draggable": true,
              "angle": 0,
              "userData": {},
              "cssClass": "draw2d_shape_basic_Rectangle",
              "ports": [
                {
                  "type": "draw2d.InputPort",
                  "id": "8c7d4c03-fde0-4e23-96e2-7d60fb6a468b",
                  "width": 10,
                  "height": 10,
                  "alpha": 1,
                  "selectable": false,
                  "draggable": true,
                  "angle": 0,
                  "userData": {},
                  "cssClass": "draw2d_InputPort",
                  "bgColor": "rgba(79,104,112,1)",
                  "color": "rgba(27,27,27,1)",
                  "stroke": 1,
                  "dasharray": null,
                  "maxFanOut": 9007199254740991,
                  "name": "input0",
                  "semanticGroup": "global",
                  "port": "draw2d.InputPort",
                  "locator": "draw2d.layout.locator.LeftLocator",
                  "locatorAttr": {}
                },
                {
                  "type": "draw2d.OutputPort",
                  "id": "c52838af-9f51-5cd8-6431-95d7edd79e76",
                  "width": 10,
                  "height": 10,
                  "alpha": 1,
                  "selectable": false,
                  "draggable": true,
                  "angle": 0,
                  "userData": {},
                  "cssClass": "draw2d_OutputPort",
                  "bgColor": "rgba(79,104,112,1)",
                  "color": "rgba(27,27,27,1)",
                  "stroke": 1,
                  "dasharray": null,
                  "maxFanOut": 9007199254740991,
                  "name": "output0",
                  "semanticGroup": "global",
                  "port": "draw2d.OutputPort",
                  "locator": "draw2d.layout.locator.RightLocator",
                  "locatorAttr": {}
                }
              ],
              "bgColor": "rgba(255,105,180,1)",
              "color": "rgba(27,27,27,1)",
              "stroke": 0,
              "radius": 0,
              "dasharray": null
            },
            {
              "type": "draw2d.shape.basic.Circle",
              "id": "86c43030-3466-253a-9150-df64e6646460",
              "x": 600,
              "y": 548,
              "width": 75,
              "height": 75,
              "alpha": 1,
              "selectable": true,
              "draggable": true,
              "angle": 0,
              "userData": {},
              "cssClass": "draw2d_shape_basic_Circle",
              "ports": [
                {
                  "type": "draw2d.InputPort",
                  "id": "8dd5aee2-4ac8-b629-7cdd-e08900d1b903",
                  "width": 10,
                  "height": 10,
                  "alpha": 1,
                  "selectable": false,
                  "draggable": true,
                  "angle": 0,
                  "userData": {},
                  "cssClass": "draw2d_InputPort",
                  "bgColor": "rgba(79,104,112,1)",
                  "color": "rgba(27,27,27,1)",
                  "stroke": 1,
                  "dasharray": null,
                  "maxFanOut": 9007199254740991,
                  "name": "input0",
                  "semanticGroup": "global",
                  "port": "draw2d.InputPort",
                  "locator": "draw2d.layout.locator.LeftLocator",
                  "locatorAttr": {}
                },
                {
                  "type": "draw2d.OutputPort",
                  "id": "d9dadfdd-fcab-ec8c-ef26-2c14a4d7de56",
                  "width": 10,
                  "height": 10,
                  "alpha": 1,
                  "selectable": false,
                  "draggable": true,
                  "angle": 0,
                  "userData": {},
                  "cssClass": "draw2d_OutputPort",
                  "bgColor": "rgba(79,104,112,1)",
                  "color": "rgba(27,27,27,1)",
                  "stroke": 1,
                  "dasharray": null,
                  "maxFanOut": 9007199254740991,
                  "name": "output0",
                  "semanticGroup": "global",
                  "port": "draw2d.OutputPort",
                  "locator": "draw2d.layout.locator.RightLocator",
                  "locatorAttr": {}
                }
              ],
              "bgColor": "rgba(0,255,255,1)",
              "color": "rgba(27,27,27,1)",
              "stroke": 0,
              "dasharray": null
            },
            {
              "type": "draw2d.Connection",
              "id": "1b7e2f86-de64-4a23-9d81-ff6660ac59b5",
              "alpha": 1,
              "selectable": true,
              "draggable": true,
              "angle": 0,
              "userData": {},
              "cssClass": "draw2d_Connection",
              "stroke": 2,
              "color": "rgba(18,156,228,1)",
              "outlineStroke": 0,
              "outlineColor": "rgba(0,0,0,0)",
              "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
              "vertex": [
                {
                  "x": 308,
                  "y": 148.5
                },
                {
                  "x": 600,
                  "y": 585.5
                }
              ],
              "router": "draw2d.layout.connection.DirectRouter",
              "radius": 3,
              "source": {
                "node": "dbbf8c3e-00db-e240-6bd6-1ac12e05286c",
                "port": "output0"
              },
              "target": {
                "node": "86c43030-3466-253a-9150-df64e6646460",
                "port": "input0"
              }
            }
          ];
        // unmarshal the JSON document into the canvas
        // (load)
        let reader = new draw2d.io.json.Reader();
        reader.unmarshal(canvas, jsonDocument);
    });

    
    var writer = new draw2d.io.json.Writer();
    writer.marshal(canvas, function(json){
        // convert the json object into string representation
        var jsonTxt = JSON.stringify(json,null,2);

        // insert the json string into a DIV for preview or post
        // it via ajax to the server....
        $("#json").text(jsonTxt);
    });

    save.addEventListener('click', (emmiter, event) => {        
        console.log('hola');
    });

});