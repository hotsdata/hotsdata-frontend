import express from 'express';
const app = express();

// Since the root/src dir contains our index.html
app.use(express.static(__dirname + '/src'));

// Heroku by default set an ENV variable called PORT=443
// so that you can access your site with https default port.
// Fallback port will be 8080; bascially for pre-productoin test in localhost
// YOu will use $ npm run prod for this

app.listen(process.env.PORT || 8080);
