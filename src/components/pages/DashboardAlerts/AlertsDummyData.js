export const dummyData = [
  {
    clubid: 1,
    clubname: 'Jackson',
    clubmembers: [
      // for each member there is an alert
      {
        memberid: 1,
        reactions: [
          {
            clubid: 1,
            activity: {
              activityid: 1,
              activityname: 'bowling',
            },
            reactionvalue: '10D3',
            intigerValue: 1,
            resolved: false, //need to set local state of bool as well as on hte backend
          },
        ],
      },
    ],
  },
  {
    clubid: 2,
    clubname: 'Anderson',
    clubmembers: [
      // for each member there is an alert
      {
        memberid: 3,
        reactions: [
          {
            clubid: 2,
            activity: {
              activityid: 1,
              activityname: 'bowling',
            },
            reactionvalue: '10D3',
            intigerValue: 1,
            resolved: false, //need to set local state of bool as well as on hte backend
          },
        ],
      },
    ],
  },
  {
    clubid: 2,
    clubname: 'Anderson',
    clubmembers: [
      // for each member there is an alert
      {
        memberid: 2,
        reactions: [
          {
            clubid: 2,
            activity: {
              activityid: 1,
              activityname: 'bowling',
            },
            reactionvalue: '10D3',
            intigerValue: 1,
            resolved: false, //need to set local state of bool as well as on hte backend
          },
        ],
      },
    ],
  },
  {
    clubid: 2,
    clubname: 'Anderson',
    clubmembers: [
      // for each member there is an alert
      {
        memberid: 2,
        reactions: [
          {
            clubid: 2,
            activity: {
              activityid: 2,
              activityname: 'skydiving',
            },
            reactionvalue: '10D3',
            intigerValue: 1,
            resolved: false, //need to set local state of bool as well as on hte backend
          },
        ],
      },
    ],
  },
];
