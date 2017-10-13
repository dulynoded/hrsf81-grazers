function groups($http) {
  this.get = (eventId = 1) => {
    return $http({
      method: 'GET',
      url: `/event/${eventId}/groups`
    })
      .then(response => response.data)
      .catch(console.error);
  };

  this.getMembers = groupId =>
    $http({
      method: 'GET',
      url: `/group/${groupId}/users`
    })
      .then(response => response.data)
      .catch(console.error);

  this.getGroup = userId =>
    $http({
      method: 'GET',
      url: `/user/${userId}/group`
    })
      .then(response => response.data)
      .catch(console.error);
}

module.exports = groups;
