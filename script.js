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

