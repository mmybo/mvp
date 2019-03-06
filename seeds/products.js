// var mongoose = require('mongoose');
// const User = require('../models/user')
// var Schema = mongoose.Schema;


// const randomUser = new User({
//     name: 'RandyRandom',
//     email: 'randyrandom@gmail.com',
//     password: 'password',
//     rating: 5,
//     products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
//     chatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }]
// }, { timestamps: true });



const products = [
    {
        name: 'Xbox 360',
        description: 'I want an Xbox 360 so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://i5.wal.co/asr/f0d5cb32-b414-4ded-80e4-871109f94704_1.aa412094052249a628594b0f17192c16.jpeg-611202bc199322e7b3cf2cb532010ea5255aa1dd-optim-450x450.jpg',
        offers: 1,
        // requester: randomUser,
        createdAt: new Date()
    },
    {
        name: 'iPhone 6s',
        description: 'I want an iPhone 6s so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://i5.wal.co/asr/f0d5cb32-b414-4ded-80e4-871109f94704_1.aa412094052249a628594b0f17192c16.jpeg-611202bc199322e7b3cf2cb532010ea5255aa1dd-optim-450x450.jpg',
        offers: 2,
        // requester: randomUser,
        createdAt: new Date()
    },
    {
        name: 'Microwave',
        description: 'I want a microwave so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://i5.wal.co/asr/18652377-1a34-4154-925a-a51569ddee61_2.5da704269c4cbb2f250339ff59da724d.jpeg-48be6f87a667c8189e7d4008297a15194d4c8f0b-optim-450x450.jpg',
        offers: 3,
        // requester: randomUser,
        createdAt: new Date()
    },
    {
        name: 'Hard Drive',
        description: 'I want a hard drive so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://target.scene7.com/is/image/Target/GUEST_52c6c76f-d2f4-4e62-839b-871b231b8705?wid=488&hei=488&fmt=pjpeg',
        offers: 0,
        // requester: randomUser,
        createdAt: new Date()
    },
    {
        name: 'Headphones',
        description: 'I want a pair of headphones so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/H/JD/HJDJ2/HJDJ2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1498060668986',
        offers: 2,
        // requester: randomUser,
        createdAt: new Date()
    },
    {
        name: 'Xbox Remote',
        description: 'I want an Xbox remote so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://target.scene7.com/is/image/Target/GUEST_bc69fc3e-28fc-4043-8a58-b8399863e352?wid=488&hei=488&fmt=pjpeg',
        offers: 5,
        // requester: randomUser,
        createdAt: new Date()
    },
    {
        name: 'Left Air Pod',
        description: 'I lost my left air pod so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://atlas-content-cdn.pixelsquid.com/stock-images/apple-airpod-left-side-earphones-n1PmZq3-600.jpg',
        offers: 0,
        // requester: randomUser,
        createdAt: new Date()
    },
    {
        name: 'Hard Drive',
        description: 'I want a hard drive so please if you have one please message me so we can discuss price.',
        requirements: 'Relatively new condition Still works It has at least 4gb',
        image: 'https://target.scene7.com/is/image/Target/GUEST_52c6c76f-d2f4-4e62-839b-871b231b8705?wid=488&hei=488&fmt=pjpeg',
        offers: 0,
        // requester: randomUser,
        createdAt: new Date()
    }
]

module.exports = products
