/**
 * init blank WorkSpace with all types of elements in aside
 */

function setElementAttributes (element, attrsValues){
    for (const [key, value] of Object.entries(attrsValues)) {
        element.setAttribute(key, value);
    }
}

function setElementStyles (element, styles) {
    for (const [property, style] of Object.entries(styles)) {
        element.style[property] = style;
    }
}

function addElementToAside (element) {
    let elAside = document.getElementsByTagName('aside')[0];
    elAside.appendChild(element);
}

document.addEventListener("DOMContentLoaded",function () {

    let square = document.createElement("div");
    setElementAttributes(square, {
        // onselectstart: "javascript:/*IE8 hack*/return false",
        id: "square",
    });
    setElementStyles(square, {
        width: "75px",
        height: "75px",
        backgroundColor: "hotpink",
    });
    addElementToAside(square);

    let circle = document.createElement("div");    
    setElementAttributes(circle, {
        // onselectstart: "javascript:/*IE8 hack*/return false",
        id: "circle",
    });
    setElementStyles(circle, {
        width: "75px",
        height: "75px",
        borderRadius: "50%",
        backgroundColor: "aqua",
    });
    addElementToAside(circle);

});