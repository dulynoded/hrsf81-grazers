module.exports = {

  events: [
    {
      name: 'Grazers Con',
      location: '944 Market Street, 8th floor, San Francisco, CA 94102',
      organizer_id: 1,
    }
  ],

  schedules: [
    {
      date: '2017-10-09',
      eventId: 1
    },
    {
      date: '2017-10-10',
      eventId: 1
    }
  ],

  activities: [
    {
      starttime: '08:00:00',
      endtime: '10:00:00',
      activity: 'Registration',
      location: 'Front Lobby',
      scheduleId: 1
    },
    {
      starttime: '10:00:00',
      endtime: '11:00:00',
      activity: 'Keynote Speaker',
      location: 'Main Auditorium',
      scheduleId: 1
    },
    {
      starttime: '12:00:00',
      endtime: '13:30:00',
      activity: 'Lunch',
      location: 'Grand Ballroom',
      scheduleId: 1
    },
    {
      starttime: '14:00:00',
      endtime: '14:00:00',
      activity: 'Breakout Sessions I',
      location: 'Blue, Green and Yellow Rooms',
      scheduleId: 1
    },
    {
      starttime: '16:00:00',
      endtime: '18:00:00',
      activity: 'Breakout Sessions II',
      location: 'Blue, Green and Yellow Rooms',
      scheduleId: 1
    },
    {
      starttime: '18:30:00',
      endtime: '20:30:00',
      activity: 'Dinner',
      location: 'Grand Ballroom',
      scheduleId: 1
    },
    {
      starttime: '21:30:00',
      endtime: '23:30:00',
      activity: 'Movies Under the Stars',
      location: 'Center Gardens',
      scheduleId: 1
    },
    {
      starttime: '09:00:00',
      endtime: '10:00:00',
      activity: 'Continental Breakfast',
      location: 'Grand Ballroom',
      scheduleId: 2
    },
    {
      starttime: '10:00:00',
      endtime: '11:30:00',
      activity: 'Panel: Famous People',
      location: 'Main Auditorium',
      scheduleId: 2
    },
    {
      starttime: '12:00:00',
      endtime: '13:00:00',
      activity: 'Lunch',
      location: 'Grand Ballroom',
      scheduleId: 2
    },
    {
      starttime: '14:00:00',
      endtime: '15:00:00',
      activity: 'Art Exhibition',
      location: 'Center Gardens',
      scheduleId: 2
    },
    {
      starttime: '15:00:00',
      endtime: '18:00:00',
      activity: 'Tea Time',
      location: 'Grand Ballroom',
      scheduleId: 2
    },
    {
      starttime: '18:00:00',
      endtime: '19:00:00',
      activity: 'Dinner',
      location: 'Grand Ballroom',
      scheduleId: 2
    },
    {
      starttime: '19:00:00',
      endtime: '21:30:00',
      activity: 'Awards Ceremony',
      location: 'Main Auditorium',
      scheduleId: 2
    }
  ],

  groups: [
    {
      name: 'Greeters',
      type: 'staff',
      event_id: 1,
    },
    {
      name: 'Volunteers',
      type: 'staff',
      event_id: 1,
    },
    {
      name: 'Tech Support',
      type: 'staff',
      event_id: 1,
    },
    {
      name: 'General Admissions',
      type: 'attendee',
      event_id: 1,
    }
  ],

  groupActivity: [
    {
      groupId: 1,
      activityId: 1
    },
    {
      groupId: 2,
      activityId: 1
    },
    {
      groupId: 3,
      activityId: 1
    },
    {
      groupId: 4,
      activityId: 2
    },
    {
      groupId: 2,
      activityId: 3
    },
    {
      groupId: 1,
      activityId: 4
    },
    {
      groupId: 1,
      activityId: 5
    },
    {
      groupId: 3,
      activityId: 6
    },
    {
      groupId: 3,
      activityId: 7
    },
    {
      groupId: 2,
      activityId: 7
    },
    {
      groupId: 1,
      activityId: 8
    },
    {
      groupId: 4,
      activityId: 8
    },
    {
      groupId: 3,
      activityId: 8
    },
    {
      groupId: 2,
      activityId: 9
    },
    {
      groupId: 3,
      activityId: 10
    },
    {
      groupId: 2,
      activityId: 11
    },
    {
      groupId: 2,
      activityId: 12
    },
    {
      groupId: 1,
      activityId: 12
    },
    {
      groupId: 4,
      activityId: 13
    },
    {
      groupId: 4,
      activityId: 14
    },
    {
      groupId: 3,
      activityId: 14
    }
  ],

  organizer: {
    role: 'organizer',
    firstname: 'Laurent',
    lastname: 'Frazier',
    email: 'laurent@grazerscon.com',
    phone: '555-235-9802',
    password: '$2a$08$4Crout.sX8BOIZY72Wtk1uGciTEr8BP2cu7Q8MH9vd1s1yMZ.8VwW',
    event_id: 1,
  },

  users: [
    {
      role: 'staff',
      firstname: 'David',
      lastname: 'Friedman',
      email: 'david@grazerscon.com',
      phone: '555-492-1763',
      password: '$2a$08$4Crout.sX8BOIZY72Wtk1uGciTEr8BP2cu7Q8MH9vd1s1yMZ.8VwW',
      event_id: 1,
    },
    {
      role: 'staff',
      firstname: 'Austin',
      lastname: 'Sloane',
      email: 'austin@grazerscon.com',
      phone: '555-687-9321',
      password: '$2a$08$4Crout.sX8BOIZY72Wtk1uGciTEr8BP2cu7Q8MH9vd1s1yMZ.8VwW',
      event_id: 1,
    },
    {
      role: 'staff',
      firstname: 'Haruki',
      lastname: 'Dante',
      email: 'haruki@grazerscon.com',
      phone: '555-234-0745',
      password: '$2a$08$4Crout.sX8BOIZY72Wtk1uGciTEr8BP2cu7Q8MH9vd1s1yMZ.8VwW',
      event_id: 1,
    },
    {
      role: 'attendee',
      firstname: 'Christine',
      lastname: 'Wong',
      email: 'christine@randomperson.com',
      phone: '555-299-4236',
      password: '$2a$08$4Crout.sX8BOIZY72Wtk1uGciTEr8BP2cu7Q8MH9vd1s1yMZ.8VwW',
      event_id: 1,
    },
    {
      role: 'staff',
      firstname: 'Rafiqa',
      lastname: 'Chukwudi',
      email: 'rafiqa@grazerscon.com',
      phone: '555-596-4104',
      password: '$2a$08$4Crout.sX8BOIZY72Wtk1uGciTEr8BP2cu7Q8MH9vd1s1yMZ.8VwW',
      event_id: 1,
    }
  ],

  userGroups: [
    {
      groupId: 2,
      userId: 3
    },
    {
      groupId: 2,
      userId: 4
    },
    {
      groupId: 3,
      userId: 2
    },
    {
      groupId: 1,
      userId: 5
    },
    {
      groupId: 2,
      userId: 6
    }
  ],

  messages: [
    {
      fromId: 3,
      toIds: [2],
      title: '',
      text: 'I just signed in for lemonade stand duty and we are out of lemons!',
      eventId: 1,
      timestamp: new Date(),
      msgGroupId: 1
    },
    {
      fromId: 1,
      toIds: [1, 2],
      title: 'Room Change',
      text: 'The "Guilt-Free Grazing" seminar has moved from the Grand Ballroom to the Autumm room.',
      eventId: 1,
      timestamp: new Date(),
      msgGroupId: 2
    },
    {
      fromId: 1,
      toIds: [3],
      title: 'Room Change',
      text: 'The "Guilt-Free Grazing" seminar has moved from the Grand Ballroom to the Autumm room.',
      eventId: 1,
      timestamp: new Date(),
      msgGroupId: 2
    },
    {
      fromId: 1,
      toIds: [4],
      title: 'Welcome!',
      text: 'Post your memories to Instagram with hashtag #GrazerCon2017. Daily prizes for best photo!',
      eventId: 1,
      timestamp: new Date(),
      msgGroupId: 3
    }
  ]
};
