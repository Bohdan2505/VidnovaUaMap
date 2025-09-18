const fullscreenContainer = document.getElementById('fullscreen-container');
const fullscreenImage = document.getElementById('fullscreen-image');
const closeButton = document.getElementById('close-btn');


function view_fullscreen(src) {
    fullscreenImage.src = src;
    fullscreenContainer.style.display = 'block';
};


// Close fullscreen when close button is clicked
closeButton.addEventListener('click', () => {
    fullscreenContainer.style.display = 'none';
});

// Optional: Close fullscreen when clicked outside the image
fullscreenContainer.addEventListener('click', (event) => {
    if (event.target === fullscreenContainer) {
        fullscreenContainer.style.display = 'none';
    }
});


function parseDate(ukrDate) {
  const [day, month, year] = ukrDate.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function formatUkrainianDateRange(startStr, endStr, insert_enter_bool) {
  const monthNames = [
    "січня", "лютого", "березня", "квітня", "травня", "червня",
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
  ];

  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);

  const year = startDate.getFullYear(); // передбачається, що обидві дати одного року
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  let rangeText;

  if (startMonth === endMonth) {
    // Наприклад: 23–28\nсерпня
    if (insert_enter_bool == true) {
    rangeText = `<strong style="font-size:1.2em">${startDay}–${endDay}</strong> <br> <span>${monthNames[startMonth]}</span>`;}
    else {
      rangeText = `<strong style="font-size:1.2em">${startDay}–${endDay}</strong> <span>${monthNames[startMonth]}</span>`;}
      
    }
  
  else {
    // Наприклад: 28 серпня – 1 вересня
    
     if (insert_enter_bool == true) {
    rangeText = `<strong style="font-size:1.2em">${startDay}</strong> <span>${monthNames[startMonth]}</span> – <br><strong style="font-size:1.2em">${endDay}</strong> <span>${monthNames[endMonth]}</span>`;}
    else {
      rangeText = `<strong style="font-size:1.2em">${startDay}</strong> <span>${monthNames[startMonth]}</span> – <strong style="font-size:1.2em">${endDay}</strong> <span>${monthNames[endMonth]}</span>`;}
    
  }

  // console.log(startStr, endStr, startDate, endDate, year,  rangeText)
  
  
  return {
    year,
    rangeText
  };
}


function check_string_not_empty(string) {
  if (string == undefined) {return false}
  else if (string != undefined & string.trim() != '' & string.trim() != null) {return true}
}


function openInfoWindowMobile(feature) {
  
  if (window.matchMedia('(min-width: 769px)').matches) {
    // Екран ширший або рівний 768px
    // console.log('Ширина вікна ≥ 768px');

    
    const result = formatUkrainianDateRange(feature.properties.Begin_date, feature.properties.End_date, false);
 let year = result.year;
 let data_range = result.rangeText;
    
    let info_window_html = `
  <div class="page-wrapper desktop-layout">
  <div class="top-header">
          <div class="header">

              <img src="images/logo.png" alt="ВідНОВА:UA" class="logo" />
              <div class="year-group">
                <div class="year"><span>${year}</span></div>
                <div class="dates-small"><span>${data_range}</span></div>

            </div>
          </div>
        </div>
    <div class="content-row">
      <!-- Ліва колонка -->
      <div class="left-column">
        

        <div class="container">
          <section class="location-dates">
           <img src="images/icon-location.png" alt="Локація" class="icon-img" /> 
            <div class="location">
            
              <span  class="location-settlement">${feature.properties.Settlement.trim()},</span><br/>
              <div class="region">${feature.properties.Region.trim()} область</div>
            </div>
          </section>
`


if (check_string_not_empty(feature.properties.Partner_Name)) {
  if (check_string_not_empty(feature.properties.Partner_link)) {
         info_window_html += `<section class="organizer">
         <div class="organizer_content">
           <a href="${feature.properties.Partner_link}" target="_blank"><img src="images/icon-group.png" alt="Організатор" class="icon-img" style="max-width: 2.5em;" /></a>
            <div>
        <a href="${feature.properties.Partner_link}" target="_blank">${feature.properties.Partner_Name}<br />
        організовували обмін</a>
      </div>
      </div>
    </section>`
   }
  else {
    
    info_window_html += `<section class="organizer">
      <img src="images/icon-group.png" alt="Організатор" class="icon-img" />
      <div>
        ${feature.properties.Partner_Name}<br />
        організовували обмін</a>
      </div>
    </section>`
  }
}

if (check_string_not_empty(feature.properties.Official_site) == true || check_string_not_empty(feature.properties.Instagram) == true || check_string_not_empty(feature.properties.Facebook) == true) {
  
  info_window_html +=  `

          <section class="info-block">
            <section class="links">
              <span style="font-size:1.8em">Дізнатися більше про обмін:</span>
              <div class="social-links">`
              
     if (check_string_not_empty(feature.properties.Official_site) == true) {
      
      info_window_html += `<a href="${feature.properties.Official_site}" target="_blank" class="link">
          <img src="images/icon-site.png" alt="Site" />
          <span>на сайті</span>
        </a>`
    }
    
    
    if (check_string_not_empty(feature.properties.Instagram) == true) {
      
      info_window_html += `<a href="${feature.properties.Instagram}" target="_blank" class="link">
          <img src="images/icon-instagram.png" alt="Instagram" />
          <span>в Instagram</span>
        </a>`
    }
    
    if (check_string_not_empty(feature.properties.Facebook) == true) {
      
      info_window_html += `<a href="${feature.properties.Facebook}" target="_blank" class="link">
          <img src="images/icon-facebook.png" alt="Facebook" />
          <span>у Facebook</span>
        </a>`
    }
    
    info_window_html += `</div>
            </section>
          </section>`
    
    
}
              
      info_window_html += `  </div>
      </div>`
      
      
    info_window_html += ` 
      <!-- Права колонка -->
      <div class="right-column">
      `
      
      if (check_string_not_empty(feature.properties.Link_photo_4_width)) {
    
  info_window_html += `<section class="main-photo">
      <img src="${feature.properties.Link_photo_4_width}" alt="Групове фото" onclick="view_fullscreen('${feature.properties.Link_photo_4_width}')" />
    </section>`
}


        if (check_string_not_empty(feature.properties.Link_photo_1) == true || check_string_not_empty(feature.properties.Link_photo_2) == true || check_string_not_empty(feature.properties.Link_photo_3) == true) {
  
  info_window_html += `<section class="gallery">`
  
  if (check_string_not_empty(feature.properties.Link_photo_1) == true) {
      
      info_window_html += `<img src="${feature.properties.Link_photo_1}" alt="Фотографія 1" onclick="view_fullscreen('${feature.properties.Link_photo_1}')" />`
    }
      
       if (check_string_not_empty(feature.properties.Link_photo_2) == true) {
      
      info_window_html += `<img src="${feature.properties.Link_photo_2}" alt="Фотографія 2" onclick="view_fullscreen('${feature.properties.Link_photo_2}')" />`
    }
    
     if (check_string_not_empty(feature.properties.Link_photo_2) == true) {
      
      info_window_html += `<img src="${feature.properties.Link_photo_3}" alt="Фотографія 3" onclick="view_fullscreen('${feature.properties.Link_photo_3}')" />`
    }
  
    info_window_html += `</section>`
  
}


  if (check_string_not_empty(feature.properties.Google_drive_link) == true) {
      
      info_window_html += ` <footer class="footer">
      <a href="${feature.properties.Google_drive_link}" target="_blank">
        переглянути фото з обміну
      </a>
    </footer>`
    }
    
info_window_html += `
      </div>
    </div>
  </div>
`
    

  

    return info_window_html
    
} else {

  
//   ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
//   ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
//   ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
//   ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
//   ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
//   ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    const result = formatUkrainianDateRange(feature.properties.Begin_date, feature.properties.End_date, true);
 let year = result.year;
 let data_range = result.rangeText;
    
    let info_window_html = `<div class="page-wrapper">
  <div class="top-header">
    <div class="header">
      <img src="images/logo.png" alt="ВідНОВА:UA" class="logo" />
      <div class="year">${year}</div>
    </div>
  </div>


  <div class="container">

    <section class="location-dates">
    <img src="images/icon-location.png" alt="Локація" class="icon-img" /> 
      <div class="location">
        <div class="region">
        <span class="location-settlement"> ${feature.properties.Settlement.trim()},</span><br>
        ${feature.properties.Region.trim()} область</div>
      </div>
      <div style="border-left:0.1em solid #000;height:2.5em"></div>

      <div class="dates">
        ${data_range}
      </div>
    </section>`

if (check_string_not_empty(feature.properties.Link_photo_4_width)) {
    
  info_window_html += `<section class="main-photo">
      <img src="${feature.properties.Link_photo_4_width}" alt="Групове фото" onclick="view_fullscreen('${feature.properties.Link_photo_4_width}')" />
    </section>`
}

if (check_string_not_empty(feature.properties.Partner_Name)) {
  if (check_string_not_empty(feature.properties.Partner_link)) {
     info_window_html += `<section class="organizer">
      <a href="${feature.properties.Partner_link}" target="_blank"><img src="images/icon-group.png" alt="Організатор" class="icon-img" /></a>
      <div>
        <a href="${feature.properties.Partner_link}" target="_blank">${feature.properties.Partner_Name}<br />
        організовували обмін</a>
      </div>
    </section>`
    
  }
  else {
    
    info_window_html += `<section class="organizer">
      <img src="images/icon-group.png" alt="Організатор" class="icon-img" />
      <div>
        ${feature.properties.Partner_Name}<br />
        організовували обмін</a>
      </div>
    </section>`
  }
 
  
}

if (check_string_not_empty(feature.properties.Official_site) == true || check_string_not_empty(feature.properties.Instagram) == true || check_string_not_empty(feature.properties.Facebook) == true) {
  
   info_window_html +=  `<section class="links">
       <h3>Дізнатися більше про обмін:</h3>
    <div class="social-links">`
    
    if (check_string_not_empty(feature.properties.Official_site) == true) {
      
      info_window_html += `<a href="${feature.properties.Official_site}" target="_blank" class="link">
          <img src="images/icon-site.png" alt="Site" />
          <span>на сайті</span>
        </a>`
    }
    
    if (check_string_not_empty(feature.properties.Instagram) == true) {
      
      info_window_html += `<a href="${feature.properties.Instagram}" target="_blank" class="link">
          <img src="images/icon-instagram.png" alt="Instagram" />
          <span>в Instagram</span>
        </a>`
    }
    
    if (check_string_not_empty(feature.properties.Facebook) == true) {
      
      info_window_html += `<a href="${feature.properties.Facebook}" target="_blank" class="link">
          <img src="images/icon-facebook.png" alt="Facebook" />
          <span>у Facebook</span>
        </a>`
    }
    
    info_window_html += `</div>`
    
    if (check_string_not_empty(feature.properties.Link_photo_3) == true) {
      
      info_window_html += `<div class="link-photo">
        <img src="${feature.properties.Link_photo_3}" alt="Фото учасників" onclick="view_fullscreen('${feature.properties.Link_photo_3}')" />
      </div>`
    }
      
    info_window_html += `</section>`
  
}

  
if (check_string_not_empty(feature.properties.Link_photo_1) == true || check_string_not_empty(feature.properties.Link_photo_2) == true) {
  
  info_window_html += `<section class="gallery">`
  
  if (check_string_not_empty(feature.properties.Link_photo_1) == true) {
      
      info_window_html += `<img src="${feature.properties.Link_photo_1}" alt="Фотографія 1" onclick="view_fullscreen('${feature.properties.Link_photo_1}')" />`
    }
      
       if (check_string_not_empty(feature.properties.Link_photo_2) == true) {
      
      info_window_html += `<img src="${feature.properties.Link_photo_2}" alt="Фотографія 2" onclick="view_fullscreen('${feature.properties.Link_photo_2}')" />`
    }
  
    info_window_html += `</section>`
  
}
    
        
        
        if (check_string_not_empty(feature.properties.Google_drive_link) == true) {
      
      info_window_html += ` <footer class="footer">
      <a href="${feature.properties.Google_drive_link}" target="_blank">
        переглянути фото з обміну
      </a>
    </footer>`
    }
      
 info_window_html += `</div></div>`
    

   

    return info_window_html
}
}
        

        function loadData() {
  return fetch('https://opensheet.elk.sh/1lSSiGHKqHZd_uo-Y37kmIDcL5kBoK5rwXWMa_DZGoFY/1')
    .then(response => response.json())
    .catch(error => console.error('Помилка завантаження:', error));
}
        

function convertToGeoJSON(data) {
  const geojson = {
    type: "FeatureCollection",
    features: data.map(item => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [parseFloat(item.Longitude), parseFloat(item.Latitude)]
      },
      properties: { ...item }
    }))
  };

  // Видаляємо координати з властивостей (вони вже в геометрії)
  geojson.features.forEach(feature => {
    delete feature.properties.Longitude;
    delete feature.properties.Latitude;
  });

  return geojson;
}


        


function create_info_window_for_feature(feature) {
 return   `<div class="popup">
                                    <h1>${feature.properties.Tittle}</h1>
                                    <div class="photo-grid">
                                        <img src="${feature.properties.Link_photo_1}" alt="Photo 1" class="large thumbnail" onclick="view_fullscreen('${feature.properties.Link_photo_1}')">
                                        <img src="${feature.properties.Link_photo_2}" alt="Photo 2" class="thumbnail" onclick="view_fullscreen('${feature.properties.Link_photo_2}')">
                                        <img src="${feature.properties.Link_photo_3}" alt="Photo 3" class="thumbnail" onclick="view_fullscreen('${feature.properties.Link_photo_3}')">
                                    </div>
                                    <hr>
                                    <h3>Дізнатися більше:</h3>
                                    <ul class="links">
                                        <li><a href="${feature.properties.Official_site}"  target="_blank"><img src="https://res2.weblium.site/res/644e49cc8417f2000df16812/644e4a347d4cd2000d1ab1ef_optimized_437.webp" alt="Official Site Logo" width="24" height="24">На офіційному сайті</a></li>
                                        <li><a href="${feature.properties.Instagram}"  target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" width="24" height="24">Instagram</a></li>
                                        <li><a href="${feature.properties.Facebook}"  target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" width="24" height="24">Facebook</a></li>
                                        <li>Партнер обміну -<a href="${feature.properties.Partner_link}"  target="_blank">${feature.properties.Partner_Name}</a></li>
                                    </ul>
                                    <hr>

                                    <h4>Обмін відбувався: ${feature.properties.Begin_date} - ${feature.properties.End_date}</h4>
                                </div>`}

loadData().then(myData => {
  if (myData) {



    var map = L.map('map').setView([49, 32], 7);

        map.attributionControl.addAttribution('<a href="https://www.instagram.com/ukrainian.renaissance_ngo" target="_blank"> ГО "Українське відродження" | </a> <a href="https://vidnova.org.ua/" target="_blank"> ВідНОВА:UA | </a> Основа карти: <a href="https://openstreetmap.org.ua/" target="_blank"> OpenStreetMap Україна | </a> <a href="https://www.openstreetmap.org/copyright" target="_blank"> &copy; OpenStreetMap contributors</a>');

    L.tileLayer('https://tile.openstreetmap.org.ua/styles/osm-bright/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);


    data_geojson = convertToGeoJSON(myData);
    
    
function splitGeoJSONByYear(inputGeoJSON, dateField) {
    const featuresByYear = {};

    inputGeoJSON.features.forEach(feature => {
        if (!feature.properties || !feature.properties[dateField]) {
            return; // Пропускаємо об'єкти без дати
        }
        
        const dateParts = feature.properties[dateField].split(".");
        if (dateParts.length !== 3) {
            return; // Пропускаємо некоректні дати
        }
        
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);
        
        const dateValue = new Date(year, month, day);
        if (isNaN(dateValue)) {
            return; // Пропускаємо некоректні дати
        }
        
        if (!featuresByYear[year]) {
            featuresByYear[year] = {
                type: "FeatureCollection",
                features: []
            };
        }
        
        featuresByYear[year].features.push(feature);
    });

    return featuresByYear;
}


function parseGeoJSONToMarkers(geojson, targetArray, year) {
options = {}
 if (year_markers_style[year] != undefined || year_markers_style[year].length != 0) {
  options = year_markers_style[year];
 }

  return L.geoJSON(geojson, {
    pointToLayer: function (feature, latlng) {
      const marker = L.circleMarker(latlng, options).on('click', function ()  {

      // Оновлення контенту модального вікна
      // document.getElementById('popup-content').innerHTML = create_info_window_for_feature(feature);
          document.getElementById('popup-content').innerHTML = openInfoWindowMobile(feature)
          

      // Показати модальне вікно
      console.log(document.getElementById('fullscreen-overlay'));
      document.getElementById('fullscreen-overlay').style.display = 'flex';
    });
     
      targetArray.push(marker);
    },
 
  }
  );
}


function addGeoJSONToMap(geoJSONByYear, map) {

    const layerControl = L.control.layers(null, null, { collapsed: false }).addTo(map);
    
    Object.keys(geoJSONByYear).forEach(year => {
    parseGeoJSONToMarkers(geoJSONByYear[year], marker_groups[year], year)
    

        layerControl.addOverlay(dummyLayers[year], `
        <span style="position: relative;  bottom: 0.05em;">  
    <span style="
    display:inline-block;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    background-color: ${year_markers_style[year]['fillColor']};
    border: 0.1em solid ${year_markers_style[year]['color']};
    border-radius: 1em;
    position: relative; 
    bottom: 0.02em;
  "></span>
  <span style="vertical-align: middle; font-size: 1.2em; position: relative;  top: 0.05em;">Обміни. ${year} рік</span>
  </span>
`);
        
        
    });

}


let year_markers_style = {
    "2022": {
    radius: 8,
    fillColor: "#ffeb52",
    color: "#fad200",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
},
    "2023" : {
    radius: 8,
    fillColor: "#ffc943",
    color: "#e8a302",
    weight: 2,
    opacity: 2,
    fillOpacity: 1
},
    "2024" : {
    radius: 8,
    fillColor: "#9aaeff",
    color: "#6061ff",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
},
    "2025" : {
    radius: 8,
    fillColor: "#5c4aff",
    color: "#312599",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
},
    "2026" : {},
    "2027" : {},
    "2028" : {},
    "2029" : {},
    "2030" : {},
}

let marker_groups = {
    "2022" : [],
    "2023" : [],
    "2024" : [],
    "2025" : [],
    "2026" : [],
    "2027" : [],
    "2028" : [],
    "2029" : [],
    "2030" : [],
}


let dummyLayers = {
    "2022" : L.layerGroup(),
    "2023" : L.layerGroup(),
    "2024" : L.layerGroup(),
    "2025" : L.layerGroup(),
    "2026" : L.layerGroup(),
    "2027" : L.layerGroup(),
    "2028" : L.layerGroup(),
    "2029" : L.layerGroup(),
    "2030" : L.layerGroup(),
}

const overlay = document.getElementById('fullscreen-overlay');
    const popup = document.getElementById('fullscreen-popup');
    const closeBtn = document.getElementById('close-fullscreen');
    const contentDiv = document.getElementById('popup-content');
    
// Закриття на ✖
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    // Закриття при кліку за межами вікна
    overlay.addEventListener('click', (e) => {
      if (!popup.contains(e.target)) {
        overlay.style.display = 'none';
      }
      });
 
 const markerCluster = L.markerClusterGroup().addTo(map);
 
  const result = splitGeoJSONByYear(data_geojson, "End_date");
addGeoJSONToMap(result, map);


map.on('overlayremove', function(e) {

for (x in marker_groups) {

        if (e.layer === dummyLayers[x]) {
        marker_groups[x].forEach(m => markerCluster.removeLayer(m));
        }
    }
});


map.on('overlayadd', function(e) {
 for (x in marker_groups) {

    if (e.layer === dummyLayers[x]) {
    console.log(x)
    marker_groups[x].forEach(m => markerCluster.addLayer(m));
  }
  }
});


for (x in marker_groups) {
    if (marker_groups[x] != undefined || marker_groups[x].length != 0) {
        dummyLayers[x].addTo(map);
    }
};


        // map.fitBounds(geojsonLayer.getBounds());


  }

});

 
