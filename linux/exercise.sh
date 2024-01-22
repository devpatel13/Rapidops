#make directory
mkdir shellScriptExercise

#move to directory
cd shellScriptExercise

#create 3 files and write in it
touch a.txt b.txt c.txt
echo -e "this is a line\nthis is a line\nthis is a line\nthis is a line\nthis is a line" > a.txt
cat a.txt a.txt >> b.txt
cat a.txt a.txt a.txt >> c.txt

#display contents of three files
echo "a.txt"
cat a.txt
echo "b.txt"
cat b.txt
echo "c.txt"
cat c.txt

#change permission of the files
chmod 444 b.txt
chmod 040 c.txt

#copy the files to 1st file
cat b.txt c.txt >> a.txt

#ask the user for input
echo -n "Do you want to delete[y/n]?"
read ans
if [ $ans = "y" ]
then 
	rm -f b.txt c.txt
	
#display file
cat a.txt
fi
	
