
var MySquare = draw2d.shape.basic.Rectangle.extend({

    init : function(attr, setter, getter)
    {
        this._super($.extend({radius:0},attr), setter, getter); 
    },

    /**
     * @method
     * Change the corner radius if the user clicks on the element. 
     * quite simple....
     *
     *      // Alternatively you can register an event with:
     *      //
     *      figure.on("dblclick", function(emitter, event){
     *          alert("user dbl click on the figure");
     *      });
     *
     */

    // We don't need this at this moment
    // onDoubleClick: function()
    // {
    // 	this.setRadius( this.getRadius()===5?20:5);
    // }

});

var MyCircle = draw2d.shape.basic.Circle.extend({

    init : function(attr, setter, getter)
    {
        this._super($.extend(attr), setter, getter); 
    },    

});

var outputLocator = new draw2d.layout.locator.RightLocator;
var inputLocator = new draw2d.layout.locator.LeftLocator;