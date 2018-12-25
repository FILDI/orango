module.exports = async db => {
  const User = db.model('User')
  const Identity = db.model('Identity')

  let UserQuery = User.update({
    firstName: 'John'
  })
    .where({
      _key: '@{^.user}'
    })
    // .name('u')
    .return()

  let query = Identity.update({
    verified: true,
    bogus: true
  })
    .one()
    .where({
      _key: '217388'
    })
    .name('u')
    .query('user', UserQuery)
    .select('name')
    .return(
      db.return
        .append('user', 'myUser')
        .append('user', 'myUser2')
        .merge('user')
        .one()
    )

  // FOR DEMO ONLY - show the raw query data
  let queryData = JSON.stringify(query)
  console.log(queryData.green)

  // FOR DEMO ONLY - show the AQL
  let aql = await query.toAQL(true)
  console.log(aql.cyan)
}
