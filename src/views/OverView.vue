<template>
  <div class="over-view-page">
    <the-over-view-header />
    <the-over-view-content />
  </div>
</template>
<script>
import TheOverViewContent from "../components/layout/over-view/TheOverViewContent.vue";
import TheOverViewHeader from "../components/layout/over-view/TheOverViewHeader.vue";

export default {
  components: {
    TheOverViewHeader,
    TheOverViewContent,
  },
};
</script>
