var User = require('./models/user');
var Project = require('./models/project');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

let getProfile = (req) => {

	let body = Object.create(req.body);
	console.log(body)
	
	if(Object.prototype.hasOwnProperty.call(body,'profile')){
		let profile = req.body.profile;
		return profile;
	}
	else{
		return null;
	}
}
process.on('unhandledException',(err)=>{
	throw new error(err);
});
module.exports = function(apiRoutes) {
	// api ---------------------------------------------------------------------
	apiRoutes.post('/login', function(req, res) {
        // find the user
        User.findOne({
            name: req.body.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, 'ilovescotchyscotch', {
                        expiresIn: 86400 // expires in 24 hours
                    });
					console.log(req.userProfile)
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
						profile : user.profile
                    });
                }		

            }

        });
    });

    // ---------------------------------------------------------
    // route middleware to authenticate and check token
    // ---------------------------------------------------------
    apiRoutes.use(function(req, res, next) {
		
		// req.userProfile = getProfile(req);
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, 'ilovescotchyscotch', function(err, decoded) {			
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });		
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
					req.userProfile = decoded._doc.profile;	
					console.log(req.userProfile)
					
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.'
            });
            
		}
    });

    // ---------------------------------------------------------
    // authenticated routes
    // ---------------------------------------------------------
    apiRoutes.get('/users', function(req, res) {
		if(getProfile(req) == 'admin'){
			User.find({}, function(err, users) {
				res.json(users);
			});
		}
		else{
			res.json({success : false, message : 'Rights reserved!!'})
		}
    });
	// create todo and send back all projects after creation
	apiRoutes.post('/createUser', function(req, res) {
		console.log(req.userProfile)
		if(req.userProfile=='admin'){
			if(req.body.name != null && req.body.password != null  ){
				
				// create a user, information comes from AJAX request from Angular
				User.create({
					name : req.body.name,
					password: req.body.password,
					profile: req.body.profile
				}, function(err, user) {
					if (err)
						res.json({message:err,success:false});
					else{
						res.json("User created Successfully : " + user.name + ' , Profile: ' + user.profile);
					}
				});
			}
			else{
				res.json({message:'Get Lost!! Enter Some data',success: false});
			}
		}
		else{
			res.json({message:'You are not allowed to create Users!',success:false});
		}
	});
	
    apiRoutes.get('/check', function(req, res) {
        res.json(req.decoded);
    });

   //GET projects
	apiRoutes.get('/projects', function(req, res) {
		Project.find(function(err, projects) {
			if (err)
				res.send(err)
			else{
				res.json(projects); // return all projects in JSON format
			}
		});
	});
	//GET details of project id
	apiRoutes.get('/projects/:projectId', function(req, res) {
		console.log(req.params)
		Project.find({
			_id:req.params.projectId
		},function(err,project){
			if(err){
				res.send(err);
			}else{
				res.json(project)
			}
		});
	});

	
	// Delete Project and send back all projects after creation
	apiRoutes.delete('/projects/:projectId', function(req, res) {
        Project.deleteOne({
            _id: req.params.projectId
        }, function(err, todo) {
            if (err)
                res.send(err);
			// get and return all the projects after you delete
			Project.find(function(err, projects) {
				if (err)
					res.send(err)
				res.json(projects);
			});
           
        });
    });

	// app.get('/api/resources', function(req, res) {

	// 	// use mongoose to get all resources in the database
	// 	Resource.find(function(err, resources) {

	// 		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
	// 		if (err)
	// 			res.send(err)

	// 		res.json(resources); // return all projects in JSON format
	// 	});
	// });
	
	// create project and send back all projects after creation
	apiRoutes.post('/projects', function(req, res) {
		if(req.userProfile=='admin' || req.userProfile=='approver'){
			let code = req.body.code.toLowerCase();
			if(req.body.code != null ){
				Project.find({
					code:code
				},function(err,proj){
					if(err){
						res.json({message:err, success: false});
					}
					if(proj.length>0){
						res.json({message:'Project Already Exists', success: false});
					}
					else{
						// create a Project, information comes from AJAX request from Angular
						Project.create({
							code : code
						}, function(err, projects) {
							if (err)
								res.json({message: err.errmsg, success:false});
							else{
								// get and return all the Projects after you create another
								Project.find(function(err, projects) {

									if (err)
										res.send(err)
									else{
										res.json(projects);
									}
								});
							}
						});
					}
				});
				
					
			}
			else{
				res.json({message : 'Get Lost!! Enter Some data',success : false});
			}
		}
		else{
			res.json({message:'You are not allowed to create Projects!',success:false});
		}
	});

	//Add Scripts PUT
	apiRoutes.put('/projects/:projectId/scripts', function(req, res) {
		let code = req.params.projectId;
		let scripts = req.body.scripts;
		let found = false;
		console.log(scripts);
		// if(!Array.isArray(scripts)){
		// 	scripts=JSON.parse(scripts)	
		// }
		Project.find({
			code:code
		},function(err,projects){
			if(err){
				res.json({message:err, success:false});
			}
			else if(projects.length>0){
				let tempScripts = projects[0].scripts
				for(script of tempScripts){
					for(reqScript of scripts){					
						if(script.name === reqScript.name){
							found = true;
						}
					}
				}
				if(err){
					res.json({message:err,success:false})
				}
				else if(found){
					res.json({message:'Script already exists',success: false});
				}
				else{
					Project.update({
						code:code
					},{$pushAll:{'scripts':scripts}
					},function(err, projects) {
						if (err){
							res.send(err)
						}else{
							res.json('->'+projects); // return all projects in JSON format
						}
					});
				}
			}
			else{
				res.json({message:'Project '+ code+' not found', success: false})
			}
			
		});
	});
	var updateScripts = function(data,code){
		var promise = new Promise(function(resolve,reject){
			for(itr=0;itr<data.length;itr++){
				Project.update({
					_id:code,
					"scripts.name":data[itr].name
				},{
					$set:{
						"scripts.$":data[itr]
					}
				},{
					multi:true,
					upsert: true
				},function(err,projects){
					console.log(err,projects,itr,data.length)
					if(err){
						console.log(err);
						reject({error:err});
					}else if((itr) == data.length){
						console.log(projects)
						if(projects.nModified==1)
						resolve("Updated Scripts!!");
						else{
							reject({error:projects})
						}
					}
				});
			}
		});
		return promise;
	}
	//Edit Scripts PUT
	apiRoutes.put('/projects/:projectId/scriptsNew', function(req, res) {
		let code = req.params.projectId;
		let scripts = req.body.scripts;
		let found = false;
		// console.log(scripts);
		// if(!Array.isArray(scripts)){
		// 	scripts=JSON.parse(scripts)	
		// }
		
		updateScripts(scripts,code).then(function(resolve,rejected){
			console.log(resolve,rejected)
			if(rejected){
				res.json({error:rejected,success:false});
			}
			else{
				
				res.json(resolve);
			}
		})
	});


	// Delete scripts
	apiRoutes.delete('/projects/:projectId/scripts', function(req, res) {
		let code = req.params.projectId;
		let scriptName = req.body.scriptName;
		let deleteRequest = req.body.deleteRequest;
		let deleteComment = req.body.deleteComment;
		let found = false;
		if(req.userProfile=='admin' || req.userProfile=='mofo' || req.userProfile=='approver'){
			Project.find({
				code:code
			},function(err,projects){
				if(err){
					res.json({message:err, success:false});
				}
				else if(projects.length>0){
					console.log(projects[0].scripts)
					let tempScripts = projects[0].scripts
					for(script of tempScripts){					
						if(scriptName === script.name){
							found = true;
						}
					}
					if(err){
						res.json({message:err,success:false})
					}
					else if(!found){
						res.json({message:'Script Not found',success: false});
					}
					else if(req.userProfile=='admin'||req.userProfile=='approver'){
						Project.update({
							code:code
						},{$pull:{'scripts':{name:scriptName}}
						},function(err, projects) {
							if (err){
								res.send(err)
							}else{
								res.json(projects); // return in JSON format
							}
						});
					}else if(req.userProfile=='mofo'){
						Project.update({
							code:code,
							'scripts.name':scriptName
						},{
							$set:{
								'scripts.$.deleteRequest':deleteRequest,
								'scripts.$.deleteComment':deleteComment
							}
						},function(err, projects) {
							if (err){
								res.send(err)
							}else{
								res.json(projects); // return in JSON format
							}
						});
					}
				}
				else{
					res.json({message:'Project not found', success: false})
				}
				
			});
		}
		
		
    });

	//Add asscociatedTestCases PUT
	apiRoutes.put('/projects/:projectId/associatedTestCases', function(req, res) {
		let code = req.params.projectId;
		let scripts = req.body.associatedTestCases
		let found = false;
		if(!Array.isArray(scripts)){
			console.log(scripts)
			scripts=JSON.parse(scripts)	
		}

		Project.find({
			code:code
		},function(err,projects){
			if(err){
				res.json({message:err, success:false});
			}
			else if(projects.length>0){
				console.log(projects)
				let tempScripts = projects[0].associatedTestCases
				console.log(projects[0])
				for(script of tempScripts){
					for(reqScript of scripts){
						console.log(script,reqScript)					
						if(script === reqScript){
							
							found = true;
						}
					}
				}
				if(err){
					res.json({message:err,success:false})
				}
				else if(found){
					res.json({message:'Test Case already exists',success: false});
				}
				else{
					Project.update({
						code:code
					},{
						$pushAll:{'associatedTestCases':scripts}
					},function(err, projects) {
						if (err){
							res.send(err)
						}else{
							res.json(projects); // return all projects in JSON format
						}
					});
				}
			}
			else{
				res.json({message:'Project not found', success: false})
			}
			
		});
	});

	// Delete associatedTestCases
	apiRoutes.delete('/projects/:projectId/associatedTestCases', function(req, res) {
		let code = req.params.projectId;
		let scriptName = req.body.associatedTestCase;
		let found = false;
	
		Project.find({
			code:code
		},function(err,projects){
			if(err){
				res.json({message:err, success:false});
			}
			else if(projects.length>0){
				console.log(projects[0].associatedTestCases)
				let tempScripts = projects[0].associatedTestCases
				for(script of tempScripts){					
					if(scriptName === script){
						found = true;
					}
				}
				if(err){
					res.json({message:err,success:false})
				}
				else if(!found){
					res.json({message:'Test Case Not found',success: false});
				}
				else{
					Project.update({
						code:code
					},{$pull:{'associatedTestCases':scriptName}
					},function(err, projects) {
						if (err){
							res.send(err)
						}else{
							res.json(projects); // return in JSON format
						}
					});
				}
			}
			else{
				res.json({message:'Project not found', success: false})
			}
			
		});
		
		
		
    });
};