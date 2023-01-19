
var MySquare = draw2d.shape.basic.Rectangle.extend({

    onContextMenu: function(x, y) {
        var shape = this.shape[0];
        $(shape).attr('id', this.getId());
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
                    //  without undo/redo support
                    //  this.getCanvas().removeFigure(this);

                    //  with undo/redo support
                    var cmd = new draw2d.command.CommandDelete(this);
                    this.getCanvas().getCommandStack().execute(cmd);
                } else {
                    this.setBackgroundColor(key);
                }
            }, this),
            x: x,
            y: y,
            items: {
                "#ff0000": { name: "Vermell" }, // callback: function () { return true; } },
                "#00ff00": { name: "Verd" },
                "#0000ff": { name: "Blau" },
                "delete": { name: "Eliminar" }
            }
        });
    },

    onDoubleClick: function() {
    	this.label = new draw2d.shape.basic.Label({text:"etiqueta", color:"#0d0d0d", fontColor:"#0d0d0d"});
        this.add(this.label, new draw2d.layout.locator.CenterLocator(this));
        this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
    }

});

var MyCircle = draw2d.shape.basic.Circle.extend({

    init: function(attr, setter, getter) {
        this._super($.extend(attr), setter, getter); 
    },    

});

var outputLocator = new draw2d.layout.locator.RightLocator;
var inputLocator = new draw2d.layout.locator.LeftLocator;
