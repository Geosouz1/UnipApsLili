
exports.home = ((req, res) => {
    res.render('index',{
        
    });

    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('image', function (data) {
            console.log('data', data);
            const image = document.getElementById('image');
            image.src = `data:iamge/jpeg;base64,${image}`
             
            setInterval(() => {
                const frame = wCap.read();
                const image = cv.imencode('.jpg', frame).toString('base64');
                io.emit('image', 'some data')
            }, 1000)
        });
    });
});

