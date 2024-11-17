<script>
    async function searchRecommendations() {
        const query = document.getElementById("search").value.toLowerCase();
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ''; // Clear previous results

        try {
            const response = await fetch('travel_recommendation_api.json');
            const data = await response.json();

            const recommendations = data.filter(item => {
                return query === "beach" && item.type === "beach" ||
                       query === "temple" && item.type === "temple" ||
                       query === "country" && item.type === "country";
            });

            if (recommendations.length > 0) {
                recommendations.forEach(item => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <h3>${item.name}</h3>
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <p>${item.description}</p>
                    `;
                    resultsContainer.appendChild(div);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            resultsContainer.innerHTML = '<p>Error loading recommendations.</p>';
        }
    }

    function clearResults() {
        document.getElementById("search").value = '';
        document.getElementById("results").innerHTML = '';
    }

    document.getElementById("contact-form").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Thank you for reaching out! We'll get back to you soon.");
        document.getElementById("contact-form").reset();
    });
</script>
