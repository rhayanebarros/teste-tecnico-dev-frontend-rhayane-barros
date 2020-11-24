<template>
  <div class="question">
    <Header>
      <div slot="header-question" class="header-question">
        <h1 class="header__title">{{ this.category }}</h1>
      </div>
    </Header>
    <QuestionBox
      v-if="questions.length"
      :currentQuestion="questions[index]"
      :next="next"
      :lastQuestion="index+1 === totalQuestion"
      :contQuestion="contQuestion"
    />
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue';
import QuestionBox from '@/components/QuestionBox.vue';

export default {
  name: 'Question',
  components: {
    Header,
    QuestionBox,
  },
  data() {
    return {
      questions: [],
      index: 0,
      totalQuestion: 10,
      category: String,
      contQuestion: 1,
      difficulty: 'medium',
    };
  },
  beforeMount() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      const res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${this.difficulty}&category=${this.$route.params.id}&type=multiple`);
      const data = await res.json();
      const questions = data.results;
      this.questions = questions;
      this.category = this.questions[0].category;
      this.difficulty = this.questions[this.index].difficulty;
    },
    next() {
      if (this.index < this.totalQuestion) {
        this.index++;
        this.contQuestion++;
        const getLocalStraight = JSON.parse(localStorage.getItem('straightHits'));
        const getLocalMistakes = JSON.parse(localStorage.getItem('mistakes'));
        const currentDifficulty = this.difficulty;
        if (getLocalStraight === 2 && currentDifficulty === 'medium') {
          this.difficulty = 'hard';
          this.getQuestions();
          localStorage.setItem('straightHits', JSON.stringify(0));
        } else if (getLocalMistakes === 2 && currentDifficulty === 'medium') {
          this.difficulty = 'easy';
          this.getQuestions();
          localStorage.setItem('mistakes', JSON.stringify(0));
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">

  .question {
    position: relative;
    height: 100vh;
  }

</style>
