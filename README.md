# jiphy
Index video captions and save still images. Use these elements to dynamically create GIFs from your favourite media.

## Important Note
This was a hackathon project for WarwickHack 2017 and as such, the code and documentation quality is lacking. This readme is intended as a brief reminder of how to set up should we wish to continue this project in the future.

## Environment Setup
Vagrant up, vagrant ssh... "/elasticsearch/bin/elasticsearch" will start the elasticsearch service on port 9200. It is not accessible from outside of the vm.

"npm run /site/site/" will run the express nodejs server on port 8001. Check the Vagrantfile to see which host port it is being forwarded to but at last check it was 8001. See the code for endpoints.
