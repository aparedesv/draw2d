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
                //  without undo/redo support
                //  item.getCanvas().removeFigure(item);

                //  with undo/redo support
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

const MySquare = draw2d.shape.basic.Rectangle.extend({
    onContextMenu: function(x, y) {
        clickRight(x, y, this);        
    },
    onDoubleClick: function() {
        setLabel(this);
    }
});

var MyCircle = draw2d.shape.basic.Circle.extend({
    init: function(attr, setter, getter) {
        this._super($.extend(attr), setter, getter); 
    },
    onContextMenu: function(x, y) {
        clickRight(x, y, this);
    },
    onDoubleClick: function() {
        setLabel(this);
    }   
});

/* var MyMailSVG = draw2d.SVGFigure.extend({
    init: function(attr, setter, getter) {
        this._super($.extend(attr), setter, getter); 
        this.setSVG('<?xml version="1.0" encoding="UTF-8"?><svg xmlns: xlink = "http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="228" height="183" id="screenshot-6b7b1b5b-6359-80c9-8001-ee09e7d0e5af" viewBox="330 326 228 183" style="-webkit-print-color-adjust: exact;" fill="none" version="1.1"><g id="shape-6b7b1b5b-6359-80c9-8001-ee09e7d0e5af"><g id="fills-6b7b1b5b-6359-80c9-8001-ee09e7d0e5af"><path rx="0" ry="0" d="M347.1,509C342.54,509,338.55,507.284,335.13,503.853C331.71,500.422,330,496.419,330,491.844L330,343.156C330,338.581,331.71,334.578,335.13,331.147C338.55,327.716,342.54,326,347.1,326L540.9,326C545.46,326,549.45,327.716,552.87,331.147C556.29,334.578,558,338.581,558,343.156L558,491.844C558,496.419,556.29,500.422,552.87,503.853C549.45,507.284,545.46,509,540.9,509ZM444,422.647L347.1,358.883L347.1,491.844L540.9,491.844L540.9,358.883ZM444,405.491L539.76,343.156L348.525,343.156ZM347.1,358.883L347.1,343.156L347.1,491.844Z" style="fill: rgb(170, 237, 46); fill-opacity: 1;"></path></g></g></svg>');
    },    
}); */

var MyMailImage = draw2d.shape.basic.Image.extend({
    init: function(attr, setter, getter) {
        this._super($.extend(attr), setter, getter);
        this.path = './assets/img/mail.svg';
        this.setResizeable(true);
    },
    onContextMenu: function(x, y) {
        clickRight(x, y, this);        
    },
    onDoubleClick: function() {
        setLabel(this);
    }
});

// Define a custom figure class that extends the Rectangle class
var MyFormFigure = draw2d.shape.basic.Rectangle.extend({

    // Override the createShapeElement() method to create a custom HTML element
    createShapeElement: function() {
        var shape = this._super();
        let option = 'toni';

        if (option == 'andreu') {            
            // Create a new HTML element with custom content
            var el = document.createElement('div');
            el.classList.add('custom-figure');
            el.innerHTML = this.userData;    
            // Add the HTML element to the shape element
            shape.node.appendChild(el);
        }
        if (option == 'toni') {
            this.icon = new draw2d.shape.icon.BarChart({
                color: '#fff',
                height: 35,
                width: 35,
            })
            this.add(this.icon, new draw2d.layout.locator.XYAbsPortLocator({
                x: 5,
                y: 7,
            }));
        }
        return shape;
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
