<template>
  <div class="mobile-table">
    <Dropdown @handle-change="handleChange"/>
    <div v-for="item in sortedAndSearchedData" :key="item.id" class="mobile-table__card">
      <div class="mobile-table__row">
        <span class="mobile-table__header">ФИО</span>
        <span class="body-column">{{ item.name }}</span>
      </div>
      <div class="mobile-table__row">
        <span class="mobile-table__header">Дата подачи заявления</span>
        <span class="body-column">{{ new Date(item.date).toLocaleDateString() }}</span>
      </div>
      <div class="mobile-table__row">
        <span class="mobile-table__header">Балл по русскому</span>
        <span class="body-column table-bold" :style="getColor(JSON.parse(item.subjects[0].score))">{{ item.subjects[0].score }}</span>
      </div>
      <div class="mobile-table__row">
        <span class="mobile-table__header">Балл по математике</span>
        <span class="body-column table-bold" :style="getColor(JSON.parse(item.subjects[1].score))">{{ item.subjects[1].score }}</span>
      </div>
      <div class="mobile-table__row">
        <span class="mobile-table__header">Балл по информатике</span>
        <span class="body-column table-bold" :style="getColor(JSON.parse(item.subjects[2].score))">{{ item.subjects[2].score }}</span>
      </div>
      <div class="mobile-table__row">
        <span class="mobile-table__header">Суммарный бал</span>
        <span class="body-column table-bold" :style="getSumColor(item)">{{ item.sum }}</span>
      </div>
      <div class="mobile-table__row">
        <span class="mobile-table__header">Процент</span>
        <div class="body-column percent-column">
          <span>{{ item.percent }}%</span>
          <div class="mobile-table__percent-box">
            <div class="mobile-table__percent" :style="`width: ${getPercent(item)}%; background: ${getMobilePercentStyle(item)}`"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getColor, getMobilePercentStyle, getPercent, getSum, getSumColor} from "@/tadble-functions/functions";
import Dropdown from "@/components/Dropdown.vue";

export default {
  props: {
    searchQuery: String
  },
  components: {Dropdown},
  methods: {
    getMobilePercentStyle,
    getPercent,
    getSum,
    getSumColor,
    getColor,
    handleChange (newValue) {
      Object.assign(this.sort, newValue)
    }
  },
  data () {
    return {
      tableData: require('@/static/data.json'),
      sort: {
        text: 'ФИО',
        value: 'name',
        sortType: 'down'
      }
    }
  },
  computed: {
    sortedData () {
      if (typeof this.sort.value === "number" && this.sort.value < 3) {
        if (this.sort.sortType === 'down'){
          return [...this.tableData].sort((a,b) => b.subjects[this.sort.value].score - a.subjects[this.sort.value].score)
        } else {
          return [...this.tableData].sort((a,b) => a.subjects[this.sort.value].score - b.subjects[this.sort.value].score)

        }
      } else if (this.sort.value === 'sum' || this.sort.value === 'percent') {
        if (this.sort.sortType === 'down') {
          return [...this.tableData].sort((a,b) => b[this.sort.value] - a[this.sort.value])
        } else {
          return [...this.tableData].sort((a,b) => a[this.sort.value] - b[this.sort.value])

        }
      } else {
        if (this.sort.sortType === 'down') {
          return [...this.tableData].sort((a,b) => b[this.sort.value].localeCompare(a[this.sort.value]))
        } else {
          return [...this.tableData].sort((a,b) => a[this.sort.value].localeCompare(b[this.sort.value]))
        }
      }
    },
    sortedAndSearchedData () {
      return [...this.sortedData].filter((item) => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  beforeMount() {
    this.tableData.map((item) => item.sum = item.subjects.reduce((acc, i) => acc + JSON.parse(i.score), 0))
    this.tableData.map((item) => item.percent = Math.ceil((item.sum * 100)/ 15))
    if (!localStorage.getItem('sort')){
      Object.assign(this.sort, {sortType: 'up', value: 'name'})
    } else {
      Object.assign(this.sort, JSON.parse(localStorage.getItem('sort')))
    }
  },
  watch: {
    sort: {
      handler () {
        localStorage.setItem('sort', JSON.stringify(this.sort))
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-table{
  @media (min-width: 576px) {
    display: none;
  }
  &__card{
    background: #FFFFFF;
    margin-bottom: 8px;
  }

  &__row{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 9px 14px 9px 12px;
    grid-column-gap: 2px;
    border-bottom: 1px solid #D5E7FF;
  }

  &__header{
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #8D9FB7;
  }

  &__percent-box{
    background: #D5E7FF;
    border-radius: 2px;
    width: 117px;
    height: 4px;
  }

  &__percent{
    height: 4px;
    border-radius: 2px;
  }
}

.body-column{
  height: auto;
  border: none;
  padding: 0;
}

.percent-column{
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
}
</style>
