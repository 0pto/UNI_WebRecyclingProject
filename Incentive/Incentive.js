document.addEventListener("DOMContentLoaded", async () => {
    async function RefreshDiscounts() {
        let discounts;
        try {
            let times = 3;
            while (times > 0){
                const response = await fetch(`${BACKEND_URL}/api/products/${times}`);
                if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    `Failed to fetch discount: ${errorData.error || response.statusText}`
                );
                }
                if (times == 3){
                    let box = "20Off";
                }else if (times == 2){
                    let box = "15Off";
                }else if(times == 1){
                    let box ="10Off";
                }else{
                    break;
                }
                discounts = await response.json();
                console.log("Fetched discounts:", discounts);

                document.getElementById(box).value = "Discount Code: " + discounts.code + "\n Product Code: " + discounts.productid|| "";
            }
        } catch (error) {
            console.error("Error loading discounts:", error);
            alert("❌ Failed to load discounts: " + error.message);
        }    
    }
    RefreshDiscounts();
    document.addEventListener("submit", async e => {
        e.preventDefault();
        RefreshDiscounts();
    });
});
