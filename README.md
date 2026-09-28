## npm install
## npm start
## api listing

BaseUrl => http:localhost://8000

# authentication

  1. signUp => BaseUrl+ /signUp
  2. login => BaseUrl + /login
  3. updatePassword => BaseUrl + /updatePassword
  4. logout => BaseUrl + /logout

# profile

  5. profileView => BaseUrl + /profile/view
  6. profileEdit => BaseUrl + /profile/edit

# connections

  7. connection request => BaseUrl + /request/:status/:toUserId
  8. connection response => BaseUrl + /response/:status/:requestId

# users

  9. connections => BaseUrl + /user/connections
  10. requests => BaseUrl + /user/requests
  11. suggestions => BaseUrl + /user/feed
  

  collections link https://mallikarjun-velama09-9996209.postman.co/workspace/PlantsAura~cc742e3e-4248-44a6-bc21-372a233ed5a9/collection/50961637-75641d33-83bb-47c1-816e-3da27c147e62?action=share&source=copy-link&creator=50961637