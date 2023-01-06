
var MySquare = draw2d.shape.basic.Rectangle.extend({

    /**
     * sense el init funciona igual???
     * suposo que a mida que anem requerint funcionalitats caldrà...
     */
    /* init : function(attr, setter, getter)
    {
        this._super($.extend({radius:0},attr), setter, getter); 
    }, */

    onDoubleClick: function()
    {
    	this.label = new draw2d.shape.basic.Label({text:"label", color:"#0d0d0d", fontColor:"#0d0d0d"});
        this.add(this.label, new draw2d.layout.locator.CenterLocator(this));
        this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
    }

});

var MyCircle = draw2d.shape.basic.Circle.extend({

    init : function(attr, setter, getter)
    {
        this._super($.extend(attr), setter, getter); 
    },    

});

var outputLocator = new draw2d.layout.locator.RightLocator;
var inputLocator = new draw2d.layout.locator.LeftLocator;