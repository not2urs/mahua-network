const images = [
  { src: "img/IMG_1.JPG",  delay: 0 },
  { src: "img/IMG_2.JPG",  delay: 100 },
  { src: "img/IMG_3.JPG",  delay: 200 },
  { src: "img/IMG_4.JPG",  delay: 300 },
  { src: "img/IMG_5.JPG",  delay: 400 },
  { src: "img/IMG_6.JPG",  delay: 500 },
  { src: "img/IMG_7.JPG",  delay: 500 },
  { src: "img/IMG_8.JPG",  delay: 500 },
  { src: "img/IMG_9.JPG",  delay: 500 },
  { src: "img/IMG_10.JPG", delay: 500 },
  { src: "img/IMG_11.jpg", delay: 300 },
  { src: "img/IMG_12.JPG", delay: 300 }
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