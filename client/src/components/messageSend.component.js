const aws = require('../../../server/helpers/aws');
// const db = require('../../../database/index.js');

module.exports = {
  bindings: {
    user: '<',
    group: '<'
  },
  controller(groups, websockets, $mdDialog, $scope) {
    this.$onChanges = (changesObj) => {
      if (changesObj.group.currentValue || changesObj.user.currentValue) {
        this.messageTitle = '';
        this.messageBody = '';
        this.messageTo = this.user.role === 'organizer' ? [] : [JSON.stringify([this.group.id, this.group.name])];
      }
    };

    this.clearInputs = () => {
      this.messageTitle = '';
      this.messageBody = '';
      this.messageTo = this.user.role === 'organizer' ? [] : [JSON.stringify([this.group.id, this.group.name])];
    };

    this.showSendMessageDialog = (ev) => {
      let template;
      if (this.user.role === 'organizer') {
        template = 'messageSendDialog.template.html';
      } else {
        template = 'messageSendStaffDialog.template.html';
      }
      $mdDialog.show({
        controller: $scope.DialogController,
        templateUrl: template,
        preserveScope: true,
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true
      })
        .then((input) => {
          this.sendMessage();
        })
        .catch(console.error);
    };

    $scope.DialogController = ($scope) => {
      $scope.isShown = false;
      $scope.toggleCategory = (category) => {
        aws.promiz(category).then((data) => {
          $scope.items = data.Contents.map(entry => entry.Key).slice(1);
        })
          .then(() => {
            $scope.isShown = true;
          });
      };
      $scope.resource = 'https://s3-us-west-1.amazonaws.com/hrsf81-grazers/'
      $scope.selectSticker = (sticker) => {
        $scope.path = sticker;
      };

      $scope.addFave = (fav) => {
        // db.addFavorite(this.user.id, `${$scope.resource}${fav}`);
      }

      $scope.msg = {
        user: this.user,
        messageTitle: this.messageTitle,
        messageTo: this.messageTo,
        messageBody: this.messageBody,
        messageMedia: this.messageMedia
      };

      groups.get(this.user.event_id)
        .then((groupData) => {
          $scope.groups = groupData;
        })
        .catch(console.error);

      $scope.hide = () => {
        $mdDialog.hide();
      };

      $scope.sendAndClose = () => {
        this.messageTo = $scope.msg.messageTo;
        this.messageTitle = $scope.msg.messageTitle;
        this.messageBody = $scope.msg.messageBody;
        this.messageMedia = `${$scope.resource}${$scope.path}`;
        $mdDialog.hide();
      };
    };

    this.sendMessage = () => {
      const toGroupIds = [];
      const toGroupNames = [];
      this.messageTo = this.messageTo.map(toGroup => JSON.parse(toGroup));
      this.messageTo.forEach((toGroup) => {
        toGroupIds.push(toGroup[0]);
        toGroupNames.push(toGroup[1]);
      });
      websockets.send(JSON.stringify({
        recipients: toGroupNames,
        toIds: toGroupIds,
        title: this.messageTitle,
        text: this.messageBody,
        media: this.messageMedia,
        fromName: `${this.user.firstname} ${this.user.lastname}`,
        fromId: this.user.id,
        eventId: this.user.event_id,
      }));
      this.clearInputs();
    };

    this.doSomething = () => {
      console.log('This is a workaround');
    };
  },
  templateUrl: 'messageSend.template.html'
};
