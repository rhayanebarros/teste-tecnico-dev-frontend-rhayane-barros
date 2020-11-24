<template>
  <div class="question-box">
    <h3 class="question-box__cont-question">Question {{ contQuestion }}</h3>

    <span class="question-box__difficulty"
      v-if="currentQuestion.difficulty">
      <font-awesome-icon class="active" :icon="['fa', 'star']"/>
      <font-awesome-icon
        v-bind:class="{ active: currentQuestion.difficulty === 'medium' ||
        currentQuestion.difficulty === 'hard' }"
        :icon="['fa', 'star']"/>
      <font-awesome-icon
        v-bind:class="{ active: currentQuestion.difficulty === 'hard' }"
        :icon="['fa', 'star']"/>
      {{ currentQuestion.difficulty }}
    </span>

    <h4 class="question-box__question" v-if="currentQuestion" >{{ currentQuestion.question }}</h4>

    <ul>
      <li class="question-box__answer"
        id='itemselected'
        v-for="(answer, index) in randomResponses"
        :key="index"
        @click.prevent="selectAnswer(index, answer), showModalSubmit = true"
        :class="answerClass(index)">
          {{ answer }}
      </li>
    </ul>

    <div class="question-box__modal" v-if="showModalSubmit">
      <button class="question-box__modal-submit"
        variant="primary"
        @click="submitAnswer(),
        showModalSubmit = false,
        showModalNext = true,
        saveResults(), straightHits()"
        :disabled="selectedIndex === null || answered"
      >
        Answer
      </button>
    </div>

    <div class="question-box__modal" v-if="showModalNext">
      <button class="question-box__modal-next"
        variant="success"
        @click="next(),
        showModalNext = false,
        showModalCorrect = false,
        showModalIncorrect = false"
        :disabled=" answered === false || lastQuestion"
      >
        Next
        <img src="@/assets/images/next-icon.svg" alt="Next icon" />
      </button>

      <router-link :to="{
        name: 'Result',
        params: {name: `${currentQuestion.category}`}}"
        class="question-box__modal-finish"
        variant="sucess"
        @click.native="saveResults(), showModalNext = false"
        :disabled=" lastQuestion === false"
      >
        Finish
        <img src="@/assets/images/next-icon.svg" alt="Next icon" />
      </router-link>
    </div>

    <div class="question-box__modal-overlay" v-if="showModalCorrect"
      @click="showModalCorrect = false"></div>

    <div class="question-box__modal-correct" v-if="showModalCorrect">
      <img src="@/assets/images/correct-icon.svg" alt="Correct icon" />
      <h4>You're right</h4>
    </div>

    <div class="question-box__modal-overlay" v-if="showModalIncorrect"
      @click="showModalIncorrect = false"></div>

    <div class="question-box__modal-incorrect" v-if="showModalIncorrect">
      <img src="@/assets/images/incorrect-icon.svg" alt="Incorrect icon" />
      <h4>You missed</h4>
    </div>

  </div>
</template>

<script>

export default {
  props: {
    currentQuestion: Object,
    next: Function,
    lastQuestion: Boolean,
    contQuestion: Number,
  },
  data() {
    return {
      selectedIndex: null,
      correctIndex: null,
      randomResponses: [],
      answered: false,
      showModalSubmit: false,
      showModalNext: false,
      showModalCorrect: false,
      showModalIncorrect: false,
      totalWrongAnswers: 0,
      totalRightAnswers: 0,
      straight: 0,
      mistakes: 0,
      numCorrect: 1,
      results: [],
      rightEasy: 0,
      rightMedium: 0,
      rightHard: 0,
      wrongEasy: 0,
      wrongMedium: 0,
      wrongHard: 0,
    };
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.answered = false;
        this.randomAnswers();
      },
    },
  },
  methods: {
    selectAnswer(index, self) {
      this.selectedIndex = index;
      this.selectedIndexValue = self;
    },
    submitAnswer() {
      let isCorrect = false;
      let isIncorrect = false;

      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      } else {
        isIncorrect = true;
      }

      this.answered = true;

      this.saveResults(isCorrect, isIncorrect);
      this.straightHits(isCorrect, isIncorrect);
    },
    randomAnswers() {
      const answers = [...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer];
      this.randomResponses = answers.sort(() => Math.random() - 0.5);
      this.correctIndex = this.randomResponses.indexOf(this.currentQuestion.correct_answer);
    },
    answerClass(index) {
      let answerClass = '';

      if (!this.answered && this.selectedIndex === index) {
        answerClass = 'selected';
      } else if (this.answered && this.selectedIndex === index && this.correctIndex === index) {
        this.showModalCorrect = true;
      } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index
      ) {
        this.showModalIncorrect = true;
      }

      return answerClass;
    },
    saveResults(isCorrect, isIncorrect) {
      if (isCorrect) {
        if (this.currentQuestion.difficulty === 'easy' === isCorrect) {
          this.rightEasy++;
        } else if (this.currentQuestion.difficulty === 'medium' === isCorrect) {
          this.rightMedium++;
        } else if (this.currentQuestion.difficulty === 'hard' === isCorrect) {
          this.rightHard++;
        }
        this.totalRightAnswers++;
        const inserts = [{
          chosenAnswer: `${this.selectedIndexValue}`,
          difficulty: `${this.currentQuestion.difficulty}`,
          feedback: `${this.currentQuestion.correct_answer}`,
          category: this.currentQuestion.category,
          totalRightAnswers: this.totalRightAnswers,
          totalWrongAnswers: this.totalWrongAnswers,
          rightEasy: this.rightEasy,
          rightMedium: this.rightMedium,
          rightHard: this.rightHard,
          wrongEasy: this.wrongEasy,
          wrongMedium: this.wrongMedium,
          wrongHard: this.wrongHard,
        }];
        this.results.push(inserts);
        localStorage.setItem(`${this.currentQuestion.category}`, JSON.stringify(this.results));
      } else if (isIncorrect) {
        if (this.currentQuestion.difficulty === 'easy' === isIncorrect) {
          this.wrongEasy++;
        } else if (this.currentQuestion.difficulty === 'medium' === isIncorrect) {
          this.wrongMedium++;
        } else if (this.currentQuestion.difficulty === 'hard' === isIncorrect) {
          this.wrongHard++;
        }
        this.totalWrongAnswers++;
        const inserts = [{
          chosenAnswer: `${this.selectedIndexValue}`,
          difficulty: `${this.currentQuestion.difficulty}`,
          feedback: `${this.currentQuestion.correct_answer}`,
          category: this.currentQuestion.category,
          totalRightAnswers: this.totalRightAnswers,
          totalWrongAnswers: this.totalWrongAnswers,
          rightEasy: this.rightEasy,
          rightMedium: this.rightMedium,
          rightHard: this.rightHard,
          wrongEasy: this.wrongEasy,
          wrongMedium: this.wrongMedium,
          wrongHard: this.wrongHard,
        }];
        this.results.push(inserts);
        localStorage.setItem(`${this.currentQuestion.category}`, JSON.stringify(this.results));
      }
    },
    straightHits(isCorrect, isIncorrect) {
      if (isCorrect) {
        this.mistakes = 0;
        this.straight++;
        if (this.straight === 2) {
          localStorage.setItem('straightHits', JSON.stringify(this.straight));
          this.straight = 0;
        }
      } else if (isIncorrect) {
        this.straight = 0;
        this.mistakes++;
        localStorage.setItem('straightHits', JSON.stringify(this.straight));
        if (this.mistakes === 2) {
          localStorage.setItem('mistakes', JSON.stringify(this.mistakes));
          this.mistakes = 0;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">

.question-box {
  padding: 25px 15px 0 15px;
  position: relative;

  @include above(md) {
    padding: 30px 30px 0 30px;
  }

  @include above(lg) {
    padding: 0;
    max-width: 600px;
    width: 100%;
    margin: 100px auto 0;
  }

  &__cont-question {
    color: $blue-dark;
    font-family: $font;
    font-weight: $bold;
    font-size: 18px;
    margin-bottom: 35px;
    display: inline-block;
  }

  &__difficulty {
    position: absolute;
    right: 15px;
    top: 25px;
    background-color: #d6d8de;
    border-radius: 20px;
    text-transform: capitalize;
    font-size: 12px;
    font-family: $font;
    font-weight: $medium;
    padding: 4px 10px;

    svg {
      opacity: 0.4;
      width: 8px;
      margin-right: 2px;
    }

    svg.active {
      opacity: 1;
    }
  }

  &__question {
    color: $black;
    font-family: $font;
    font-weight: $medium;
    margin-bottom: 35px;
  }

  &__answer {
    box-sizing: border-box;
    border: 2px solid #dfe1e5;
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.1);
    padding: 23px 18px;
    margin-bottom: 12px;
    text-transform: lowercase;

    &.selected {
      border-color: #4d8af0;
    }
  }

  &__modal {
    box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.1);
    position: fixed;
    left: 0;
    bottom: 0;
    height: 75px;
    width: 100%;
    z-index: 9999;
    background-color: #fff;
    animation: fromBottom 0.3s;

    &-submit:disabled,
    &-next:disabled,
    &-finish:disabled {
      display: none;
    }

    &-submit,
    &-next,
    &-finish {
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
      margin: 15px auto 0;
      padding: 13px;
    }

    &-next,
    &-finish {
      img {
        max-width: 20px;
        display: inline-block;
        vertical-align: bottom;
        width: 100%;
        margin-left: 5px;
      }
    }
  }

  &__modal-overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
  }

  &__modal-correct,
  &__modal-incorrect {
    box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.1);
    border-radius: 10px;
    position: absolute;
    left: calc(50% - 110px);
    top: 50%;
    height: 158px;
    max-width: 204px;
    width: 100%;
    z-index: 9999;
    background-color: #fff;
    animation: fromTop 0.3s;

    img {
      max-width: 47px;
      display: block;
      margin: 37px auto 20px;
      width: 100%;
    }

    h4 {
      color: $blue-dark;
      font-family: $font;
      font-weight: $bold;
      font-size: 16px;
      text-align: center;
    }
  }

  &__modal-correct {
    border: 2px solid #32cb82;
  }

  &__modal-incorrect {
    border: 2px solid #FF6660;
  }
}

@keyframes fromBottom {
  0% {
    transform: translate(0, 75px);
  }
  100% {
    transform: translate(0, 0px);
  }
}

@keyframes fromTop {
  0% {
    transform: translate(0, -75px);
  }
  100% {
    transform: translate(0, 0px);
  }
}

</style>
