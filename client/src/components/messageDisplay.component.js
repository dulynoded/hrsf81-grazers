module.exports = {
  bindings: {
    user: '<',
    group: '<'
  },
  controller(websockets, $http) {
    this.messages = [];
    this.$onChanges = (changesObj) => {
      if (changesObj.group.currentValue || changesObj.user.currentValue) {
        this.fetchUrl = this.user.role === 'organizer' ?
          '/messages/display/from/1' :
          `/messages/display/to/${this.group.id}`;
      }
      if (this.fetchUrl) {
        $http({
          method: 'GET',
          url: this.fetchUrl
        })
          .then(res => res.data)
          .then((data) => {
            this.messages = data.map((message) => {
              message.fromName = `${message.firstname} ${message.lastname}`;
              message.recipients = message.togroups.split('|');
              message.timestamp = new Date(Date.parse(message.date_time));
              message.pic = 'https://www.outerspaceuniverse.org/wp-content/uploads/venus.jpg';
              return message;
            });
          })
          .catch(console.error);
      }
    };

    this.receive = (event) => {
      console.log(`Message from the server ${event.data}`);
      const message = JSON.parse(event.data);
      message.timestamp = new Date();
      const isBroadcast = this.user.role === 'organizer' && message.fromId === this.user.id;
      if (isBroadcast || message.toIds.includes(this.group.id)) {
        this.messages = this.messages.concat(message);
        document.getElementById('hack').click();
      }
    };

    websockets.receive(this.receive);
  },
  templateUrl: 'messageDisplay.template.html'
};
