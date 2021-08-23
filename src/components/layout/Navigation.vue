<template>
  <nav class="top-nav">
    <ul class="nav-list">
      <li class="nav-item">
        <a href=".">Home</a>
      </li>
    </ul>
    <div class="right-nav">

        <base-button type="submit"> Logout</base-button>

    </div>
  </nav>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
};
</script>

<style>
.top-nav {
  background-color: rgb(136, 218, 136);
  display : flex;
  position: sticky; 

}
.top-nav a {
  text-decoration: none;
}
.nav-list{
  list-style: none;
  width: 50%;
  display: flex;
}
.right-nav{
  width: 50%;
  text-align: center;
}

</style>