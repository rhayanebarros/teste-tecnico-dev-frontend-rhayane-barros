<template>
  <div class="result">
    <Header>
      <div slot="header-result" class="header-result">
        <h1 class="header__title">{{this.$route.params.name}}</h1>
      </div>
    </Header>
    <div class="result__content">
      <div class="result__box-congratulations">
        <img class="result__img" src="@/assets/images/monstro.png" alt="Monster" />
        <div class="result__congratulations">
          <h2>Congratulations!</h2>
          <h3>You finished the test</h3>
        </div>
      </div>

      <div class="result__box-performance">
        <hr>
        <h4>See your performance</h4>
        <hr>
      </div>

      <div class="result__box">
        <div class="result__box-right">
          <h4>{{totalRightAnswers}}</h4>
          <h5>Hits</h5>
        </div>

        <div class="result__box-wrong">
          <h4>{{totalWrongAnswers}}</h4>
          <h5>Errors</h5>
        </div>
      </div>

      <div class="result__emh">

        <div class="result__easy">
          <h5>Easy</h5>
          <h6>Hits: {{rightEasy}}</h6>
          <h6>Errors: {{wrongEasy}}</h6>
        </div>

        <div class="result__medium">
          <h5>Medium</h5>
          <h6>Hits: {{rightMedium}}</h6>
          <h6>Errors: {{wrongMedium}}</h6>
        </div>

        <div class="result__hard">
          <h5>Hard</h5>
          <h6>Acertos: {{rightHard}}</h6>
          <h6>Errors: {{wrongHard}}</h6>
        </div>

      </div>

      <router-link to="/"
        class="result__btn"
        variant="sucess"
      >
       Back to start
      </router-link>

    </div>
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue';

export default {
  name: 'Result',
  components: {
    Header,
  },
  data() {
    return {
      results: [],
      totalRightAnswers: String,
      totalWrongAnswers: String,
      rightEasy: Number,
      rightMedium: Number,
      rightHard: Number,
      wrongEasy: Number,
      wrongMedium: Number,
      wrongHard: Number,
    };
  },
  beforeMount() {
    this.getResults();
  },
  methods: {
    async getResults() {
      const getLocalResults = await JSON.parse(localStorage.getItem(this.$route.params.name));
      this.results = getLocalResults[9][0];
      this.totalRightAnswers = this.results.totalRightAnswers;
      this.totalWrongAnswers = this.results.totalWrongAnswers;
      this.rightEasy = this.results.rightEasy;
      this.wrongEasy = this.results.wrongEasy;
      this.rightMedium = this.results.rightMedium;
      this.wrongMedium = this.results.wrongMedium;
      this.rightHard = this.results.rightHard;
      this.wrongHard = this.results.wrongHard;
      console.log(this.results);
    },
  },
};
</script>

<style scoped lang="scss">
  .result {
    &__content {
      padding: 40px 0 0 0;
      position: relative;
      background-image: url('../assets/images/shape1.svg'),
          url('../assets/images/shape2.svg');
      background-repeat: no-repeat;
      background-position: calc(100% - 25px) -10px, calc(100% - 15px) 5px;
      background-size: 40px auto;
    }

    &__box-congratulations {
      padding-left: 20px;
      border-bottom: 2px solid #3f3d56;
    }

    &__img {
      display: inline-block;
      vertical-align: bottom;
      max-width: 60px;
      width: 100%;
    }

    &__congratulations {
      display: inline-block;
      vertical-align: top;
      margin-left: 25px;

      h2 {
        color: $black;
        font-family: $font;
        font-size: 25px;
        font-weight: $bold;
        margin-bottom: 10px;
      }

      h3 {
        color: $black;
        font-family: $font;
        font-size: 16px;
        font-weight: $semi-bold;
        margin-bottom: 20px;
      }
    }

    &__box-performance {
      margin-top: 40px;

      hr {
        display: inline-block;
        border-top: 1px dashed #343c58;
        vertical-align: middle;
        max-width: calc(50% - 81px);
        width: 100%;
      }

      h4 {
        box-sizing: border-box;
        border: 1px solid #343c58;
        border-radius: 3px;
        display: inline-block;
        text-align: center;
        font-size: 13px;
        max-width: 260px;
        padding: 10px;
      }
    }

    &__box {
      background-color: #eff0f2;
      border-radius: 5px;
      margin: 30px auto 0;
      max-width: 200px;
      padding: 10px 0;
      width: 100%;
    }

    &__box-right,
    &__box-wrong {
      display: inline-block;
      text-align: center;

      h4 {
        font-size: 30px;
      }

      h5 {
        font-size: 13px;
        text-transform: lowercase;
        font-weight: $medium;
      }
    }

    &__box-right {
      margin-left: 30px;
    }

    &__box-wrong {
      margin-left: 55px;
    }

    &__emh {
      margin: 40px auto 0;
      text-align: center;
    }

    &__easy,
    &__medium,
    &__hard {
      display: inline-block;
      text-align: left;

      h5 {
        font-size: 16px;
        margin-bottom: 3px;
      }

      h6 {
        font-size: 14px;
        font-weight: $medium;
      }
    }

    &__easy,
    &__medium {
      border-right: 1px solid#b8bed5;
      padding-right: 20px;
      margin-right: 20px;
    }

    &__btn {
      background-color: #4d8af0;
      cursor: pointer;
      display: block;
      font-family: $font;
      font-weight: $bold;
      font-size: 16px;
      overflow: hidden;
      position: relative;
      min-height: 47px;
      width: 100%;
      max-width: 235px;
      color: $white;
      border-radius: 10px;
      transition: all 0.3s;
      text-align: center;
      position: fixed;
      bottom: 30px;
      transform: translate(-115px, 0);
      margin-left: 50%;
      padding: 15px;
    }

  }
</style>
