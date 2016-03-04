# Cellar-my-Narwahls

[![Build Status](https://travis-ci.org/sschadwick/Cellar-my-Narwahls.svg?branch=master)](https://travis-ci.org/sschadwick/Cellar-my-Narwahls)

Cellar my Narwahls is a cellar management service, aimed at helping people to manage what they can't easily see and have purposefully put away.

## User API

#### POST server/cellar/signup
The User API is used to authenticate the user. First, send a POST containing JSON {'username': 'admin', : 'password': 'foobar123'} to server/cellar/signup. The server will create the user and return an encrypted token.

#### GET server/cellar/signin
To signin, send a GET request to server/cellar/signin with Basic authorization headers. If signin is successful, the server will return an encrypted token.

Example:
headers: {
  authorization: 'Basic ' + ('testuser1: foobar123').toString('base64')
}


## Item API
All of the Item routes will check for the token to validate the user.

#### GET server/cellar/items
A GET request to /items will return all of the items belonging to the logged in user by reading the token.

#### POST server/cellar/create
This route is used to create a new item in the item database. It is expecting a fully populated JSON object.
It will return the newly created item.

#### POST server/cellar/items
This will add the item to the user's inventory. Send JSON {'itemID': 12345, 'qty': 5}
It will return an updated list of users inventory.

#### PUT server/cellar/items/:id
This will update the quantity of the id of the item listed above. Send JSON {'qty': 20}
It will return the newly updated item with updated qty.

#### DELETE server/cellar/items/:id
This removes the item with the matching id from the user's inventory.
It will return {'msg': 'deleted'}
