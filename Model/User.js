import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  blogs:[{type:mongoose.Types.ObjectId , ref:"Blog",required:true}]
});

/// schema define what data should be save into data and it define its format and apply constraint\
///on that data  

export default mongoose.model('User', userSchema);


