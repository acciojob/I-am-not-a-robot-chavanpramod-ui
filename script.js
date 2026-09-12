document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("img-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const resultPara = document.getElementById("para");

  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
  let selectedImages = [];

  function init() {
    container.innerHTML = "";
    selectedImages = [];
    
    // Hide buttons using CSS class
    resetButton.classList.add("hidden");
    verifyButton.classList.add("hidden");
    resultPara.innerText = "";

    // Pick 1 random class to duplicate
    const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
    const imagesToRender = [...imageClasses, imageClasses[duplicateIndex]];

    // Fisher-Yates shuffle algorithm
    for (let i = imagesToRender.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagesToRender[i], imagesToRender[j]] = [imagesToRender[j], imagesToRender[i]];
    }

    // Render image nodes dynamically
    imagesToRender.forEach((className, index) => {
      const img = document.createElement("img");
      img.classList.add(className);
      img.dataset.class = className;
      img.dataset.index = index;

      img.addEventListener("click", () => handleImageClick(img));
      container.appendChild(img);
    });
  }

  function handleImageClick(img) {
    if (selectedImages.length >= 2 || img.classList.contains("selected")) {
      return;
    }

    img.classList.add("selected");
    selectedImages.push(img);

    // Show reset button on first selection
    if (selectedImages.length === 1) {
      resetButton.classList.remove("hidden");
    }

    // Show verify button when 2 tiles are selected
    if (selectedImages.length === 2) {
      verifyButton.classList.remove("hidden");
    }
  }

  resetButton.addEventListener("click", () => {
    init();
  });

  verifyButton.addEventListener("click", () => {
    verifyButton.classList.add("hidden");

    const [first, second] = selectedImages;
    if (first.dataset.class === second.dataset.class) {
      resultPara.innerText = "You are a human. Congratulations!";
    } else {
      resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  init();
});