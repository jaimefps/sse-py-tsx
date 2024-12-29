# Server Sent Events (SSE)

mini test of SSE between python and react.js

## run python

Ensure you have `python3` installed on your machine.

- $ `source venv/bin/activate`
- $ `pip install flask-cors`
- $ `pip install flask`
- $ `python3 app.py`

Press CTRL+C within terminal to quit server.
<br>
Then, to exit (venv) mode, run `deactivate`.

## run react app

Ensure you have Node.js installed on your machine.
Ensure you have Yarn installed on your machine.

In a separate terminal from the python server:

- cd into `view/`
- $ `yarn install`
- $ `yarn start`

Press CTRL+C within terminal to client.

## see demo

- visit `localhost:8080` to see the non-throttled stream of content from python.
- visit `localhost:3000` to view how the react client throttles SSE renders.
