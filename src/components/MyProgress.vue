<template>
  <div
    class="my-progress absolute bottom-0 left-0 h-full w-full flex justify-center items-center bg-white/40 backdrop-blur-lg rounded-lg"
  >
    <ProgressBar
      mode="indeterminate"
      class="dialog-show progress-bar w-[140px] mt-5"
      style="height: 5px"
    ></ProgressBar>
  </div>
</template>

<style lang="scss" scoped>
.my-progress {
  display: none;

  &.show {
    display: flex;
    animation: show 0.1s ease-in-out;
  }
}
</style>
