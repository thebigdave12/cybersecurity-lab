const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) { 
        if (users[i].username === username) { 
           let exsistingUser = bcrypt.compareSync(password, users[i].pinHash) 
          if(exsistingUser){
            let userReturn = {...users[i]}
            delete userReturn.pinHash
            res.status(200).send(userReturn)
          }
          
          
          } else {
            res.status(400).send("User not found.")
        }
      }
      
    },

    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
       
        

        const salt = bcrypt.genSaltSync(5)

        const pinHash = bcrypt.hashSync(req.body.password, salt)

        let newUserObj = {
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          pinHash
        }

     

        users.push(newUserObj)

        let pinHashDeleted = {...newUserObj}
        delete pinHashDeleted.pinHash
        
        res.status(200).send(pinHashDeleted)
        // console.log(pinHash)
        // console.log(pinHashDeleted)
        // console.log(newUserObj)
    }
}