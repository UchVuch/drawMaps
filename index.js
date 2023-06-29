
// add points
// add poligon

// первое задание
const  map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 15
})    

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

L.polygon([ 
    [51.509, -0.08],
    [51.512, -0.08],
    [51.503, -0.06],
]).addTo(map)    

L.rectangle([ 
    [51.489, -0.08],
    [51.499, -0.06],
]).addTo(map)    

  L.marker([51.505, -0.09]).addTo(map).bindPopup('tooltip').openPopup()

const justPopup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map)

// второе задание
async function initFirstMap() {

    const  mapFirst = L.map('map-first', {
        center: [52.29,38.96],
        zoom: 10
    })   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapFirst)
    const getPoints = async () => {
        const res = await fetch('zadonskoe-lesnicestvo.json')
        const data = await res.json()
        return data.features
    }
    
    const myPoints = await getPoints()
    const pointStyle = {
        radius: 8,
        fillColor: "#3388ff",
        color: "#0044cc",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
    
    const onEachFeature = (feature, point)  => {
        if (feature.properties && feature.properties.name && feature.properties.poly_id) {
            point.on({
                'popupopen': () => point.setStyle({fillColor:"#0044cc"})
            })
            point.on({
                'popupclose': () => point.setStyle({fillColor:"#3388ff"})
            })
            point.bindPopup(`${feature.properties.name} - ${feature.properties.poly_id}`)
        }
    }

    L.geoJSON(myPoints, {
        style: pointStyle,
        onEachFeature: onEachFeature
    }).addTo(mapFirst)

    // or this
    // myPoints.forEach(point => {
    //     L.geoJSON(point)
    //     .addTo(mapFirst)
    //     .bindPopup(`${point.properties.name}`)
    // })
 
}
initFirstMap()
