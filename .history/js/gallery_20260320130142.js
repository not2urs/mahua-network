const images = [
  { src: "img/IMG_1.JPG", category: "web", delay: 0 },
  { src: "img/IMG_2.JPG", category: "app", delay: 100 },
  { src: "img/IMG_3.JPG", category: "marketing", delay: 200 },
  { src: "img/IMG_4.JPG", category: "web", delay: 300 },
  { src: "img/IMG_5.JPG", category: "design", delay: 400 },
  { src: "img/IMG_6.JPG", category: "app", delay: 500 },
  { src: "img/IMG_7.JPG", category: "ai", delay: 500 },
  { src: "img/IMG_8.JPG", category: "ai", delay: 500 },
  { src: "img/IMG_9.JPG", category: "ml", delay: 500 },
  { src: "img/IMG_10.JPG", category: "ml", delay: 500 },
  { src: "img/IMG_11.jpg", category: "web", delay: 300 },
  { src: "img/IMG_12.JPG", category: "web", delay: 300 }
];

const grid = document.getElementById("portfolioGrid");

images.forEach((img) => {
  const item = document.createElement("div");
  item.className = "portfolio-item";
  item.setAttribute("data-category", img.category);
  item.setAttribute("data-aos", "fade-up");
  item.setAttribute("data-aos-delay", img.delay);

  item.innerHTML = `
    <div class="portfolio-image">
        <div class="portfolio-placeholder">
            <img src="${img.src}" onclick="openPopup('${img.src}')">
        </div>
    </div>
  `;

  grid.appendChild(item);
});


function openPopup(src) {
  document.getElementById("imagePopup").style.display = "flex";
  document.getElementById("popupImg").src = src;
}

function closePopup() {
  document.getElementById("imagePopup").style.display = "none";
}