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

        this.selectable = false;
        
        return shape;
    },

    onContextMenu: function(x, y) {
        // console.log(this);
        
        clickRight(x, y, this);
    },
    
    // onDoubleClick: function() {
    //     setLabel(this);
    // },

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

function clickRight(x, y, item) {
    var shape = item.shape[0];
    $(shape).attr('id', item.getId());
    let idEl = "#" + $(shape).attr('id');
    $.contextMenu({
        selector: idEl,
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
        let workspace = document.getElementById("workspace");
        let modal = document.createElement('div');
        modal.id = id;
        modal.style.display = "block";
        modal.style.left = 50 + "%";
        modal.style.top = 50 + "%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.classList.add('modal');
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        let close = document.createElement('span');
        close.classList.add('close');
        close.innerHTML = '&times';
    
        modalContent.appendChild(close);
        modal.appendChild(modalContent);
        workspace.appendChild(modal);
    
        switch (action) {
            case "segment":
                optionsSegment(modalContent, id);
                break;
            case "email":
                optionsEmail(modalContent, id);
                break;
        
            default:
                break;
        }
    
        close.onclick = function() {
            modal.style.display = "none";
        }
    
        // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //   if (event.target == modal) {
        //     modal.style.display = "none";
        //   }
        // }
    }
}

/**
 * Create and display options inside the modal according 
 * to the type `segment`
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

/**
 * Create and display options inside the modal according 
 * to the type `email`
 * 
 * @param {object} modalContent HTML element
 * @param {string} idModal Modal id
 */
function optionsEmail(modalContent, idModal) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('content-wrapper');

    for (let i = 1; i <= 4; i++) {
        const div = document.createElement('div');
        div.classList.add(`div${i}`);

        if (i === 1) {
            div.textContent = 'Select Email:';
        }        
        
        if (i === 2) {
            const select = document.createElement('select');
            select.classList.add('border-2');
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            const option3 = document.createElement('option');
            option1.textContent = 'Select email...';
            option2.textContent = 'Email A';
            option3.textContent = 'Email List N';
            select.addEventListener("change", (event) => {
                const figure = app.canvas.getFigure(idModal);
                if (figure) {
                    figure.setText("Send Email: " + event.target.value);
                }
            });
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
            div.appendChild(select);
        }

        if (i === 3) {
            const button = document.createElement('button');
            button.textContent = 'New Email';
            button.classList.add('btn-action');
            div.appendChild(button);
        }

        if (i === 4) {
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
