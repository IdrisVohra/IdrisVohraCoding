const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    authentication:{
        password:{
        type:String,
        required:true,
        select:false
        },
        salt:{
            type:String,
            select:false
        },
        sessionTocken:{
            type:String,
            select:false
        },
    },
});

export const userModel = mongoose.model('User',userSchema);

export const getUser = () => userModel.find();
export const getUserByEmail = (email:string) => userModel.findOne({email});
export const getUserBySessionToken = (sessionTocken:string) => 
userModel.findOne({'authentication.sessionToken':sessionTocken});

export const getUserById = (id: String) => userModel.findById(id);
export const createUser = (values: Record<string,any>) => 
new  userModel.save().then((user: { toObject: () => any; })=>user.toObject());

export const deleteUserById = (id: string)=>userModel.findOneAndDelete({_id:id});
export const updateUserById = (id: string,values:Record<string,any>)=>userModel.findOneAndUpdate({id,values});


