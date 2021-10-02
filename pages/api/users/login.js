export default function login(req, res) {

  if(req.method == "POST") {

    const usernameData = process.env.ADMIN_USER
    const passwordData = process.env.ADMIN_PASS

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
