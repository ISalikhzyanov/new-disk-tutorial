<template>
  <div class="main">
    <h1>Список заявлений</h1>
    <SearchInput v-model="searchQuery" @update="handleUpdate"/>
    <Table :search-query="searchQuery"/>
    <MobileTable :search-query="searchQuery"/>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue";
import Table from "@/components/Table.vue";
import MobileTable from "@/components/MobileTable.vue";

export default {
  components: {MobileTable, Table, SearchInput},
data () {
    return{
      searchQuery: ''
    }
},
  methods: {
    handleUpdate (value) {
      this.searchQuery = value
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  padding: 0 60px 60px;
  flex-direction: column;
  @media (max-width: 768px) {
   padding: 0 40px 40px;
  }
  @media (max-width: 576px) {
    padding: 0 12px;
  }
}
</style>
