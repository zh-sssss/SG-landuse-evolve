/* global mapboxgl, storyConfig */

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

const annualColours = [
  ["Residential", "#e9b4ac"], ["Commercial and mixed use", "#d4574f"],
  ["Institutional and community", "#6f8fc7"], ["Park and recreation", "#70a86b"],
  ["Employment", "#9b7bb5"], ["Transport and infrastructure", "#8d9697"],
  ["Reserve site", "#e7d899"], ["Waterbody", "#a8d5e5"],
  ["Special use and cemetery", "#b8ad9e"],
  ["Other and excluded", "#d9d5ca"]
];
const allStoryLayers = ["mp-2003", "mp-2014", "mp-2025", "land-use-change-03-14", "land-use-change-14-25", "land-use-change-03-25", "change-concentrated", "change-concentrated-outline", "svi-points"];
const layerOpacity = {
  "mp-2003": 0.84,
  "mp-2014": 0.84,
  "mp-2025": 0.84,
  "land-use-change-03-14": 0.78,
  "land-use-change-14-25": 0.78,
  "land-use-change-03-25": 0.78,
  "change-concentrated": 0.82,
  "change-concentrated-outline": 1,
  "svi-points": 1
};
const transition = { duration: 500, delay: 0 };

document.getElementById("title").textContent = storyConfig.title;
document.getElementById("subtitle").textContent = storyConfig.subtitle;
document.getElementById("byline").textContent = storyConfig.byline;

const chapterRoot = document.getElementById("chapters");
storyConfig.chapters.forEach((chapter) => {
  const section = document.createElement("article");
  section.id = chapter.id;
  section.className = chapter.companion ? "chapter chapter-paired" : "chapter";
  const images = chapter.images ? `<div class="image-carousel" data-carousel>${chapter.images.map((src, i) => `<figure${i === 0 ? "" : " hidden"}><img src="${src}" alt="${chapter.title}, ${chapter.captions[i]}" onerror="this.onerror=null;this.src='images/pending.svg'"><figcaption>${chapter.captions[i]} · Google Street View</figcaption></figure>`).join("")}<button class="carousel-button carousel-previous" type="button" aria-label="Previous SVI">‹</button><button class="carousel-button carousel-next" type="button" aria-label="Next SVI">›</button><span class="carousel-count" aria-live="polite">1 / ${chapter.images.length}</span></div>` : "";
  const companion = chapter.companion ? `<div class="card companion-card"><h2>${chapter.companion.title}</h2><p>${chapter.companion.description}</p></div>` : "";
  section.innerHTML = `<div class="card"><h2>${chapter.title}</h2><p>${chapter.description}</p>${images}</div>${companion}`;
  chapterRoot.appendChild(section);
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll("figure")];
  const count = carousel.querySelector(".carousel-count");
  let activeIndex = 0;

  function showSlide(nextIndex) {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => { slide.hidden = index !== activeIndex; });
    count.textContent = `${activeIndex + 1} / ${slides.length}`;
  }

  carousel.querySelector(".carousel-previous").addEventListener("click", () => showSlide(activeIndex - 1));
  carousel.querySelector(".carousel-next").addEventListener("click", () => showSlide(activeIndex + 1));
});

mapboxgl.accessToken = storyConfig.accessToken;

const map = new mapboxgl.Map({
  container: "map",
  style: storyConfig.style,
  center: [103.8198, 1.3521],
  zoom: 10.2,
  bearing: 0,
  pitch: 0,
  scrollZoom: false
});
map.addControl(new mapboxgl.NavigationControl(), "top-right");

function addStoryLayers() {
  map.addSource("svi", { type: "geojson", data: "data/svi_cases.geojson?v=20260907-2" });
  map.addLayer({ id: "svi-points", type: "circle", source: "svi", paint: { "circle-radius": 7, "circle-color": "#fff", "circle-opacity": 0, "circle-opacity-transition": transition, "circle-stroke-width": 3, "circle-stroke-color": "#111", "circle-stroke-opacity": 0, "circle-stroke-opacity-transition": transition } });

  map.on("click", "svi-points", (event) => {
    const p = event.features[0].properties;
    new mapboxgl.Popup().setLngLat(event.features[0].geometry.coordinates)
      .setHTML(`<strong>${p.place}</strong><br>${p.address}<br>Land-use change ${Number(p.land_use_change_share_03_25).toFixed(1)}%<br>${p.dominant_transition_03_25}`)
      .addTo(map);
  });
}

function setLegend(chapterId) {
  const legend = document.getElementById("legend");
  legend.hidden = chapterId === "intro";
  if (chapterId === "intro") {
    legend.innerHTML = "";
  } else if (["punggol", "bidadari", "jurong"].includes(chapterId)) {
    legend.innerHTML = "<h3>Selected SVI case</h3><div class='legend-row'><span style='width:24px;border-top:3px dashed #c44f32'></span>500 m hotspot cell</div><div class='legend-row'><span style='width:12px;height:12px;border:3px solid #111;border-radius:50%;background:#fff'></span>SVI viewpoint</div>";
  } else if (chapterId.startsWith("plan-")) {
    legend.innerHTML = `<h3>Planned land use</h3>${annualColours.map(([label, colour]) => `<div class="legend-row"><span class="swatch" style="background:${colour}"></span>${label}</div>`).join("")}`;
  } else if (chapterId.startsWith("land-use-change-")) {
    const periods = {
      "land-use-change-03-14": "2003–2014",
      "land-use-change-14-25": "2014–2025",
      "land-use-change-03-25": "2003–2025"
    };
    legend.innerHTML = `<h3>Land-use change, ${periods[chapterId]}</h3><div class='legend-row'><span class='swatch' style='background:#f7f4f9'></span>0%</div><div class='legend-row'><span class='swatch' style='background:#c994c7'></span>50%</div><div class='legend-row'><span class='swatch' style='background:#7a0177'></span>100% of comparable land</div>`;
  } else {
    legend.innerHTML = "<h3>Change Concentrated</h3><div class='legend-row'><span class='swatch' style='background:#d95f0e'></span>top 15% of valid cells</div>";
  }
}

function activateChapter(chapter) {
  if (map.getLayer("change-concentrated-outline") && chapter.gridId) {
    map.setFilter("change-concentrated-outline", ["==", ["get", "grid_id"], chapter.gridId]);
  }
  allStoryLayers.forEach((id) => {
    if (!map.getLayer(id)) return;
    const opacity = chapter.visibleLayers.includes(id) ? layerOpacity[id] : 0;
    if (id === "svi-points") {
      map.setPaintProperty(id, "circle-opacity", opacity);
      map.setPaintProperty(id, "circle-stroke-opacity", opacity);
    } else if (id === "change-concentrated-outline") {
      map.setPaintProperty(id, "line-opacity", opacity);
    } else {
      map.setPaintProperty(id, "fill-opacity", opacity);
    }
  });
  map.flyTo({ ...chapter.location, essential: true, duration: 1700 });
  setLegend(chapter.id);
}

map.on("load", () => {
  addStoryLayers();
  activateChapter(storyConfig.chapters[0]);
  const observer = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
      const chapter = entry.target.id === "hero"
        ? storyConfig.chapters[0]
        : storyConfig.chapters.find((item) => item.id === entry.target.id);
      if (chapter) activateChapter(chapter);
    });
  }, { threshold: 0.55 });
  observer.observe(document.getElementById("hero"));
  document.querySelectorAll(".chapter").forEach((node) => observer.observe(node));
});

map.on("error", (event) => {
  if (event.error) console.error(event.error);
});
