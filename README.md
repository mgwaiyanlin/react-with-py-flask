## Python Setup
### installation cmds
	python -m venv venv
	pip install flask flask-sqlalchemy flask-cors

### setting and running in cmd
	set FLASK_APP=app.py (Unix -> 'export' instead of 'set')
	set FLASK_ENV=development
	flask run (note: this does not reload your app whenever you change something in your code!)
	flask run --reload (note: this reloads your app whenever you change something in your code.)

## React Setup
### installation cmds
	npm create vite@latest .

 
## Deployment
	cd .\frontend\
 	npm run build
  	pip freeze > requirements.txt
   
## Remember to add deployment code in app.py
## Go to dashboard.render.com
	create a new web service 
 	build and deploy it from git repo
  	root directory -> backend
   	Build Command -> pip install -r requirements.txt && cd ../frontend && npm install && npm run build
    	Start Command -> gunicorn wsgi:app
    

