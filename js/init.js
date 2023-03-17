/**
 * init blank WorkSpace with all types of elements in aside
 */

var actions = [
    {
        title: "list",
        icons: [
            {
                vueComponent: "segment-figure",
                name: "segment",
                svgPath: "./assets/icons/join_inner_FILL0_wght400_GRAD0_opsz48.svg",
            },
            {
                vueComponent: "form-figure",
                name: "form",
                svgPath: "./assets/icons/description_FILL0_wght400_GRAD0_opsz48.svg",
            },
        ]
    },
    {
        title: "benefits",
        icons: [
            {
                vueComponent: "coupon-figure",
                name: "coupon",
                svgPath: "./assets/icons/qr_code_scanner_FILL0_wght400_GRAD0_opsz48.svg",
            },
        ]
    },
];

class CustomElement extends HTMLElement {
  constructor() {
    super();
    // Codi per a la inicialització del component.
  }
}

actions.forEach(el => {
    el.icons.forEach((icon, i) => {
        let customTagName = icon.vueComponent;
        customElements.define(customTagName, class extends CustomElement {
            constructor() {
            super();
            // Codi per a la inicialització del component personalitzat.
            }
        });
    });
});

document.addEventListener("DOMContentLoaded",function () {
    
    let sidebar = document.getElementById('sidebar');
    
    actions.forEach(el => {
        let actionWrapper = document.createElement("div");
        actionWrapper.classList.add("action-wrapper");
    
        let title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = el.title;

        let iconsWrapper = document.createElement("div");
        iconsWrapper.classList.add("icons-wrapper");        
        
        el.icons.forEach((icon, i) => {
            let iconWrapper = document.createElement("div");
            iconWrapper.classList.add("icon-wrapper");
            
            let svgImage = document.createElement("img");
            svgImage.setAttribute("src", icon.svgPath);

            let customTagName = icon.vueComponent;
            let custom = new (customElements.get(customTagName))();
            
            let iconTitle = document.createElement("h6");
            iconTitle.classList.add("icon-title");
            iconTitle.textContent = icon.name;
            
            iconWrapper.appendChild(svgImage);
            iconWrapper.appendChild(custom);
            iconWrapper.appendChild(iconTitle);
            iconsWrapper.appendChild(iconWrapper);

        });

        actionWrapper.appendChild(title);
        actionWrapper.appendChild(iconsWrapper);
        sidebar.appendChild(actionWrapper);
    });
});

/*
document.addEventListener("DOMContentLoaded",function () {
    
    let sidebar = document.getElementById('sidebar');
    
    actions.forEach(el => {
        let actionWrapper = document.createElement("div");
        actionWrapper.classList.add("action-wrapper");
    
        let title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = el.title;

        let iconsWrapper = document.createElement("div");
        iconsWrapper.classList.add("icons-wrapper");        
        
        el.icons.forEach(icon => {
            let iconWrapper = document.createElement("div");
            iconWrapper.classList.add("icon-wrapper");
            
            let svgImage = document.createElement("img");
            svgImage.setAttribute("src", icon.svgPath);
            svgImage.setAttribute(icon.clicAttr, icon.clicVal);
            
            let iconTitle = document.createElement("h6");
            iconTitle.classList.add("icon-title");
            iconTitle.textContent = icon.name;
            
            iconWrapper.appendChild(svgImage);
            iconWrapper.appendChild(iconTitle);
            iconsWrapper.appendChild(iconWrapper);
        });

        actionWrapper.appendChild(title);
        actionWrapper.appendChild(iconsWrapper);
        sidebar.appendChild(actionWrapper);
    });

});
*/

// function setElementAttributes (element, attrsValues){
//     for (const [key, value] of Object.entries(attrsValues)) {
//         element.setAttribute(key, value);
//     }
// }

// function setElementStyles (element, styles) {
//     for (const [property, style] of Object.entries(styles)) {
//         element.style[property] = style;
//     }
// }

// function addElementToAside (element) {
//     let elAside = document.getElementsByTagName('aside')[0];
//     elAside.appendChild(element);
// }

// function download(content, fileName, contentType) {
//     var a = document.createElement("a");
//     var file = new Blob([content], {type: contentType});
//     a.href = URL.createObjectURL(file);
//     a.download = fileName;
//     a.click();
// }

// document.addEventListener("DOMContentLoaded",function () {

//     let square = document.createElement("div");
//     setElementAttributes(square, {
//         // onselectstart: "javascript:/*IE8 hack*/return false",
//         id: "square",
//     });
//     setElementStyles(square, {
//         width: "75px",
//         height: "75px",
//         backgroundColor: "hotpink",
//     });
//     addElementToAside(square);

//     let circle = document.createElement("div");    
//     setElementAttributes(circle, {
//         // onselectstart: "javascript:/*IE8 hack*/return false",
//         id: "circle",
//     });
//     setElementStyles(circle, {
//         width: "75px",
//         height: "75px",
//         borderRadius: "50%",
//         backgroundColor: "aqua",
//     });
//     addElementToAside(circle);
    
//     let save = document.createElement("button");
//     save.id = "save";
//     save.innerHTML = "SAVE";
//     addElementToAside(save);
    
//     let load = document.createElement("button");
//     load.id = "load";
//     load.innerHTML = "LOAD";
//     addElementToAside(load);

// });

// const modal = document.getElementById("myModal");
// const span = document.getElementById("close");
// const fileList = document.getElementById("file-list");

// span.onclick = function() {
//   modal.style.display = "none";
//   fileList.innerHTML = "";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//     fileList.innerHTML = "";
//   }
// }