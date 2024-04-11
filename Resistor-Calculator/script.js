// script.js
const bandSelector = document.getElementById('band-selector');
const bandContainer = document.getElementById('band-container');
const resultContainer = document.getElementById('result-container');
const calculateButton = document.getElementById('calculate-button');

bandSelector.addEventListener('change', () => {
    const numBands = parseInt(bandSelector.value);
    displayBandOptions(numBands);
});

function displayBandOptions(numBands) {
    bandContainer.innerHTML = ''; // Clear previous options

    for (let i = 1; i <= numBands; i++) {
        const bandDiv = document.createElement('div');
        bandDiv.classList.add('band-option');
        bandDiv.innerHTML = `
            <h3>Band ${i} Color</h3>
            <select class="band-color-selector" id="band-color-${i}">
                <option value="---">---</option>
                <option value="black">Black</option>
                <option value="brown">Brown</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="violet">Violet</option>
                <option value="gray">Gray</option>
                <option value="white">White</option>
                <option value="white">Gold</option>
                <option value="white">Silver</option>
            </select>
        `;
        bandContainer.appendChild(bandDiv);
    }

    // Add event listener for calculation
    const bandColorSelectors = document.querySelectorAll('.band-color-selector');
    bandColorSelectors.forEach(selector => {
        selector.addEventListener('change', calculateResistance);
    });
}

function calculateResistance() {
    const bandColors = Array.from(document.querySelectorAll('.band-color-selector')).map(selector => selector.value);
    const colorValues = {
        black: 0,
        brown: 1,
        red: 2,
        orange: 3,
        yellow: 4,
        green: 5,
        blue: 6,
        violet: 7,
        gray: 8,
        white: 9,
        gold: 0,
        silver: 0
    
    };

    if (bandColors.length === 3) {
        const resistanceValue = (colorValues[bandColors[0]] * 10 + colorValues[bandColors[1]]) * Math.pow(10, colorValues[bandColors[2]]);
        resultContainer.textContent = `Resistance: ${resistanceValue} ohms`;
    } else if (bandColors.length === 4) {
        const resistanceValue = (colorValues[bandColors[0]] * 100 + colorValues[bandColors[1]] * 10 + colorValues[bandColors[2]]) * Math.pow(10, colorValues[bandColors[3]]);
        resultContainer.textContent = `Resistance: ${resistanceValue} ohms`;
    } else if (bandColors.length === 5) {
        const resistanceValue = (colorValues[bandColors[0]] * 100 + colorValues[bandColors[1]] * 10 + colorValues[bandColors[2]]) * Math.pow(10, colorValues[bandColors[3]]);
        const tolerance = calculateTolerance(bandColors[4]);
        resultContainer.textContent = `Resistance: ${resistanceValue} ohms, Tolerance: ${tolerance}`;
    } else {
        resultContainer.textContent = "Invalid band selection";
    }
}

function calculateTolerance(color) {
    const toleranceValues = {
        brown: '1%',
        red: '2%',
        orange: '3%',
        green: '0.5%',
        blue: '0.25%',
        violet: '0.1%',
        gray: '0.05%',
        gold: '5%',
        silver: '10%',
        
    };

    return toleranceValues[color] || 'Unknown';
}

calculateButton.addEventListener('click', calculateResistance);
