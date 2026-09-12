document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("img-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const resultPara = document.getElementById("para");

  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
  let selectedImages = [];

  function init() {
    // Reset state
    container.innerHTML = "";
    selectedImages = [];
    
    // Explicitly hide buttons on initial state / reset
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    resultPara.innerText = "";

    // Pick a random image class to duplicate
    const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
    const imagesToRender = [...imageClasses, imageClasses[duplicateIndex]];

    // Shuffle images (Fisher-Yates shuffle)
    for (let i = imagesToRender.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagesToRender[i], imagesToRender[j]] = [imagesToRender[j], imagesToRender[i]];
    }

    // Render image elements dynamically
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

    // Show reset button on first image click
    if (selectedImages.length === 1) {
      resetButton.style.display = "inline-block";
    }

    // Show verify button only when exactly 2 images are selected
    if (selectedImages.length === 2) {
      verifyButton.style.display = "inline-block";
    }
  }

  // Reset Button Logic
  resetButton.addEventListener("click", () => {
    init();
  });

  // Verify Button Logic
  verifyButton.addEventListener("click", () => {
    verifyButton.style.display = "none";

    const [first, second] = selectedImages;
    if (first.dataset.class === second.dataset.class) {
      resultPara.innerText = "You are a human. Congratulations!";
    } else {
      resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  // Run initial state setup
  init();
});