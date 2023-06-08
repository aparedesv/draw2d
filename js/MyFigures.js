var dadesUsuari = [];

var MyCustomFigureIcon = draw2d.shape.basic.Rectangle.extend({
    
    // Override the createShapeElement() method to create a custom HTML element
    createShapeElement: function() {
        var shape = this._super();

        dadesUsuari['ruta'] = this.userData[0];
        dadesUsuari['figure'] = this.userData[1];
        
        shape.icon = new draw2d.shape.basic.Image({
            id: this.id,
            path: "./assets/icons/" + this.userData[0],
            width: 35,
            height: 35,
        });

        let figType = this.userData[1];
        shape.icon.on("click", function() {
            showOptions(shape.icon.id, figType);
        });
        
        this.add(shape.icon, new draw2d.layout.locator.XYAbsPortLocator({
            x: 5,
            y: 3,
        }));

        if (this.userData[1] == "end") {
            this.textFigure = new draw2d.shape.basic.Label({
                text: "End",
                color: "#000000",
                fontColor: "#000000",
                stroke: 0
            });
            this.userData.push("End");
            this.add(this.textFigure, new draw2d.layout.locator.CenterLocator(this));
        }

        this.selectable = false;
        
        return shape;
    },

    onContextMenu: function(x, y) {
        clickRight(x, y, this);
    },
    
    // onDoubleClick: function() {
    //     setLabel(this);
    // },

    onClick: function (emitter, event) {        
        showOptions(this.id, this.userData[1]);
    },

    setText: function(text) {
        if (this.textFigure) {
            this.remove(this.textFigure);
        }
        this.textFigure = new draw2d.shape.basic.Label({
            text: text,
            color: "#000000",
            fontColor: "#000000",
            stroke: 0,
        });
        this.textFigure.on("click", function() {
            showOptions(dadesUsuari['id-fig'], dadesUsuari['figure']);
        });
        this.textFigure.setWidth(20);
        this.userData.push(text);
        this.add(this.textFigure, new draw2d.layout.locator.CenterLocator(this));
    }

});

var outputLocator = new draw2d.layout.locator.TopLocator;
var inputLocator = new draw2d.layout.locator.BottomLocator;

var optionSelect = "";

/*
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
*/

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
 * Sets text to Figure
 * 
 * @param {string} idModal id Modal
 * @param {string} optionSelect option selected 
 */
function setTextToFigure(idModal, optionSelect) {
    let figure = app.canvas.getFigure(idModal);
    if (figure) {
        if (figure.userData[1] == "segment") {
            if (optionSelect === "Select segment..." || optionSelect === "Segment: Select segment...") {
                figure.setText("");
            } else {
                figure.setText(optionSelect);
            }
        }
        if (figure.userData[1] == "email") {
            if (optionSelect === "Select email..." || optionSelect === "Email: Select email...") {
                figure.setText("");
            } else {
                figure.setText(optionSelect);
            }
        }
    }
    document.querySelector("div#" + CSS.escape(idModal)).style.display = "none";
}

/**
 * Saves option selected by user
 * 
 * @param {string} option option selected
 */
function saveOptionSelected(idModal, option) {
    let figure = app.canvas.getFigure(idModal);
    if (figure.userData[1] == "segment") {
        optionSelect = "Segment: " + option;
    }
    if (figure.userData[1] == "email") {
        optionSelect = "Email: " + option;
    }
}

/**
 * Create and display the modal
 * 
 * @param {number} x x position
 * @param {number} y y position
 * @param {string} id id element
 * @param {string} action action type (segment, email, etc.)
 */
function showOptions(id, action) {
    dadesUsuari['id-fig'] = id;    

    if (action == "end") {
        return;
    }

    if(document.querySelector("div#" + CSS.escape(id)) !== null) {        
        document.querySelector("div#" + CSS.escape(id)).style.setProperty("display", "block");
    } else {        
        let workspace = document.getElementById("workspace");
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.id = id;
        modal.style.setProperty("display", "block");
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
            modal.style.setProperty("display", "none");
            disableEnableButtonsMenu();
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
            disableEnableButtonsMenu();
          }
        }
        disableEnableButtonsMenu();
    }
}

/**
 * Toggle action buttons sidebar menu disable/enable
 */
function disableEnableButtonsMenu() {
    buttons = document.querySelectorAll('.action-wrapper button');
    buttons.forEach(element => {
        element.toggleAttribute("disabled");
    });
}

/**
 * Add event and close modal
 * 
 * @param {HTMLElement} modalEl
 */
function closeBtn(modalEl) {
    let closeButton = modalEl.querySelector('span.close');
    // console.log(modalEl, closeButton);
    const listener = function(event) {
        console.log(event);
        modalEl.classList.toggle('hide');
        disableEnableButtonsMenu();
        closeButton.removeEventListener("click", listener);
    };
    closeButton.addEventListener("click", listener);
}

/**
 * Display or hide modal
 * 
 * @param {HTMLElement} modalEl 
 * @param {string} message
 */
function modalSave(modalEl, message) {
    disableEnableButtonsMenu();
    modalEl.classList.toggle('hide');
    modalEl.querySelector('p').textContent = message;
    closeBtn(modalEl);
}

/**
 * Confirm clear canvas
 * 
 * @param {HTMLElement} modalEl 
 */
function clearConfirm(modalEl) {
    console.log(modalEl);
    disableEnableButtonsMenu();
    modalEl.classList.toggle('hide');
    closeBtn(modalEl);

    let btnsBool = document.querySelectorAll('#clear-modal button');
    btnsBool.forEach(function(btn) {
        const listener = function(event) {
            if (btn.dataset.bool == "true") {
                console.log(modalEl);
                console.log('click YES');
                app.canvas.clear();
                // btn.removeEventListener("click", listener);
            } else {
                console.log('click NO');
                console.log(modalEl);
            }
            modalEl.classList.toggle('hide');
            disableEnableButtonsMenu();
        }
        // btn.removeEventListener("click", listener);
        btn.addEventListener("click", listener);
    });


    // yes.onclick = function () {
    //     confirmModal.style.setProperty("display", "none");
    //     disableEnableButtonsMenu();
    //     app.canvas.clear();
    // }
    // no.onclick = function () {
    //     confirmModal.style.setProperty("display", "none");
    //     disableEnableButtonsMenu();
    //     return false;
    // }


    // if (document.getElementById("confirm-modal") == null) {
    //     let confirmModal = createHtmlModal("confirm-modal", "Are you sure you want to clear the data and lose your campaign?");
    //     let btnWrapper = document.createElement("div");
    //     btnWrapper.classList.add("btns-modal");
    //     let no = document.createElement('button');
    //     let yes = document.createElement('button');
    //     no.textContent = "NO";
    //     yes.textContent = "YES";
    //     btnWrapper.appendChild(no);
    //     btnWrapper.appendChild(yes);
    //     confirmModal.childNodes[0].appendChild(btnWrapper);
    //     yes.onclick = function () {
    //         confirmModal.style.setProperty("display", "none");
    //         disableEnableButtonsMenu();
    //         app.canvas.clear();
    //     }
    //     no.onclick = function () {
    //         confirmModal.style.setProperty("display", "none");
    //         disableEnableButtonsMenu();
    //         return false;
    //     }
    // } else {
    //     document.getElementById("confirm-modal").style.setProperty("display", "block");
    //     disableEnableButtonsMenu();
    // }
}

/**
 * Basic messages modal display and interactions
 * 
 * @param {string} id 
 * @param {string} message 
 */
function createHtmlModal(id = null, message) {
    disableEnableButtonsMenu();
    let workspace = document.getElementById("workspace");    
    if (document.getElementById(id) == null) {
        let modalBasic = document.createElement('div');
        modalBasic.classList.add('modal');
        modalBasic.id = id;
        modalBasic.style.setProperty("display", "block");
        let modalBasicContent = document.createElement('div');
        modalBasicContent.classList.add('modal-content');
        modalBasicContent.textContent = message;
        let closeBasic = document.createElement('span');
        closeBasic.classList.add('close');
        closeBasic.innerHTML = '&times';
    
        modalBasicContent.appendChild(closeBasic);
        modalBasic.appendChild(modalBasicContent);
        workspace.appendChild(modalBasic);
    
        closeBasic.onclick = function () {
            modalBasic.style.setProperty("display", "none");
            disableEnableButtonsMenu();
        }
        return modalBasic;
    } else {
        if (message != "There's nothing to save...") {
            let modalBasic = document.getElementById(id);
            modalBasic.style.setProperty("display", "block");
            document.querySelector('.modal-content').textContent = message;
        }
        disableEnableButtonsMenu();
        return document.getElementById(id);
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
                saveOptionSelected(idModal, event.target.value);
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
            button.addEventListener("click", (event) => {
                setTextToFigure(idModal, optionSelect);
            });
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
                saveOptionSelected(idModal, event.target.value);
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
            button.addEventListener("click", (event) => {
                setTextToFigure(idModal, optionSelect);
            });
            div.appendChild(button);
        }
        
        wrapperDiv.appendChild(div);
    }

    modalContent.appendChild(wrapperDiv);
}

let selectedOption = "";
