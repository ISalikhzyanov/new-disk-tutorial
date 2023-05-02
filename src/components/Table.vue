<template>
  <div class="table">
    <table class="table__table">
      <thead>
      <tr>
        <th class="table__name-column" @click="nameSort">
          <span class="table__header">ФИО</span>
          <img v-if="sortingFilter.value === 'name' && sortingFilter.sortType === 'down'" src="@/assets/img/arrow-bottom.svg">
          <img v-if="sortingFilter.value === 'name' && sortingFilter.sortType === 'up'" src="@/assets/img/arrow-up.svg">
        </th>
        <th class="table__other-columns date" @click="dateSort">
          <span class="table__header">Дата подачи заявления</span>
          <img v-if="sortingFilter.value === 'date' && sortingFilter.sortType === 'down'" src="@/assets/img/arrow-bottom.svg">
          <img v-if="sortingFilter.value === 'date' && sortingFilter.sortType === 'up'" src="@/assets/img/arrow-up.svg">
        </th>
        <th class="table__other-columns russian-score" @click="rusSort">
          <span class="table__header">Балл по русскому</span>
          <img v-if="sortingFilter.value === 0 && sortingFilter.sortType === 'down'" src="@/assets/img/arrow-bottom.svg">
          <img v-if="sortingFilter.value === 0 && sortingFilter.sortType === 'up'" src="@/assets/img/arrow-up.svg">
        </th>
        <th class="table__other-columns math-score" @click="mathSort">
          <span class="table__header">Балл по математике</span>
          <img v-if="sortingFilter.value === 1 && sortingFilter.sortType === 'down'" src="@/assets/img/arrow-bottom.svg">
          <img v-if="sortingFilter.value === 1 && sortingFilter.sortType === 'up'" src="@/assets/img/arrow-up.svg">
        </th>
        <th class="table__other-columns inform-score" @click="informSort">
          <span class="table__header">Балл по информатике</span>
          <img v-if="sortingFilter.value === 2 && sortingFilter.sortType === 'down'" src="@/assets/img/arrow-bottom.svg">
          <img v-if="sortingFilter.value === 2 && sortingFilter.sortType === 'up'" src="@/assets/img/arrow-up.svg">
        </th>
        <th class="table__other-columns score-sum" @click="sumSort">
          <span class="table__header">Суммарный балл</span>
          <img v-if="sortingFilter.value === 'sum' && sortingFilter.sortType === 'down'" src="@/assets/img/arrow-bottom.svg">
          <img v-if="sortingFilter.value === 'sum' && sortingFilter.sortType === 'up'" src="@/assets/img/arrow-up.svg">
        </th>
        <th class="table__other-columns percent" @click="percentSort">
          <span class="table__header">Процент</span>
          <img v-if="sortingFilter.value === 'percent' && sortingFilter.sortType === 'down'" src="@/assets/img/arrow-bottom.svg">
          <img v-if="sortingFilter.value === 'percent' && sortingFilter.sortType === 'up'" src="@/assets/img/arrow-up.svg">
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in sortedAndSearchedData" :key="item.id" class="table__data-row">
        <td class="body-column">
          <span>{{ item.name }}</span>
        </td>
        <td class="body-column">
          <span>{{ new Date(item.date).toLocaleDateString() }}</span>
        </td>
        <td class="body-column table-bold" :style="getColor(JSON.parse(item.subjects[0].score))">
          <span>{{ item.subjects[0].score }}</span>
        </td>
        <td class="body-column table-bold" :style="getColor(JSON.parse(item.subjects[1].score))">
          <span>{{ item.subjects[1].score }}</span>
        </td>
        <td class="body-column table-bold" :style="getColor(JSON.parse(item.subjects[2].score))">
          <span>{{ item.subjects[2].score }}</span>
        </td>
        <td class="body-column table-bold" :style="getSumColor(item)">
          <span>{{ item.sum }}</span>
        </td>
        <td class="body-column">
          <div class="pie" :style="getPercentStyle(item)">
            <div class="inner-pie">
              {{ item.percent }}%
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getColor, getPercent, getPercentStyle, getSum, getSumColor} from "@/tadble-functions/functions";

export default {
  props: {
    searchQuery: String
  },
data () {
  return {
    tableData: require('@/static/data.json'),
   sortingFilter: {
      sortType: '',
     value: ''
   },
  }
},
  methods: {getPercent,
    getPercentStyle,
    getSum,
    getSumColor,
    getColor,
    nameSort () {
    if (this.sortingFilter.value !== 'name') {
      this.sortingFilter.value = 'name'
      this.sortingFilter.sortType = 'down'
    } else if (this.sortingFilter.value === 'name' && this.sortingFilter.sortType !== 'down') {
      this.sortingFilter.sortType = 'down'
    } else if (this.sortingFilter.value === 'name' && this.sortingFilter.sortType === 'down') {
      this.sortingFilter.sortType = 'up'
    }
    },
    dateSort () {
      if (this.sortingFilter.value !== 'date') {
        this.sortingFilter.value = 'date'
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 'date' && this.sortingFilter.sortType !== 'down') {
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 'date' && this.sortingFilter.sortType === 'down') {
        this.sortingFilter.sortType = 'up'
      }
    },
    rusSort () {
      if (this.sortingFilter.value !== 0) {
        this.sortingFilter.value = 0
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 0 && this.sortingFilter.sortType !== 'down') {
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 0 && this.sortingFilter.sortType === 'down') {
        this.sortingFilter.sortType = 'up'
      }
    },
    mathSort () {
      if (this.sortingFilter.value !== 1) {
        this.sortingFilter.value = 1
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 1 && this.sortingFilter.sortType !== 'down') {
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 1 && this.sortingFilter.sortType === 'down') {
        this.sortingFilter.sortType = 'up'
      }
    },
    informSort () {
      if (this.sortingFilter.value !== 2) {
        this.sortingFilter.value = 2
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 2 && this.sortingFilter.sortType !== 'down') {
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 2 && this.sortingFilter.sortType === 'down') {
        this.sortingFilter.sortType = 'up'
      }
    },
    sumSort () {
      if (this.sortingFilter.value !== 'sum') {
        this.sortingFilter.value = 'sum'
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 'sum' && this.sortingFilter.sortType !== 'down') {
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 'sum' && this.sortingFilter.sortType === 'down') {
        this.sortingFilter.sortType = 'up'
      }
    },
    percentSort () {
      if (this.sortingFilter.value !== 'percent') {
        this.sortingFilter.value = 'percent'
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 'percent' && this.sortingFilter.sortType !== 'down') {
        this.sortingFilter.sortType = 'down'
      } else if (this.sortingFilter.value === 'percent' && this.sortingFilter.sortType === 'down') {
        this.sortingFilter.sortType = 'up'
      }
    }
  },
  beforeMount() {
    this.tableData.map((item) => item.sum = item.subjects.reduce((acc, i) => acc + JSON.parse(i.score), 0))
    this.tableData.map((item) => item.percent = Math.ceil((item.sum * 100)/ 15))
    if (!localStorage.getItem('sort')){
      Object.assign(this.sortingFilter, {sortType: 'up', value: 'name'})
    } else {
      Object.assign(this.sortingFilter, JSON.parse(localStorage.getItem('sort')))
    }
  },
  computed: {
    sortedData () {
      if (typeof this.sortingFilter.value === "number") {
        if (this.sortingFilter.sortType === 'down'){
          return [...this.tableData].sort((a,b) => b.subjects[this.sortingFilter.value].score - a.subjects[this.sortingFilter.value].score)
        } else {
          return [...this.tableData].sort((a,b) => a.subjects[this.sortingFilter.value].score - b.subjects[this.sortingFilter.value].score)

        }
      } else if (this.sortingFilter.value === 'sum' || this.sortingFilter.value === 'percent') {
        if (this.sortingFilter.sortType === 'down') {
          return [...this.tableData].sort((a,b) => b[this.sortingFilter.value] - a[this.sortingFilter.value])
        } else {
          return [...this.tableData].sort((a,b) => a[this.sortingFilter.value] - b[this.sortingFilter.value])

        }
      } else {
        if (this.sortingFilter.sortType === 'down') {
          return [...this.tableData].sort((a,b) => b[this.sortingFilter.value].localeCompare(a[this.sortingFilter.value]))
        } else {
          return [...this.tableData].sort((a,b) => a[this.sortingFilter.value].localeCompare(b[this.sortingFilter.value]))
        }
      }
    },
    sortedAndSearchedData () {
      return [...this.sortedData].filter((item) => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    sortingFilter: {
      handler () {
        localStorage.setItem('sort', JSON.stringify(this.sortingFilter))
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    overflow-x: auto;
  }
  @media (max-width: 576px) {
    display: none;
  }

  &__table {
    width: 100%;
    border-radius: 4px;
    border-spacing: 0 4px;
  }

  &__header {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #006CFE;

    &:first-child {
      padding-left: 20px;
    }
  }

  &__name-column {
    width: 929px;
    text-align: left;
    @media (max-width: 1366px) {
      max-width: 415px;
    }
    @media (max-width: 768px) {
      min-width: 415px;
    }
  }

  &__other-columns {
    width: 181px;
  }

  &__data-row {
    background: #FFFFFF;

    &:hover {
      background: #EDF5
    }
  }
}

.table__data-row:hover > .table__body-column {
  border: 1px solid #D5E7FF;
  border-right: none;
}

.table__data-row:hover > .table__body-column:last-child {
  border-right: 1px solid #D5E7FF;
}

.pie {
  --p:20;
  --b:4px;
  --c:darkred;
  --w:40px;

  width:var(--w);
  aspect-ratio:1;
  position:relative;
  display:inline-grid;
  margin:5px;
  place-content:center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
.pie:before,
.pie:after {
  content:"";
  position:absolute;
  border-radius:50%;
}
.pie:before {
  z-index: 2;
  inset:0;
  background:
      radial-gradient(farthest-side,var(--c) 100%,#0000) top/var(--b) var(--b) no-repeat,
      conic-gradient(var(--c) calc(var(--p)*1%),#0000 0);
  -webkit-mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
  mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
}
.pie:after {
  inset:calc(50% - var(--b)/2);
  background:var(--c);
  transform:rotate(calc(var(--p)*3.6deg)) translateY(calc(50% - var(--w)/2));
}

.inner-pie {
  width:36px;
  aspect-ratio:1;
  border: 1px solid #D5E7FF;
  border-radius: 50%;
  position:relative;
  display:inline-grid;
  place-content:center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.date{
  min-width: 181px;
}
.russian-score{
  min-width: 141px;
}

.math-score{
  min-width: 155px;
}

.inform-score{
  min-width: 166px;
}

.score-sum{
  min-width: 139px;
}

.percent{
  min-width: 89px;
}
</style>
