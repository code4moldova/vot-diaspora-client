<template>
  <div class="card bg-warning">
    <h3 class="card-header">
      {{ $t('pollingStationCard.pollingStationNumber') }}
      {{ pollingStationNumber }}, {{ county }}
    </h3>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <p class="m-0">
          <span class="mr-1 font-weight-bold">{{
            $t('pollingStationCard.address')
          }}</span>
          {{ address }}, {{ locality }}
        </p>
        <button class="btn btn-sm btn-dark" @click="openSection">
          {{ $t('pollingStationCard.seeStreets') }}
        </button>
      </div>
      <div v-show="showStreet">
       
      </div>
    </div>
    <ul v-if="showStreet">
     
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pollingStationNumber: { type: String, default: '' },
    county: { type: String, default: '' },
    address: { type: String, default: '' },
    distance: { type: Number, default: 0 },
    assignedAddresses: { type: Array, default: () => [] },
    locality: { type: String, default: '' },
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
    },
  },
}
</script>

<style scoped>
.btn {
  white-space: nowrap;
}
</style>
