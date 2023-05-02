<template>
  <div class="navbar">
    <img src="@/assets/img/logo.svg" alt="logo">
    <div class="user">
      <div class="user__info">
        <span class="user__name">Светлана</span>
        <span class="user__post">Сотрудник</span>
      </div>
      <img class="user__photo" src="@/assets/img/employee.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }

}
</script>

<style lang="scss" scoped>
.navbar{
  height: 84px;
  background: #FFFFFF;
  padding: 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
  @media (max-width: 768px) {
    padding: 0 40px;
  }
  @media (max-width: 576px) {
    padding: 0 12px;
    margin-bottom: 0;
  }
}

.user{
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;

  &__info{
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  &__name{
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #006CFE;
  }

  &__post{
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #8D9FB7;
  }

  &__photo{
    image-rendering: pixelated;
  }
}
</style>
