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

function showOptions(x, y) {
    // console.log(x, y);
    var modal = document.getElementById("myModal");    
    modal.style.display = "block";
    modal.style.left = x + "px";
    modal.style.top = y + "px";
    var span = document.getElementsByClassName("close")[0];
    
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}

var MyCustomFigureIcon = draw2d.shape.basic.Rectangle.extend({
    
    // Override the createShapeElement() method to create a custom HTML element
    createShapeElement: function() {
        var shape = this._super();
        
        this.icon = new draw2d.shape.basic.Image({
            path: "./assets/icons/" + this.userData,
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
        console.log(this);
        clickRight(x, y, this);
    },
    
    onDoubleClick: function() {
        setLabel(this);
    },

    onClick: function (emitter, event) {
        let xPos = this.x + this.width + 20;
        let yPos = this.y;

        showOptions(xPos, yPos);

        // console.log(
        //     this.x, 
        //     this.width,
        //     this.y,
        //     this.height,
        // );
    }

});

var outputLocator = new draw2d.layout.locator.RightLocator;
var inputLocator = new draw2d.layout.locator.LeftLocator;

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
