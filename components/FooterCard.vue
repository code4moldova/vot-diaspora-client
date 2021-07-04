<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-6 my-2">
        <div class="bg-dark p-4 text-white h-100">
          <h2>{{ $t('social_share.title') }}</h2>
          <p>
            {{ $t('social_share.text') }}
          </p>
          <div class="share-actions">
            <a
              :href="mailtoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="share-cta email p-3"
            >
              <img
                src="./../assets/social/email.svg"
                alt="Write us an email"
                width="32"
              />
            </a>
            <a
              :href="shareFacebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="share-cta fb p-3 mx-1"
            >
              <img
                src="./../assets/social/facebook.svg"
                alt="Like us on Facebook"
                width="32"
              />
            </a>
            <a
              :href="shareTwitterUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="share-cta tw p-3"
            >
              <img
                src="./../assets/social/twitter.svg"
                alt="Follow us Twitter"
                width="32"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 my-2">
        <div class="bg-dark p-4 text-white h-100">
          <h2>{{ $t('donate_card.title') }}</h2>
          <p>
            {{ $t('donate_card.text') }}
          </p>
          <a
            class="btn btn-lg btn-success text-white"
            href="https://code4.md/donate/"
            target="_blank"
            rel="noopener noreferrer"
            >{{ $t('donate') }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.share-actions {
  .share-cta {
    display: inline-block;

    &.fb {
      background: #3b5998;
    }

    &.tw {
      background: #1da1f2;
    }

    &.email {
      background: #fff;
    }

    &:hover,
    &:focus {
      background: #fc0;
    }
  }
}
</style>

<script>
import sharedState from './sharedState'

const defaultUrl = 'https://votdiaspora.md'

export default {
  data() {
    return sharedState
  },
  computed: {
    votdiasporaUrl() {
      const { lat, long } = this.coordinates
      if (lat && long) {
        return `${defaultUrl}?lat=${lat}&long=${long}`
      }
      return defaultUrl
    },
    shareText() {
      return encodeURIComponent(this.$t('social_share_message'))
    },
    mailtoUrl() {
      const urlForMail = this.votdiasporaUrl.replace('&', '%26')
      return `mailto:info@example.com?&subject=&body=${this.shareText} ${urlForMail}`
    },
    shareFacebookUrl() {
      const url = encodeURIComponent(this.votdiasporaUrl)
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    shareTwitterUrl() {
      const url = encodeURIComponent(this.votdiasporaUrl)
      return `https://twitter.com/intent/tweet?url=${url}&text=${this.shareText}`
    },
  },
}
</script>
>
