<template>
  <div class="card bg-warning">
    <h3 class="card-header">
      {{ $t('pollingStationCard.pollingStationNumber') }}
      {{ pollingStation.pollingStationNumber }}, {{ pollingStation.county }}
    </h3>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <p class="m-0">
          <span class="mr-1 font-weight-bold">{{
            $t('pollingStationCard.address')
          }}</span>
          {{ pollingStation.address }}, {{ pollingStation.locality }}
        </p>
        <button class="btn btn-sm btn-dark" @click="openSection">
          {{ $t('pollingStationCard.seeStreets') }}
        </button>
      </div>
      <p class="mt-2">
        <span class="mr-1 font-weight-bold">
          {{ $t('pollingStationCard.distance') }}
        </span>
        {{ distanceInKm + ' km' }}
      </p>
      <div v-show="showStreet"></div>
    </div>
    <ul v-if="showStreet"></ul>
  </div>
</template>

<script>
export default {
  props: {
    pollingStation: { type: Object, default: () => {} },
  },
  data() {
    return {
      showStreet: false,
    }
  },
  computed: {
    distanceInKm() {
      if (this.pollingStation.distance === 0) return 0
      const distanceInKm = this.pollingStation.distance / 1000
      if (distanceInKm >= 1) return distanceInKm.toFixed(0)
      // If distance is lower than 100 meters show 0 km instead of 0.0 km
      if (distanceInKm < 0.1) return 0
      return distanceInKm.toFixed(1)
    },
  },
  methods: {
    openSection() {
      this.showStreet = !this.showStreet
      if (process.client) {
        document.getElementById('mapContainer').scrollIntoView()
      }

      this.$emit('updateMap')
    },
  },
}
</script>

<style scoped>
.btn {
  white-space: nowrap;
}
</style>
