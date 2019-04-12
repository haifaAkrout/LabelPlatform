const form = document.getElementById('vote-form');
var event;

form.addEventListener('submit', e=>{

    const choice = document.querySelector('input[name=project]:checked').value;
    const data = {project: choice};

    fetch('http://localhost:6003/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(err => console.log(err));

    e.preventDefault();
});

fetch("http://localhost:6003/poll/")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;




        voteCounts = votes.reduce((acc, vote) => (
                (acc[vote.project] = (acc[vote.project] || 0) + parseInt(vote.points)), acc),
            {}
        );
        var dataPoints=[];
        var i=1;
        var e=0;
        var f=0;
        for (var j = 0; j < votes.length; j++) {



           // console.log(dataPoints[j])
if(f==0){
                dataPoints.push({

                    y: voteCounts[votes[j].project],
                    label: votes[j].project

                });}
            if(votes[j]==votes[i]) {
                    i++;
                    e++;
                    f=e;
                    e=0;
                }
                console.log(e);

            }







        const chartContainer = document.querySelector('#chartContainer');

        if(chartContainer){

            // Listen for the event.
            document.addEventListener('votesAdded', function (e) {
                document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
            });

            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();

            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;


            var pusher = new Pusher('5a4108a6afaa12b66d4e', {
                cluster: 'eu',
                forceTLS: true
            });

            var channel = pusher.subscribe('project-poll');

            channel.bind('project-vote', function(data) {
                dataPoints.forEach((point)=>{
                    if(point.label==data.project)
                    {
                        point.y+=data.points;
                        totalVotes+=data.points;
                        event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                        // Dispatch the event.
                        document.dispatchEvent(event);
                    }
                });
                chart.render();
            });
        }

    });