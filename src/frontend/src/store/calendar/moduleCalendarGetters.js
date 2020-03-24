export default {
  getEvent: (state) => (eventId) => state.events.find((event) => event.id === eventId)
};
