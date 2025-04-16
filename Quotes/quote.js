const wasteType = document.getElementById("wasteType");
let selectionContainer = document.getElementById("selection");


async function submitCategory() {
    if (wasteType.value === "Business Waste") {
        try {
            await fetch("http://localhost:8000/quotes/businessWaste", {
                method: "GET",
                headers: {
                    "Content-type": "application/json"//Set datatype being sent to JSON
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    const services = result.allServices;
                    console.log(services);
                    // business waste options
                    selectionContainer.innerHTML = `
                 <button onclick=goBack() type="button" class="submit-button">Back</button>
                 <img id="serviceItemImg" loading="lazy" src="../Assets/Images/businessWaste.jpg" alt="profile picture"
                 height="150px" width="150px">
                 <div class="choices">
                     <form id="businessForm">
                     <label for="busines">Business Waste</label>
                     <select name="busines" id="busines" name="selectedService"></select>
                     </form>
                 </div>
                 <button onclick=getAQuote() type="button" class="submit-button">Submit</button>`
                    // map trough all the services and populate the options list
                    services.map((service) => {
                        var div = document.createElement('div');
                        div.classList.value = "waste-options";
                        div.innerHTML = `<option class="options-item">${service.description}</option>`;
                        document.querySelector("select").appendChild(div);

                    });
                });
        } catch (error) {
            console.log(error);
        }

    } else {
        //Domestic waste options
        try {
            await fetch("http://localhost:8000/quotes/domesticWaste", {
                method: "GET",
                headers: {
                    "Content-type": "application/json"//Set datatype being sent to JSON
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    const services = result.allServices;
                    console.log(services);
                    // Domestic waste options
                    selectionContainer.innerHTML = `
                    <button onclick=goBack() type="button" class="submit-button">Back</button> 
                    <img id="serviceItemImg" loading="lazy" src="../Assets/Images/domesticWaste.jpg" alt="profile picture" height="150px" width="150px">
                    <div class="choices">
                        <form id="domesticForm">   
                            <label for="domestic">Domestic Waste</label>
                            <select name="domestic" id="domestic" name="selectedService"></select>
                        </form>
                    </div>
                    <button onclick=getAQuote() type="button" class="submit-button">Submit</button>`

                    // map trough all the services and populate the options list
                    services.map((service) => {
                        var div = document.createElement('div');
                        div.classList.value = "waste-options";
                        div.innerHTML = `<option class="options-item">${service.description}</option>`;
                        document.querySelector("select").appendChild(div);

                    });
                });
        } catch (error) {
            console.log(error);
        }
    }
}

//navigate back to category selection.
function goBack() {
    location.reload();
}

//Retrieve selected services data
async function getAQuote() {
    let choicesObj = {
        category: "",
        wasteType: ""
    };

    const optionForm = document.querySelector("form");
    if (optionForm.id === "domesticForm") {
        choicesObj.category = "Domestic Waste";
        choicesObj.wasteType = document.getElementById("domestic").value;
    } else if (optionForm.id === "businessForm") {
        choicesObj.category = "Business Waste";
        choicesObj.wasteType = document.getElementById("busines").value;
    }

    console.log("choicesObj", choicesObj);

    try {
        await fetch("http://localhost:8000/quotes/quote/", {
            method: "POST",
            body: JSON.stringify(choicesObj),
            headers: {
                "Content-type": "application/json"//Set datatype being sent to JSON
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                const service = result.service;
                const quoteResultsDiv = document.getElementById("quoteResults");
                if (service.monthlyPrice && service.monthlyPrice !== 0) {
                    quoteResultsDiv.innerHTML = `    
                    <table>
                        <tr>
                            <th>Here is your quote for${service.description} ( ${service.category})</th>
                        </tr>
                        <tr>
                            <td>One time Service</td>
                            <td>${service.oneTimePickup}</td>
                        </tr>
                        <tr>
                            <td>Monthly Subscription Service</td>
                            <td>${service.monthlyPrice}</td>
                        </tr>
                    </table>
                    `
                } else {
                    quoteResultsDiv.innerHTML = `
                    <table>
                        <tr>
                            <th>Here is your quote for${service.description} ( ${service.category})</th>
                        </tr>
                        <tr>
                            <td>One time Service</td>
                            <td>${service.oneTimePickup}</td>
                        </tr>
                        <tr>
                            <td>Monthly Subscription Service</td>
                            <td>No subscription option available for this selected service</td>
                        </tr>
                    </table>
                    `
                }
            });
    } catch (error) {
        console.log(error);
    }
}