const db = require('./config')

exports.getUsers = async (req, res) => {
    await db.query("SELECT id, firstname, lastname, image FROM user", (err, result) => {
        if(err) console.log(err);
        
        let userResult = result[0]
        if(result.length === 0) {
            res.status(404).send('User not found')
        } else {
            //console.log(result);
            res.status(200).send({userResult})
        }
    })
}

exports.getMoreUserInfo = async (req, res) => {
    const start = req.body.rows

    await db.query("SELECT * FROM user LIMIT ?, 1",[start], (err, result) => {
        if(err) console.log(err);
        
        //let userInfo = result[0]
        if(result.length === 0) {
            res.status(404).send('No more user info found!')
        } else {
            //console.log(result);
            res.status(200).send(result[0])
        }
    })
}