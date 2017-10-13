module.exports = {
  bindings: {
    eventId: '<',
  },
  controller($mdDialog, $scope) {
    this.showActivityCreateDialog = (ev) => {
      $mdDialog.show({
        controller: $scope.DialogController,
        templateUrl: 'activityCreateDialog.template.html',
        preserveScope: true,
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true
      })
        .then((input) => {
          this.createActivity(input);
        })
        .catch(console.error);
    };

    this.createActivity = () => {
    };
  },
  templateUrl: 'activityCreate.template.html'
};
