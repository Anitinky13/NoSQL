//username need to have a string, Unique, Required, Trimmed

//email to have String, required, Unique, match a valid email address(look into Mongooses matching validation)

//thoughts to have an array of _id values referencing the Though model

//friends to have an array of _id values referencing the User model(self reference)

//create a virtual called friendCount that retrieves the length of the users friends array field on query
