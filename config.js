const storyConfig = {
  style: "https://tiles.openfreemap.org/styles/positron",
  title: "Evolving Land Use, Evolving Streets",
  subtitle: "How Singapore's planned land-use structure changed from 2003 to 2025",
  byline: "Zhiheng Shu · DEP5118 ITA2",
  tilesets: {
    mp2003: { url: "mapbox://YOUR_USERNAME.master-plan-2003", sourceLayer: "master_plan_2003_land_use_styled" },
    mp2014: { url: "mapbox://YOUR_USERNAME.master-plan-2014", sourceLayer: "master_plan_2014_land_use_styled" },
    mp2025: { url: "mapbox://YOUR_USERNAME.master-plan-2025", sourceLayer: "master_plan_2025_land_use_styled" },
    change: { url: "mapbox://YOUR_USERNAME.singapore-500m-change-grid", sourceLayer: "singapore_500m_change_grid" }
  },
  localData: {
    mp2003: "data/master_plan_2003_land_use_styled.geojson",
    mp2014: "data/master_plan_2014_land_use_styled.geojson",
    mp2025: "data/master_plan_2025_land_use_styled.geojson",
    change: "data/singapore_500m_change_grid.geojson"
  },
  chapters: [
    {
      id: "intro",
      title: "Singapore's evolving urban structure",
      description: "Singapore's street environments do not change in isolation. This story first traces shifts in planned land use across the whole island, then identifies 500 m cells where land-use mix and walkable destination share changed most. Historical Street View is used only after this quantitative screening, to examine how selected street edges changed on the ground.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2003"]
    },
    {
      id: "plan-2003",
      title: "2003: the baseline plan",
      description: "Land parcels are regrouped into six comparable functions. Water bodies, reserve sites, cemeteries and special uses remain visible as context but are excluded from the two change metrics.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2003"]
    },
    {
      id: "plan-2014",
      title: "2014: an intermediate snapshot",
      description: "The 2014 plan reveals where new centres, housing areas, institutions and recreation land were introduced or consolidated between the endpoints.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2014"]
    },
    {
      id: "plan-2025",
      title: "2025: the latest gazetted plan",
      description: "The 2025 endpoint extends the chronology to the latest gazetted Master Plan. All three plans use the same six analytical groups so that parcel changes can be translated into comparable cell-level measures.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2025"]
    },
    {
      id: "mix-change",
      title: "Where did land-use mix change?",
      description: "<strong>Δ mix</strong> is the 2025 normalized Shannon mix index minus its 2003 value. Positive values indicate a more even mixture among six functions; negative values indicate greater concentration. The dataset also retains 2003–2014 and 2014–2025 changes for period-specific interpretation.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mix-change"]
    },
    {
      id: "destination-change",
      title: "Where did destination share change?",
      description: "<strong>Δ destination</strong> is the change, in percentage points, in the share of commercial/mixed-use, institutional/community, and park/recreation land. It is a planning proxy for the presence of potential walkable destinations—not a direct measure of observed walking.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["destination-change"]
    },
    {
      id: "concentrated-change",
      title: "Change Concentrated",
      description: "The two 2003–2025 absolute changes are normalized by their islandwide 95th percentiles and averaged. The top 5% of valid cells—134 of 2,669—form the screening layer for qualitative cases. This identifies magnitude, while colour retains direction.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["change-concentrated", "svi-points"]
    },
    {
      id: "punggol",
      title: "Punggol: new-town street edge",
      description: "Selected cell r055c066 remains Change Concentrated: 2003–2025 Δ mix +0.234 and Δ destination +44.0 percentage points. The 2011 view shows a new road within an open construction landscape. By 2015, housing defines the western edge, while planting remains young. In 2025, mature trees and a continuous footway improve shade and enclosure, although the opposite edge remains open and the corridor stays road-dominated.",
      images: ["images/punggol_2011.png", "images/punggol_2015.png", "images/punggol_2025.png"],
      captions: ["Apr 2011", "Jun 2015", "Mar 2025"],
      gridId: "r055c066",
      location: { center: [103.9017668, 1.4083570], zoom: 16.2, bearing: 39, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "bidadari",
      title: "Bidadari: arterial frontage",
      description: "Selected cell r040c059 remains Change Concentrated: 2003–2025 Δ mix +0.334 and Δ destination +24.9 percentage points. The 2008 and 2015 views both retain an open green frontage, placing the visible redevelopment mainly after 2015. By 2024, housing and community-scale development create a denser edge, but the multi-lane arterial and railings continue to separate pedestrians from the new destinations.",
      images: ["images/bidadari_2008.png", "images/bidadari_2015.png", "images/bidadari_2024.png"],
      captions: ["Nov 2008", "Feb 2015", "Mar 2024"],
      gridId: "r040c059",
      location: { center: [103.8706343, 1.3392733], zoom: 16.2, bearing: 90, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "jurong",
      title: "Jurong Gateway: regional centre",
      description: "Selected cell r039c031 remains Change Concentrated: 2003–2025 Δ mix +0.412 and Δ destination +23.5 percentage points. The 2009 construction site becomes Big Box by 2015, marking the main shift from vacant frontage to a destination. By 2025, the building is Perennial Business City and planting is more mature, while the wide carriageway and railings still constrain direct pedestrian access.",
      images: ["images/jurong_2009.png", "images/jurong_2015.png", "images/jurong_2025.png"],
      captions: ["Feb 2009", "Aug 2015", "Mar 2025"],
      gridId: "r039c031",
      location: { center: [103.7439291, 1.3330840], zoom: 16.2, bearing: 126, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "conclusion",
      title: "What the comparison can—and cannot—show",
      description: "The plan-based metrics locate structural change; Street View then reveals changes in frontage, enclosure, greenery, crossings and pedestrian space. The images do not prove that the Master Plan caused these changes, nor do planned land uses measure realised activity. Together, the two scales generate targeted questions for closer field investigation.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["change-concentrated", "svi-points"]
    }
  ]
};
