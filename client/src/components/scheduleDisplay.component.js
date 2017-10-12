module.exports = {
  bindings: {
    heading: '@',
    schedule: '<',
    user: '<'
  },
  controller() {
    this.selectedIndex = 0;
  },
  templateUrl: 'scheduleDisplay.template.html'
};
