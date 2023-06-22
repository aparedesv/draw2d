var dadesUsuari = [];
var selectedOption = "";
var outputLocator = new draw2d.layout.locator.TopLocator;
var inputLocator = new draw2d.layout.locator.BottomLocator;
var optionSelect = "";

var MyCustomFigureIcon = draw2d.shape.basic.Rectangle.extend({

    // Override the createShapeElement() method to create a custom HTML element
    createShapeElement: function () {
        var shape = this._super();

        dadesUsuari['ruta'] = this.userData[0];
        dadesUsuari['figure'] = this.userData[1];
        dadesUsuari['text-label'] = this.userData[2];

        shape.icon = new draw2d.shape.basic.Image({
            id: this.id,
            path: "./assets/icons/" + this.userData[0],
            width: 35,
            height: 35,
        });

        shape.icon.on("click", function () {
            disableEnableButtonsMenu();
            showOptions(shape.icon.id, dadesUsuari['figure']);
        });

        this.add(shape.icon, new draw2d.layout.locator.XYAbsPortLocator({
            x: 5,
            y: 3,
        }));

        if (dadesUsuari['figure'] == "end") {
            this.textFigure = new draw2d.shape.basic.Label({
                text: "End",
                color: "#000000",
                fontColor: "#000000",
                stroke: 0
            });
            this.userData.push("End");
            this.add(this.textFigure, new draw2d.layout.locator.CenterLocator(this));
        }

        if (dadesUsuari['text-label'] != null) {
            this.textFigure = new draw2d.shape.basic.Label({
                text: dadesUsuari['text-label'],
                color: "#000000",
                fontColor: "#000000",
                stroke: 0
            });
            this.add(this.textFigure, new draw2d.layout.locator.CenterLocator(this));
        }

        this.selectable = false;

        return shape;
    },

    onContextMenu: function (x, y) {
        clickRight(x, y, this);
    },

    // onDoubleClick: function() {
    //     setLabel(this);
    // },

    onClick: function (emitter, event) {
        disableEnableButtonsMenu();
        showOptions(this.id, this.userData[1]);
    },

    setText: function (text) {
        if (this.textFigure) {
            this.remove(this.textFigure);
        }
        this.textFigure = new draw2d.shape.basic.Label({
            text: text,
            color: "#000000",
            fontColor: "#000000",
            stroke: 0,
        });
        this.typeFigure = dadesUsuari['figure'];
        this.idFigure = dadesUsuari['id-fig'];
        var self = this;
        this.textFigure.on("click", function () {
            disableEnableButtonsMenu();
            showOptions(self.idFigure, self.typeFigure);
        });
        this.userData.push(text);
        this.textFigure.setWidth(20);
        this.add(this.textFigure, new draw2d.layout.locator.CenterLocator(this));
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
    item.label = new draw2d.shape.basic.Label({ text: "etiqueta", color: "#0d0d0d", fontColor: "#0d0d0d" });
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
    // console.log(optionSelect.length, figure.width);
    if (optionSelect.length > 45) {
        figure.width = figure.width + optionSelect.length;
    }
    if (figure) {
        // canviar if per switch
        if (figure.userData[1] == "segment") {
            if (optionSelect === "Select segment..." || optionSelect === "Segment: Select segment...") {
                figure.setText("");
                figure.userData[2] = "";
            } else {
                figure.setText(optionSelect);
                figure.userData[2] = optionSelect;
            }
        }
        if (figure.userData[1] == "email") {
            if (optionSelect === "Select email..." || optionSelect === "Email: Select email...") {
                figure.setText("");
                figure.userData[2] = "";
            } else {
                figure.setText(optionSelect);
                figure.userData[2] = optionSelect;
            }
        }
    }
    disableEnableButtonsMenu();
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

    if (document.querySelector("div#" + CSS.escape(id)) !== null) {
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

        close.onclick = function () {
            modal.style.setProperty("display", "none");
            disableEnableButtonsMenu();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                disableEnableButtonsMenu();
            }
        }
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
    const listener = function (event) {
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
    disableEnableButtonsMenu();
    closeBtn(modalEl);
    modalEl.classList.toggle('hide');

    let btnYes = document.getElementById('btn-yes');
    let btnNo = document.getElementById('btn-no');

    btnYes.onclick = function () {
        modalEl.classList.toggle('hide');
        disableEnableButtonsMenu();
        app.canvas.clear();
    }
    btnNo.onclick = function () {
        modalEl.classList.toggle('hide');
        disableEnableButtonsMenu();
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
