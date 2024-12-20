const webhookURL = "https://discord.com/api/webhooks/1319465884389212171/9aJY9qUzhXfxNwQxOPQ2p16N24OAH7UZ6M8whZgFQNVvDAbIIOnnAuhBQr43yvHEUhaQ";

// Function to send analytics data
function sendAnalytics(event, details) {
    const payload = {
        content: `Analytics Event Triggered: ${event}`,
        embeds: [
            {
                title: "Event Details",
                description: details,
                color: 5814783 // Hex: #58A6B7 (blue tone)
            }
        ]
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            console.error("Failed to send analytics data", response);
        } else {
            console.log("Analytics data sent successfully");
        }
    })
    .catch(error => console.error("Error sending analytics data:", error));
}

// Update visit counter in localStorage
let visitCount = localStorage.getItem("visitCount");
if (!visitCount) {
    visitCount = 0;
}
visitCount++;
localStorage.setItem("visitCount", visitCount);

// Send analytics on page load
window.addEventListener("load", () => {
    sendAnalytics("Page Load", `The user has loaded the page. Current visit count: ${visitCount}`);
    // Update the visit count display
    document.getElementById("visit-count").textContent = `Visits: ${visitCount}`;
});

// Example of tracking button click events (for product cards)
document.querySelectorAll(".product-card button").forEach(button => {
    button.addEventListener("click", (event) => {
        const productName = event.target.closest(".product-card").querySelector("h3").textContent;
        sendAnalytics("Add to Cart", `The user added ${productName} to their cart.`);
    });
});
