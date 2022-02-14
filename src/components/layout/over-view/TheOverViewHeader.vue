<template>
  <div class="over-view-header padding-left-32 padding-right-8">
    <div class="header-left">
      <router-link to="/demo">
        <div class="over-view min-with-128 flex-center cusor-pointer">
          <div class="icon icons-style"></div>
          <div class="text padding-left-8">Tổng quan</div>
        </div>
      </router-link>
      <router-link :to="`/demo`">
        <div
          class="class-room min-with-128 flex-center cusor-pointer"
          @click="testRouter"
        >
          <div class="icon icons-style"></div>
          <div class="text padding-left-8">Lớp học</div>
        </div>
      </router-link>
      <router-link to="/">
        <div class="course-ware min-with-128 flex-center cusor-pointer active">
          <div class="icon icons-style"></div>
          <div class="text padding-left-8">Học liệu</div>
        </div>
      </router-link>
    </div>
    <div class="header-right">
      <div class="grid-icon icons-style margin-right-16"></div>
      <div class="setting-icon icons-style margin-right-16"></div>
      <div class="question-icon icons-style margin-right-16"></div>
      <div class="bell-icon icons-style margin-right-16">
        <span class="quality">2</span>
      </div>
      <div class="name-text margin-right-16">Tâm</div>
      <div class="avatar-icon margin-right-16"></div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    testRouter() {},
  },
};
</script>
<style lang="scss">
a {
  text-decoration: none;
}
.router-link-active {
  height: 100%;
  text-decoration: none;
  color: var(--active-primary);
  border-bottom: 2px solid var(--active-primary);
}
.over-view-header {
  display: flex;
  justify-content: space-between;
  height: var(--over-view-header);
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);

  .icons-style {
    width: 32px;
    height: 32px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .text-style {
    font-size: 16px;
  }

  .header-left {
    height: 100%;
    display: flex;
    align-items: center;
    .over-view {
      height: 100%;
      .icon {
        background-image: url("../../../assets/icons/Group_46550.svg");
      }
    }
    .class-room {
      height: 100%;
      .icon {
        background-image: url("../../../assets/icons/Group_46552.svg");
      }
    }
    .course-ware {
      height: 100%;
      .icon {
        background-image: url("../../../assets/icons/Group_46551.svg");
      }
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .grid-icon {
      background-image: url("../../../assets/icons/Group_52080.svg");
    }
    .setting-icon {
      background-image: url("../../../assets/icons/Path_97409.svg");
    }
    .question-icon {
      background-image: url("../../../assets/icons/Group_52079.svg");
    }
    .bell-icon {
      position: relative;
      background-image: url("../../../assets/icons/Group_48628.svg");
      span {
        position: absolute;
        top: -5px;
        right: -4px;
        text-align: center;
        color: #ffff;
        display: block;
        background-color: #ff588c;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        overflow: hidden;
      }
    }
    .avatar-icon {
      width: 52px;
      height: 52px;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("../../../assets/icons/Group_52077.svg");
    }
  }
}
</style>
