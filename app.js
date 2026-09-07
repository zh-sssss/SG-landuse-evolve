/* global maplibregl, storyConfig */

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

const annualColours = [
  ["Residential", "#e9b4ac"], ["Commercial and mixed use", "#d4574f"],
  ["Institutional and community", "#6f8fc7"], ["Park and recreation", "#70a86b"],
  ["Employment", "#9b7bb5"], ["Transport and infrastructure", "#8d9697"],
  ["Other and excluded", "#d9d5ca"]
];
const allStoryLayers = ["mp-2003", "mp-2014", "mp-2025", "mix-change", "destination-change", "change-concentrated", "change-concentrated-outline", "svi-points"];
const layerOpacity = {
  "mp-2003": 0.84,
  "mp-2014": 0.84,
  "mp-2025": 0.84,
  "mix-change": 0.78,
  "destination-change": 0.78,
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
  section.className = "chapter";
  const images = chapter.images ? `<div class="image-pair">${chapter.images.map((src, i) => `<figure><img src="${src}" alt="${chapter.title}, ${chapter.captions[i]}" onerror="this.onerror=null;this.src='images/pending.svg'"><figcaption>${chapter.captions[i]} · Google Street View</figcaption></figure>`).join("")}</div>` : "";
  section.innerHTML = `<div class="card"><h2>${chapter.title}</h2><p>${chapter.description}</p>${images}</div>`;
  chapterRoot.appendChild(section);
});

const map = new maplibregl.Map({
  container: "map",
  style: storyConfig.style,
  center: [103.8198, 1.3521],
  zoom: 10.2,
  bearing: 0,
  pitch: 0,
  scrollZoom: false
});
map.addControl(new maplibregl.NavigationControl(), "top-right");

function sourceLayer(name) {
  return storyConfig.tilesets[name].url.includes("YOUR_")
    ? {}
    : { "source-layer": storyConfig.tilesets[name].sourceLayer };
}

function addStorySource(name) {
  const tileset = storyConfig.tilesets[name];
  map.addSource(name, tileset.url.includes("YOUR_")
    ? { type: "geojson", data: storyConfig.localData[name] }
    : { type: "vector", url: tileset.url });
}

function addStoryLayers() {
  ["mp2003", "mp2014", "mp2025", "change"].forEach(addStorySource);
  [["mp-2003", "mp2003"], ["mp-2014", "mp2014"], ["mp-2025", "mp2025"]].forEach(([id, source]) => {
    map.addLayer({ id, type: "fill", source, ...sourceLayer(source),
      paint: { "fill-color": ["match", ["get", "lu_group"], ...annualColours.flat(), "#d9d5ca"], "fill-opacity": 0, "fill-opacity-transition": transition, "fill-outline-color": "#ffffff" } });
  });
  map.addLayer({ id: "mix-change", type: "fill", source: "change", ...sourceLayer("change"),
    filter: ["==", ["get", "valid_change_cell"], true],
    paint: { "fill-color": ["interpolate", ["linear"], ["get", "delta_mix_03_25"], -0.4, "#7f3b8d", 0, "#f7f7f7", 0.4, "#238b45"], "fill-opacity": 0, "fill-opacity-transition": transition, "fill-outline-color": "#ffffff" } });
  map.addLayer({ id: "destination-change", type: "fill", source: "change", ...sourceLayer("change"),
    filter: ["==", ["get", "valid_change_cell"], true],
    paint: { "fill-color": ["interpolate", ["linear"], ["get", "delta_destination_03_25"], -50, "#9e3d50", 0, "#f7f7f7", 50, "#2878a6"], "fill-opacity": 0, "fill-opacity-transition": transition, "fill-outline-color": "#ffffff" } });
  map.addLayer({ id: "change-concentrated", type: "fill", source: "change", ...sourceLayer("change"),
    filter: ["==", ["get", "change_concentrated"], true],
    paint: { "fill-color": ["match", ["get", "change_type"], "Both increased", "#0f7c66", "Both decreased", "#8a3d74", "One or both decreased", "#d28a34", "#777777"], "fill-opacity": 0, "fill-opacity-transition": transition, "fill-outline-color": "#161616" } });
  map.addLayer({ id: "change-concentrated-outline", type: "line", source: "change", ...sourceLayer("change"),
    filter: ["==", ["get", "change_concentrated"], true],
    paint: { "line-color": "#c44f32", "line-width": 2.5, "line-dasharray": [2, 2], "line-opacity": 0, "line-opacity-transition": transition } });
  map.addSource("svi", { type: "geojson", data: "data/svi_cases.geojson" });
  map.addLayer({ id: "svi-points", type: "circle", source: "svi", paint: { "circle-radius": 7, "circle-color": "#fff", "circle-opacity": 0, "circle-opacity-transition": transition, "circle-stroke-width": 3, "circle-stroke-color": "#111", "circle-stroke-opacity": 0, "circle-stroke-opacity-transition": transition } });

  map.on("click", "svi-points", (event) => {
    const p = event.features[0].properties;
    new maplibregl.Popup().setLngLat(event.features[0].geometry.coordinates)
      .setHTML(`<strong>${p.place}</strong><br>${p.address}<br>Δ mix ${Number(p.delta_mix_03_25).toFixed(3)}<br>Δ destination ${Number(p.delta_destination_03_25) >= 0 ? "+" : ""}${Number(p.delta_destination_03_25).toFixed(1)} pp`)
      .addTo(map);
  });
}

function setLegend(chapterId) {
  const legend = document.getElementById("legend");
  if (["punggol", "bidadari", "jurong"].includes(chapterId)) {
    legend.innerHTML = "<h3>Selected SVI case</h3><div class='legend-row'><span style='width:24px;border-top:3px dashed #c44f32'></span>500 m hotspot cell</div><div class='legend-row'><span style='width:12px;height:12px;border:3px solid #111;border-radius:50%;background:#fff'></span>SVI viewpoint</div>";
  } else if (chapterId.startsWith("plan-") || chapterId === "intro") {
    legend.innerHTML = `<h3>Planned land use</h3>${annualColours.map(([label, colour]) => `<div class="legend-row"><span class="swatch" style="background:${colour}"></span>${label}</div>`).join("")}`;
  } else if (chapterId === "mix-change") {
    legend.innerHTML = "<h3>Δ mix, 2003–2025</h3><div class='legend-row'><span class='swatch' style='background:#7f3b8d'></span>less mixed</div><div class='legend-row'><span class='swatch' style='background:#f7f7f7'></span>little change</div><div class='legend-row'><span class='swatch' style='background:#238b45'></span>more mixed</div>";
  } else if (chapterId === "destination-change") {
    legend.innerHTML = "<h3>Δ destination share</h3><div class='legend-row'><span class='swatch' style='background:#9e3d50'></span>decrease</div><div class='legend-row'><span class='swatch' style='background:#f7f7f7'></span>little change</div><div class='legend-row'><span class='swatch' style='background:#2878a6'></span>increase</div>";
  } else {
    legend.innerHTML = "<h3>Change Concentrated</h3><div class='legend-row'><span class='swatch' style='background:#0f7c66'></span>both increased</div><div class='legend-row'><span class='swatch' style='background:#8a3d74'></span>both decreased</div><div class='legend-row'><span class='swatch' style='background:#d28a34'></span>mixed direction</div>";
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
  if (!tokenMissing && event.error) console.error(event.error);
});
