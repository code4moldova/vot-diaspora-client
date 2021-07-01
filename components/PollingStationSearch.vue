<template>
  <div>
    <vue-typeahead-bootstrap
      v-model="address"
      class="w-75 mx-auto mb-4"
      :placeholder="$t('pollingStationSearch.searchPlaceholder')"
      :data="addressList"
      :show-all-results="true"
      :serializer="(suggestion) => suggestion.label"
      @hit="selectAddress"
    >
    </vue-typeahead-bootstrap>
    <div v-show="showErrorMessage" class="bg-danger p-2 text-center text-white">
      {{ $t('pollingStationSearch.error') }}
    </div>
    <div v-if="pollingStations.length">
      <div
        class="row row-cols-1"
        :class="pollingStations.length > 1 ? 'row-cols-md-2' : ''"
      >
        <div
          v-for="pollingStation of pollingStations"
          :key="pollingStation.id"
          class="col mb-4"
        >
          <PollingStationCard
            :polling-station="pollingStation"
            @updateMap="
              setHereMap(pollingStation.latitude, pollingStation.longitude)
            "
          />
        </div>
      </div>
    </div>
    <div v-if="hasFetchedData && pollingStations.length === 0">
      <p class="font-weight-bold my-4">
        {{ $t('pollingStationSearch.addressNotFound') }}
      </p>
    </div>
    <div id="map">
      <div
        id="mapContainer"
        ref="hereMap"
        style="height: 600px; width: 100%"
      ></div>
    </div>
  </div>
</template>
<script>
import { debounce } from 'debounce'
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap'
import sharedState from './sharedState'
import pollingStationMarker from '~/assets/polling_station_marker.svg'
import houseMarker from '~/assets/house_marker.svg'
import PollingStationCard from '~/components/PollingStationCard'

export default {
  components: {
    VueTypeaheadBootstrap,
    PollingStationCard,
  },

  data() {
    return {
      showErrorMessage: false,
      hasFetchedData: false,
      address: '',
      addressList: [],
      pollingStations: [],
      platform: null,
      hereMap: null,
      apikey: 'V6HPePj40MXZhTq5F7zojc-bByTcgsVnRtrFm21XpKE',
    }
  },
  watch: {
    address: debounce(async function (value) {
      if (value.length < 3) {
        return
      }

      this.addressList = (await this.searchAddress()).suggestions
    }, 300),
  },
  mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    })
    this.platform = platform
    this.initializeHereMap()

    const currentUrl = new URL(location.href)
    const lat = currentUrl.searchParams.get('lat')
    const long = currentUrl.searchParams.get('long')
    if (lat && long) {
      this.applyHomeCoordinates(lat, long)
      sharedState.coordinates = { lat, long }
    }
  },
  methods: {
    async applyHomeCoordinates(latitude, longitude) {
      this.addMarker(latitude, longitude, houseMarker)
      const poolingResults = await this.findPoolingStation(latitude, longitude)
      this.pollingStations = [].concat(
        ...poolingResults.map((g) =>
          g.pollingStations.map((ps) => {
            return { ...ps, distance: g.distance }
          })
        )
      )

      this.pollingStations.forEach((c) => {
        this.addMarker(c.latitude, c.longitude, pollingStationMarker)

        this.setHereMap(c.latitude, c.longitude)
      })
      if (this.pollingStations.length > 1) {
        this.setHereMap(latitude, longitude)
        // We should check which station is closest and it's latitude
        let minDistance = 0
        let closestLatitude = 0
        let closestLongitude = 0
        this.pollingStations.forEach((station) => {
          const distanceLatitude = station.latitude - latitude
          const distanceLongitude = station.longitude - longitude
          const distance = Math.sqrt(
            Math.pow(distanceLatitude, 2) + Math.pow(distanceLongitude, 2)
          )
          if (minDistance === 0 || distance < minDistance) {
            minDistance = distance
            closestLatitude = station.latitude
            closestLongitude = station.longitude
          }
        })
        const H = window.H
        // We'll add an extra distance(otherwise, if a station is too close, we'll have the marker hidden)
        const extraDistance = 0.005
        // We're computing the distance on both axis.
        const distLatitude =
          Math.abs(latitude - closestLatitude) + extraDistance
        const distLongitude =
          Math.abs(longitude - closestLongitude) + extraDistance

        // We're centering the map to include this distance and still keep the home in the center.
        this.hereMap.getViewModel().setLookAtData({
          bounds: new H.geo.Rect(
            latitude - distLatitude,
            longitude - distLongitude,
            latitude + distLatitude,
            longitude + distLongitude
          ),
        })
        return
      }
      this.hereMap.setZoom(16)
    },
    async selectAddress(event) {
      const { locationId } = event
      this.clearMarkers()
      const addressDetail = await this.getGeocode(locationId)
      const {
        latitude,
        longitude,
      } = addressDetail.response.view[0].result[0].location.displayPosition
      this.applyHomeCoordinates(latitude, longitude)
      history.pushState('', '', `?lat=${latitude}&long=${longitude}`)
      sharedState.coordinates = { lat: latitude, long: longitude }
    },
    async getGeocode(locationId) {
      try {
        const result = await fetch(
          `https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${locationId}&jsonattributes=1&gen=1&jsonattributes=1&apiKey=${this.apikey}`
        )
        return await result.json()
      } catch (error) {
        this.showErrorMessage = true
      }
    },
    async searchAddress(query) {
      try {
        const result = await fetch(
          `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${this.apikey}&query=${this.address}&maxresults=5`
        )
        return await result.json()
      } catch (error) {
        this.showErrorMessage = true
      }
    },
    async findPoolingStation(latitude, longitude) {
      try {
        const result = await fetch(
          `${process.env.NUXT_ENV_API_URL}/polling-station/near-me?latitude=${latitude}&longitude=${longitude}`
        )
        this.hasFetchedData = true
        return await result.json()
      } catch (error) {
        this.showErrorMessage = true
      }
    },
    addMarker(lat, lng, iconPath) {
      const H = window.H
      const icon = new H.map.Icon(iconPath)
      this.hereMap.addObject(
        new H.map.Marker(
          {
            lat,
            lng,
          },
          { icon }
        )
      )
    },
    clearMarkers() {
      this.hereMap.removeObjects(this.hereMap.getObjects())
    },
    initializeHereMap() {
      // rendering map
      const pixelRatio = process.client ? window.devicePixelRatio : 1
      const mapContainer = this.$refs.hereMap
      const H = window.H
      // Obtain the default map types from the platform object
      const maptypes = this.platform.createDefaultLayers()

      // Instantiate (and display) a map object:
      this.hereMap = new H.Map(mapContainer, maptypes.vector.normal.map, {
        center: { lat: 47.123, lng: 28.4213 },
        zoom: 7,
        pixelRatio,
      })

      addEventListener('resize', () => this.hereMap.getViewPort().resize())

      // add behavior control
      // eslint-disable-next-line no-new
      const behavior = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(this.hereMap)
      )
      behavior.disable(H.mapevents.Behavior.WHEELZOOM)
      // add UI
      H.ui.UI.createDefault(this.hereMap, maptypes)
      // End rendering the initial map
    },

    /**
     * @constructor
     * @param {number} latitude - The latitude of the coordinates.
     * @param {number} longitude - The longitude of the coordinates.
     */
    setHereMap(lat, lng) {
      this.hereMap.setCenter({
        lat,
        lng,
      })
    },
  },
}
</script>
