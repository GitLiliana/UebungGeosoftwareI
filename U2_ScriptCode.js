// Uebung 2 - Geosoftware I
// Script to deal with GeoJSON

// Given polygon:
var Polygon = [[7.603933811187744,51.95971147614647],[7.61200189590454,51.95971147614647],[7.61200189590454,51.967644303302706],[7.603933811187744,51.967644303302706],[7.603933811187744,51.95971147614647]];


/**
 * Function to publish the results of the intersection between the given polygon and the submitted route
 * on the webpage.
 */
function publishForSubmission () {
    let newList = calculateDistancesFromGeoJSONString();  //calculate distances
    let newDistanceSum = sumArray(newList);               //calculate sum of distances
    document.getElementById("NewListDistances").innerHTML = newList;         //publish distances
    document.getElementById("NewSumDistances").innerHTML = newDistanceSum;   //publish sum
    document.getElementById("GeoJSONPolygon").innerHTML = GeoJSONStringPolygon;
}

/**
 * Function to calculate the distances resulting from the intersection between the given polygon and
 * the submitted route.
 * @return {Array} List of distances
 */
function calculateDistancesFromGeoJSONString () {
    let GeoJSONString = document.getElementById("GeoJSON_Route").value;  //getting the submitted string
    let GeoJSON = JSON.parse(GeoJSONString);                             //parsing from string to GeoJSON object
    let Coordinates = GeoJSON.features[0].geometry.coordinates;          //getting coordinates from GeoJSON
    let newList = routeCutByPolygon (Coordinates, Polygon);              //calculate distances with funtion from U1
    return newList
}



// Create classes for GeoJSON objects:

/**
 * Class to model feature collections for GeoJSON objects
 * @class
 */
class GeoJSONfeatureCollection {
    /**
     * 
     * @param {string} type - always "FeatureCollection"
     * @param {array} features - collection of features
     */
    constructor (features) {
        this.type = "FeatureCollection";
        this.features = features;
    }
}

/**
 * Class to model a feature for GeoJSON objects
 * @class
 */
class GeoJSONfeature {
    /**
     * 
     * @param {string} type  - always "Feature"
     * @param {object} properties 
     * @param {object} geometry 
     */
    constructor (properties, geometry) {
        this.type = "Feature";
        this.properties = properties;
        this.geometry = geometry;
    }
}

/**
 * Class to model the geometry for GeoJSON objects
 * @class
 */
class GeoJSONgeometry {
    /**
     * 
     * @param {string} type - type of the geometry (point, linestring, etc.)
     * @param {array} coordinates - coordinates (longitude, latitude)
     */
    constructor (type, coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }
}

//Create GeoJSON object for the given polygon:
const geometryPolygon = new GeoJSONgeometry("LineString", Polygon);
const featurePolygon = new GeoJSONfeature ( {} , geometryPolygon);
const featureCollectionPolygon = new GeoJSONfeatureCollection([featurePolygon]);

//Change GeoJSON object of the given polygon to string
var GeoJSONStringPolygon = JSON.stringify(featureCollectionPolygon);