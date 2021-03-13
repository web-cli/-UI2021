<template>
  <div class="pro_wrap">
    <!-- <div class="process">
      <div class="percent" :style="`width: ${schedule} + '%'`"></div>
    </div>
    <span class="percent_num">{{schedule}}%</span> -->
		<div v-if="schedule !==undefined">
			<van-progress :percentage="schedule" stroke-width="10"  />
		</div>
		
  </div>
</template>

<script>
export default {
  props: ['schedule'],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

.pro_wrap {
  width: 600px;
  position: relative;
	margin: 0 auto;
  height: 17px;
  line-height: 17px;
  margin-top: 20px;
	// @include flex-center();
  .process {
		background: #3960e81c;
		border: 1px solid #2bb8ee78;
		width: 80%;
		height: 17px;
		line-height: 17px;
		border-radius: 1rem;
		display: inline-block;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
  .process .percent_box {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		height: 15px;
		border-radius: 8px;
		border: 1px solid #e8c27d;
		background: #e2e2e2;
	}
  .process .percent {
		height: 100%;
		background: linear-gradient(270deg, #40a4f2 0%, #3d67e8 100%);
	}
  .percent_num {
		position: absolute;
		top: 0;
		left: 80%;
		line-height: 17px;
		color: #3582b3;
		margin-left: 10px;
		font-size: 14px;
	}
}


</style>
