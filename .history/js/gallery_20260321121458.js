const grid1 = document.getElementById("portfolioGrid");

if (grid1) {
  images.forEach((img) => {
    const item = document.createElement("div");

    item.className = "portfolio-item";
    item.setAttribute("data-aos", "fade-up");
    item.setAttribute("data-aos-delay", img.delay);

    item.innerHTML = `
      <div class="portfolio-image">
          <div class="portfolio-placeholder">
              <img src="${img.src}" onclick="openPopup('${img.src}')">
          </div>
      </div>
    `;

    grid1.appendChild(item);
  });
}


// =====================
// PORTFOLIO IMAGES DATA
// =====================


  const portfolioImages = [
    { src: "../img/photo/photo-1.JPG",  delay: 0 },
    { src: "../img/photo/photo-2.JPG",  delay: 100 },
    { src: "../img/photo/photo-3.JPG",  delay: 200 },
    { src: "../img/photo/photo-4.JPG",  delay: 300 },
    { src: "../img/photo/photo-5.JPG",  delay: 400 },
    { src: "../img/photo/photo-6.JPG",  delay: 500 },
    { src: "../img/photo/photo-7.JPG",  delay: 500 },
    { src: "../img/photo/photo-14.JPG", delay: 500 },
    { src: "../img/photo/photo-9.JPG",  delay: 500 },
    { src: "../img/photo/photo-10.JPG", delay: 500 },
    { src: "../img/photo/photo-11.JPG", delay: 300 },
    { src: "../img/photo/photo-12.JPG", delay: 300 }
  ];

  const grid2 = document.getElementById("portfolioGrid2");

  portfolioImages.forEach((img) => {
    const item = document.createElement("div");

    item.className = "portfolio-item";
    item.setAttribute("data-aos", "fade-up");
    item.setAttribute("data-aos-delay", img.delay);

    item.innerHTML = `
      <div class="portfolio-image">
        <div class="portfolio-placeholder">
          <img src="${img.src}" style="cursor:pointer;">
        </div>
      </div>
    `;

    // click event
    // item.querySelector("img").addEventListener("click", () => {
    //   openPopup(img.src);
    // });

    grid2.appendChild(item);
  });
