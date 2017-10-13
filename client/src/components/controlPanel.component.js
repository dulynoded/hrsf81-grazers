module.exports = {
  bindings: {
    user: '<',
    group: '<',
    changeView: '<'
  },
  controller(groups, $http) {
    this.$onInit = () => {
      $http.get('/events', { params: { id: this.user.event_id } })
        .then((results) => {
          this.event = results.data[0].name;
        })
        .catch((err) => {
          throw err;
        });

      groups.get(this.user.event_id)
        .then((groupsData) => {
          this.groups = groupsData;
        })
        .catch(console.error);
    };
    this.event = '';

    this.$onChanges = (changesObj) => {
      if (changesObj.group.currentValue) {
        groups.getMembers(this.group.id)
          .then((members) => {
            this.members = members.filter(member => member.id !== this.user.id);
          })
          .catch(console.error);
      }
    };
  },
  templateUrl: 'controlPanel.template.html'
};
