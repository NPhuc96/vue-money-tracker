<template>
  <base-card class="body-container">
    <span>{{id}}</span>
    <span>{{time}}</span>
    <span>{{group}}</span>
    <span>{{note}}</span>
    <span>{{money}}</span>
    <div>
    <base-button>Edit</base-button>
    <base-button>Delete</base-button>
    </div>
    
  </base-card>
</template>

<script>
import BaseButton from '../../components/UI/BaseButton.vue'
export default {
  components: { BaseButton },
    props : {
        id : {
            type: Number
        },
        group : {
            type: String,
            required: true
        },
        note : {
            type: String
        },
        time : {
            type :String,
            required : true
        },
        money : {
            type: Number,
            required : true
        }
    }
}
</script>

<style>
.body-container{
    display: flex;
    column-gap: 10%;
    width: 70%;    
}
</style>