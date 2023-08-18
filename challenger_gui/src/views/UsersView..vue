<template>
    <div class="container">
        <div class="row">
            <h2 class="display-2">Users</h2>
        </div>
        <div class="row justify-content-center gap-3" v-if="users">
            <div v-for="user in users" class="card" style="width: 18rem;" :key="user.userID">
                <img :src="user.profilrUrl" class="card-img-top" :alt="user.fisrtName">
                <div class="card-body">
                  <h5 class="card-title">{{user.firstName}} {{user.lastname}}</h5>
                  <p class="card-text">
                    <span>Email addres: {{ user.emailAdd }}</span>
                  </p>
                </div>
            </div>
        </div>
        <div v-else class="row">
          <SpinnerComp/>
        </div>
    </div>
</template>

<script>
import SpinnerComp from '@/components/SpinnerComp.vue';
    export default {
        compunents:{
            SpinnerComp
        },
        computed:{
            users(){
                return this.$store.state.users
            }
        },
        mounted(){
            this.$store.dispatch('fetchUsers')
        }
    }
</script>

<style scoped>

</style>