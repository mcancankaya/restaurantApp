import data from "./data.js";

const productDiv = document.querySelectorAll(".product");
const productCodeInput = document.getElementById("urunKodu");

const tableNo = document.querySelectorAll(".masa");
const tableCodeInput = document.getElementById("masaKodu");

const orderButton = document.getElementById("siparisButton");
const tableOrder = document.getElementsByClassName("masaSip");
const closeTableOrder = document.querySelectorAll(".hesapKapat a");

let productCode;
let tableCode;

productDiv.forEach((product) => {
    product.addEventListener("click", function (e) {
        e.preventDefault();
        const pElement = product.querySelector("p");
        if (pElement) {
            const pElementContent = pElement.textContent;
            productCodeInput.value = pElementContent;
            productCode = productCodeInput.value;
        }

    })
});

tableNo.forEach((table) => {
    table.addEventListener("click", function (e) {
        e.preventDefault();
        const pTableElement = table.querySelector("p");
        tableCode = pTableElement.textContent;
        tableCodeInput.value = tableCode;
    })
});

orderButton.addEventListener("click", function (e) {

    e.preventDefault();
    if (tableCodeInput.value ===""||productCodeInput.value === ""){
        alert("Lütfen alanları doldurunuz!");
    }


    const tableNoList = document.querySelectorAll(".masaNo p");
    tableNoList.forEach((table) => {
        const tableNo = table.textContent.trim();
        const tableOrderZone = table.parentElement.nextElementSibling;
        
        if (tableNo === tableCode) {
            data.forEach((x) => {
                /*                 if (x.id === productCode) {
                                    const div = document.createElement("div");
                                    div.classList.add(".SiparisEdilmisUrun");
                                    //template literal - backtick
                                    div.innerHTML = `
                                        <img src=${x.icon} width="40px" alt="urun"></img>
                                        <p>${x.title}</p>
                                        <p>${x.price}</p>
                                        <a href="" id="del"><i class="fa solid fa-trash"></i></a>`;
                                        tableOrder.appendChild(div);
                                } */
                if (x.id === productCode) {
                    const orderZone = `
                    <div class="SiparisEdilmisUrun">
                        <img src=${x.icon} width="40px" alt="urun"></img>
                        <p>${x.title}</p>
                        <p>${x.price}</p>
                        <a href="" id="del"><i class="fa solid fa-trash"></i></a>
                    </div>`;
                    tableOrderZone.innerHTML += orderZone;
                }

            });
            tableCodeInput.value ="";
            productCodeInput.value ="";
        }

        tableOrderZone.addEventListener("click",function(e) {
            e.preventDefault();
            if(e.target.classList.contains("fa-trash")) {
                const deleteElement = e.target.closest(".SiparisEdilmisUrun")
                deleteElement?
                deleteElement.remove():"";
            }
        });
    });

});

closeTableOrder.forEach((link) => {
        link.addEventListener("click",function(e) {
            e.preventDefault();
            const parentDiv = link.closest(".masa");
            if(parentDiv){
                const tableOrderDiv = parentDiv.querySelector(".masaSip");
                tableOrderDiv.innerHTML = "";
            }
        });
    }
);
