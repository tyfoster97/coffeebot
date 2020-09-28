while true
do
echo downloading packages
bash npm install -y
echo starting bot
bash nodemon
echo restarting bot
sleep 5
done