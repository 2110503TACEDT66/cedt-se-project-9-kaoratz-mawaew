const {register} = require('../controllers/auth');

const mockManager = {
    name:"manager",
    tel:"022222222",
    email:"p@ppap.com",
    password:"sddw4d3d655c646af",
    role:'manager',
}

const mockFailedCase = {
    name:"manager",
    email:"p@ppap.com",
    password:"sddw4d3d655c646af",
    role:'manager',
}

console.log(JSON.stringify(mockManager));

describe('register manager', () => {
    let req;
    let res;
    let next;
  
    beforeEach(() => {
      req = {
        method:"POST",
        headers:{"Content-Type": "application/json",},
        body: {},
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Manager Complete Registration',async()=>{
        req.body = JSON.stringify(mockManager);
        console.log((req.body));

        await register(req,res,next);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('Manager failed registration', async() =>{
        req.body = JSON.stringify(mockFailedCase);

        await register(req,res,next);
        expect(res.status).toHaveBeenCalledWith(400);
    });

});