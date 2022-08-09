const http = require('http')
const port = 3000

const server = http.creatserver(function (req, res) {

})

server.listen(port, function (error){
    if (error) {
        console.log('something went wrong', error)
    }else{
        console.log('server listing on port ' + port)
    }
})