<template>
	<view class="uni-numbox">
		<view class="uni-numbox-minus" 
			@click="_calcValue('subtract')"
		>
			<text class="iconfont icon-minus" :class="minDisabled?'uni-numbox-disabled': ''" ></text>
		</view>
		<input
			class="uni-numbox-value" 
			type="number" 
			disabled
			:value="inputValue" 
			@blur="_onBlur"
		>
		<view 
			class="uni-numbox-plus" 
			@click="_calcValue('add')"
		>
			<text class="iconfont icon-plus" :class="maxDisabled?'uni-numbox-disabled': ''" ></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uni-number-box',
		props: {
			isMax: {
				type: Boolean,
				default: false
			},
			isMin: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			},
			value: {
				type: Number,
				default: 0
			},
			min: {
				type: Number,
				default: -Infinity
			},
			max: {
				type: Number,
				default: Infinity
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			autoRefresh: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				inputValue: this.value,
				minDisabled: false,
				maxDisabled: false
			}
		},
		created(){
			this.maxDisabled = this.isMax;
			this.minDisabled = this.isMin;
		},
		computed: {

		},
		watch: {
			value(val){
				this.inputValue = val;
			},
			isMax(val){
				this.maxDisabled = val;
			},
			isMin(val){
				this.minDisabled = val;
			}
			/* inputValue(number) {
				const data = {
					number: number,
					index: this.index
				}
				this.$emit('eventChange', data);
			} */
		},
		methods: {
			_calcValue(type) {
				if(this.disabled) return;	//如果disable, 点击增加或减少无效
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let newValue = 0;
				let step = this.step * scale;
				if(type === 'subtract'){
					newValue = value - step;
					if (newValue <= this.min){
						this.minDisabled = true;
					}
					if(newValue < this.min){
						newValue = this.min
					}
					if(newValue < this.max && this.maxDisabled === true){
						this.maxDisabled = false;
					}
					if(newValue === value){
						return;
					}
					let newInputValue = newValue / scale;
					if(this.autoRefresh){
						this.inputValue = newInputValue;
					}
					const data = {
						number: this.inputValue,
						index: this.index
					}
					this.$emit('eventMinus', data);
				}else if(type === 'add'){
					newValue = value + step;
					if (newValue >= this.max){
						this.maxDisabled = true;
					}
					if(newValue > this.max){
						newValue = this.max
					}
					if(newValue > this.min && this.minDisabled === true){
						this.minDisabled = false;
					}
					if(newValue === value){
						return;
					}
					let newInputValue = newValue / scale;
					if(this.autoRefresh){
						this.inputValue = newInputValue;
					}
					const data = {
						number: this.inputValue,
						index: this.index
					}

					this.$emit('eventAdd', data);
				}
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					this.inputValue = 0;
					return
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min
				}

				this.inputValue = value
			}
		}
	}
</script>
<style lang='scss'>
	.uni-numbox {
/* 		position:absolute;
		left: 30upx;
		bottom: 0; */
		display: flex;
		justify-content: flex-start;
		align-items: center;
		/* width:200upx; */
		height: 70upx;
		background:#ffffff;
	}
	.uni-numbox-minus,
	.uni-numbox-plus {
		margin: 0;
		background-color: $light-color;
		border-radius: 20upx;
		width: 45upx;
		height: 45upx;
		line-height: 45upx;
		text-align: center;
		position: relative;
		color: $font-color-light;
		&:hover {
			opacity: 0.5;
		}
	}
	.uni-numbox-minus .custom-icon,
	.uni-numbox-plus .custom-icon{
		font-size: $font-base;
		font-weight: bold;
		color: #FF0000;
	}

	.uni-numbox-value {
		position: relative;
		background-color: #fff;
		width: 40upx;
		height: 40upx;
		text-align: center;
		padding: 0;
		font-size: $font-base;
		color: #000000
	}

	.uni-numbox-disabled.custom-icon {
		color: #303133;
	}
</style>
