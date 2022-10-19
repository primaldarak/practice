const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === "space") {
        setColor();
    }
});

document.addEventListener("click", (event) => {
    const type = event.target.dataset.type;

    if (type === "lock") {
        const node =
            event.target.tagName.toLowerCase() === "i" ? event.target : event.target.children[0];

        node.classList.toggle("fa-lock-open");
        node.classList.toggle("fa-lock");
    } else if (type === "copy") {
        copyToClipboard(event.target.textContent);
    }
});

function copyToClipboard(title) {
    return navigator.clipboard.writeText(title);
}

function setColor() {
    cols.forEach((col) => {
        const isLocked = col.querySelector("i").classList.contains("fa-lock");
        const title = col.querySelector(".title");
        const lock = col.querySelector(".lock");
        const color = chroma.random();

        if (isLocked) {
            return;
        }
        title.textContent = color;
        col.style.background = color;
        setTitleColor(title, color);
        setTitleColor(lock, color);
    });
}

function setTitleColor(title, color) {
    const luminance = chroma(color).luminance();

    title.style.color = luminance > 0.5 ? "black" : "white";
}

setColor();
