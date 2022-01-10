
// SQL injection

const [results, metadat] = await dbConnection.query('SELECT username FROM users WHERE username = "${username}" AND password = "${password}"',{
    replacements:[usrname, password]
})


// replacements
const [results, metadat] = await dbConnection.query('SELECT username FROM users WHERE username = ? AND password = ?',{
    replacements:[usrname, password]
})
