// DOM Elements
const inputArea = document.querySelector('.input-area');
const detectBtn = document.getElementById('detect-btn');
const clearBtn = document.getElementById('clear-btn');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const detectedLanguage = document.getElementById('detected-language');
const confidenceText = document.getElementById('confidence-text');
const confidenceBar = document.getElementById('confidence-bar');
const languageDetails = document.getElementById('language-details');
const historyList = document.getElementById('history-list');
const sampleTexts = document.querySelectorAll('.sample-text');


// Language database (simplified for demo)
const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' }
];

// Detection history
let detectionHistory = [];
// Update character and word count
inputArea.addEventListener('input', () => {
    const text = inputArea.value;
    charCount.textContent = `Characters: ${text.length}`;
    wordCount.textContent = `Words: ${text.trim() ? text.trim().split(/\s+/).length : 0}`;
});

// Sample text buttons
sampleTexts.forEach(sample => {
    sample.addEventListener('click', () => {
        inputArea.value = sample.getAttribute('data-text');
        inputArea.dispatchEvent(new Event('input'));
    });
});

// Clear button
clearBtn.addEventListener('click', () => {
    inputArea.value = '';
    inputArea.dispatchEvent(new Event('input'));
    detectedLanguage.textContent = '-';
    confidenceText.textContent = 'Confidence: 0%';
    confidenceBar.style.width = '0%';
    languageDetails.innerHTML = '';
});

// Detect button
detectBtn.addEventListener('click', detectLanguage);

// Simulate language detection
function detectLanguage() {
    const text = inputArea.value.trim();
    
    if (!text) {
        alert('Please enter some text to detect the language.');
        return;
    }

    // In a real application, this would be an API call
    // For demo purposes, we're simulating detection with simple rules
    
    let detectedLang = 'Unknown';
    let confidence = 0;
    let results = [];

    // Simple detection logic for demo
    if (text.includes(' the ') || text.includes(' and ') || text.includes(' you ')) {
        detectedLang = 'English';
        confidence = 92;
        results = [
            { language: 'English', confidence: 92 },
            { language: 'German', confidence: 5 },
            { language: 'Dutch', confidence: 3 }
        ];
    } else if (text.includes(' el ') || text.includes(' y ') || text.includes(' de ')) {
        detectedLang = 'Spanish';
        confidence = 95;
        results = [
            { language: 'Spanish', confidence: 95 },
            { language: 'Portuguese', confidence: 4 },
            { language: 'Italian', confidence: 1 }
        ];
    } else if (text.includes(' et ') || text.includes(' de ') || text.includes(' vous ')) {
        detectedLang = 'French';
        confidence = 89;
        results = [
            { language: 'French', confidence: 89 },
            { language: 'Italian', confidence: 7 },
            { language: 'Spanish', confidence: 4 }
        ];
    } else if (text.includes(' und ') || text.includes(' der ') || text.includes(' die ')) {
        detectedLang = 'German';
        confidence = 91;
        results = [
            { language: 'German', confidence: 91 },
            { language: 'Dutch', confidence: 6 },
            { language: 'English', confidence: 3 }
        ];
    } else {
        // Fallback: pick a random language for demo
        const randomLang = languages[Math.floor(Math.random() * languages.length)];
        detectedLang = randomLang.name;
        confidence = Math.floor(Math.random() * 30) + 70;
        
        results = [
            { language: detectedLang, confidence: confidence },
            { language: 'English', confidence: Math.floor(Math.random() * 20) },
            { language: 'Spanish', confidence: Math.floor(Math.random() * 10) }
        ];
        
        // Normalize results to sum to 100
        const total = results.reduce((sum, r) => sum + r.confidence, 0);
        results.forEach(r => r.confidence = Math.round((r.confidence / total) * 100));
        confidence = results[0].confidence;
    }

    // Update UI with results
    updateResults(detectedLang, confidence, results);
    
    // Add to history
    addToHistory(text, detectedLang, confidence);
}

// Update results in the UI
function updateResults(language, confidence, results) {
    detectedLanguage.textContent = language;
    confidenceText.textContent = `Confidence: ${confidence}%`;
    confidenceBar.style.width = `${confidence}%`;
    
    // Clear previous results
    languageDetails.innerHTML = '';
    
    // Add new language cards
    results.forEach(result => {
        const langCard = document.createElement('div');
        langCard.className = 'language-card';
        
        const langName = document.createElement('div');
        langName.className = 'language-name';
        langName.textContent = result.language;
        
        const langConfidence = document.createElement('div');
        langConfidence.className = 'language-confidence';
        langConfidence.textContent = `${result.confidence}%`;
        
        langCard.appendChild(langName);
        langCard.appendChild(langConfidence);
        languageDetails.appendChild(langCard);
    });
}

// Add detection to history
function addToHistory(text, language, confidence) {
    const historyItem = {
        text: text.length > 50 ? text.substring(0, 50) + '...' : text,
        language,
        confidence,
        timestamp: new Date().toLocaleTimeString()
    };
    
    detectionHistory.unshift(historyItem);
    
    // Keep only last 5 items
    if (detectionHistory.length > 5) {
        detectionHistory.pop();
    }
    
    updateHistoryDisplay();
}
