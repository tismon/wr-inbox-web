<template>
  <div class="inbox">

    <!-- logo -->
    <img alt="Inbox logo" width="400px" src="../assets/inbox.jpg">
    <!-- /logo -->

    <!-- search -->
    <div class="ml-5 mr-5">
      <b-row>
        <b-col cols="3"><b-form-input v-model="search" placeholder="Search"></b-form-input></b-col>
        <b-col class="text-left">
          <b-button @click="doSearch" variant="primary">Search</b-button>
          &nbsp;
          <b-button @click="clearSearch" variant="secondary">Clear</b-button>
        </b-col>
      </b-row>
      
    </div>
    <!-- /search -->
    <p></p>
    <!-- emails -->
    <div class="email-wrapper ml-5 mr-5 mt-10">
      <b-table id="emails_table" responsive :items="items" :per-page="perPage" :current-page="currentPage" ></b-table>
    </div>
    <!-- /emails -->

    <!-- pagination -->
    <div class="ml-5">
      <paginate
        :page-count="Math.trunc(totalEmails/perPage)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="getEmails"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'">
      </paginate>
    </div>
    <!-- /pagination -->

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Vue from 'vue'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)

export default {
  name: 'Inbox',
  data() {
    return {
      search:null,
      emails: null,
      totalEmails:0,
      perPage: 3,
      currentPage: 1,
      fields: ['email_from', 'subject', 'content', 'email_date'],
      items: []
    }
  },
  methods:{
    doSearch()
    {
      this.items = [];
      this.currentPage = 1;
      this.getEmails();
    },
    clearSearch:function()
    {
      this.search = null;
      this.items = [];
      this.currentPage = 1;
      this.getEmails();
    },
    getEmails: function(clickedPage)
    {
      const self = this;
      //this.items = [];
      axios.post('http://localhost:8000/inbox?page='+(clickedPage||this.currentPage), { search: this.search })
      .then(function(response){
        self.emails = response.data.data.data;
        self.perPage = response.data.data.per_page;
        self.currentPage = response.data.data.current_page;
        self.totalEmails = response.data.data.total;

        for (var index in self.emails) 
        {
          self.emails[index]['content'] = self.emails[index]['content'].substring(0, 100)+'...';
          self.items.push(self.emails[index]);
        }        
      });
    }
  },
  created() {
    this.getEmails();
  }
}
</script>

<style>
  .email-wrapper{
    text-align: left;
  }
  .pagination li{
    padding: 5px 10px;
    border: 1px solid;
  }
</style>
