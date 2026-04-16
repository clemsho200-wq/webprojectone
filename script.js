// script.js
const roomButtons = document.querySelectorAll(".controls button[data-room]");
const rooms = document.querySelectorAll(".room");
const wallColorInput = document.getElementById("wallColor");
const floorStyleSelect = document.getElementById("floorStyle");

let currentRoomId = "living";

roomButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const roomId = btn.getAttribute("data-room");
    currentRoomId = roomId;

    // Toggle active button
    roomButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Toggle active room
    rooms.forEach((room) => {
      room.classList.toggle("active", room.id === roomId);
    });

    applyStyles();
  });
});

function applyStyles() {
  const room = document.getElementById(currentRoomId);
  const visual = room.querySelector(".room-visual");

  // Wall colour
  visual.style.backgroundColor = wallColorInput.value;

  // Floor style (just changing gradient/texture style for now)
  switch (floorStyleSelect.value) {
    case "wood":
      visual.style.borderImage = "none";
      visual.style.backgroundImage =
        `linear-gradient(to top, rgba(0,0,0,0.15), transparent),
         repeating-linear-gradient(
           90deg,
           #b45309 0,
           #b45309 8px,
           #92400e 8px,
           #92400e 16px
         )`;
      break;
    case "marble":
      visual.style.backgroundImage =
        `radial-gradient(circle at 0 0, #e5e7eb, #d1d5db),
         radial-gradient(circle at 100% 100%, #f9fafb, #e5e7eb)`;
      break;
    case "tile":
      visual.style.backgroundImage =
        `linear-gradient(#e5e7eb 1px, transparent 1px),
         linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`;
      visual.style.backgroundSize = "30px 30px";
      break;
  }
}

wallColorInput.addEventListener("input", applyStyles);
floorStyleSelect.addEventListener("change", applyStyles);

// Initial styles
applyStyles();
const furnitureButtons = document.querySelectorAll(".furniture-btn");

furnitureButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.dataset.item;
    const room = document.getElementById(currentRoomId);
    let existing = room.querySelector(`.furniture.${item}`);

    if (existing) {
      existing.remove();
      btn.classList.remove("active");
    } else {
      const img = document.createElement("img");
      img.src = `images/${item}.png`; // you add your own icons
      img.classList.add("furniture", item);
      room.querySelector(".room-visual").appendChild(img);
      btn.classList.add("active");
    }

    saveDesign();
  });
});
function saveDesign() {
  const data = {};

  rooms.forEach(room => {
    const id = room.id;
    const visual = room.querySelector(".room-visual");

    data[id] = {
      wallColor: visual.style.backgroundColor,
      floorStyle: floorStyleSelect.value,
      furniture: [...visual.querySelectorAll(".furniture")].map(f => ({
        item: [...f.classList].find(c => c !== "furniture"),
        src: f.src
      }))
    };
  });

  localStorage.setItem("apartmentDesign", JSON.stringify(data));
}

function loadDesign() {
  const saved = localStorage.getItem("apartmentDesign");
  if (!saved) return;

  const data = JSON.parse(saved);

  Object.keys(data).forEach(roomId => {
    const roomData = data[roomId];
    const visual = document.getElementById(roomId).querySelector(".room-visual");

    // Wall colour
    visual.style.backgroundColor = roomData.wallColor;

    // Floor style
    floorStyleSelect.value = roomData.floorStyle;
    applyStyles();

    // Furniture
    roomData.furniture.forEach(f => {
      const img = document.createElement("img");
      img.src = f.src;
      img.classList.add("furniture", f.item);
      visual.appendChild(img);
    });
  });
}

window.addEventListener("load", loadDesign);
const themeSelect = document.getElementById("themeSelect");

const themes = {
  scandi: {
    wall: "#f2efe8",
    floor: "wood"
  },
  luxury: {
    wall: "#e8d9c5",
    floor: "marble"
  },
  minimal: {
    wall: "#ffffff",
    floor: "tile"
  }
};

themeSelect.addEventListener("change", () => {
  const theme = themes[themeSelect.value];
  if (!theme) return;

  wallColorInput.value = theme.wall;
  floorStyleSelect.value = theme.floor;

  applyStyles();
  saveDesign();
});


