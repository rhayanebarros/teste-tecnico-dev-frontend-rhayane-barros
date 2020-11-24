<template>
  <div class="home-content">
    <h2 class="home-content__title">Categories</h2>

    <div class="home-content__nav">
      <button
        id="name-category"
        class="home-content__nav-item"
        v-bind:key="category.name"
        v-for="category in category"
        @click="getLocalResults(category.name, category.id), selectCategory(category.name)">
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeContent',
  data() {
    return {
      category: Array,
      results: Array,
      nameCategory: String,
      result: {
        category: '',
      },
    };
  },
  beforeMount() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      const res = await fetch('https://opentdb.com/api_category.php');
      const data = await res.json();
      const category = data.trivia_categories;
      this.category = category;
    },
    selectCategory() {
      const getLocalStraight = JSON.parse(localStorage.getItem('straightHits'));
      const getLocalMistakes = JSON.parse(localStorage.getItem('mistakes'));
      if (getLocalStraight) {
        localStorage.setItem('straightHits', JSON.stringify(0));
      } else if (getLocalMistakes) {
        localStorage.setItem('mistakes', JSON.stringify(0));
      }
    },
    getLocalResults(name, id) {
      const getLocalCategory = localStorage.getItem(`${name}`);

      if (getLocalCategory) {
        this.$router.push({ name: 'Result', params: { name: `${name}` } });
      } else {
        this.$router.push({ name: 'Question', params: { name: `${name}`, id: `${id}` } });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home-content {
    padding: 30px 0 60px 25px;

    @include above(md) {
      padding: 60px 0 60px 40px;
    }

    @include above(lg) {
      padding: 0;
      max-width: 600px;
      width: 100%;
      margin: 100px auto 0;
    }

    &__title {
      font-family: $font;
      font-weight: $bold;
      font-size: 18px;
      color: $blue-dark;
    }

    &__nav {
      padding: 42px 0 0 0;
    }

    &__nav-item {
      border: 1px solid #b8bed5;
      cursor: pointer;
      display: block;
      font-family: $font;
      font-weight: $bold;
      font-size: 16px;
      overflow: hidden;
      position: relative;
      min-height: 42px;
      width: 100%;
      max-width: calc(100% - 25px);
      background-color: $gray-light;
      color: #78809a;
      border-radius: 8px;
      transition: all 0.3s;
      text-align: center;
      margin-bottom: 15px;
      padding: 13px;

      @include above(md) {
        max-width: calc(100% - 40px);
      }

      @include above(lg) {
        max-width: calc(100% - 60px);
      }

      @include above(xl) {
        max-width: calc(100% - 80px);
      }

      &:hover {
        background-color: #78809a;
        color: $gray-light;
      }

    }

  }

</style>
