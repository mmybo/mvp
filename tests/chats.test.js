const chai = require('chai')
    , should = chai.should()
    , expect = chai.expect
    , Chat = require('../models/chatroom')
    , User = require('../models/user')
    , app = require('../app');


chai.use(require('chai-http'));

describe("Chatroom Tests:", () => {

    it("Should create new chatroom", () => {
        // Make request to app to make a new chatroom

        // Ensure the requester's chatroom array includes this new one

        // Ensure the bidder's chatroom array includes this new one

        // Ensure the product's offers property increased by one

        // Ensure the product's bidders array includes the bidder's _id
    });

});
