var mbtoken = "pk.eyJ1Ijoiam9uYXRoYW53YWduZXIiLCJhIjoiZ1V5YVNwUSJ9.Rh9CMNgUd8odMnnwNFHZfg";
var smLayers = {};

smLayers["osm"] = [
    {
        copyright: '©OpenStreeMap',
        stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.jjch84hj/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
        label: 'Mapnik',
        id: "osm_mapnik"
    },
    {
        copyright: '©OpenCycleMap.org ©OpenStreetMap',
        stack: ["//a.tile.thunderforest.com/cycle/{Z}/{X}/{Y}.png",
               "//b.tile.thunderforest.com/cycle/{Z}/{X}/{Y}.png",
               "//c.tile.thunderforest.com/cycle/{Z}/{X}/{Y}.png"],
        label: 'Cycle',
        id: 'osm_cycle'
    }
];

smLayers["mb"] = [
     {
         copyright: '©MapBox ©OpenStreeMap',
         stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.e47c82ad/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
         label: 'Outdoors',
         id: "mb_outdoors"
     },
      {
          copyright: '©MapBox ©OpenStreeMap',
          stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.94589772/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
          label: 'Afternoon',
          id: "mb_afternoon"
      },
      {
          copyright: '©MapBox ©OpenStreeMap',
          stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.de243904/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
          label: 'Comic',
          id: "mb_comic"
      },
      {
          copyright: '©MapBox ©OpenStreeMap',
          stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.e94d63ef/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
          label: 'Light',
          id: "mb_light"
      },
      {
          copyright: '©MapBox ©OpenStreeMap',
          stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.41e8c602/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
          label: 'Contrast',
          id: "mb_contrast"
      },
      {
          copyright: '©MapBox ©OpenStreeMap',
          stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.3e337db7/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
          label: 'Pencil',
          id: "mb_pencil"
      },
      {
          copyright: '©MapBox ©OpenStreeMap',
          stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.fcb78071/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
          label: 'Leaf',
          id: "mb_leaf"
      },
      {
          copyright: '©MapBox ©OpenStreeMap',
          stack: ["//api.tiles.mapbox.com/v4/jonathanwagner.89b22604/{Z}/{X}/{Y}.png?access_token=" + mbtoken],
          label: 'Pirate',
          id: "mb_pirate"
      }


]


smLayers["esri"] = [
    {
        copyright: '©ESRI - Map Data',
        stack: [
           "//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/[Z]/[Y]/[X]"],
        label: 'Satellite',
        id: "esri_satellite"
    },
    {
        copyright: '©ESRI - Map Data',
        stack: [
           "//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/[Z]/[Y]/[X]"],
        label: 'World Street',
        id: "esri_worldStree"
    },
    {
        copyright: '©ESRI - Map Data',
        stack: [
           "//server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/[Z]/[Y]/[X]"],
        label: 'Physical',
        id: "esri_physical"
    },
    {
        copyright: '©ESRI - Map Data',
        stack: [
           "//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/[Z]/[Y]/[X]"],
        label: 'Topography',
        id: "esri_topo"
    }
];


smLayers["sm"] = [
    {
        copyright: '',
        stack: ["//www.scribblemaps.com/assets/images/whiteTile.gif"],
        label: 'White Board',
        id: "sm_white"
    }
];

smLayers["astral"] = [
    {
        copyright: 'Image Credit: DSS Consortium, SDSS, NASA/ESA ©Google',
        stack: [
           "//mw1.google.com/mw-planetary/sky/skytiles_v1/[X]_[Y]_[Z].jpg",
        "//mw2.google.com/mw-planetary/sky/skytiles_v1/[X]_[Y]_[Z].jpg",
        "//mw2.google.com/mw-planetary/sky/skytiles_v1/[X]_[Y]_[Z].jpg"],
        label: 'Night Sky',
        id: "goog_nightSky"
    }
];


var getGroupId = function (typeId) {
    for (var s in smLayers) {
        for (var i = 0; i < smLayers[s].length; i++) {
            if(smLayers[s][i].id == typeId) {
                return s;
            }
        }
    }

    if (typeId == "custom_style" && !smLayers["custom"]) {

        smLayers["custom"] = [
        {
            label: 'Custom Style',
            id: "custom_style"
        }];

        return "custom";
    }

    return null;
}

var createLayers = function (sm) {
    for (var s in smLayers) {
        if (s == "mb") {
            z = 22;
        } else {
            z = null;
        }
        for (var i = 0; i < smLayers[s].length; i++) {
            sm.layers.createTileLayer(smLayers[s][i].id, smLayers[s][i].stack, z, null, smLayers[s][i].copyright);
        }
    }
}