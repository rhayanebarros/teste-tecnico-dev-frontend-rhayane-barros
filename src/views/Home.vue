<template>
  <div class="home">
    <Header>
      <div slot="header-home" class="header-home">
        <h1 class="header__title">Dev Mobile</h1>
      </div>
    </Header>
    <HomeContent />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/shared/Header.vue';
import HomeContent from '@/components/HomeContent.vue';

export default {
  name: 'Home',
  components: {
    Header,
    HomeContent,
  },
};
</script>
