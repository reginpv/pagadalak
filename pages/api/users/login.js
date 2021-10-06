export default function login(req, res) {

  if(req.method == "POST") {

    const usernameData = "admin"
    const passwordData = "1234"

    const { username, password } = req.body

    if(usernameData==username && passwordData==password) {

      const data = {name:username}

      res.status(200).json(data)

    } else {

      res.status(200).json({})

    }

  } else {

    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')


  }

}
