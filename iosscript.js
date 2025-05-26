// Function to get tomorrow's date in the format YYYY-MM-DD-23:00
// This is used for base JSON entries
function getTomorrowDateFixed() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add 1 day
    
    // Format the date with fixed time of 23:00
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}-23:00`;
}

// Function to get tomorrow's date with EVENT TIME from API
// This is used for API-fetched matches
function getTomorrowDateWithEventTime(eventDate) {
    // If no event date is provided, use the current date + 1 day
    const baseDate = eventDate ? new Date(eventDate) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    
    // Format the date with the event's original time
    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).padStart(2, '0');
    const day = String(baseDate.getDate()).padStart(2, '0');
    const hours = String(baseDate.getHours()).padStart(2, '0');
    const minutes = String(baseDate.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}-${hours}:${minutes}`;
}

// Base JSON with initial matches (0, 1, 2) - using fixed time 23:00
const baseJson = {
            "0": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "CHSN",
                "urls": ["https://endpnt.com/hls/chsn/playlist.m3u8"],
                "expire": 7
            },
            "1": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "NFL Network",
                "urls": ["https://tttgg.jdx3.org/nflnetwork_live.m3u8"],
                "expire": 7
            },
            "2": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "NBA TV",
                "urls": ["https://tttgg.jdx3.org/nbatv_live.m3u8"],
                "expire": 7
            },
            "3": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "floracing TV",
                "urls": ["https://tttgg.jdx3.org/floracing_live.m3u8"],
                "expire": 7
            },
            "4": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "Rally TV",
                "urls": ["https://dms.redbull.tv/v5/destination/rallytv/07f960dc-fd36-466c-971f-64a597518b83/personal_computer/http/us/en_US/playlist.m3u8"],
                "expire": 7
            },
            "5": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "ESPN",
                "urls": ["https://tttgg.jdx3.org/espn_live.m3u8"],
                "expire": 7
            },
            "6": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "TNT SPORTS 2",
                "urls": ["https://tttgg.jdx3.org/tntsports2_live.m3u8"],
                "expire": 7
            },
            "7": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "LALIGA TV",
                "urls": ["https://tttgg.jdx3.org/laligatv_live.m3u8"],
                "expire": 7
            },
            "8": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "TNT",
                "urls": ["https://tttgg.jdx3.org/tnt_live.m3u8"],
                "expire": 7
            },
            "9": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "SKY MAIN EVENT",
                "urls": ["https://tttgg.jdx3.org/skysportsmainevent_live.m3u8"],
                "expire": 7
            },
            "10": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "SKY F1",
                "urls": ["https://tttgg.jdx3.org/skysportsf1_live.m3u8"],
                "expire": 7
            },
            "11": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "DAZN 1",
                "urls": ["https://tttgg.jdx3.org/dazn1uk_live.m3u8"],
                "expire": 7
            },
            "12": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "CBS Sports Network",
                "urls": ["https://tttgg.jdx3.org/cbssn_live.m3u8"],
                "expire": 7
            },
            "13": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "TBS",
                "urls": ["https://tttgg.jdx3.org/tbs_live.m3u8"],
                "expire": 7
            },
            "14": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "USA NETWORK",
                "urls": ["https://tttgg.jdx3.org/usanetwork_live.m3u8"],
                "expire": 7
            },
            "15": {
                "thumb": 46,
                "date": getTomorrowDateFixed(),
                "category": "Live TV",
                "title": "TNT SPORTS 1",
                "urls": ["https://tttgg.jdx3.org/tntsports1_live.m3u8"],
                "expire": 7
            }
};

// Current working JSON
let currentJson = JSON.parse(JSON.stringify(baseJson));

// Track the next index for adding matches
let nextIndex = 16;

// Add to the apiEndpoints object
const apiEndpoints = {
    premierLeague: 'http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
    championsLeague: 'http://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',
    nba: 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
    mlb: 'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
    // Add the new endpoints
    nhl: 'http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard',
    europaLeague: 'http://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard'
};

// Category settings
const categorySettings = {
    premierLeague: { thumb: 39, category: 'foot', expire: 2 },
    championsLeague: { thumb: 39, category: 'foot', expire: 2 },
    nba: { thumb: 38, category: 'nba', expire: 4 },
    mlb: { thumb: 40, category: 'mlb', expire: 4 },
    // Add the new category settings
    nhl: { thumb: 45, category: 'nhl', expire: 4 },
    europaLeague: { thumb: 39, category: 'foot', expire: 2 }
};

// Default colors for static channels or when API doesn't provide colors
const defaultChannelColors = {
    'espn': { background: '#FF0000', text: '#FFFFFF' },
    'TNT': { background: '#0072C9', text: '#FFFFFF' },
    'chsn': { background: '#00A651', text: '#FFFFFF' },
    'NBA TV': { background: '#FF8200', text: 'black' },
    'TNT SPORTS 2': { background: 'yellow', text: '#000000' },
    'floracing': { background: '#6F58C9', text: 'white' },
    'LALIGA': { background: '#FF0000', text: 'WHITE' },
    'nfl': { background: 'cyan', text: 'black' },
    'rally': { background: '#B0DAB9', text: 'black' },
    'SKY': { background: 'RED', text: 'black' },
    'SKY F1': { background: 'BLUE', text: 'black' },
    'DAZN': { background: 'BLACK', text: 'WHITE' },
    'CBS': { background: 'GREEN', text: 'WHITE' },
    'USA NETWORK': { background: 'RED', text: 'WHITE' },
    'TNT SPORTS 1': { background: 'PURPLE', text: 'GRAY' },
    'TBS': { background: 'BROWN', text: 'YELLOW' },

};

// Store team colors fetched from API to avoid re-rendering issues
const teamColorCache = {};

// Create a function to create team display
function createTeamDisplay(teamName, teamData) {
    const teamContainer = document.createElement('div');
    teamContainer.style.display = 'flex';
    teamContainer.style.flexDirection = 'column';
    teamContainer.style.alignItems = 'center';
    
    if (teamData && teamData.logo) {
        const logoImg = document.createElement('img');
        logoImg.className = 'team-logo-img';
        logoImg.src = teamData.logo;
        logoImg.alt = `${teamName} logo`;
        logoImg.width = 40;
        logoImg.height = 40;
        logoImg.style.borderRadius = '50%';
        logoImg.style.objectFit = 'contain';
        logoImg.style.backgroundColor = teamData.background || '#3F424B';
        
        teamContainer.appendChild(logoImg);
    } else {
        const logo = document.createElement('div');
        logo.className = 'team-logo';
        const logoText = teamName.slice(0, Math.min(2, teamName.length));
        logo.textContent = logoText;
        
        if (teamData) {
            logo.style.backgroundColor = teamData.background;
            logo.style.color = teamData.text;
        } else {
            const channelKey = Object.keys(defaultChannelColors).find(channel => 
                teamName.toLowerCase().includes(channel.toLowerCase()));
            if (channelKey) {
                logo.style.backgroundColor = defaultChannelColors[channelKey].background;
                logo.style.color = defaultChannelColors[channelKey].text;
            } else {
                logo.style.backgroundColor = '#3F424B';
                logo.style.color = '#FFFFFF';
            }
        }
        
        teamContainer.appendChild(logo);
    }
    
    const name = document.createElement('div');
    name.className = 'team-name';
    name.textContent = teamName;
    
    teamContainer.appendChild(name);
    
    return teamContainer;
}

// Function to display JSON in the display area
function displayJson(json) {
    const formattedJson = JSON.stringify(json, null, 4)
        // Replace the pattern for urls arrays with a more compact format
        .replace(/"urls": \[\s+"/g, '"urls": ["')
        .replace(/"\s+\]/g, '"]');
    
    document.getElementById('jsonDisplay').textContent = formattedJson;
}

// Function to update URL editor
function updateUrlEditor() {
    const container = document.getElementById('urlEditorContainer');
    
    // Clear the container
    container.innerHTML = '';
    
    // If there are no items in the JSON, show a message
    if (Object.keys(currentJson).length === 0) {
        container.innerHTML = '<div class="no-urls-message">Generate match data first to add URLs</div>';
        return;
    }
    
    // Create a card for each item in the JSON
    Object.keys(currentJson).sort((a, b) => parseInt(a) - parseInt(b)).forEach(key => {
        const item = currentJson[key];
        
        const urlEntry = document.createElement('div');
        urlEntry.className = 'url-entry';
        
        // Add title
        const titleEl = document.createElement('div');
        titleEl.className = 'match-title';
        titleEl.textContent = item.title || `Match ${key}`;
        urlEntry.appendChild(titleEl);
        
        // Add date
        const dateEl = document.createElement('div');
        dateEl.className = 'match-date';
        dateEl.textContent = item.date || 'No date set';
        urlEntry.appendChild(dateEl);
        
        // Create match header with team logos and names
        const matchHeader = document.createElement('div');
        matchHeader.className = 'match-header';
        
        // Parse the title to get team names
        let teamA = '';
        let teamB = '';
        
        if (item.title && item.title.includes('vs')) {
            const teams = item.title.split('vs').map(t => t.trim());
            teamA = teams[0];
            teamB = teams[1];
        } else if (item.title) {
            teamA = item.title;
        } else {
            teamA = `Match ${key}`;
        }
        
        matchHeader.appendChild(createTeamDisplay(teamA, teamColorCache[teamA]));
        
        if (teamB) {
            const versus = document.createElement('div');
            versus.className = 'versus';
            versus.textContent = 'vs';
            matchHeader.appendChild(versus);
            matchHeader.appendChild(createTeamDisplay(teamB, teamColorCache[teamB]));
        }
        
        // Create URL input - check both url and urls formats
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'url-input';
        input.id = `url-${key}`;
        input.placeholder = 'Enter stream URL or paste here...';
        
        // Get URL value from either url property or urls array
        let urlValue = '';
        if (item.url && item.url.trim() !== '') {
            urlValue = item.url;
        } else if (Array.isArray(item.urls) && item.urls.length > 0 && item.urls[0] !== '') {
            urlValue = item.urls[0];
        }
        
        input.value = urlValue;
        input.dataset.key = key;
        input.dataset.format = item.url !== undefined ? 'single' : 'array';
        
        input.addEventListener('click', function() {
            this.select();
        });
        
        // Add elements to the card
        urlEntry.appendChild(matchHeader);
        urlEntry.appendChild(input);
        
        container.appendChild(urlEntry);
    });
}

// Function to update URLs in JSON from editor
function updateUrlsInJson() {
    const inputs = document.querySelectorAll('.url-entry input');
    
    inputs.forEach(input => {
        const key = input.dataset.key;
        const url = input.value.trim();
        const format = input.dataset.format;
        
        if (currentJson[key]) {
            // Update based on format (single url or urls array)
            if (format === 'single') {
                // Update single url property
                currentJson[key].url = url;
            } else {
                // Update the first URL in the urls array
                if (!Array.isArray(currentJson[key].urls)) {
                    currentJson[key].urls = [];
                }
                currentJson[key].urls[0] = url;
            }
        }
    });
    
    // Update the JSON display
    displayJson(currentJson);
    
    // Show success message
    showStatus('URLs updated in JSON successfully!', 'success');
}

// Function to migrate legacy URL format to array format - NOTE: disabled to support both formats
function migrateUrlFormat() {
    // Commented out to preserve both formats
    /*
    Object.keys(currentJson).forEach(key => {
        const item = currentJson[key];
        if (item.url !== undefined && !Array.isArray(item.urls)) {
            item.urls = [item.url];
            delete item.url;
        }
        
        // Ensure urls is always an array
        if (!Array.isArray(item.urls)) {
            item.urls = [""];
        }
    });
    */
}

// Call migration on startup
migrateUrlFormat();

// Display the initial JSON
displayJson(currentJson);

// Update the URL editor
updateUrlEditor();

// Function to show status message
function showStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.style.display = 'block';
    
    // Hide status after 5 seconds
    setTimeout(() => {
        statusEl.style.display = 'none';
    }, 5000);
}

// Function to fetch data from API
async function fetchApiData(apiUrl, category) {
    const loadingEl = document.getElementById('loading');
    loadingEl.style.display = 'block';
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        processApiData(data, category);
        
        return true;
    } catch (error) {
        console.error('Error fetching data:', error);
        showStatus(`Error fetching data: ${error.message}`, 'error');
        return false;
    } finally {
        loadingEl.style.display = 'none';
    }
}

// Modified processApiData function to handle Europa League data format correctly
function processApiData(data, category) {
    // Get events from the data and filter out completed matches
    const events = (data.events || []).filter(event => {
        // Check if status.type.completed exists and is false
        // For Europa League, the status structure might be different
        if (category === 'europaLeague') {
            return event.status && 
                   event.status.type && 
                   event.status.type.state === 'pre'; // Use 'state' instead of 'completed'
        }
        // Standard check for other categories
        return event.status && 
               event.status.type && 
               event.status.type.completed === false;
    });
    
    // Get category settings - Add error handling here
    const settings = categorySettings[category];
    if (!settings) {
        console.error(`Category settings not found for "${category}"`);
        showStatus(`Error: Category settings not found for "${category}"`, 'error');
        return;
    }
    
    // Check if any events remain after filtering
    if (events.length === 0) {
        showStatus('No upcoming or in-progress matches found.', 'warning');
        return;
    }
    
    // Process each match/event
    events.forEach(event => {
        try {
            // Get teams - handle the different format for Europa League
            const competitors = event.competitions[0].competitors;
            
            // Ensure we have at least two competitors
            if (!competitors || competitors.length < 2) {
                console.error('Not enough competitors found for event', event.id);
                return;
            }
            
            // Handle team data based on category - Europa League has a different structure
            let teamA, teamB;
            
            if (category === 'europaLeague') {
                // Europa League specific team structure
                teamA = competitors[0].team;
                teamB = competitors[1].team;
                
                // Check if shortDisplayName exists, otherwise use displayName
                if (!teamA.shortDisplayName && teamA.displayName) {
                    teamA.shortDisplayName = teamA.displayName;
                }
                
                if (!teamB.shortDisplayName && teamB.displayName) {
                    teamB.shortDisplayName = teamB.displayName;
                }
            } else {
                // Standard format for other categories
                teamA = competitors[0].team;
                teamB = competitors[1].team;
            }
            
            // Get the event date and time
            let eventDate = null;
            if (event.date) {
                eventDate = new Date(event.date);
            }
            
            // Format the date using the actual event time
            const formattedDate = getTomorrowDateWithEventTime(eventDate);
            
            // Store team logos and colors in cache
            if (teamA.logo) {
                teamColorCache[teamA.shortDisplayName] = {
                    logo: teamA.logo,
                    background: `#${teamA.color || '3F424B'}`,
                    text: `#${teamA.alternateColor || 'FFFFFF'}`
                };
            }
            
            if (teamB.logo) {
                teamColorCache[teamB.shortDisplayName] = {
                    logo: teamB.logo,
                    background: `#${teamB.color || '3F424B'}`,
                    text: `#${teamB.alternateColor || 'FFFFFF'}`
                };
            }
            
            // Create match entry with event-specific time
            currentJson[nextIndex.toString()] = {
                "thumb": settings.thumb,
                "date": formattedDate,
                "category": settings.category,
                "title": `${teamA.shortDisplayName} vs ${teamB.shortDisplayName}`,
                "urls": [""],
                "expire": settings.expire
            };
            
            nextIndex++;
        } catch (err) {
            console.error('Error processing event:', err, event);
        }
    });
    
    // Display updated JSON
    displayJson(currentJson);
    
    // Update URL editor
    updateUrlEditor();
    
    // Show success message with count of added events
    showStatus(`${events.length} upcoming/in-progress events added successfully!`, 'success');
}

// Function to add an empty match
function addEmptyMatch() {
    // Create an empty match entry with the next index and tomorrow's date with fixed time
    currentJson[nextIndex.toString()] = {
        "thumb": "",
        "date": getTomorrowDateFixed(), // Use fixed time for manually added matches
        "category": "",
        "title": "",
        "urls": [""],
        "expire": ""
    };
    
    // Show status message
    showStatus(`Empty match added with ID: ${nextIndex}`, 'success');
    
    // Increment the next index
    nextIndex++;
    
    // Display updated JSON
    displayJson(currentJson);
    
    // Update URL editor
    updateUrlEditor();
}

// ===== UPDATED URL Encryption Functions (matching Utils.kt implementation) =====
// Constants
const SECURITY_SALT = "T9c#1Pq!Lm@8TrZ7oYdW1NkA3FeG6Hb";

// Function to generate decryption key (matching Utils.kt implementation)
function generateDecryptionKey(dateTime, category) {
    const formattedDate = dateTime.replace(/[-:_]/g, "");
    const combinedValue = category + formattedDate + SECURITY_SALT;
    return combinedValue.padEnd(32, '*').substring(0, 32);
}

// Function to encrypt URL with the method matching Utils.kt
function encryptUrl(url, date, title, category) {
    // Trim input values
    const cleanDate = date.trim();
    const cleanCategory = category.trim();
    
    // Get key using the same method as in Utils.kt (without title)
    const keyString = generateDecryptionKey(cleanDate, cleanCategory);
    
    // Generate random IV (16 bytes)
    const iv = CryptoJS.lib.WordArray.random(16);
    
    // Create encryption key
    const key = CryptoJS.enc.Utf8.parse(keyString);
    
    // Encrypt using AES-CBC mode with PKCS7 padding
    const encrypted = CryptoJS.AES.encrypt(url, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    
    // Convert to WordArray for HMAC
    const encryptedBytes = encrypted.ciphertext;
    
    // Prepare data for HMAC: IV + encrypted data
    const dataForHmac = CryptoJS.lib.WordArray.create();
    dataForHmac.concat(iv);
    dataForHmac.concat(encryptedBytes);
    
    // Generate HMAC
    const hmac = CryptoJS.HmacSHA256(dataForHmac, key);
    
    // Combine all parts: IV + encrypted data + HMAC
    const resultBytes = CryptoJS.lib.WordArray.create();
    resultBytes.concat(iv);
    resultBytes.concat(encryptedBytes);
    resultBytes.concat(hmac);
    
    // Convert to Base64
    let base64Result = CryptoJS.enc.Base64.stringify(resultBytes);
    
    // Calculate the middle position of the string (add midfix)
    const middlePos = Math.floor(base64Result.length / 2);
    
    // Insert the midfix at the middle position
    base64Result = base64Result.substring(0, middlePos) + ".m3u8?t=." + base64Result.substring(middlePos);
    
    // Add prefix
    base64Result = "https://akamaized.net/path/" + base64Result;
    
    return base64Result;
}

// Function to encrypt all URLs in the JSON
function encryptAllUrls() {
    // First check if CryptoJS is loaded
    if (typeof CryptoJS === 'undefined') {
        showStatus('CryptoJS library not loaded. Please add the required script tag.', 'error');
        return;
    }
    
    try {
        // Create a copy of the current JSON to work with
        const encryptedJson = {};
        
        // Check if we have any URLs to encrypt
        let hasUrls = false;
        Object.keys(currentJson).forEach(key => {
            const item = currentJson[key];
            if (Array.isArray(item.urls) && item.urls.length > 0 && item.urls.some(url => url && url.trim() !== "")) {
                hasUrls = true;
            } else if (item.url && item.url.trim() !== "") {
                hasUrls = true;
            }
        });
        
        if (!hasUrls) {
            showStatus('No URLs to encrypt. Please add URLs first.', 'error');
            return;
        }
        
        // Process each entry in the JSON
        Object.keys(currentJson).forEach(key => {
            const item = currentJson[key];
            
            // For empty matches, provide default values for required fields
            const date = item.date && item.date.trim() !== "" ? item.date : getTomorrowDateFixed();
            const title = item.title && item.title.trim() !== "" ? item.title : `Match ${key}`;
            const category = item.category && item.category.trim() !== "" ? item.category : "Live TV";
            
            // Create a copy of the item for the encrypted result
            const encryptedItem = { ...item };
            
            // Check if the item has a single url property
            if (item.url !== undefined) {
                // Encrypt single URL
                if (item.url && item.url.trim() !== "") {
                    encryptedItem.url = encryptUrl(item.url, date, title, category);
                }
            } 
            // Check if the item has a urls array
            else if (Array.isArray(item.urls)) {
                // Create encrypted URLs array
                const encryptedUrls = [];
                
                // Process each URL in the array
                item.urls.forEach(url => {
                    // Skip empty URLs
                    if (!url || url.trim() === "") {
                        encryptedUrls.push("");
                        return;
                    }
                    
                    // Encrypt the URL with the updated method (matches Utils.kt)
                    const encryptedUrl = encryptUrl(url, date, title, category);
                    
                    // Add the encrypted URL to the array
                    encryptedUrls.push(encryptedUrl);
                });
                
                // Add the encrypted URLs to the item
                encryptedItem.urls = encryptedUrls;
            }
            
            // If fields were empty, update them with default values
            if (!encryptedItem.date || encryptedItem.date.trim() === "") {
                encryptedItem.date = date;
            }
            if (!encryptedItem.title || encryptedItem.title.trim() === "") {
                encryptedItem.title = title;
            }
            if (!encryptedItem.category || encryptedItem.category.trim() === "") {
                encryptedItem.category = category;
            }
            
            // Add the encrypted item to the result JSON
            encryptedJson[key] = encryptedItem;
        });
        
        // Update the current JSON
        currentJson = encryptedJson;
        
        // Display the updated JSON
        displayJson(currentJson);
        
        // Update URL editor with encrypted URLs
        updateUrlEditor();
        
        // Show success message
        showStatus('All URLs encrypted successfully!', 'success');
    } catch (error) {
        console.error('Error encrypting URLs:', error);
        showStatus(`Error encrypting URLs: ${error.message}`, 'error');
    }
}

// Event listener for Premier League button
document.getElementById('premierLeagueBtn').addEventListener('click', async () => {
    const success = await fetchApiData(apiEndpoints.premierLeague, 'premierLeague');
    if (success) {
        showStatus('Premier League data fetched successfully!', 'success');
    } else {
        showStatus('Using simulated Premier League data', 'success');
    }
});

// Event listener for Champions League button
document.getElementById('championsLeagueBtn').addEventListener('click', async () => {
    const success = await fetchApiData(apiEndpoints.championsLeague, 'championsLeague');
    if (success) {
        showStatus('Champions League data fetched successfully!', 'success');
    } else {
        showStatus('Using simulated Champions League data', 'success');
    }
});

// Event listener for NBA button
document.getElementById('nbaBtn').addEventListener('click', async () => {
    const success = await fetchApiData(apiEndpoints.nba, 'nba');
    if (success) {
        showStatus('NBA data fetched successfully!', 'success');
    } else {
        showStatus('Using simulated NBA data', 'success');
    }
});

// Event listener for MLB button
document.getElementById('mlbBtn').addEventListener('click', async () => {
    const success = await fetchApiData(apiEndpoints.mlb, 'mlb');
    if (success) {
        showStatus('MLB data fetched successfully!', 'success');
    } else {
        showStatus('Using simulated MLB data', 'success');
    }
});

// Add event listeners for the new nhl and Europa league buttons
document.getElementById('nhlBtn').addEventListener('click', async () => {
    const success = await fetchApiData(apiEndpoints.nhl, 'nhl');
    if (success) {
        showStatus('NHL data fetched successfully!', 'success');
    } else {
        showStatus('Using simulated NHL data', 'success');
    }
});

document.getElementById('europaLeagueBtn').addEventListener('click', async () => {
    const success = await fetchApiData(apiEndpoints.europaLeague, 'europaLeague');
    if (success) {
        showStatus('Europa League data fetched successfully!', 'success');
    } else {
        showStatus('Using simulated Europa League data', 'success');
    }
});

// Event listener for Fetch All button
document.getElementById('allBtn').addEventListener('click', async () => {
    // Reset to initial state
    currentJson = JSON.parse(JSON.stringify(baseJson));
    nextIndex = 8; // Adjust starting index based on your baseJson
    
    showStatus('Fetching data from all sources...', 'success');
    
    // Fetch from all sources
    await fetchApiData(apiEndpoints.premierLeague, 'premierLeague');
    await fetchApiData(apiEndpoints.championsLeague, 'championsLeague');
    await fetchApiData(apiEndpoints.nba, 'nba');
    await fetchApiData(apiEndpoints.mlb, 'mlb');
    // Add the new fetches
    await fetchApiData(apiEndpoints.nhl, 'nhl');
    await fetchApiData(apiEndpoints.europaLeague, 'europaLeague');
    
    showStatus('All data fetched and combined successfully!', 'success');
});

// Event listener for add match button
document.getElementById('addMatchBtn').addEventListener('click', () => {
    addEmptyMatch();
});

// Event listener for update URLs button
document.getElementById('updateUrlsBtn').addEventListener('click', () => {
    updateUrlsInJson();
});

// Event listener for encrypt URLs button
document.getElementById('encryptUrlsBtn').addEventListener('click', () => {
    encryptAllUrls();
});

// Event listener for copy button
document.getElementById('copyBtn').addEventListener('click', () => {
    const jsonText = document.getElementById('jsonDisplay').textContent;
    navigator.clipboard.writeText(jsonText)
        .then(() => {
            showStatus('JSON copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Error copying to clipboard:', err);
            showStatus('Failed to copy to clipboard', 'error');
        });
});
