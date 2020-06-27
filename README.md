# Authentication API
## Register JSON { "username": "Required", "password": "Required" }
### https://wunderlist3.herokuapp.com/api/auth/register

## Login JSON { "username": "Required", "password": "Required" }
### https://wunderlist3.herokuapp.com/api/auth/login
### Successful login returns JSON { "token": "jsonwebtoken" }

## Get users list
### https://wunderlist3.herokuapp.com/api/auth

# Category API (requires jsonwebtoken)
<p><code>headers:{ authorization: `Bearer ${token}` }</code></p>

## Get current user's categories
### https://wunderlist3.herokuapp.com/api/category

## Create a new category JSON { "category": "Required" }
### https://wunderlist3.herokuapp.com/api/category

## Update a category JSON { "category": "Required", "change": "Required" }
### https://wunderlist3.herokuapp.com/api/category

## Delete a category JSON { "category": "Required" }
### https://wunderlist3.herokuapp.com/api/category

# Task API (requires jsonwebtoken)
## Get my tasks
### https://wunderlist3.herokuapp.com/api/task

## Create task JSON { "category": "Required", "task": "Required", "description": "Optional", "scheduled": "Optional" }
### https://wunderlist3.herokuapp.com/api/task

## Update task JSON { "category": "Required", "task": "Required", "description": "Optional", "scheduled": "Optional", "changeTask": "Optional" }
### https://wunderlist3.herokuapp.com/api/task

## Delete a task JSON { "category": "Required", "task": "Required" }
### https://wunderlist3.herokuapp.com/api/task