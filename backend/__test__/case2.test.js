const {register} = require('../controllers/auth');

const mockManager = {
    name:"manager",
    tel:"44518465618",
    email:"pefeqwtgrg@ppap.com",
    password:"sddw4d3d655c646af",
    role:'manager',
}

const mockFailedCase = {
    name:"manager",
    email:"p@pfefepap.com",
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
    });

    it('Manager Complete Registration',async()=>{
        req.body = JSON.stringify(mockManager);
        console.log((req.body));

        const response = await register(req,res,next);
        expect(response.res.status).toHaveBeenCalledWith(201);
    });

    it('Manager failed registration', async() =>{
        req.body = JSON.stringify(mockFailedCase);

        const response = await register(req,res,next);
        expect(response.res.status).toHaveBeenCalledWith(400);
    });

});