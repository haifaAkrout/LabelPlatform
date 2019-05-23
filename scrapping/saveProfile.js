const dependencies = {
  fs: require('fs'),
  config: require('../config.json')
}
var mongoose = require('mongoose');

const Education  = require('../models/Education');
const Educations = mongoose.model('Education',Education);
const Experience  = require('../models/Experience');
const Experiences = mongoose.model('Experience',Experience);
require('../models/User');
const Member = mongoose.model('Member');

module.exports = (content) => {
    console.log("id user")
  console.log(content);
    console.log("educations")
  console.log(content.educations);
    console.log("experiences")
  console.log(content.positions)
    Member.findById(content.idUser)
        .then(user=>{
            if(!user)
            {console.log('undefined user')}
            console.log('.-.-.-.-.-'+user);
            console.log("name",content.profile.name);

             for(var i=0;i<content.educations.length;i++)
            {
                console.log("education***************************************");

                var date = content.educations[i].date1.split('-');
                console.log("title",content.educations[i].title);
                let educ1 = new Educations({

                    School : content.educations[i].title,
                    Degree : content.educations[i].degree,
                    StartDate: date[0],
                    EndDate: date[1]
                });
                educ1.save();
                console.log(educ1);
                user.Education.push(educ1)
            }

            for(var i=0;i<content.positions.length;i++)
            {
                console.log("***********positions*********************",)
                console.log("*********date***********",content.positions[i].date1);
                var date = content.positions[i].date1.split('-');
                let exp1 = new Experiences({
                    Title :content.positions[i].name,
                    Description : content.positions[i].description,
                    StartDate: date[0],
                    EndDate: date[1],
                    Company:content.positions[i].companyName
                });
                exp1.save();
                user.Experience.push(exp1);


            }

            user.FirstName = content.profile.name;
            Member.findByIdAndUpdate(content.idUser, user, {new: true}, (err, membre) => {
                console.log("member updated");

            });
            user.save();
        })



}
