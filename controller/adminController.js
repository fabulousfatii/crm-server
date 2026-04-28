const Admin= require('../model/admin.model');


const createAdmin = async () => {
    try {
      const newAdmin = new Admin({
        username: 'admin_user',
        email: 'admin@example.com',
        password: "admin123",
        
      });
  
      await newAdmin.save(); // This triggers the collection creation
      console.log('Admin saved successfully');
    } catch (err) {
      console.error('Error saving admin:', err);
    }
  };
  
 module.exports= createAdmin;