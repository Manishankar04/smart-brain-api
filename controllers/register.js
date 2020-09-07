
const handleRegister=(req,res,db,bcrypt)=>{
	const{email, password , name}=req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form');
	}
	const hash = bcrypt.hashSync(password);
		db.transaction(trx=>{
			trx.insert({
				hash:hash,
				email:email
			})
			.into('login')
			.returning('email')
			.then(loginemail=>{
				return db('users')
					.returning('*')
					.insert({
						name: name,
						email: loginemail[0],
						joined:new Date()
					})
					.then(user =>{
						res.json(user[0]);
					})
				})
			.then(trx.commit)
			.catch(trx.rollback)
			})	
		.catch(err => res.status(400).json("already registered"))
	}
module.exports={
	handleRegister:handleRegister
}	
