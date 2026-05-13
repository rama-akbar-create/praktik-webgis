<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="stylesheet" href="css/leaflet.css">
        <link rel="stylesheet" href="css/L.Control.Layers.Tree.css">
        <link rel="stylesheet" href="css/L.Control.Locate.min.css">
        <link rel="stylesheet" href="css/qgis2web.css">
        <link rel="stylesheet" href="css/fontawesome-all.min.css">
        <link rel="stylesheet" href="css/leaflet.photon.css">
        <style>
        html, body, #map {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
        }
        </style>
        <title>WebGis PTN SBY</title>
    </head>
    <body>
        <div id="map">
        </div>
        <script src="js/qgis2web_expressions.js"></script>
        <script src="js/leaflet.js"></script>
        <script src="js/L.Control.Layers.Tree.min.js"></script>
        <script src="js/L.Control.Locate.min.js"></script>
        <script src="js/leaflet.rotatedMarker.js"></script>
        <script src="js/leaflet.pattern.js"></script>
        <script src="js/leaflet-hash.js"></script>
        <script src="js/Autolinker.min.js"></script>
        <script src="js/rbush.min.js"></script>
        <script src="js/labelgun.min.js"></script>
        <script src="js/labels.js"></script>
        <script src="js/leaflet.photon.js"></script>
        <script src="data/aksesibilitas_univunion_10.js"></script>
        <script src="data/univ_surabaya_11.js"></script>
        <script src="data/PTNSURABAYA_12.js"></script>
        <script>
        var map = L.map('map', {
            zoomControl:false, maxZoom:28, minZoom:1
        })
        var hash = new L.Hash(map);
        map.attributionControl.setPrefix('<a href="https://github.com/qgis2web/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
        var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
        // remove popup's row if "visible-with-data"
        function removeEmptyRowsFromPopupContent(content, feature) {
         var tempDiv = document.createElement('div');
         tempDiv.innerHTML = content;
         var rows = tempDiv.querySelectorAll('tr');
         for (var i = 0; i < rows.length; i++) {
             var td = rows[i].querySelector('td.visible-with-data');
             var key = td ? td.id : '';
             if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
                 rows[i].parentNode.removeChild(rows[i]);
             }
         }
         return tempDiv.innerHTML;
        }
        // modify popup if contains media
        function addClassToPopupIfMedia(content, popup) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            var imgTd = tempDiv.querySelector('td img');
            if (imgTd) {
                var src = imgTd.getAttribute('src');
                if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
                    popup._contentNode.classList.add('media');
                    setTimeout(function() {
                        popup.update();
                    }, 10);
                } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
                    var audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = src;
                    imgTd.parentNode.replaceChild(audio, imgTd);
                    popup._contentNode.classList.add('media');
                    setTimeout(function() {
                        popup.setContent(tempDiv.innerHTML);
                        popup.update();
                    }, 10);
                } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
                    var video = document.createElement('video');
                    video.controls = true;
                    video.src = src;
                    video.style.width = "400px";
                    video.style.height = "300px";
                    video.style.maxHeight = "60vh";
                    video.style.maxWidth = "60vw";
                    imgTd.parentNode.replaceChild(video, imgTd);
                    popup._contentNode.classList.add('media');
                    // Aggiorna il popup quando il video carica i metadati
                    video.addEventListener('loadedmetadata', function() {
                        popup.update();
                    });
                    setTimeout(function() {
                        popup.setContent(tempDiv.innerHTML);
                        popup.update();
                    }, 10);
                } else {
                    popup._contentNode.classList.remove('media');
                }
            } else {
                popup._contentNode.classList.remove('media');
            }
        }
        var zoomControl = L.control.zoom({
            position: 'topleft'
        }).addTo(map);
        L.control.locate({locateOptions: {maxZoom: 19}}).addTo(map);
        var bounds_group = new L.featureGroup([]);
        function setBounds() {
            if (bounds_group.getLayers().length) {
                map.fitBounds(bounds_group.getBounds());
            }
        }
        map.createPane('pane_Positronretina_0');
        map.getPane('pane_Positronretina_0').style.zIndex = 400;
        var layer_Positronretina_0 = L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
            pane: 'pane_Positronretina_0',
            opacity: 1.0,
            attribution: '<a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>',
            minZoom: 1,
            maxZoom: 28,
            minNativeZoom: 0,
            maxNativeZoom: 20
        });
        layer_Positronretina_0;
        map.addLayer(layer_Positronretina_0);
        map.createPane('pane_its_manyar_1');
        map.getPane('pane_its_manyar_1').style.zIndex = 401;
        var img_its_manyar_1 = 'data/its_manyar_1.png';
        var img_bounds_its_manyar_1 = [[-85.52924108338162,20.744307700903672],[-85.52610812418006,20.767038204499638]];
        var layer_its_manyar_1 = new L.imageOverlay(img_its_manyar_1,
                                              img_bounds_its_manyar_1,
                                              {pane: 'pane_its_manyar_1'});
        bounds_group.addLayer(layer_its_manyar_1);
        map.addLayer(layer_its_manyar_1);
        map.createPane('pane_its_sukolilo_2');
        map.getPane('pane_its_sukolilo_2').style.zIndex = 402;
        var img_its_sukolilo_2 = 'data/its_sukolilo_2.png';
        var img_bounds_its_sukolilo_2 = [[-85.52924108338162,20.740183793097625],[-85.52610667457341,20.767038204499638]];
        var layer_its_sukolilo_2 = new L.imageOverlay(img_its_sukolilo_2,
                                              img_bounds_its_sukolilo_2,
                                              {pane: 'pane_its_sukolilo_2'});
        bounds_group.addLayer(layer_its_sukolilo_2);
        map.addLayer(layer_its_sukolilo_2);
        map.createPane('pane_uin_3');
        map.getPane('pane_uin_3').style.zIndex = 403;
        var img_uin_3 = 'data/uin_3.png';
        var img_bounds_uin_3 = [[-85.52924108338162,20.740183793097625],[-85.52610667457341,20.767038204499638]];
        var layer_uin_3 = new L.imageOverlay(img_uin_3,
                                              img_bounds_uin_3,
                                              {pane: 'pane_uin_3'});
        bounds_group.addLayer(layer_uin_3);
        map.addLayer(layer_uin_3);
        map.createPane('pane_unair_a_4');
        map.getPane('pane_unair_a_4').style.zIndex = 404;
        var img_unair_a_4 = 'data/unair_a_4.png';
        var img_bounds_unair_a_4 = [[-85.52924108338162,20.744193147872966],[-85.52610808422638,20.767038204499638]];
        var layer_unair_a_4 = new L.imageOverlay(img_unair_a_4,
                                              img_bounds_unair_a_4,
                                              {pane: 'pane_unair_a_4'});
        bounds_group.addLayer(layer_unair_a_4);
        map.addLayer(layer_unair_a_4);
        map.createPane('pane_unair_b_5');
        map.getPane('pane_unair_b_5').style.zIndex = 405;
        var img_unair_b_5 = 'data/unair_b_5.png';
        var img_bounds_unair_b_5 = [[-85.52924108338162,20.73594533511107],[-85.526105160532,20.767038204499638]];
        var layer_unair_b_5 = new L.imageOverlay(img_unair_b_5,
                                              img_bounds_unair_b_5,
                                              {pane: 'pane_unair_b_5'});
        bounds_group.addLayer(layer_unair_b_5);
        map.addLayer(layer_unair_b_5);
        map.createPane('pane_unair_c_6');
        map.getPane('pane_unair_c_6').style.zIndex = 406;
        var img_unair_c_6 = 'data/unair_c_6.png';
        var img_bounds_unair_c_6 = [[-85.52924108338162,20.738007287285868],[-85.52610590015283,20.767038204499638]];
        var layer_unair_c_6 = new L.imageOverlay(img_unair_c_6,
                                              img_bounds_unair_c_6,
                                              {pane: 'pane_unair_c_6'});
        bounds_group.addLayer(layer_unair_c_6);
        map.addLayer(layer_unair_c_6);
        map.createPane('pane_unesa_ketintang_7');
        map.getPane('pane_unesa_ketintang_7').style.zIndex = 407;
        var img_unesa_ketintang_7 = 'data/unesa_ketintang_7.png';
        var img_bounds_unesa_ketintang_7 = [[-85.52924108338162,20.740183793097625],[-85.52610667457341,20.767038204499638]];
        var layer_unesa_ketintang_7 = new L.imageOverlay(img_unesa_ketintang_7,
                                              img_bounds_unesa_ketintang_7,
                                              {pane: 'pane_unesa_ketintang_7'});
        bounds_group.addLayer(layer_unesa_ketintang_7);
        map.addLayer(layer_unesa_ketintang_7);
        map.createPane('pane_unesa_lidahwetan_8');
        map.getPane('pane_unesa_lidahwetan_8').style.zIndex = 408;
        var img_unesa_lidahwetan_8 = 'data/unesa_lidahwetan_8.png';
        var img_bounds_unesa_lidahwetan_8 = [[-85.52924108338162,20.73674720531995],[-85.52610544885131,20.767038204499638]];
        var layer_unesa_lidahwetan_8 = new L.imageOverlay(img_unesa_lidahwetan_8,
                                              img_bounds_unesa_lidahwetan_8,
                                              {pane: 'pane_unesa_lidahwetan_8'});
        bounds_group.addLayer(layer_unesa_lidahwetan_8);
        map.addLayer(layer_unesa_lidahwetan_8);
        map.createPane('pane_upnv_jatim_9');
        map.getPane('pane_upnv_jatim_9').style.zIndex = 409;
        var img_upnv_jatim_9 = 'data/upnv_jatim_9.png';
        var img_bounds_upnv_jatim_9 = [[-85.52924108338162,20.726781111598108],[-85.52610180317785,20.767038204499638]];
        var layer_upnv_jatim_9 = new L.imageOverlay(img_upnv_jatim_9,
                                              img_bounds_upnv_jatim_9,
                                              {pane: 'pane_upnv_jatim_9'});
        bounds_group.addLayer(layer_upnv_jatim_9);
        map.addLayer(layer_upnv_jatim_9);
        function pop_aksesibilitas_univunion_10(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <th scope="row">Access</th>\
                        <td>' + (feature.properties['Access'] !== null ? autolinker.link(String(feature.properties['Access']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_aksesibilitas_univunion_10_0() {
            return {
                pane: 'pane_aksesibilitas_univunion_10',
                opacity: 1,
                color: 'rgba(225,89,137,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1.0,
                fillOpacity: 0,
                interactive: true,
            }
        }
        map.createPane('pane_aksesibilitas_univunion_10');
        map.getPane('pane_aksesibilitas_univunion_10').style.zIndex = 410;
        map.getPane('pane_aksesibilitas_univunion_10').style['mix-blend-mode'] = 'normal';
        var layer_aksesibilitas_univunion_10 = new L.geoJson(json_aksesibilitas_univunion_10, {
            attribution: '',
            interactive: true,
            dataVar: 'json_aksesibilitas_univunion_10',
            layerName: 'layer_aksesibilitas_univunion_10',
            pane: 'pane_aksesibilitas_univunion_10',
            onEachFeature: pop_aksesibilitas_univunion_10,
            style: style_aksesibilitas_univunion_10_0,
        });
        bounds_group.addLayer(layer_aksesibilitas_univunion_10);
        map.addLayer(layer_aksesibilitas_univunion_10);
        function pop_univ_surabaya_11(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <th scope="row">Nama</th>\
                        <td>' + (feature.properties['Nama'] !== null ? autolinker.link(String(feature.properties['Nama']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Kampus</th>\
                        <td>' + (feature.properties['Kampus'] !== null ? autolinker.link(String(feature.properties['Kampus']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Deskripsi Univ_QS WUR</th>\
                        <td>' + (feature.properties['Deskripsi Univ_QS WUR'] !== null ? autolinker.link(String(feature.properties['Deskripsi Univ_QS WUR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Deskripsi Univ_Didirikan</th>\
                        <td>' + (feature.properties['Deskripsi Univ_Didirikan'] !== null ? autolinker.link(String(feature.properties['Deskripsi Univ_Didirikan']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2"><strong>Deskripsi Univ_Fakultas</strong><br />' + (feature.properties['Deskripsi Univ_Fakultas'] !== null ? autolinker.link(String(feature.properties['Deskripsi Univ_Fakultas']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_univ_surabaya_11_0() {
            return {
                pane: 'pane_univ_surabaya_11',
                radius: 4.0,
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1,
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(133,182,111,1.0)',
                interactive: true,
            }
        }
        map.createPane('pane_univ_surabaya_11');
        map.getPane('pane_univ_surabaya_11').style.zIndex = 411;
        map.getPane('pane_univ_surabaya_11').style['mix-blend-mode'] = 'normal';
        var layer_univ_surabaya_11 = new L.geoJson(json_univ_surabaya_11, {
            attribution: '',
            interactive: true,
            dataVar: 'json_univ_surabaya_11',
            layerName: 'layer_univ_surabaya_11',
            pane: 'pane_univ_surabaya_11',
            onEachFeature: pop_univ_surabaya_11,
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.circleMarker(latlng, style_univ_surabaya_11_0(feature));
            },
        });
        bounds_group.addLayer(layer_univ_surabaya_11);
        map.addLayer(layer_univ_surabaya_11);
        function pop_PTNSURABAYA_12(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <th scope="row">Kampus</th>\
                        <td>' + (feature.properties['Kampus'] !== null ? autolinker.link(String(feature.properties['Kampus']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Deskripsi Univ_QS WUR</th>\
                        <td class="visible-with-data" id="Deskripsi Univ_QS WUR">' + (feature.properties['Deskripsi Univ_QS WUR'] !== null ? autolinker.link(String(feature.properties['Deskripsi Univ_QS WUR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Deskripsi Univ_Didirikan</th>\
                        <td>' + (feature.properties['Deskripsi Univ_Didirikan'] !== null ? autolinker.link(String(feature.properties['Deskripsi Univ_Didirikan']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2"><strong>Deskripsi Univ_Fakultas</strong><br />' + (feature.properties['Deskripsi Univ_Fakultas'] !== null ? autolinker.link(String(feature.properties['Deskripsi Univ_Fakultas']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['foto'] !== null ? '<img src="images/' + String(feature.properties['foto']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
                    </tr>\
                </table>';
            var content = removeEmptyRowsFromPopupContent(popupContent, feature);
			layer.on('popupopen', function(e) {
				addClassToPopupIfMedia(content, e.popup);
			});
			layer.bindPopup(content, { maxHeight: 400 });
        }

        function style_PTNSURABAYA_12_0() {
            return {
                pane: 'pane_PTNSURABAYA_12',
                radius: 4.0,
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1,
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(243,23,57,1.0)',
                interactive: true,
            }
        }
        map.createPane('pane_PTNSURABAYA_12');
        map.getPane('pane_PTNSURABAYA_12').style.zIndex = 412;
        map.getPane('pane_PTNSURABAYA_12').style['mix-blend-mode'] = 'normal';
        var layer_PTNSURABAYA_12 = new L.geoJson(json_PTNSURABAYA_12, {
            attribution: '',
            interactive: true,
            dataVar: 'json_PTNSURABAYA_12',
            layerName: 'layer_PTNSURABAYA_12',
            pane: 'pane_PTNSURABAYA_12',
            onEachFeature: pop_PTNSURABAYA_12,
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.circleMarker(latlng, style_PTNSURABAYA_12_0(feature));
            },
        });
        bounds_group.addLayer(layer_PTNSURABAYA_12);
        map.addLayer(layer_PTNSURABAYA_12);
        var overlaysTree = [
            {label: '<img src="legend/PTNSURABAYA_12.png" /> PTN SURABAYA', layer: layer_PTNSURABAYA_12},
            {label: '<img src="legend/univ_surabaya_11.png" /> univ_surabaya', layer: layer_univ_surabaya_11},
            {label: '<img src="legend/aksesibilitas_univunion_10.png" /> aksesibilitas_univ — union', layer: layer_aksesibilitas_univunion_10},
            {label: "upnv_jatim", layer: layer_upnv_jatim_9},
            {label: "unesa_lidahwetan", layer: layer_unesa_lidahwetan_8},
            {label: "unesa_ketintang", layer: layer_unesa_ketintang_7},
            {label: "unair_c", layer: layer_unair_c_6},
            {label: "unair_b", layer: layer_unair_b_5},
            {label: "unair_a", layer: layer_unair_a_4},
            {label: "uin", layer: layer_uin_3},
            {label: "its_sukolilo", layer: layer_its_sukolilo_2},
            {label: "its_manyar", layer: layer_its_manyar_1},
            {label: "Positron (retina)", layer: layer_Positronretina_0},]
        var lay = L.control.layers.tree(null, overlaysTree,{
            //namedToggle: true,
            //selectorBack: false,
            //closedSymbol: '&#8862; &#x1f5c0;',
            //openedSymbol: '&#8863; &#x1f5c1;',
            //collapseAll: 'Collapse all',
            //expandAll: 'Expand all',
            collapsed: false, 
        });
        lay.addTo(map);
		document.addEventListener("DOMContentLoaded", function() {
            // set new Layers List height which considers toggle icon
            function newLayersListHeight() {
                var layerScrollbarElement = document.querySelector('.leaflet-control-layers-scrollbar');
                if (layerScrollbarElement) {
                    var layersListElement = document.querySelector('.leaflet-control-layers-list');
                    var originalHeight = layersListElement.style.height 
                        || window.getComputedStyle(layersListElement).height;
                    var newHeight = parseFloat(originalHeight) - 50;
                    layersListElement.style.height = newHeight + 'px';
                }
            }
            var isLayersListExpanded = true;
            var controlLayersElement = document.querySelector('.leaflet-control-layers');
            var toggleLayerControl = document.querySelector('.leaflet-control-layers-toggle');
            // toggle Collapsed/Expanded and apply new Layers List height
            toggleLayerControl.addEventListener('click', function() {
                if (isLayersListExpanded) {
                    controlLayersElement.classList.remove('leaflet-control-layers-expanded');
                } else {
                    controlLayersElement.classList.add('leaflet-control-layers-expanded');
                }
                isLayersListExpanded = !isLayersListExpanded;
                newLayersListHeight()
            });	
			// apply new Layers List height if toggle layerstree
			if (controlLayersElement) {
				controlLayersElement.addEventListener('click', function(event) {
					var toggleLayerHeaderPointer = event.target.closest('.leaflet-layerstree-header-pointer span');
					if (toggleLayerHeaderPointer) {
						newLayersListHeight();
					}
				});
			}
            // Collapsed/Expanded at Start to apply new height
            setTimeout(function() {
                toggleLayerControl.click();
            }, 10);
            setTimeout(function() {
                toggleLayerControl.click();
            }, 10);
            // Collapsed touch/small screen
            var isSmallScreen = window.innerWidth < 650;
            if (isSmallScreen) {
                setTimeout(function() {
                    controlLayersElement.classList.remove('leaflet-control-layers-expanded');
                    isLayersListExpanded = !isLayersListExpanded;
                }, 500);
            }  
        });       
        setBounds();
        L.ImageOverlay.include({
            getBounds: function () {
                return this._bounds;
            }
        });
        </script>        
    </body>
</html>
