
// SQL injection : 'or''s' , 'or''z'

const [results, metadat] = await dbConnection.query('SELECT username FROM users WHERE username = "${username}" AND password = "${password}"',{
    replacements:[usrname, password]
})


// replacements
const [results, metadat] = await dbConnection.query('SELECT username FROM users WHERE username = ? AND password = ?',{
    replacements:[usrname, password]
})


// Stopping SQL Injection with Bind Parameters
const [results, metadat] = await dbConnection.query('SELECT username FROM users WHERE username = $1 AND password = $2',{
    bind:[usrname, password]
})

// Passing Bind Parameters as an Object
const [results, metadat] = await dbConnection.query('SELECT username FROM users WHERE username = $username AND password = $password',{
    bind:{ username, password }
})

// Some Important Notes on Bind Parameters
