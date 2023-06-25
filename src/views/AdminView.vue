<template>
  <!-- Users admin panel -->
  <v-card class="mx-auto my-8" min-width="400" max-width="1280" title="User panel" style="font-family: 'Primary Font', sans-serif;">
    <div class="d-flex justify-end">
      <v-btn color="light-blue-darken-4" class="mr-10" @click="addUser()" >Add</v-btn>
    </div>
    <v-row>
      <v-col cols="1" class="text-center primary-font">
        <div>Username:</div>
      </v-col>
      <v-col cols="1" class="text-center primary-font">
        <div>Password:</div>
      </v-col>
      <v-col cols="1" class="text-center primary-font">
        <div>Name:</div>
      </v-col>
      <v-col cols="1" class="text-center primary-font">
        <div>Lastname:</div>
      </v-col>
      <v-col cols="4" class="text-center primary-font">
        <div>Email:</div>
      </v-col>
      <v-col cols="4" class="text-center primary-font">
        <div>Actions:</div>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item v-for="user in users" :key="user.id">
        <v-list-item-content>
          <v-row>
            <v-col cols="1" class="text-center primary-font">{{ user.username }}</v-col>
            <v-col cols="1" class="text-center primary-font">{{ user.password }}</v-col>
            <v-col cols="1" class="text-center primary-font">{{ user.name }}</v-col>
            <v-col cols="1" class="text-center primary-font">{{ user.lastname }}</v-col>
            <v-col cols="4" class="text-center primary-font">{{ user.email }}</v-col>
            <v-col cols="4" class="text-center">
              <v-btn color="error" small @click="removeUser(user.id)">Remove</v-btn>
              <v-btn color="primary" small @click="editUser(user.id)">Edit</v-btn>
              <v-btn color="secondary" small @click="resetPassword(user.id)">Reset password</v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card>

  <!-- User add dialog -->
  <v-dialog v-model="isAddUser" max-width="500px">
    <v-card v-if="newUser">
      <v-card-title>Edit User</v-card-title>
      <v-card-text>
        <v-text-field v-model="newUser.username" label="Username"></v-text-field>
        <v-text-field v-model="newUser.password" label="Password"></v-text-field>
        <v-text-field v-model="newUser.name" label="Name"></v-text-field>
        <v-text-field v-model="newUser.lastname" label="Lastname"></v-text-field>
        <v-text-field v-model="newUser.email" label="Email"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="applyAddUser">Save</v-btn>
        <v-btn color="secondary" @click="cancelAddUser">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- User edit dialog -->
  <v-dialog v-model="isEditUser" max-width="500px">
    <v-card v-if="selectedUser">
      <v-card-title>Edit User</v-card-title>
      <v-card-text>
        <v-text-field v-model="selectedUser.username" label="Username"></v-text-field>
        <v-text-field v-model="selectedUser.password" label="Password"></v-text-field>
        <v-text-field v-model="selectedUser.name" label="Name"></v-text-field>
        <v-text-field v-model="selectedUser.lastname" label="Lastname"></v-text-field>
        <v-text-field v-model="selectedUser.email" label="Email"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveUserChanges">Save</v-btn>
        <v-btn color="secondary" @click="cancelEditUser">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Events admin panel -->
  <v-card class="mx-auto my-8" min-width="400" max-width="1280" title="Events panel" style="font-family: 'Primary Font', sans-serif;">
    <div class="d-flex justify-end">
      <v-btn color="light-blue-darken-4" class="mr-10" @click="addEvent()" >Add</v-btn>
    </div>
    <v-row>
      <v-col cols="2" class="text-center primary-font">
        <div>Name:</div>
      </v-col>
      <v-col cols="4" class="text-center primary-font">
        <div>Agenda:</div>
      </v-col>
      <v-col cols="2" class="text-center primary-font">
        <div>Event Date:</div>
      </v-col>
      <v-col cols="2" class="text-center primary-font">
        <div>Actions:</div>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item v-for="event in events" :key="event.id">
        <v-list-item-content>
          <v-row>
            <v-col cols="2" class="text-center primary-font">{{ event.eventName }}</v-col>
            <v-col cols="4" class="text-center primary-font">{{ event.agenda }}</v-col>
            <v-col cols="2" class="text-center primary-font">{{ formatDate(event.eventDate) }}</v-col>
            <v-col cols="2" class="text-center">
              <v-btn color="error" small @click="removeEvent(event.id)">Remove</v-btn>
              <v-btn color="primary" small @click="editEvent(event.id)">Edit</v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card>

  <!-- Event add dialog -->
  <v-dialog v-model="isAddEvent" max-width="500px">
    <v-card v-if="newEvent">
      <v-card-title>Edit Event</v-card-title>
      <v-card-text>
        <v-text-field v-model="newEvent.eventName" label="Event Name"></v-text-field>
        <v-text-field v-model="newEvent.agenda" label="Agenda"></v-text-field>
        <v-text-field v-model="formattedAddEventDate" @input="formatDate" label="Event Date" ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="applyAddEvent">Save</v-btn>
        <v-btn color="secondary" @click="cancelAddEvent">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Event edit dialog -->
  <v-dialog v-model="isEditEvent" max-width="500px">
    <v-card v-if="selectedEvent">
      <v-card-title>Edit Event</v-card-title>
      <v-card-text>
        <v-text-field v-model="selectedEvent.eventName" label="Event Name"></v-text-field>
        <v-text-field v-model="selectedEvent.agenda" label="Agenda"></v-text-field>
        <v-text-field v-model="formattedEditEventDate" @input="formatDate" label="Event Date" ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveEventChanges">Save</v-btn>
        <v-btn color="secondary" @click="cancelEditEvent">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Events requests admin panel -->
  <v-card class="mx-auto my-8" min-width="400" max-width="1280" title="Registration panel" style="font-family: 'Primary Font', sans-serif;">
    <v-row>
      <v-col cols="1" class="text-center primary-font">
        <div>Name:</div>
      </v-col>
      <v-col cols="1" class="text-center primary-font">
        <div>Last name:</div>
      </v-col>
      <v-col cols="1" class="text-center primary-font">
        <div>Event name:</div>
      </v-col>
      <v-col cols="2" class="text-center primary-font">
        <div>Event date:</div>
      </v-col>
      <v-col cols="1" class="text-center primary-font">
        <div>Type:</div>
      </v-col>
      <v-col cols="2" class="text-center primary-font">
        <div>Meals:</div>
      </v-col>
      <v-col cols="1" class="text-center primary-font">
        <div>Accepted:</div>
      </v-col>
      <v-col cols="3" class="text-center primary-font">
        <div>Actions:</div>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item v-for="request in eventsRequests" :key="request.id">
        <v-list-item-content>
          <v-row>
            <v-col cols="1" class="text-center primary-font">{{ request.user.name }}</v-col>
            <v-col cols="1" class="text-center primary-font">{{ request.user.lastname }}</v-col>
            <v-col cols="1" class="text-center primary-font">{{ request.event.eventName }}</v-col>
            <v-col cols="2" class="text-center primary-font">{{ formatDate(request.event.eventDate) }}</v-col>
            <v-col cols="1" class="text-center primary-font">{{ request.type }}</v-col>
            <v-col cols="2" class="text-center primary-font">{{ request.meals }}</v-col>
            <v-col cols="1" :class="request.accepted ? 'bg-blue' : 'bg-red'">{{ request.accepted }}</v-col>
            <v-col cols="3" class="text-center">
              <v-btn color="light-blue-darken-4" small @click="acceptRequest(request.id)">Accept</v-btn>
              <v-btn color="error" small @click="declineRequest(request.id)">Decline</v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

.primary-font {
  font-family: 'Space Grotesk', sans-serif;
  color: #1A237E;
}
</style>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      users: [],
      newUser: null,
      selectedUserId: null,
      isAddUser:false,
      isEditUser: false,

      events: [],
      newEvent: null,
      selectedEventId: null,
      isAddEvent: false,
      isEditEvent: false,

      eventsRequests: [],
    };
  },
  computed: {
    selectedUser() {
      if (this.selectedUserId !== null) {
        return this.users.find(user => user.id === this.selectedUserId);

      }
      return null;
    },
      selectedEvent() {
        if (this.selectedEventId !== null) {
          return this.events.find(event => event.id === this.selectedEventId);
        }
        return null;
      },
    formattedEditEventDate() {
      return this.formatDate(this.selectedEvent.eventDate);
    },
    formattedAddEventDate() {
      return this.formatDate(this.newEvent.eventDate);
    },
  },
  methods: {
    loadData() {
      axios.all([
        axios.get('http://localhost:8081/api/users/all'),
        axios.get('http://localhost:8081/api/events/all'),
        axios.get('http://localhost:8081/api/registrations/all')
      ])
          .then(axios.spread((usersResponse, eventsResponse, requestsResponse) => {
            this.users = usersResponse.data;
            this.events = eventsResponse.data;
            this.eventsRequests = requestsResponse.data;
          }))
          .catch(error => {
            console.log(error);
          });
    },
    formatDate(eventDate) {
      if (eventDate) {
        return moment(eventDate).format('MM/DD/YYYY hh:mm');
      }
    },
    addUser(){
      this.isAddUser = true;
      this.newUser = {
        username: "",
        password: "",
        name: "",
        lastname: "",
        email: ""
      };
    },
    applyAddUser() {
      axios.post('http://localhost:8081/api/register', this.newUser)
          .then(() => {
            this.isAddUser = false;
            this.newUser = null;
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
    },
    cancelAddUser() {
      this.isAddUser = false;
      this.newUser = null;
    },
    removeUser(userId) {
      axios.delete('http://localhost:8081/api/users/delete/' + userId)
      .then(()=> {
        this.loadData();
      })
      .catch(error => {
        console.log(error);
      })
    },
    editUser(userId) {
      this.selectedUserId = userId;
      this.isEditUser = true;
    },
    saveUserChanges() {
      axios.put('http://localhost:8081/api/users/update', this.selectedUser)
          .then(() => {
            this.isEditUser = false;
            this.selectedUserId = null;
            this.selectedUser = null;
          })
          .catch(error => {
            console.log(error);
          });
    },
    cancelEditUser() {
      this.isEditUser = false;
      this.selectedUserId = null;
      this.selectedUser = null;
    },
    resetPassword(userId) {
      axios.put('http://localhost:8081/api/users/resetpassword/' + userId)
          .then(()=>{
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          })
    },

    addEvent(){
      this.isAddEvent = true;
      this.newEvent = {
        eventName: "",
        agenda: "",
        eventDate: new Date(),
      }
    },
    applyAddEvent() {
      axios.post('http://localhost:8081/api/events/add', this.newEvent)
          .then(() => {
            this.isAddEvent = false;
            this.newEvent = null;
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
    },
    cancelAddEvent() {
      this.isAddEvent = false;
      this.newEvent = null;
    },
    removeEvent(eventId) {
      axios.delete('http://localhost:8081/api/events/delete/' + eventId)
          .then(()=> {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          })
    },
    editEvent(eventId) {
      this.selectedEventId = eventId;
      this.isEditEvent = true;
    },
    saveEventChanges() {
      this.selectedEvent.eventDate = moment(this.selectedEvent.eventDate).toISOString();
      axios.put('http://localhost:8081/api/events/update', this.selectedEvent)
          .then(() => {
            this.isEditEvent = false;
            this.selectedEventId = null;
            this.selectedEvent = null;
          })
          .catch(error => {
            console.log(error);
          });
    },
    cancelEditEvent() {
      this.isEditEvent = false;
      this.selectedEventId = null;
      this.selectedEvent = null;
    },

    acceptRequest(requestId) {
      axios.put('http://localhost:8081/api/registrations/accept/' + requestId)
          .then(()=>{
            this.loadData();
          })
          .catch(error => {
           console.log(error);
          })
    },
    declineRequest(requestId) {
      axios.put('http://localhost:8081/api/registrations/decline/' + requestId)
          .then(()=>{
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          })
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
