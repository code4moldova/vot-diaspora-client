<template>
  <footer class="bg-dark">
    <div class="text-right bg-light py-2 mt-5">
      <div class="container">
        <a
          class="social-link-item mx-1"
          href="https://www.facebook.com/codeformoldova"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../assets/social/facebook.svg"
            width="45"
            height="45"
            alt="Code4Ro Facebook"
            class="p-2 bg-secondary"
          />
        </a>
        <a
          class="social-link-item mx-1"
          href="https://www.instagram.com/code4md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../assets/social/instagram.svg"
            width="45"
            height="45"
            alt="Code4Ro Instagram"
            class="p-2 bg-secondary"
          />
        </a>
        <a
          class="social-link-item mx-1"
          href="https://www.linkedin.com/company/code4moldova"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../assets/social/linkedin.svg"
            width="45"
            height="45"
            alt="Code4Ro LinkedIn"
            class="p-2 bg-secondary"
          />
        </a>
        <a
          class="social-link-item mx-1"
          href="https://twitter.com/Code4Moldova"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../assets/social/twitter.svg"
            width="45"
            height="45"
            alt="Code4MD Twitter"
            class="p-2 bg-secondary"
          />
        </a>
        <a
          class="btn btn-lg btn-success text-white ml-1"
          href="https://code4.md/donate/"
          target="_blank"
          rel="noopener noreferrer"
          >{{ $t('donate') }}</a
        >
      </div>
    </div>
    <div class="container text-white py-4">
      <div class="row">
        <div class="col col-xs-12 col-sm-6 text-center text-sm-left">
          <h3 class="link-title h5">Ecosistem Alegeri</h3>
          <nav>
            <ul class="list-unstyled">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/code4moldova/vot-diaspora-client/"
                >
                  Vot Diaspora Github
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://code4.md/"
                >
                  Code for Moldova
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-xs-12 col-sm-6 text-center text-sm-right">
          <ul class="list-unstyled">
            <li>
              <nuxt-link :to="localePath('cookies-policy')"
                >Politica de cookies</nuxt-link
              >
            </li>
          </ul>
          <nuxt-link :to="localePath('index')"
            ><img
              alt="Code4md" 
              width="100"
              src="../assets/logo_code4md.svg"
              class="mt-3 mb-2" /></nuxt-link
          ><br />
          <span>&copy; 2020 Code for Moldova.</span>
          <p>
            Organizație neguvernamentală independentă, neafiliată politic și
            apolitică.
          </p>

          <div class="vercel-credits">
            <div>
              {{ $t('sponsors.powered_by') }}
              <a
                href="https://vercel.com/?utm_source=vot-diaspora-client&utm_campaign=oss"
                target="_blank"
              >
                Vercel
                <img alt="Vercel" title="Vercel" src="../assets/vercel.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  font-size: 0.9rem;
}

footer a {
  color: #fff;
}
.social-link-item {
  img {
    border-radius: 5px;
  }
}

.vercel-credits {
  img {
    vertical-align: text-top;
  }
}
</style>
