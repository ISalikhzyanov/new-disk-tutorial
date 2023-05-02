<template>
  <div class="search-input">
    <img src="@/assets/img/search.svg" alt="" class="search-input__img">
    <input :value="modelValue" type="text" placeholder="Поиск" @input='updateInput' class="search-input__input">
  </div>
</template>

<script>
export default {
props:{
  modelValue: String
},
  methods: {
  updateInput (event) {
    this.$emit('update', event.target.value)
  }
  }
}
</script>

<style lang="scss" scoped>
.search-input{
  display: flex;
  position: relative;
  height: 52px;
  margin: 20px 0;
  @media (max-width: 576px) {
    margin: 0 0 16px;
  }

  &__img{
    position: absolute;
    left: 16px;
    top: 50%;
    border-radius: 4px;
    transform: translateY(-50%);
  }

  &__input{
    width: 100%;
    max-width: 100vw;
    height: 100%;
    border: 1px solid #D5E7FF;
    border-radius: 4px;
    padding-left: 39px;
    outline: none;

    &:focus{
      border: 1.5px solid #006CFE;
    }
  }
}

</style>
