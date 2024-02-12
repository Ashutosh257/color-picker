
import DEVELOPER  from './config.js'

console.log(DEVELOPER) 

const mainEl = document.getElementById("container")
const colorPickerInput = document.getElementById("color-picker-input")
const colorPickerBtn = document.getElementById("color-picker-button")

const BASE_URL = "https://www.thecolorapi.com"
const ENDPOINT = "/scheme"

const setColors = (colors) => {
    let html = ""
    colors.forEach(color => {
        html += `
            <div class="color" id="${color.hex.value}" style="background-color: ${color.hex.value}">
                <span class="color-palette" data-hex="${color.hex.value}">${color.hex.value}</span>
            </div>
        `   
    })
    mainEl.innerHTML = html
}

const displayCopiedMessage = (hex) => {
    const copiedMessage = document.getElementById("copied-message")
    document.getElementById("copied-color").textContent = hex
    
    copiedMessage.classList.remove("hide")
    
    setTimeout(() => {
        copiedMessage.classList.add("hide")
    }, 2000)
}

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    displayCopiedMessage(text)
}


mainEl.addEventListener("click", (e) => {
    if(e.target.classList.contains("color-palette")) {
        copyToClipboard(e.target.dataset.hex)
    }else if(e.target.classList.contains("color")) {
        copyToClipboard(e.target.id)
    }
})

const getColorScheme = (hex, mode="monochrome") => {
    fetch(`${BASE_URL}${ENDPOINT}?hex=${hex}&mode=${mode}&count=6`)
        .then(res => res.json())
        .then(data => {
            setColors(data.colors)
        })
}

document.getElementById("color-picker").addEventListener("change", () => {
    const colorMode = document.getElementById("color-mode-select").value
    getColorScheme(colorPickerInput.value.slice(1), colorMode)
    
    document.getElementById("developed-by").style.color = colorPickerInput.value 
})

getColorScheme("0047AB")