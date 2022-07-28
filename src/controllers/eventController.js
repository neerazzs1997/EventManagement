
const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");
const validator = require("../validator/validator");


const eventController = async function (req, res) {
    try {
  
     // const requestBody = req.body;
      const requestBody = req.body;
      
  
      if (!validator.isValidBody(requestBody)) {
        return res
          .status(400)
          .send({ status: false, message: "ERROR! : request body is empty" });
      }
  
  

      if (!validator.isValidBody(requestBody)) {
        return res
          .status(400)
          .send({ status: false, message: "ERROR! : request body is empty" });
      } else {
  
        const { name, description, eventDate, createdBy,invitees } = requestBody;
  

        let isName = /^[A-Za-z ]*$/;  
  
        if (!validator.isValid(name)) {
          return res.status(400).send({ status: false, message: "please enter name" });
        }
  
        if (!isName.test(name)) {
          return res.status(400).send({ status: false, message: "enter valid name" });
        }
  

        if (!validator.isValid(description)) {
          return res.status(400).send({ status: false, message: "email is not present in input request" });
        }

        if(!validator.isValid(createdBy)){
            return res.status(400).sned({status:false, message:"please provide createdBy"})
        }

        if(!validator.isValid(invitees)){
            return res.status(400).sned({status:false, message:"please provide invitees"})
        }
      
        if(!validator.isValid(eventDate)){
            return res.status(400).sned({status:false, message:"please provide eventDate"})
        }


        const User = await userModel.findOne({_id:createdBy}); 
        if (!User) {
          res.status(400).send({ status: false, message: `User does not exit` });
          return;
        }


        
    if(!isValidobjectId.isValid(createdBy)){
      return res.status(400).send({status:false,msg:"unmatch invalid createdBy"})
    }

      }

      const eventData = await eventModel.create(requestBody);
      return res.status(201).send({
        status: true,
        message: "successfully saved event data",
        data: eventData,
      });
  
    } catch (error) {
      return res.status(500).send({ status: false, Error: error.message });
    }
  };


   
  

  const getAllEvents = async function (req, res) {
    try {
      let result = {};
      let users = [];
      let userId = req.params.userId;

      if (!userId)
        return res
          .status(400)
          .send({ status: false, msg: "Please Provide userId" });

      

      let userDeatils = await userModel.findOne({ _id: userId });
      if (!userDeatils)
        res.status(400).send({ status: false, msg: "userId not Found" });
        
        
      let eventsDetails = await eventModel.find({ userId: userDeatils._id });
      if (!eventsDetails) {
        res
          .status(400)
          .send({ status: false, msg: "please provide events details" });
      }
      let userData = {
        _id: userDeatils._id,
        title: userDeatils.title,
        name: userDeatils.name,
        email: userDeatils.email,
        password: userDeatils.password,
        createdAt: userDeatils.createdAt,
        updatedAt: userDeatils.updatedAt,
      };

      for (let i = 0; i < eventsDetails.length; i++) {
        result = {
          _id: eventsDetails[i]._id,
          name: eventsDetails[i].name,
          description: eventsDetails[i].description,
          createdBy:eventsDetails[i].createdBy,
          invitees: eventsDetails[i].invitees,
        };
        users.push(result);
      }
      userData["eventData"] = users;
      
      res.status(200).send({ status: true, data: userData });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: false, msg: error.message });
    }
  };




  
const getEvents = async function (req, res) {
  try {
      let data = req.query

    
      if (!validator.isValidBody(req.query)) {
        let search1 = await eventModel.find({ isDeleted: false })
          .select({
            _id: 0,
            name: 1,
            description: 1,
            createdBy:1,
            invitees:1
          })
          .sort({ name: 1 });
        if (!search1) {
          return res.status(404).send({ status: false, msg: "no data found" });
        }
        
       return res.status(200).send({ status: true,count:search1.length, msg: search1 });
      }

  
      let filterquery = { isDeleted: false };

      const {names} = data;


      let title=names
  
      if(title){


      if (!validator.isValid(title)){
        return res
          .status(400)
          .send({ status: false, msg: "name is required" });
      }
          
          title = { $regex: title, $options: "i" } 
          filterquery.title = title
    
  }
      const searchEvent = await eventModel.find(filterquery).sort({title:1})


      if (searchEvent.length === 0) {
        return res.status(404).send({ status: false, msg: "No events found" });
      }
      
      res.status(200).send({ status: true,msg:"sucess",count:searchEvent.length,data: searchEvent });
    } 

   catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
  }
}



    
  
  const updateEvents = async function (req, res) {
    try {
      let Id = req.params.eventId;
     
  
      if (!isValidObjectId(Id)) {
        return res.status(400).send({ status: false, msg: "invalid objectid" });
      }

      let checkidinDb=await eventModel.findById(Id)
      if(!checkidinDb){return res.status(404).send({status:false,msg:"this id is not found"})}

      let { name, description} = req.body;
  
      if (!isValid(description)) {
        return res.status(400).send({status:false,msg:"please give description"})
      }

      if (!isValid(name)) {
        return res.status(400).send({status:false,msg:"please give name"})
      }



      const nameAlreadyUsed = await eventModel.findOne({ name });
      if (nameAlreadyUsed) {
       return res.status(400).send("name alerady exist");
        
      }
      const descriptionAlreadyUsed = await eventModel.findOne({ description });
      if (descriptionAlreadyUsed) {
       return res.status(400).send("description alerady exist");
        
      }
    
      let findEvents = await eventModel.findById(Id);
      if (!findEvents) {
        return res
          .status(400)
          .send({ status: false, msg: "this id is not in db" });
      }
    

      let upateEvents = await eventModel.findOneAndUpdate(
        { eventId: Id, isDeleted: false },
        req.body,
        { new: true }
      );
      res.status(201).send({status:false,msg:"updated sucessfully",data:upateEvents})
    } catch (error) {
      res.status(500).send({ satus: false, msg: error.message });
    }
};

  



const getEventsById = async function (req, res) {
  try {
      const eventId = req.params.eventId;

      if (!validator.isValidobjectId(eventId)) {
          return res.status(400).send({ status: false, msg: `${eventId} this is not valid eventId ` })
      }

      const eventsDetails = await eventModel.findOne({_id:eventId, isDeleted:false})

      if (!eventsDetails) {
          return res.status(404).send({ status: false, msg: `events not found with this ID: ${eventId} ` })
      }

          return res.status(200).send({ status: true, message: "Success", data: eventsDetails })

      
  } catch (err) {

      return res.status(500).send({ status: false, error: err.message })
  }
}
  module.exports.eventController = eventController
  module.exports.getAllEvents = getAllEvents
  module.exports.getEvents = getEvents
  module.exports.updateEvents=updateEvents
  module.exports.getEventsById=getEventsById



