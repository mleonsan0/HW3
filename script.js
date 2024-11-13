document.addEventListener("DOMContentLoaded", () => {
    const characterForm = document.getElementById("character-form");
    const speciesForm = document.getElementById("species-form");
    const characterInfoDiv = document.getElementById("character-info");

    // Event listener for character name form
    characterForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const characterName = document.getElementById("character-name").value.trim();

        // Validate input
        if (characterName === "") {
            alert("Please enter a character name.");
            return;
        }

        // Fetch character data from the API
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
            const data = await response.json();

            // Check if any character was found
            if (data.results && data.results.length > 0) {
                const character = data.results[0]; // Get the first character found
                displayCharacterInfo(character);
            } else {
                characterInfoDiv.innerHTML = "<p>No character found. Please try a different name.</p>";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            characterInfoDiv.innerHTML = "<p>There was an error fetching the character data. Please try again later.</p>";
        }
    });

    // Event listener for species form
    speciesForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const speciesInput = document.getElementById("species").value;

        // Validate input
        if (speciesInput === "") {
            alert("Please select a species.");
            return;
        }

        // Fetch all characters from the API
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character`);
            const data = await response.json();

            // Filter characters by species
            const filteredCharacters = data.results.filter(character => character.species.toLowerCase() === speciesInput.toLowerCase());

            // Check if any characters were found
            if (filteredCharacters.length > 0) {
                displayFilteredCharacters(filteredCharacters);
            } else {
                characterInfoDiv.innerHTML = "<p>No characters found for the specified species. Please try a different species.</p>";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            characterInfoDiv.innerHTML = "<p>There was an error fetching the character data. Please try again later.</p>";
        }
    });

    // Function to display character information
    function displayCharacterInfo(character) {
        characterInfoDiv.innerHTML = `
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <img src="${character.image}" alt="${character.name}">
        `;
    }

    // Function to display filtered characters
    function displayFilteredCharacters(characters) {
        characterInfoDiv.innerHTML = ""; // Clear previous info
        characters.forEach(character => {
            const characterDiv = document.createElement("div");
            characterDiv.innerHTML = `
                <h3>${character.name}</h3>
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
                <p>Origin: ${character.origin.name}</p>
                <img src="${character.image}" alt="${character.name}" style="width: 100px; height: auto;">
            `;
            characterInfoDiv.appendChild(characterDiv);
        });
    }
});