const expect = require('chai').expect;
const model = require('./model/model.js')
const req = {}
req.headers = {
    'pagesize': 2,
    pageno: 2,
    user_id: 'prathamesh242'
}

describe("Testing Social Media Platform", () => {
    it("Fetch Users", async () => {
        const a =await model.fetchUsers(req)
        console.log(a)
        expect(await model.fetchUsers(req)).to.be.an('array');
    });
    it("Fetch Friends", async () => {
        expect(await model.fetchFriends(req)).to.be.an('array');;
    });
})