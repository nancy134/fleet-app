/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log("onDeviceReady");
        this.initializeMap();
    },

    initializeMap:function() {
      plugin.google.maps.environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': '',
        'API_KEY_FOR_BROWSER_DEBUG': ''
      });
      var div = document.getElementById("map_canvas");
      var options = {
        camera: {
          target: {lat: 37.558315, lng:-122.284456},
          zoom: 15
        }
      };

      // Create a Google Maps native view under the map_canvas div.
      var map = plugin.google.maps.Map.getMap(div, options);
      map.one(plugin.google.maps.event.MAP_READY, this.onMapInit);
    },

    onMapInit: function(map){
      var locations = [
        [37.558315, -122.284456, "White #8", "0 mph"],
        [37.562619, -122.281302, "Tesla red 9", "54 mph"],
        [37.562413, -122.269404, "Tesla White 7", "0 mph"],
        [37.563543, -122.276033, "Tesla Red 6", "33 mph"]
      ];
      
      var bounds = new plugin.google.maps.LatLngBounds();

      for (i = 0; i < locations.length; i++) {
        var point = new plugin.google.maps.LatLng(locations[i][0], locations[i][1]);
        var marker = map.addMarker({
          position: point,
          title: locations[i][2],
          snippet: locations[i][3]
        });
        bounds.extend(point);
      }
      console.log(JSON.stringify(bounds));
      map.moveCamera({'target' : bounds});
    }
};
app.initialize();
