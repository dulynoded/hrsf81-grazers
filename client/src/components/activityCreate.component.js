module.exports = {
  bindings: {
    eventId: '<',
    eventInfo: '<',
  },

  controller(groups, $http, $mdDialog, $scope, websockets) {
    this.clearInputs = () => {
      this.activityDate = '';
      this.activityStartTime = '';
      this.activityEndTime = '';
      this.activityTitle = '';
      this.activityLocation = '';
      this.activityGroups = '';
    };

    this.showActivityCreateDialog = (ev) => {
      $mdDialog.show({
        controller: $scope.DialogController,
        templateUrl: 'activityCreateDialog.template.html',
        preserveScope: true,
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true
      })
        .then(() => {
          this.createActivity();
        })
        .catch(console.error);
    };

    $scope.DialogController = ($scope) => {
      $scope.activity = {
        activityDate: this.activityDate,
        activityStartTime: this.activityStartTime,
        activityEndTime: this.activityEndTime,
        activityTitle: this.activityTitle,
        activityLocation: this.activityLocation,
        activityGroups: this.activityGroups,
        minDate: new Date(this.eventInfo.startdate),
        maxDate: new Date(this.eventInfo.enddate),
      };

      groups.get(this.eventId)
        .then((groupData) => {
          $scope.groups = groupData;
        })
        .catch(console.error);

      $scope.hide = () => {
        $mdDialog.hide();
      };

      $scope.sendAndClose = () => {
        this.activityDate = $scope.activity.activityDate;
        this.activityStartTime = $scope.activity.activityStartTime;
        this.activityEndTime = $scope.activity.activityEndTime;
        this.activityTitle = $scope.activity.activityTitle;
        this.activityLocation = $scope.activity.activityLocation;
        this.activityGroups = $scope.activity.activityGroups;
        $mdDialog.hide();
      };
    };

    this.createActivity = () => {
      const groupsArr = this.activityGroups.map(group => JSON.parse(group)[1]);

      websockets.send(JSON.stringify({
        event_id: this.eventId,
        date: this.activityDate,
        starttime: this.activityStartTime,
        endtime: this.activityEndTime,
        activity: this.activityTitle,
        location: this.activityLocation,
        groups: groupsArr,
      }));
      // $http.post('/activity', {
      //   event_id: this.eventId,
      //   date: this.activityDate,
      //   starttime: this.activityStartTime,
      //   endtime: this.activityEndTime,
      //   activity: this.activityTitle,
      //   location: this.activityLocation,
      //   groups: groupsArr
      // })
        // .then(response => response.data)
        // .then((data) => {
        //   console.log('activity return data', data);
          this.clearInputs();
        // });
    };
  },
  templateUrl: 'activityCreate.template.html'
};
