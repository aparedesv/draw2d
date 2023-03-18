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
        title: "sending",
        icons: [
            {
                vueComponent: "email-figure",
                name: "email",
                svgPath: "./assets/icons/mail_FILL0_wght400_GRAD0_opsz48 - c�pia.svg",
            },
            {
                vueComponent: "notificaction-figure",
                name: "notificaction",
                svgPath: "./assets/icons/send_to_mobile_FILL0_wght400_GRAD0_opsz48.svg",
            },
            {
                vueComponent: "sms-figure",
                name: "sms",
                svgPath: "./assets/icons/sms_FILL0_wght400_GRAD0_opsz48.svg",
            },
            {
                vueComponent: "campaign-figure",
                name: "campaign",
                svgPath: "./assets/icons/campaign_FILL0_wght400_GRAD0_opsz48 - c�pia.svg",
            },
        ]
    },
    {
        title: "conditions & workflow",
        icons: [
            {
                vueComponent: "wait-figure",
                name: "wait",
                svgPath: "./assets/icons/schedule_FILL0_wght400_GRAD0_opsz48.svg",
            },
            {
                vueComponent: "ifelse-figure",
                name: "ifelse",
                svgPath: "./assets/icons/rule_folder_FILL0_wght400_GRAD0_opsz48.svg",
            },
            {
                vueComponent: "end-figure",
                name: "end",
                svgPath: "./assets/icons/stop_circle_FILL0_wght400_GRAD0_opsz48.svg",
            },
        ]
    },
    {
        title: "contact",
        icons: [
            {
                vueComponent: "person-figure",
                name: "person",
                svgPath: "./assets/icons/account_box_FILL0_wght400_GRAD0_opsz48.svg",
            },
            {
                vueComponent: "corporate-figure",
                name: "corporate",
                svgPath: "./assets/icons/corporate_fare_FILL0_wght400_GRAD0_opsz48.svg",
            },
            {
                vueComponent: "organitzation-figure",
                name: "organitzation",
                svgPath: "./assets/icons/store_FILL0_wght400_GRAD0_opsz48.svg",
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
