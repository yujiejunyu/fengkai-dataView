const bgContainer = document.getElementById("container")
bgContainer.addEventListener("wheel", (event) => {

    event.preventDefault();
    bgContainer.scrollLeft += event.deltaY;
});