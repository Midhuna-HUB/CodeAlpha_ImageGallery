let grid = document.getElementById("grid");
let search = document.getElementById("search");
let loader = document.getElementById("loader");

// 🔑 YOUR KEY (this is correct format)
let API_KEY = "ttMKeIo00AT8Ecp-8-4OaG2C1GKGycn7Yn9bcjLZt-s";

async function loadImages(query){

  loader.style.display = "block";

  try {
    let res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${API_KEY}`
    );

    let data = await res.json();

    loader.style.display = "none";
    grid.innerHTML = "";

    if(!data.results || data.results.length === 0){
      grid.innerHTML = "<h2>No images found 😕</h2>";
      return;
    }

    data.results.forEach(img=>{
      let image = document.createElement("img");
      image.src = img.urls.small;
      grid.appendChild(image);
    });

  } catch(err){
    loader.style.display = "none";
    grid.innerHTML = "<h2>API Error ❌</h2>";
    console.log(err);
  }
}

// ENTER SEARCH
search.addEventListener("keydown",(e)=>{
  if(e.key === "Enter"){
    loadImages(search.value);
  }
});

// INITIAL LOAD
loadImages("nature");