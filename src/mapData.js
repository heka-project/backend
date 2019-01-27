let nodeFetch = require("node-fetch");
const url = "https://55642723-d9fa-492a-94fc-74d42db61f9d.us10.cp.iot.sap/iot/core/api/v1/devices/27/measures";
const options = {
    method: "GET",
    body: null,
    headers: {
        "Authorization": process.env.SAP_TOKEN,
    }
}



const createMap = (ID, lat, long, quantity) => {
    let mapJson = {
        "type":"Feature",
        "geometry":{
            "type":"Point",
            "coordinates":[long,lat]
        },
        "properties":{
            "ID":ID,
            "quantity":quantity,
            
        }
    }
    return mapJson
}

const formatMapData = (data) =>{
    return `{
        "type":"FeatureCollection",
        "features":${JSON.stringify(data)}
    }`
    
}

const getData = () => nodeFetch(url, options).then(res => {
    return res.json();
}).then(json => {
    let data = [];
    let measure = json.map(x => { return x.measure });
    let id = measure.filter(x => { return Object.keys(x) == 'id' });
    let lat = measure.filter(x => { return Object.keys(x) == 'lat' });
    let long = measure.filter(x => { return Object.keys(x) == 'long' });
    let quantity = measure.filter(x => { return Object.keys(x) == 'quantity' });

    for (let i = 0; i < id.length; i++) {
        data.push(createMap(Object.values(id[i]).map(Number)[0],
            Object.values(lat[i]).toString(),
            Object.values(long[i]).toString(),
            Object.values(quantity[i]).map(Number)[0]));
    }
    return formatMapData(data)
})



module.exports ={
    createMap,getData,
}