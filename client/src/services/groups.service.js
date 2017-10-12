function groups($http) {
  this.get = () => {
    const tempEventId = 1;
    return $http({
      method: 'GET',
      url: `/event/${tempEventId}/groups`
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

  this.getGroup = (userId, groupId) =>
    $http({
      method: 'GET',
      url: `/user/${userId}/group`
    })
      .then(response => response.data)
      .catch(console.error);
}

module.exports = groups;
