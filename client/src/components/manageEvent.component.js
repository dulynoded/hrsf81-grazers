module.exports = {
  bindings: {
    user: '<'
  },
  controller() {
    // TODO: Remove hardcoding when there is proper event creation and management
    // this.eventId = 1;
    this.view = 'broadcast';

    this.changeView = (view, id) => {
      this.view = view;
      this.groupId = id || null;
    };
  },
  templateUrl: 'manageEvent.template.html'
};
