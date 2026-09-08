const storyConfig = {
  style: "mapbox://styles/zh-sssss/cmtr7klti00hl01r2bd934avw",
  accessToken: ["pk", ".", "eyJ1Ijoiemgtc3Nzc3MiLCJhIjoiY210bXRkZjdjMDRvazJ3cHB3aTg3MG8zaSJ9", ".", "Ugva5BLHUL80IT7eg47_Xg"].join(""),
  title: "Evolving Land Use, Evolving Streets",
  subtitle: "How Singapore's planned land use evolved from 2003 to 2025",
  byline: "Zhiheng Shu · DEP5118 ITA2",
  tilesets: {
    mp2003: { url: "mapbox://zh-sssss.z858aaf84mol", sourceLayer: "0e2446038bc1b16af70b" },
    mp2014: { url: "mapbox://zh-sssss.1vwebjtx1xh6", sourceLayer: "1d689d9903ecfe113095" },
    mp2025: { url: "mapbox://zh-sssss.nzngi1nzplwg", sourceLayer: "f61d3665bfa85de9087d" },
    change: { url: "mapbox://zh-sssss.7yqg23nbkceh", sourceLayer: "37f9837122a76da6a7b3" }
  },
  localData: {
    mp2003: "data/master_plan_2003_land_use_styled.geojson?v=20260907-2",
    mp2014: "data/master_plan_2014_land_use_styled.geojson?v=20260907-2",
    mp2025: "data/master_plan_2025_land_use_styled.geojson?v=20260907-2",
    change: "data/singapore_500m_change_grid.geojson?v=20260907-2"
  },
  chapters: [
    {
      id: "intro",
      title: "Plans and Street-Level Change",
      description: "This story maps Singapore’s planned land-use changes and visible street-level changes in parallel to examine how city-scale planning transitions correspond with the evolution of selected everyday street environments. A 500 m grid identifies where plan-to-plan category changes were concentrated and guides the selection of three street-level cases. Historical Google Street View images are then compared independently to describe visible changes in street environments. The map and images are read alongside each other: Street View does not measure land-use change or prove that planning decisions caused the observed streetscape changes.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: []
    },
    {
      id: "plan-2003",
      title: "Master Plan 2003",
      description: "Master Plan 2003 planned new housing—often near MRT and LRT stations—while incorporating the Parks and Waterbodies Plan and Identity Plan. Compared with the later plans, its distinctive emphasis was combining growth with access to landscape and the retention of familiar places.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2003"]
    },
    {
      id: "plan-2014",
      title: "Master Plan 2014",
      description: "Master Plan 2014 focused on building a green, connected and community-centred city. It coordinated new housing and amenities with stronger transport links, integrated greenery into towns and expanded regional employment centres so that more jobs could be located closer to homes. Compared with 2003, its distinctive emphasis was accommodating population and economic growth through decentralisation and integrated infrastructure.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2014"]
    },
    {
      id: "plan-2025",
      title: "Master Plan 2025",
      description: "Master Plan 2025 shifts attention towards adaptation: inclusive neighbourhoods for ageing and diverse needs, flexible mixed-use employment areas, climate and coastal resilience, and stewardship of nature and heritage. Compared with the earlier plans, resilience and the co-location of uses are explicit organising themes, alongside walking, cycling and bringing daily needs closer to homes.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["mp-2025"]
    },
    {
      id: "land-use-change-03-14",
      title: "Where did planned land use evolve?",
      description: "<span class='metric-equation'><span><i>LandUseChange</i><sub>t1→t2</sub>(%) =</span><span class='equation-fraction'><span><i>A</i>(<i>LU</i><sub>t1</sub> ≠ <i>LU</i><sub>t2</sub>)</span><span><i>A</i>(<i>C</i><sub>t1</sub> ∩ <i>C</i><sub>t2</sub>)</span></span><span>× 100</span></span><span class='equation-key'><i>A</i> = area; <i>LU</i><sub>t</sub> = analytical land-use group at time <i>t</i>; <i>C</i><sub>t</sub> = area covered by a mapped category at time <i>t</i>.</span>The formula is calculated within each 500 m cell for 2003–2014, 2014–2025 and 2003–2025. Thus, 40% means that four-tenths of the comparable area changed category. <strong>Temporal note:</strong> plan editions are statutory snapshots rather than construction dates, and implementation may follow later.",
      companion: {
        title: "Land-use change, 2003–2014",
        description: "<span class='analysis-points'><span>High-change cells cluster around Punggol–Seletar, the Tengah–Jurong belt, Changi East and the southern port edge.</span><span>Compared with 2014–2025, change is more pronounced in the north-east; reserve-to-employment and reserve-to-residential shifts are especially common.</span></span>"
      },
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["land-use-change-03-14"]
    },
    {
      id: "land-use-change-14-25",
      title: "Land-use change, 2014–2025",
      description: "<span class='analysis-points'><span>High-change cells concentrate along the western and northern development belt—Tengah–Jurong, Sungei Kadut and Lim Chu Kang—and around the Paya Lebar Air Base and Changi areas.</span><span>Compared with 2003–2014, the emphasis shifts away from Punggol–Seletar towards western and northern redevelopment; reserve-to-residential change becomes more prominent.</span></span>",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["land-use-change-14-25"]
    },
    {
      id: "land-use-change-03-25",
      title: "Land-use change, 2003–2025",
      description: "<span class='analysis-points'><span>Across the full period, persistent clusters appear in the western growth belt, Punggol–Seletar, the eastern planning fringe and the southern waterfront.</span><span>Most land-use changes involve reserve, employment, residential or park categories. The 2003–2025 result is used to select the Change Concentrated cells.</span></span>",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["land-use-change-03-25"]
    },
    {
      id: "concentrated-change",
      title: "Change Concentrated",
      description: "The top 15% of valid cells by 2003–2025 land-use change form the screening layer for qualitative cases. Selection depends only on the share of land that changed category. The transition fields then show what changed into what.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["change-concentrated", "svi-points"]
    },
    {
      id: "punggol",
      title: "Punggol: new-town street edge",
      description: "In this selected cell, <strong>70.7%</strong> of comparable land changed category from 2003 to 2025; the largest transition was Residential → Commercial and mixed use.<br><strong>By interval:</strong> 70.8% (2003–2014) → 1.4% (2014–2025). The 2011 view shows a new road within an open construction landscape. By 2015, housing defines the western edge, while planting remains young. In 2025, mature trees and a continuous footway improve shade and enclosure, although the opposite edge remains open and the corridor stays road-dominated.",
      images: ["images/punggol_2011.png", "images/punggol_2015.png", "images/punggol_2025.png"],
      captions: ["Apr 2011", "Jun 2015", "Mar 2025"],
      gridId: "r055c066",
      location: { center: [103.9017668, 1.4083570], zoom: 16.2, bearing: 39, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "bidadari",
      title: "Bidadari: arterial frontage",
      description: "In this cell, <strong>53.4%</strong> of comparable land changed category from 2003 to 2025; the largest transition was Residential → Transport and infrastructure.<br><strong>By interval:</strong> 52.2% (2003–2014) → 5.0% (2014–2025). The 2008 and 2015 views both retain an open green frontage, placing the visible redevelopment mainly after 2015. By 2024, housing and community-scale development create a denser edge, but the continuous walls then separate the street from the new development.",
      images: ["images/bidadari_2008.png", "images/bidadari_2015.png", "images/bidadari_2024.png"],
      captions: ["Nov 2008", "Feb 2015", "Mar 2024"],
      gridId: "r040c059",
      location: { center: [103.8706343, 1.3392733], zoom: 16.2, bearing: 90, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "jurong",
      title: "Jurong Gateway: regional centre",
      description: "In selected cell r039c031, <strong>41.6%</strong> of comparable land changed category from 2003 to 2025; the largest transition was Reserve site → Institutional and community.<br><strong>By interval:</strong> 27.3% (2003–2014) → 16.2% (2014–2025). The 2009 construction site becomes Big Box by 2015, marking the main visible shift from vacant frontage to an active building edge. By 2025, the building is Perennial Business City and planting is more mature.",
      images: ["images/jurong_2009.png", "images/jurong_2015.png", "images/jurong_2025.png"],
      captions: ["Feb 2009", "Aug 2015", "Mar 2025"],
      gridId: "r039c031",
      location: { center: [103.7439291, 1.3330840], zoom: 16.2, bearing: 126, pitch: 35 },
      visibleLayers: ["change-concentrated-outline", "svi-points"]
    },
    {
      id: "conclusion",
      title: "What the comparison can—and cannot—show",
      description: "The plan comparison locates and identifies categorical land-use transitions; Street View then reveals changes in frontage, enclosure, greenery, crossings and pedestrian space. The images do not prove that the Master Plan caused these changes, but the comparison between plans and images can show transitions already realised, still under construction or not yet visible.",
      location: { center: [103.8198, 1.3521], zoom: 10.8, bearing: 0, pitch: 0 },
      visibleLayers: ["change-concentrated", "svi-points"]
    }
  ]
};
