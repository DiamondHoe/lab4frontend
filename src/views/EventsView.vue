<template>
  <v-form @submit.prevent="submitEvent">
    <v-card class="mx-auto my-8" min-width="628" title="Register for event">
      <v-select v-model="selectedEvent" :items="eventNames" label="Event name" required></v-select>
      <v-text-field v-model="eventId" label="Event id" readonly multi-line rows="2"></v-text-field>
      <v-text-field v-model="agenda" label="Agenda" readonly multi-line rows="2"></v-text-field>
      <v-text-field v-model="eventDate" label="Event date" type="text"  readonly></v-text-field>
      <v-select v-model="participationType" :items="participationTypes" label="Type of participation"></v-select>
      <v-select v-model="mealPreference" :items="mealPreferences" label="Meals"></v-select>
      <v-btn type="submit" color="light-blue-darken-4">Submit</v-btn>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: null,
      events: [],
      eventId: null,
      selectedEvent: null,
      eventNames: [],
      eventName: "",
      agenda: "",
      eventDate: null,
      participationType: "",
      mealPreference: "",
      participationTypes: ["Listener", "Author", "Sponsor", "Organizer"],
      mealPreferences: ["No preference", "Vegetarian", "No gluten"],
    };
  },
  methods: {
    loadEvents() {
      axios
          .get("http://localhost:8081/api/events/all")
          .then((response) => {
            this.events = response.data;
            this.eventNames = this.events.map((event) => event.eventName);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    updateAgendaEventDate() {
      const selectedEvent = this.events.find((event) => event.eventName === this.selectedEvent);
      if (selectedEvent) {
        this.eventId = selectedEvent.id;
        this.agenda = selectedEvent.agenda;
        this.eventDate = new Date(selectedEvent.eventDate).toLocaleDateString();
      } else {
        this.agenda = "";
        this.eventDate = null;
      }
    },
    submitEvent() {
      axios.post("http://localhost:8081/api/registrations/register", {
        userId: this.userId,
        eventId: this.eventId,
        type: this.participationType,
        meal: this.mealPreference
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        alert(error.response.data);
      })
    },
  },
  watch: {
    selectedEvent() {
      this.updateAgendaEventDate();
    },
  },
  mounted() {
    this.userId = parseInt(this.$route.params.userId, 10);
    this.loadEvents();
  },
};
</script>
