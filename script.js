const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
    button.disabled = !button.disabled;
}

//passing joke to voicerss api
function tellMe(joke) {
    VoiceRSS.speech({
        key: '44aa1813ccbe4d8f9a7df4c1afa46d6a',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
//get jokes from joke api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else { 
            joke = data.joke;
        };
        //text to speech
        tellMe(joke);
        //disablebutton
        toggleButton();
    } catch(error) {
        console.log("is this an error joke", error)
    }
}

//event listener on button
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
