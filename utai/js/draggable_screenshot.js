class DraggableScreenshot {
    x
    y

    xStart
    yStart

    xTranslate
    yTranslate

    didDrag(x, y) {
        this.xStart = x
        this.yStart = y
        this.isActive = true
    }

    didDrop() {
        this.x += this.xTranslate
        this.y += this.yTranslate
    }

    translate(x, y) {
        this.xTranslate = x - this.xStart
        this.yTranslate = y - this.yStart
    }

    constructor(main, borderd, x, y) {
        this.uuid = uuid()

        this.main = main
        this.borderd = borderd
        this.x = x  // (Math.random()-0.5) * 156
        this.y = y  // Math.random() * 156
        setTranslate(this.x, this.y, this.borderd)
    }
}


let body = document.getElementsByTagName("body")[0]
let bordereds = document.getElementsByClassName("bordered")

let uuids = []
let screenshots = []
let activeScreenshot = null

let bodyWidth = body.scrollWidth
let bodyHeight = body.scrollHeight


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}


window.onload = function() {
    for (var i = 0; i < bordereds.length; ++i) {
        let bordered = bordereds.item(i)
        let main = bordered.querySelector(".item")

        // Set size
        let height = main.height
        if (bordered.classList.contains("outter_page_3")) {
            bordered.style.height = (height+2).toString() + "px"
        }

        let inner = bordered.querySelector(".inner_page_3")
        if (inner != null) { inner.style.height = height.toString() + "px" }


        // Set position
        bordered.style.position = "absolute"

        let oglWidth = bordered.clientWidth
        let oglHeight = bordered.clientHeight

        let screenshot = new DraggableScreenshot(main, bordered,
                                                 Math.random() * (bodyWidth - oglWidth),
                                                 Math.random() * (bodyHeight - oglHeight))

        screenshots.push(screenshot)
        uuids.push(screenshot.uuid)
    }

    body.style.opacity = '1'

    body.addEventListener("touchstart", drag, false)
    body.addEventListener("touchend", drop, false)
    body.addEventListener("touchmove", move, false)

    body.addEventListener("mousedown", drag, false)
    body.addEventListener("mouseup", drop, false)
    body.addEventListener("mousemove", move, false)    
}


function drag(e) {
    e.preventDefault()

    if (activeScreenshot != null) {
        activeScreenshot.didDrop()
    }

    screenshots.forEach(screenshot => {
        if (screenshot.main === e.target) {
            activeScreenshot = screenshot
            uuids = uuids.filter(uuid => {
                return uuid != activeScreenshot.uuid
            })
            uuids.push(activeScreenshot.uuid)
        }
    })

    if (activeScreenshot == null) { return }

    screenshots.forEach(screenshot => {
        let zIndex = parseInt(uuids.indexOf(screenshot.uuid) + 1)
        screenshot.borderd.style.zIndex = zIndex.toString()
    })

    if (e.type === "touchstart") {
        activeScreenshot.didDrag(e.touches[0].clientX, e.touches[0].clientY)
    } else {
        activeScreenshot.didDrag(e.clientX, e.clientY)
    }
}


function drop(e) {
    if (activeScreenshot == null) { return }

    activeScreenshot.didDrop()

    activeScreenshot = null
}


function move(e) {
    if (activeScreenshot != null) {
        if (e.type === "touchmove") {
            activeScreenshot.translate(e.touches[0].clientX, e.touches[0].clientY)
        } else {
            activeScreenshot.translate(e.clientX, e.clientY)
        }

        setTranslate(activeScreenshot.x + activeScreenshot.xTranslate, 
                     activeScreenshot.y + activeScreenshot.yTranslate, 
                     activeScreenshot.borderd)
    }
}

function setTranslate(x, y, bordered) {
    bordered.style.top = y.toString() + "px"
    bordered.style.left = x.toString() + "px"
}