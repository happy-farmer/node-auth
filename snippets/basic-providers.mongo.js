// Get user id name and login providers user has assigned to
/* global db */
db.users.aggregate([
  {
    $project: {
      profile: 1,
      providers: [
        '$providers.facebook.provider',
        '$providers.twitter.provider',
        '$providers.google.provider'
      ]
    }
  },
  {
    $project: {
      name: '$profile.name',
      providers: {
        $filter: {
          input: '$providers',
          as: 'provider',
          cond: { $ne: ['$$provider', null] }
        }
      }
    }
  }
]).pretty() // please
