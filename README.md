# EnginnnerBabu
Final round assignment
Steps to start the application 
Install the json server with npm install -g json-server in one folder and in that folder make a file name db.json
and insid db.json make an array of object 
{
  "users": [ {
      "email": "crickbuzz@gmail.co",
      "password": "typicode",
      "name": "SubhraChandra",
      "hobbie": "Cricket",
      "id": 1
    }]
}
and than we will run json-server --watch db.json --port 3004
our database server will be started on http://localhost:3004/users
and we will use this json server for data manegement of this application 
and for frontend just clone the repo and do npm i and than npm start 
and the / route is for superadmin  and /admin/dashboard is where admin can create 
users and after succcesfull creation of user it will redirect to admin/table
where all the users are listed and the pagination is also implemented with page size of 10 
and you can't aceess the /admin/dashboard  and /admin/table without logged in as superuser


for a particular user the login page is at /user and if the email exist in db.json than it is redirected to the user/view where there is list of players and the pageSize of the pagination is 50 you can't access the /user/view directly without login as a user 