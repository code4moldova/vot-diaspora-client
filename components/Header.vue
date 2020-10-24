<template>
  <header class="container px-0">
    <nav
      class="navbar navbar-expand-sm justify-content-center justify-content-sm-end"
    >
      <nuxt-link
        :to="localePath('index')"
        class="text-dark d-flex flex-column flex-sm-row align-items-center"
        ><img
          class="navbar-brand mr-2"
          src="~/assets/logo_horizontal.svg"
          height="60"
          alt="Vot Diaspora" />
        <div class="mt-2">
          <small>by</small>
          <img
            class="navbar-brand"
            src="../assets/logo_code4md.svg"
            width="100"
            alt="Code4MD"
          /></div
      ></nuxt-link>
      <div class="d-flex align-items-center mx-auto mr-sm-0 mt-5 mt-sm-0">
        <nuxt-link
          :to="localePath('despre')"
          class="font-weight-bold mr-2 mr-sm-4 text-body"
        >
          {{ $t('nav_about') }}
        </nuxt-link>
        <a
          href="https://code4.md/donate"
          class="btn btn-success text-white font-weight-bold ml-2 ml-sm-4"
        >
          {{ $t('donate') }}
        </a>
        <select
          v-model="selectedValue"
          class="custom-select ml-2 ml-sm-4"
          @change="onChange(selectedValue)"
        >
          <option
            v-for="(locale, index) in $i18n.locales"
            :key="index"
            :value="locale.code"
            :selected="locale.code === selectedValue"
          >
            {{ locale.name }}
          </option>
        </select>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: this.$i18n.locale,
    }
  },
  computed: {
    // availableLocales() {
    //   return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    // },
  },
  methods: {
    onChange(event) {
      this.$router.replace(this.switchLocalePath(event))
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  white-space: nowrap;
}
</style>
