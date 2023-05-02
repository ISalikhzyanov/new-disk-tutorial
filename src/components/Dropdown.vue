<template>
  <div class="select">
    <div class="dropdown">
      <input readonly class="dropdown__input" :value="sortingValue.text" @click="showOrHide">
      <img src="@/assets/img/arrow-down.svg" class="dropdown__image">
      <ul v-if="dropDown" class="dropdown__ul">
        <li
            v-for="option in options"
            :key="option.value"
            class="dropdown__li"
            :style="option.value === sortingValue.value ? 'background-color: #EDF5FF' : ''"
            @click="handleClick(option)">
          {{ option.text }}
        </li>
      </ul>
    </div>
    <div class="select__buttons">
      <button :class="sortingValue.sortType === 'down' ? 'select__active-btn' : 'select__btn' " @click="sortingValue['sortType'] = 'down'">
        <img v-if="sortingValue.sortType === 'down'" src="@/assets/img/arrow-bottom-white.svg" />
        <img v-else src="@/assets/img/arrow-bottom.svg" />
      </button>
      <button :class="sortingValue.sortType === 'up' ? 'select__active-btn' : 'select__btn' " @click="sortingValue['sortType'] = 'up'">
        <img v-if="sortingValue.sortType === 'up'" src="@/assets/img/arrow-up-white.svg" />
        <img v-else src="@/assets/img/arrow-up.svg" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
data () {
  return {
    dropDown: false,
    sortingValue: {
      text: '',
      value: '',
      sortType: ''
    },
    options: [
      {
        text: 'ФИО',
        value: 'name'
      },
      {
        text: 'Дата подачи заявления',
        value: 'date'
      },
      {
        text: 'Балл по русскому',
        value: 0
      },
      {
        text: 'Балл по математике',
        value: 1
      },
      {
        text: 'Балл по  информатике',
        value: 2
      },
      {
        text: 'Суммарный Балл',
        value: 'sum'
      },
      {
        text: 'Процент',
        value: 'percent'
      },
    ],
  }
},
  methods: {
  handleClick (option) {
    this.dropDown = false
    Object.assign(this.sortingValue, option)
  },
    showOrHide () {
      this.dropDown = !this.dropDown
    }
  },
  watch: {
  sortingValue: {
    handler (newValue) {
      return this.$emit('handle-change', newValue)
    },
    deep: true
  }
  },
  mounted() {
    if (localStorage.getItem('sort')){
      const savedSort = JSON.parse(localStorage.getItem('sort'))
      Object.assign(this.sortingValue, savedSort)
    } else {
      Object.assign(this.sort, {sortType: 'up', value: 'name', text: 'ФИО'})
    }
  }
}
</script>

<style lang="scss" scoped>
.select{
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;

  &__buttons{
    width: 25%;
    display: flex;
    flex-direction: row;
    column-gap: 4px;
    justify-content: flex-end;
  }

  &__btn{
    width: 44px;
    height: 44px;
    border: 1px solid #006CFE;
    background: transparent;
    border-radius: 2px;
  }

  &__active-btn{
    width: 44px;
    height: 44px;
    border: none;
    background: #006CFE;
    border-radius: 2px;
  }
}
.dropdown{
  position: relative;
  height: 44px;
  width: calc(75% - 12px);
  &__ul{
    list-style: none;
    padding: 0;
    z-index: 10;
    margin: 4px 0 0 0;
    position: relative;
    background: #FFFFFF;
    border: 1px solid #D5E7FF;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  &__li{
    max-height: 36px;
    border-bottom: 1px solid #D5E7FF;
    padding: 9px 12.5px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;

    &:hover{
      background-color: #EDF5FF;
    }
  }

  &__input{
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    border: 1px solid #D5E7FF;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding: 0 0 0 12px;
  }

  &__image{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
  }
}
</style>
