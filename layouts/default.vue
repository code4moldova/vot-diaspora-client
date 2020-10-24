<template>
  <div>
    <Header />
    <GeneralInfo />
    <main>
      <Nuxt />
    </main>
    <FooterCard />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header'
import GeneralInfo from '../components/GeneralInfo'
import FooterCard from '../components/FooterCard'
import Footer from '../components/Footer'
export default {
  components: {
    Header,
    GeneralInfo,
    FooterCard,
    Footer,
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },
}
</script>
