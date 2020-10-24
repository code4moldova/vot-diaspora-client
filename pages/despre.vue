<template>
  <div class="container">
    <h1 class="mt-5 mb-4">{{ $t('about.title') }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="$t('about.text')"></div>

    <hr />
    <div class="row text-center my-5">
      <div class="col-md-4">
        <p>{{ $t('about.p1') }}</p>
        <img src="../assets/logo_code4md.svg" alt="Code4Moldova" />
      </div>
      <div class="col-md-4">
        <p>{{ $t('about.p2') }}</p>
        <img src="../assets/code4Romania.svg" alt="Code4Romania" />
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>
