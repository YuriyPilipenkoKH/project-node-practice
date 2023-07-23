const {connect} = require('mongoose');


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const connectDb = async() => {

    try {
      const db = await connect(process.env.DB_HOST);
      console.log(`Data Base is connected. name: ${db.connection.name}. host: ${db.connection.host}. port: ${db.connection.port}`.grey.italic.bold) 
    } 
    catch (error) {
        console.log(error.message.red.bold)
        process.exit(1)
    }
}

module.exports = connectDb