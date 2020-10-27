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
