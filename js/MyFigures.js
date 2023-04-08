function clickRight(x, y, item) {
    var shape = item.shape[0];
    $(shape).attr('id', item.getId());
    var id = "#" + $(shape).attr('id');
    $.contextMenu({
        selector: id,
        autoHide: true,
        events: {
            hide: function () {
                $.contextMenu('destroy');
            }
        },
        callback: $.proxy(function (key, options) {
            if (key == "delete") {
                //  undo/redo support
                var cmd = new draw2d.command.CommandDelete(item);
                item.getCanvas().getCommandStack().execute(cmd);
            } else {
                item.setBackgroundColor(key);
            }
        }, item),
        x: x,
        y: y,
        items: {
            "#ff0000": { name: "Vermell" }, // callback: function () { return true; } },
            "#00ff00": { name: "Verd" },
            "#0000ff": { name: "Blau" },
            "delete": { name: "Eliminar" }
        }
    });
}

function setLabel(item) {
    item.label = new draw2d.shape.basic.Label({text:"etiqueta", color:"#0d0d0d", fontColor:"#0d0d0d"});
    item.add(item.label, new draw2d.layout.locator.CenterLocator(item));
    item.label.installEditor(new draw2d.ui.LabelInplaceEditor());
}

/**
 * Create and display the modal
 * 
 * @param {number} x x position
 * @param {number} y y position
 * @param {string} id id element
 * @param {string} action action type (segment, email, etc.)
 */
function showOptions(x, y, id, action) {
    if(document.querySelector("div#" + CSS.escape(id)) !== null) {        
        document.getElementById(id).style.display = "block";
    } else {
        let appDiv = document.getElementById("app");
        let modal = document.createElement('div');
        modal.id = id;
        modal.style.display = "block";
        modal.style.left = x + "px";
        modal.style.top = y + "px";
        modal.classList.add('modal');
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        let close = document.createElement('span');
        close.classList.add('close');
        close.innerHTML = '&times';
    
        modalContent.appendChild(close);
        modal.appendChild(modalContent);
        appDiv.appendChild(modal);
    
        switch (action) {
            case "segment":
                optionsSegment(modalContent, id);
                break;
        
            default:
                break;
        }
    
        close.onclick = function() {
            modal.style.display = "none";
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    }
}

/**
 * Create and display options inside the modal according 
 * to their type (segment, form, mail, etc.)
 * 
 * @param {object} modalContent HTML element
 * @param {string} idModal Modal id
 */
function optionsSegment(modalContent, idModal) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('content-wrapper');

    for (let i = 1; i <= 6; i++) {
        const div = document.createElement('div');
        div.classList.add(`div${i}`);

        if (i === 1) {
            div.textContent = 'Select Segment List:';
        }        
        
        if (i === 2) {
            const select = document.createElement('select');
            select.classList.add('border-2');
            // select.id = 'select-segment';
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            const option3 = document.createElement('option');
            option1.textContent = 'Select segment...';
            option2.textContent = 'People that birthday = date(today)';
            option3.textContent = 'People thats last buy is > date(two months ago)';
            select.addEventListener("change", (event) => {
                const figure = app.canvas.getFigure(idModal);
                if (figure) {
                    figure.setText("Segment: " + event.target.value);
                }
            });
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
            div.appendChild(select);
        }

        if (i === 3) {
            div.textContent = 'Run List:';            
        }

        if (i === 4) {
            div.classList.add('border-2');
        }
                
        if (i === 5) {
            const button = document.createElement('button');
            button.textContent = 'New Segment';
            button.classList.add('btn-action');
            div.appendChild(button);
        }

        if (i === 6) {
            const button = document.createElement('button');
            button.textContent = 'Save';
            button.classList.add('btn-save');
            div.appendChild(button);
        }
        
        wrapperDiv.appendChild(div);
    }

    modalContent.appendChild(wrapperDiv);

}

let selectedOption = "";

var MyCustomFigureIcon = draw2d.shape.basic.Rectangle.extend({
    
    // Override the createShapeElement() method to create a custom HTML element
    createShapeElement: function() {
        var shape = this._super();
        
        this.icon = new draw2d.shape.basic.Image({
            path: "./assets/icons/" + this.userData[0],
            width: 35,
            height: 35,
        });
        
        this.add(this.icon, new draw2d.layout.locator.XYAbsPortLocator({
            x: 5,
            y: 3,
        }));
        
        return shape;
    },

    onContextMenu: function(x, y) {
        // console.log(this);
        clickRight(x, y, this);
    },
    
    onDoubleClick: function() {
        setLabel(this);
    },

    onClick: function (emitter, event) {
        let xPos = this.x + this.width + 20;
        let yPos = this.y;
        showOptions(xPos, yPos, this.id, this.userData[1]);
    },

    setText: function(text) {
        if (this.textFigure) {
            this.remove(this.textFigure);
        }
        this.textFigure = new draw2d.shape.basic.Label({
            text: text,
            color: "#000000",
            fontColor: "#000000",
            stroke: 0
        });
        this.add(this.textFigure, new draw2d.layout.locator.CenterLocator(this));
    }

});

var outputLocator = new draw2d.layout.locator.TopLocator;
var inputLocator = new draw2d.layout.locator.BottomLocator;

var MyConnection = draw2d.Connection.extend({
    init: function(attr, setter, getter) {
        this._super(attr, setter, getter);
    
        // Create a default arrow shape
        var arrow = new draw2d.shape.basic.Polygon({
            vertices: [
                {x: 0, y: 0},
                {x: -10, y: 10},
                {x: -10, y: -10}
            ],
            stroke: 2,
            color: "#000000",
            bgColor: "#ffffff"
        });
    
        // Add the arrow shape to the end of the connection
        var locator = new draw2d.layout.locator.ManhattanMidpointLocator(this);
        arrow.setPosition(locator.getX(), locator.getY());
        this.add(arrow, locator);
    }
});
