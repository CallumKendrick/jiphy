sudo apt-get install -y default-jre

mkdir /elastic-temp
cd /elastic-temp

wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.1.tar.gz
tar -xzvf elasticsearch-5.2.1.tar.gz

cd elasticsearch-5.2.1
mkdir /elasticsearch
cp -r * /elasticsearch

chmod -R 777 /elasticsearch # don't look at me like that. This is a hackathon.

rm -rf /elastic-temp
