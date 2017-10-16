module.exports = {
  bindings: {
    user: '<'
  },
  controller(groups) {
    this.$onInit = function init() {
      groups.getGroup(this.user.id)
        .then((group) => {
          this.group = group;
        })
        .catch(console.error);
    };
  },
  templateUrl: 'staffView.template.html'
};
