let inputRange = 16
const inputEl = document.querySelector("#password")

const UppercaseCheckEl = document.querySelector("#uppercase-check")
const numbersCheckEl = document.querySelector("#numbers-check")
const symbolsCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

function generatePassword() {
        let chars = "abcdefghjkmnpqrstuvwxyz"

        let password = "" // password gerado

        const UppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
        const numberChars = "123456789"
        const symbolsChars = "?!@&*()[]"

        if(UppercaseCheckEl.checked) {
            chars += UppercaseChars
        }

        if(numbersCheckEl.checked) {
            chars += numberChars
        }

        if(symbolsCheckEl.checked) {
            chars += symbolsChars
        }

        for(let i = 0; i < inputRange; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length)
            password += chars.substring(randomNumber, randomNumber + 1)
        }

        inputEl.value = (password)
        calculateQuality()   
        calculateFontSize()
    }

    function calculateFontSize() {
        if(inputRange > 45) {
            inputEl.classList.remove("font-sm")
            inputEl.classList.remove("font-xs")
            inputEl.classList.add("font-xxs")
        } else if(inputRange > 32) {
            inputEl.classList.remove("font-sm")
            inputEl.classList.add("font-xs")
            inputEl.classList.remove("font-xxs")
        } else if(inputRange > 22) {
            inputEl.classList.add("font-sm")
            inputEl.classList.remove("font-xs")
            inputEl.classList.remove("font-xxs")
        } else {
            inputEl.classList.remove("font-sm")
            inputEl.classList.remove("font-xs")
            inputEl.classList.remove("font-xxs")
        }
    }

function calculateQuality() {
    // T*0.25 + M*0.15 + N*0.25 + S*0.35 = 100

    const percent = Math.round(
        (inputRange / 64) * 25 +
        (UppercaseCheckEl.checked ? 15 : 0) +
        (numbersCheckEl.checked ? 25 : 0) +
        (symbolsCheckEl.checked ? 35 : 0)
    )

    securityIndicatorBarEl.style.width = `${percent}%`

    if(percent > 69) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    } else if(percent > 50) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.add('warning')
    } else{
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.add('critical')
    }

    if(percent >= 100) {
        securityIndicatorBarEl.classList.add('completed')
    } else {
        securityIndicatorBarEl.classList.remove('completed')
    }
}

const inputRangeEl = document.querySelector("#password-length")
inputRangeEl.addEventListener("input", function () {
    inputRange = inputRangeEl.value
    document.querySelector("#password-length-text").innerText = inputRange
    generatePassword()
})

const renewEl = document.querySelector("#renew")
renewEl.addEventListener("click", generatePassword)

UppercaseCheckEl.addEventListener("click", generatePassword)
numbersCheckEl.addEventListener("click", generatePassword)
symbolsCheckEl.addEventListener("click", generatePassword)

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const buttonCopy = document.querySelector("#btn")
buttonCopy.addEventListener("click", copy)

generatePassword()
copy()