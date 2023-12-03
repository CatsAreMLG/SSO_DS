import express from "express"
import session from "express-session"
import { WorkOS } from "@workos-inc/node"

const app = express()
const router = express.Router()

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientID = process.env.WORKOS_CLIENT_ID
const organizationID = process.env.WORKOS_ORGANIZATION_ID
const directoryID = process.env.WORKOS_DIRECTORY_ID
const redirectURL = process.env.PRODUCTION_URL || "http://localhost:8000"
const state = ""

router.get("/", function (req, res) {
  if (session.isloggedin) {
    res.render("login_successful.ejs", {
      profile: session.profile,
      first_name: session.first_name,
    })
  } else {
    res.render("index.ejs", { title: "Home" })
  }
})

router.get("/users", async (req, res) => {
  try {
    const users = await workos.directorySync.listUsers({
      directory: directoryID,
    })

    let usersArray = []

    for (const [key, value] of Object.entries(users.data)) {
      usersArray.push({
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.emails[0].value || "No email",
      })
    }

    console.log(users)

    res.render("users.ejs", { users: usersArray })
  } catch (error) {
    res.render("error.ejs", { error: error })
  }
})

router.post("/login", (req, res) => {
  const login_type = req.body.login_method

  const params = {
    clientID: clientID,
    redirectURI: redirectURL + "/callback",
    state: state,
  }

  if (login_type === "saml") {
    params.organization = organizationID
  } else {
    params.provider = login_type
  }

  try {
    const url = workos.sso.getAuthorizationURL(params)
    res.redirect(url)
    console.log(url)
  } catch (error) {
    res.render("error.ejs", { error: error })
  }
})

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query

    const profile = await workos.sso.getProfileAndToken({
      code,
      clientID,
    })
    const json_profile = JSON.stringify(profile, null, 4)

    session.first_name = profile.profile.first_name
    session.profile = json_profile
    session.isloggedin = true

    res.redirect("/")
  } catch (error) {
    res.render("error.ejs", { error: error })
  }
})

router.get("/logout", async (req, res) => {
  try {
    session.first_name = null
    session.profile = null
    session.isloggedin = null

    res.redirect("/")
  } catch (error) {
    res.render("error.ejs", { error: error })
  }
})

export default router
