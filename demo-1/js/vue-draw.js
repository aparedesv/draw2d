const greenSherpa = "#5dbecb";
const whiteSherpa = "#fff";

var menuFigure = Vue.component('menu-figure', {
    props: [
        'template',
        'title',
        'figure',
        'ruta',
    ],
    template: '<div @click="createFigure" class="icon-wrapper"><span v-html="template"></span><h6 class="icon-title">{{ title }}</h6></div>',
    data() {
        return {
            width: '75px',
            height: '75px',
        }
    },
    methods: {
        createFigure() {
            // Create a new custom figure
            var figSquare = new MyCustomFigureIcon({
                width: 325,
                height: 40,
                bgColor: whiteSherpa,
                color: greenSherpa,
                draggable: true,
                userData: [this.ruta, this.figure],
                radius: 5
            });

            app.figCreatePort(figSquare);
            app.canvas.add(figSquare, 50, 50);
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        canvas: null
    },
    components: {
        menuFigure,
    },
    methods: {
        figCreatePort(fig) {
            fig.createPort("output", outputLocator);
            fig.createPort("input", inputLocator);
        },
        arrowDecoratorPort(fig) {

        },
        createCanvas() {
            let canvas = new draw2d.Canvas("my-figures");
            this.canvas = canvas;
        },
        clearCanvas() {
            if (this.canvas.figures.data.length > 0) {
                clearConfirm(document.getElementById('clear-modal'));
            } else {
                modalSave(document.getElementById('save-modal'), "There's nothing to clear...");
            }
        },
        save() {
            if (this.canvas.figures.data.length > 0) {
                let writer = new draw2d.io.json.Writer();
                writer.marshal(this.canvas, function (json) {
                    var jsonTxt = JSON.stringify(json, null, 2);
                    window.localStorage.setItem('draw_saved', jsonTxt);
                });
                modalSave(document.getElementById('save-modal'), "Your automation campaign has been saved!");
            } else {
                modalSave(document.getElementById('save-modal'), "There's nothing to save...");
            }
        },
        load() {
            if (window.localStorage.getItem('draw_saved') != null) {
                this.canvas.clear();
                let jsonDraw = window.localStorage.getItem('draw_saved');
                let reader = new draw2d.io.json.Reader();
                reader.unmarshal(this.canvas, jsonDraw);
                let figures = this.canvas.getFigures().clone();
                figures.each((i, f) => {

                    f.setId(f.id);
                    f.onClick = function (emitter, event) {
                        showOptions(this.id, f.userData[1]);
                    };
                    f.setText = function (text) { // see method at MyCustomFigureIcon custom Object
                        if (this.textFigure) {
                            this.remove(this.textFigure);
                        }
                        this.textFigure = new draw2d.shape.basic.Label({
                            text: text,
                            color: "#000000",
                            fontColor: "#000000",
                            stroke: 0,
                        });
                        this.textFigure.setWidth(20);
                        this.add(this.textFigure, new draw2d.layout.locator.CenterLocator(this));
                    };
                    f.textFigure = new draw2d.shape.basic.Label({
                        text: f.userData[2],
                        color: "#000000",
                        fontColor: "#000000",
                        stroke: 0,
                    });
                    f.textFigure.on("click", function () {
                        disableEnableButtonsMenu();
                        showOptions(f.id, f.userData[1]);
                    });
                    f.add(f.textFigure, new draw2d.layout.locator.CenterLocator(f));
                    f.icon = new draw2d.shape.basic.Image({
                        path: "./assets/icons/" + f.userData[0],
                        width: 35,
                        height: 35,
                        x: f.getX() + 5,
                        y: f.getY() + 3,
                    });
                    f.icon.on("click", function () {
                        showOptions(f.id, f.userData[1]);
                    })
                    f.add(f.icon, new draw2d.layout.locator.XYAbsPortLocator());
                });
            }
        }
    },
    mounted() {
        this.createCanvas();
    }
});