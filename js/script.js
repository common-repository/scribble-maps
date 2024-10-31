jQuery(document).ready(function($) {


	function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};

    var mapId = getUrlParameter('map');
    if (mapId != "" && mapId != null) {
        var sm = new ScribbleMap("ScribbleMap");
        sm.map.load({"id": mapId}, function(data) {
        }, function(errorEvent) {
        }, false);
    } else {
        var sm = new scribblemaps.ScribbleMap('ScribbleMap');
			sm.map.createNewMap();
    }
	
	function changeMapTypes(skipTypeSet) {
        var types = [];

        var val = $("#mapTypes select").val();

        if (val == "base") {
            types = [
                {
                    id: "hybrid",
                    label: "Hybrid"
                },
                {
                    id: "road",
                    label: "Road"
                },
                {
                    id: "satellite",
                    label: "Satellite"
                },
                {
                    id: "terrain",
                    label: "Terrain"
                }
            ];
        } else {
            for (var i = 0; i < smLayers[val].length; i++) {
                types.push({
                    label: smLayers[val][i].label,
                    id: smLayers[val][i].id
                });
            }
        }

        sm.ui.setMapTypes(types);

        if (types[0].id != sm.map.getType() && !skipTypeSet) {
            sm.map.setType(types[0].id);
        }
    }
	
	sm.map.addListener(scribblemaps.MapEvent.BASE_TYPE_CHANGED, function (event) {
            var gid = getGroupId(sm.map.getType());

            if (gid && gid != $("#mapTypes select").val()) {
                if (gid == "custom") {
                    if ($("#mapTypes select option[value='custom']").length == 0) {
                        $("#mapTypes select").append($('<option>', {
                            value: "custom",
                            text: 'Custom'
                        }));
                    }
                }
                $("#mapTypes select").val(gid);
                $("#mapTypes select").change();
                updateUrl(true);
            }
        });
	
	sm.addListener("ready", function () {
		createLayers(sm);
		sm.ui.hideMenuIcon(scribblemaps.MenuType.NEW_MAP);
		
		sm.ui.addDomElement($("#mapTypes").show()[0]);
		 $("#mapTypes select").change(function () {
            changeMapTypes();
        });
	});
	
    sm.map.addListener(scribblemaps.MapEvent.MAP_SAVED, function(event) {
        var mapData = sm.map.getWorkingInfo();
        var ajaxData = {
            action: 'save_map',
            id: mapData['id'],
            title: mapData['title'],
            description: mapData['description'],
            listType: mapData['listType']
        };
        jQuery.ajax({
            type: "POST",
            url: ajax_object.ajax_url,
            data: ajaxData,
            success: function(data) {
                //   alert('Got this from the server: ' + data);
            }
        });
    });
});