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
      description: "Singapore's street environments do not change in isolation. This story first traces shifts in planned land use across the whole island, then identifies 500 m cells where the largest shares of land changed category. Historical Street View is used only after this quantitative screening to examine how selected street edges evolved on the ground.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2003"]
    },
    {
      id: "plan-2003",
      title: "2003: the baseline plan",
      description: "Land parcels are regrouped into nine comparable functions. Reserve sites, water bodies, cemeteries and special uses are retained so that their conversion to or from developed uses is counted rather than hidden.",
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
      description: "The 2025 endpoint extends the chronology to the latest gazetted Master Plan. All three plans use the same nine analytical groups so that changes at the same location can be compared directly.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2025"]
    },
    {
      id: "land-use-change",
      title: "Where did planned land use evolve?",
      description: "<strong>Land-use change</strong> is the percentage of comparable land in each 500 m cell assigned to a different category in 2025 than in 2003. Missing map coverage is not counted as change. The same calculation is retained for 2003–2014 and 2014–2025, together with each cell's dominant transition.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["land-use-change"]
    },
    {
      id: "concentrated-change",
      title: "Change Concentrated",
      description: "The top 15% of valid cells by 2003–2025 land-use change form the screening layer for qualitative cases. Selection depends only on the share of land that changed category; mix and destination scores are not used. The transition fields then show what changed into what.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["change-concentrated", "svi-points"]
    },
    {
      id: "punggol",
      title: "Punggol: new-town street edge",
      description: "In selected cell r055c066, <strong>70.7% of comparable land changed category</strong> from 2003 to 2025; the largest transition was Residential → Commercial and mixed use. The 2011 view shows a new road within an open construction landscape. By 2015, housing defines the western edge, while planting remains young. In 2025, mature trees and a continuous footway improve shade and enclosure, although the opposite edge remains open and the corridor stays road-dominated.",
      images: ["images/punggol_2011.png", "images/punggol_2015.png", "images/punggol_2025.png"],
      captions: ["Apr 2011", "Jun 2015", "Mar 2025"],
      gridId: "r055c066",
      location: { center: [103.9017668, 1.4083570], zoom: 16.2, bearing: 39, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "bidadari",
      title: "Bidadari: arterial frontage",
      description: "In selected cell r040c059, <strong>53.4% of comparable land changed category</strong> from 2003 to 2025; the largest transition was Residential → Transport and infrastructure. The 2008 and 2015 views both retain an open green frontage, placing the visible redevelopment mainly after 2015. By 2024, housing and community-scale development create a denser edge, but the multi-lane arterial and railings continue to separate pedestrians from the new development.",
      images: ["images/bidadari_2008.png", "images/bidadari_2015.png", "images/bidadari_2024.png"],
      captions: ["Nov 2008", "Feb 2015", "Mar 2024"],
      gridId: "r040c059",
      location: { center: [103.8706343, 1.3392733], zoom: 16.2, bearing: 90, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "jurong",
      title: "Jurong Gateway: regional centre",
      description: "In selected cell r039c031, <strong>41.6% of comparable land changed category</strong> from 2003 to 2025; the largest transition was Reserve site → Institutional and community. The 2009 construction site becomes Big Box by 2015, marking the main visible shift from vacant frontage to an active building edge. By 2025, the building is Perennial Business City and planting is more mature, while the wide carriageway and railings still constrain direct pedestrian access.",
      images: ["images/jurong_2009.png", "images/jurong_2015.png", "images/jurong_2025.png"],
      captions: ["Feb 2009", "Aug 2015", "Mar 2025"],
      gridId: "r039c031",
      location: { center: [103.7439291, 1.3330840], zoom: 16.2, bearing: 126, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "conclusion",
      title: "What the comparison can—and cannot—show",
      description: "The plan comparison locates and identifies categorical land-use transitions; Street View then reveals changes in frontage, enclosure, greenery, crossings and pedestrian space. The images do not prove that the Master Plan caused these changes, nor does a planned category describe realised activity. Together, the two scales generate targeted questions for closer field investigation.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["change-concentrated", "svi-points"]
    }
  ]
};
