//let myLeads = ["www.google.com ", "www.amazon.com ","www.qualcom.com "]
let myLeads = []
//let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("del-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("save-btn")
const darkBtn = document.getElementById("dark-btn")
const body = document.getElementById("body")
// let copyText = document.getElementById("copy-btn")
let dark = false
//Get the leads from localStoage - PS: JSON.parse
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//localStorage.setItem("myLeads", "www.examplelead.com")
//console.log(localStorage.getItem("myLeads"))


//console.log(leadsFromLocalStorage)
//1. Check if leadsFromLocalStorage is truthy
//2. If so, set myLeads to its value and call renderLeads()
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    //renderLeads()
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
    //console.log('halwa')
    //Grab the url of the current tab
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs1) {
    //     let activeTab = tabs1[0];
    //     let activeTabId = activeTab.Id;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].url.substr(0, 5) === "https") {
            myLeads.push(tabs[0].url)
        } else {
            alert("This is not a valid URL! A valid URL starts with 'HTTPS'.")
            return
        }
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads, false)
    })

})

function handleCopy(value) {
    navigator.clipboard.writeText(value)
    alert("Copied the text:" + value)
    console.log("value")
}


function render(leads, input) {
    const copy = []
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        document.createElement("li")
        myLeads[i] + "<li>"
        const value = leads[i]
        copy.push({ index: i, value: value });
        listItems += !(value.substr(0, 5) === "https") ?
            `<li class="listStyle"> 
        <p class="anchor">
            ${leads[i]}
        </p>   
        <button class="copyBtn" id="button-${i}">COPY</button>
    </li>`
            :
            `
     <li class="listStyle"> 
         <a class="anchor" target='_blank' color='red' href="${leads[i]}">
             ${leads[i]}
         </a>   
         <button class="copyBtn" id="button-${i}">COPY</button>
     </li>`
        inputEl.value = ""  // to clear the input field
    }
    ulEl.innerHTML = listItems

    copy.forEach(element => {
        document.getElementById(`button-${element.index}`).addEventListener("click", function(){handleCopy(element.value)})
    });
}


//listen for double clicks on the delete button
//when clicked, clear the localStorage, myLeads, and the DOM 
deleteBtn.addEventListener("click", function () {
    console.log("double clicked")
    if (localStorage.length>0) {
    window.confirm("Do you really want to delete all the saved contents?")
    localStorage.clear()
    myLeads = []
    copy = []
    render(myLeads)
    }
    else if (localStorage.length===0) {
        window.alert("Nothing to delete!")
    } 

})

inputEl.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        //myLeads.push("www.awesomelead.com")
        //let empty = inputEl.value
        myLeads.push(inputEl.value)
        if (inputEl.value.length === 0) {
            window.alert("Input field is empty")
        }
        else {
            //Save the myLeads array into localStorage
            //Ps: remember JSON.stringify()

            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
            console.log(localStorage.getItem("myLeads"))
        }
    }
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    if (inputEl.value.length === 0) {
        window.alert("Input field is empty")
    }
    else {
        //Save the myLeads array into localStorage
        //Ps: remember JSON.stringify()

        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads, true)
        console.log(localStorage.getItem("myLeads"))
    }
})

function darkMode() {
    //element.className = "dark-mode"
    body.classList.toggle("dark-mode")
    dark = dark ? false : true
    darkBtn.innerHTML = dark ? "LIGHT MODE" : "DARK MODE"
    if (dark) {
        document.getElementById("input-el").style.color = "white"
        document.getElementById("input-el").style.backgroundColor = "rgb(45, 45, 45)"
        document.getElementById("input-btn").style.backgroundColor = "rgb(0, 59, 141)"
        document.getElementById("input-btn").style.border = "none"
        document.getElementById("save-btn").style.backgroundColor = "rgb(0, 59, 141)"
        document.getElementById("save-btn").style.border = "none"
        document.getElementById("input-el").style.borderColor = "white"
        // document.getElementsById("del-btn1").style.backgroundColor="grey"
        document.getElementsById("del-btn1.dropupbutton").style.color = "black"
        document.getElementsById("button-${i}").style.backgroundColor = "white"
    }
    else {
        document.getElementById("input-el").style.color = "black"
        document.getElementById("input-el").style.backgroundColor = "rgb(218, 235, 254)"
        document.getElementById("input-btn").style.backgroundColor = "#5f9341"
        document.getElementById("save-btn").style.backgroundColor = "#5f9341"
        document.getElementById("input-el").style.borderColor = "cyan";
        document.getElementById("input-el").style.transition = "box-shadow 100ms";
        document.getElementById("input-el").hover = "#fff";
    }

    //darkBtn.innerHTML = "LIGHT MODE"
}

darkBtn.addEventListener("click", function () {
    darkMode()
})

// function copyText() {
//     copyText.select()
//     navigator.clipboard.writeText(copyText.value)
//     alert("Copied the text:" + copyText.value)
// }

// copyText.addEventListener("click", function() {
//     copyText()
// })


//Style the list according to the design




