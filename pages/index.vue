<template>
  <div>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-12">
          <VotersGuide />
        </div>
      </div>
    </div>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-12">
          <h2 class="h4 text-center">
            {{ $t('pollingStationSearch.question') }}
          </h2>
          <div
            class="text-center"
            v-html="$t('pollingStationSearch.callToAction')"
          ></div>
          <PollingStationSearch />
          <p class="text-center mt-4">
            {{ $t('temp_text') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VotersGuide from '../components/VotersGuide'
import PollingStationSearch from '../components/PollingStationSearch'
export default {
  components: {
    VotersGuide,
    PollingStationSearch,
  },
}
</script>
